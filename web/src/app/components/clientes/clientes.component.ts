import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLinkActive, RouterOutlet } from '@angular/router';

import { ClienteService } from 'src/app/services/cliente.service';
import { ClienteInterface } from 'src/app/interfaces/cliente.interface';

import { SharedModule } from 'src/app/theme/shared/shared.module';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, SharedModule,RouterLinkActive],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.scss'
})
export class ClientesComponent implements OnInit {
  
  protected readonly clienteSvc = inject(ClienteService);
  private readonly router = inject(Router);
  
  public lstClientes: Array<ClienteInterface> = [];
  public recentOrder:any = [];
  public Title:string = "Clientes";

  constructor(
    // private clienteSvc: ClienteService
  ){}
  
  ngOnInit(){
    this.loadData()    
  }

  loadData() {
    this.lstClientes = [];
    this.clienteSvc.getTodos().subscribe({
      next: (resp:any) => {
        try{
          resp = JSON.parse(resp);
        }catch(err){}

        // console.log(resp)
        
        if (resp && resp.status == "ok"){
          if (resp.message.length>0){
            this.lstClientes = resp.message;
          }
        } else {
          Swal.fire({
            title: this.Title,
            html: JSON.stringify(resp.message),
            icon: "error"
          })
        }
      },
      error(err) {
        console.log(err);
      },
    });
  }

  nuevo = () => {
    this.router.navigate(["cliente/nuevo"]);
  }

  editar = (idClientes: number) => {
    this.router.navigate(["cliente/edicion/" + idClientes]);
  }

  eliminar = (idClientes: number) =>{
    Swal.fire({
      title: "Esta seguro de eliminar el registro?",
      text: "Una vez eliminado no se podra recuperar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteSvc.eliminar(idClientes).subscribe({
          next: (resp:any) => {
            if (resp && resp.status == "ok"){
              this.loadData();
              Swal.fire({
                title: this.Title,
                text: `El Cliente ha sido eliminado con éxito`,
                icon: "success"
              })
            } else {
              Swal.fire({
                title: this.Title,
                html: JSON.stringify(resp.message),
                icon: "error"
              })
            }
          },
          error(err) {
            console.log(err);
          },
        });
        
      }
    });
  }

 

}

import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLinkActive, RouterOutlet } from '@angular/router';

import { FacturaService} from 'src/app/services/factura.service';
import { FacturaInterface } from 'src/app/interfaces/factura.interface';

import { SharedModule } from 'src/app/theme/shared/shared.module';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-venta',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, SharedModule,RouterLinkActive],
  templateUrl: './venta.component.html',
  styleUrl: './venta.component.scss'
})
export class VentaComponent {

  protected readonly facturaSvc = inject(FacturaService);
  private readonly router = inject(Router);
  
  public lstFactura: Array<FacturaInterface> = [];
  public recentOrder:any = [];
  public Title:string = "Facturas";

  constructor(
    // private facturaSvc: ClienteService
  ){}
  
  ngOnInit(){
    this.loadData()    
  }

  loadData() {
    this.lstFactura = [];
    this.facturaSvc.getTodos().subscribe({
      next: (resp:any) => {
        try{
          resp = JSON.parse(resp);
        }catch(err){}

        // console.log(resp)
        
        if (resp && resp.status == "ok"){
          if (resp.message.length>0){
            this.lstFactura = resp.message;
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
    this.router.navigate(["venta/nuevo"]);
  }

  editar = (idClientes: number) => {
    this.router.navigate(["venta/edicion/" + idClientes]);
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
        this.facturaSvc.eliminar(idClientes).subscribe({
          next: (resp:any) => {
            if (resp && resp.status == "ok"){
              this.loadData();
              Swal.fire({
                title: this.Title,
                text: `La Factura ha sido eliminado con éxito`,
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

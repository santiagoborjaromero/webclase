import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLinkActive, RouterOutlet } from '@angular/router';

import { ProveedorService } from 'src/app/services/proveedor.service';
import { ProveedorInterface } from 'src/app/interfaces/proveedor.interface';

import { SharedModule } from 'src/app/theme/shared/shared.module';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, SharedModule,RouterLinkActive],
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.scss'
})
export class ProveedoresComponent {
  public Title = "Proveedores";
  protected readonly proveedorSvc = inject(ProveedorService);
  // title = 'Lista de Proveedores';
  lstProveedores: Array<ProveedorInterface> = [];
  public recentOrder:any = [];
  private readonly router = inject(Router);

  constructor(
    // private proveedorSvc: ProveedorService
  ){

  }
  
  ngOnInit(){
    this.loadProveedores()    
  }

  loadProveedores() {
    this.lstProveedores = [];
    this.proveedorSvc.getTodos().subscribe({
      next: (resp:any) => {
        try{
          resp = JSON.parse(resp);
        }catch(err){}
        
        if (resp && resp.status == "ok"){
          if (resp.message.length>0){
            this.lstProveedores = resp.message;
          }
        } else {
          Swal.fire({
            title: "Proveedores",
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


  editar = (idProveedores: number) => {
    this.router.navigate(["proveedor/edicion/" + idProveedores]);
  }

  eliminar = (idProveedor: number) =>{
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
        this.proveedorSvc.eliminar(idProveedor).subscribe({
          next: (resp:any) => {
            if (resp && resp.status == "ok"){
              this.loadProveedores();
              Swal.fire({
                title: this.Title,
                text: `El Proveedor ha sido eliminado con éxito`,
                icon: "success"
              })
            } else {
              Swal.fire({
                title: "Proveedores",
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

 nuevo = () => {
  this.router.navigate(["proveedor/nuevo"]);
 }

}

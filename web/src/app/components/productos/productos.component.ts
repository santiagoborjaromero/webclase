import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, DecimalPipe } from '@angular/common';
import { Router, RouterLinkActive, RouterOutlet } from '@angular/router';

import { ProductoService } from 'src/app/services/producto.service';
import { ProductoInterface } from 'src/app/interfaces/producto.interface';

import { SharedModule } from 'src/app/theme/shared/shared.module';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, SharedModule,RouterLinkActive, DecimalPipe],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.scss'
})
export class ProductosComponent {
  public Title = "Productos";
  protected readonly productoSvc = inject(ProductoService);
  // title = 'Lista de Proveedores';
  lstProductos: Array<ProductoInterface> = [];
  public recentOrder:any = [];
  private readonly router = inject(Router);
  
  ngOnInit(){
    this.loadData()    
  }

  loadData() {
    this.lstProductos = [];
    this.productoSvc.getTodos().subscribe({
      next: (resp:any) => {
        try{
          resp = JSON.parse(resp);
        }catch(err){}

        // console.log(resp)
        
        if (resp && resp.status == "ok"){
          if (resp.message.length>0){
            this.lstProductos = resp.message;
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


  editar = (idProductos: number) => {
    this.router.navigate(["producto/edicion/" + idProductos]);
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
        this.productoSvc.eliminar(idProveedor).subscribe({
          next: (resp:any) => {
            if (resp && resp.status == "ok"){
              this.loadData();
              Swal.fire({
                title: this.Title,
                text: `El Producto ha sido eliminado con éxito`,
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

 nuevo = () => {
  this.router.navigate(["producto/nuevo"]);
 }

}

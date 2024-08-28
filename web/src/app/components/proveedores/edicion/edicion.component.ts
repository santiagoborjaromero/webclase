import { Component, Input, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';


import { ProveedorInterface } from '../../../interfaces/proveedor.interface';
import { ProveedorService } from 'src/app/services/proveedor.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-edicion',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, SharedModule, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './edicion.component.html',
  styleUrl: './edicion.component.scss'
})
export class EdicionComponent {
  private readonly router = inject(Router);
  private readonly proveedorSvc = inject(ProveedorService);
  // @Input("id") pID !:string;
  private readonly route = inject(ActivatedRoute);

  public Title:string = "Proveedores";
  
  public Nombre_Empresa: string = "";
  public Direccion: string = "";
  public Telefono: string = "";
  public Contacto_Empresa: string = "";
  public Telefono_Contacto: string = "";
  public idProveedores:number = -1;
  public dataProveedor: ProveedorInterface;

  ngOnInit(): void {
    this.idProveedores = parseInt(this.route.snapshot.paramMap.get('id'));
    if (isNaN(this.idProveedores)) {
      this.idProveedores = -1;
      this.Title += "- Nuevo";
    } else{
      this.Title += "- Edicion";
      this.loadData();
    }
  }

  loadData = ()=>{
    this.proveedorSvc.getUno(this.idProveedores).subscribe({
      next: (resp:any) => {
        try{
          resp = JSON.parse(resp);
        }catch(err){}

        if (resp && resp.status == "ok"){
            this.dataProveedor = resp.message;
            this.Nombre_Empresa = this.dataProveedor.Nombre_Empresa;
            this.Direccion = this.dataProveedor.Direccion;
            this.Telefono = this.dataProveedor.Telefono;
            this.Contacto_Empresa = this.dataProveedor.Contacto_Empresa;
            this.Telefono_Contacto = this.dataProveedor.Telefono_Contacto;
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

  guardar = ()=>{

    let msgError = "";
    let error =false;

    if (!error && this.Nombre_Empresa == ""){
      error = true;
      msgError = "Debe ingresar el nombre de la empresa";
    }

    if (!error && this.Direccion == ""){
      error = true;
      msgError = "Debe ingresar la dirección de la empresa";
    }

    if (!error && this.Telefono == ""){
      error = true;
      msgError = "Debe ingresar el telefono de la empresa";
    }

    if (!error && this.Contacto_Empresa == ""){
      error = true;
      msgError = "Debe ingresar el contacto de la empresa";
    }

    if (!error && this.Telefono_Contacto == ""){
      error = true;
      msgError = "Debe ingresar el telefono del contacto de la empresa";
    }

    if (error){
      Swal.fire({
        title: "Edicion",
        text: msgError,
        icon: "error"
      });
      return;
    }

    this.dataProveedor = {
      idProveedores: this.idProveedores, 
      Nombre_Empresa: this.Nombre_Empresa, 
      Direccion: this.Direccion, 
      Telefono: this.Telefono, 
      Contacto_Empresa: this.Contacto_Empresa, 
      Telefono_Contacto: this.Telefono_Contacto, 
    }

    this.proveedorSvc.guardar(this.idProveedores, this.dataProveedor).subscribe({
      next: (resp:any) => {
        try{
          resp = JSON.parse(resp);
        }catch(err){}

        if (resp && resp.status == "ok"){
          if (resp.message > 0){
            this.router.navigate(["proveedores"]);
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

  cancelar = ()=>{
    this.router.navigate(["proveedores"]);
  }

}

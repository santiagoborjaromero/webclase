import { Component, Input, inject, OnInit, SimpleChanges } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ProductoInterface } from 'src/app/interfaces/producto.interface';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { UnidadmedidaService } from 'src/app/services/unidadmedida.service';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { IvaService } from 'src/app/services/iva.service';
import { UnidadmedidaInterface } from 'src/app/interfaces/unidadmedida.interface';
import { ProveedorInterface } from 'src/app/interfaces/proveedor.interface';
import { IvaInterface } from 'src/app/interfaces/iva.interface';

@Component({
  selector: 'app-edicion',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, RouterLinkActive, ReactiveFormsModule, SharedModule],
  templateUrl: './edicion.component.html',
  styleUrl: './edicion.component.scss'
})
export class EdicionComponent {
  private readonly router = inject(Router);
  private readonly productoSvc = inject(ProductoService);
  private readonly umedidaSvc = inject(UnidadmedidaService);
  private readonly proveedorSvc = inject(ProveedorService);
  private readonly ivaSvc = inject(IvaService);
  private readonly route = inject(ActivatedRoute);
  // private readonly parent = inject(FormGroupDirective);

  public Title: string = 'Producto';
  public idProductos: number = -1;
  public dataProducto: ProductoInterface;
  public lstUMedida: UnidadmedidaInterface[] = [];
  public lstProveedores: ProveedorInterface[] = [];
  public lstIVA: IvaInterface[] = [];
4
  frmForm = new FormGroup({
    Codigo_Barras: new FormControl('', [Validators.required,]),
    Nombre_Producto: new FormControl('', Validators.required),
    Graba_IVA: new FormControl(0, Validators.required),
    idUnidad_Medida:new FormControl(0, Validators.required),
    idIVA:new FormControl(0, Validators.required),
    idProveedores:new FormControl(0, Validators.required),
    Cantidad:new FormControl(0, Validators.required),
    Valor_Compra:new FormControl(0, Validators.required),
    Valor_Venta:new FormControl(0, Validators.required),
    idKardex:new FormControl(0, Validators.required),
  });

  ngOnInit(): void {
    this.loadUMedida();
    this.loadProveedores();
    this.loadIVA();
    
    this.idProductos = parseInt(this.route.snapshot.paramMap.get('id'));
    if (isNaN(this.idProductos)) {
      this.idProductos = -1;
      this.Title += '- Nuevo';
    } else {
      this.Title += '- Edicion';
      this.loadData();
    }
  }

  loadData = () => {
    this.productoSvc.getUno(this.idProductos).subscribe({
      next: (resp: any) => {
        try {
          resp = JSON.parse(resp);
        } catch (err) {}

        // console.log(resp)

        if (resp && resp.status == 'ok') {
          this.dataProducto = resp.message;
          this.frmForm.patchValue({
            Codigo_Barras: this.dataProducto.Codigo_Barras,
            Nombre_Producto: this.dataProducto.Nombre_Producto,
            Graba_IVA: this.dataProducto.Graba_IVA,
            idUnidad_Medida: this.dataProducto.Unidad_Medida_idUnidad_Medida,
            idIVA: this.dataProducto.IVA_idIVA,
            idProveedores: this.dataProducto.Proveedores_idProveedores,
            Cantidad: this.dataProducto.Cantidad,
            Valor_Compra: this.dataProducto.Valor_Compra,
            Valor_Venta: this.dataProducto.Valor_Venta,
            idKardex: this.dataProducto.idKardex,
          });
          
        } else {
          Swal.fire({
            title: this.Title,
            html: JSON.stringify(resp.message),
            icon: 'error'
          });
        }
      },
      error(err) {
        console.log(err);
      }
    });
  };

  loadUMedida = () => {
    this.umedidaSvc.getTodos().subscribe({
      next: (resp: any) => {
        try {
          resp = JSON.parse(resp);
        } catch (err) {}

        if (resp && resp.status == 'ok') {
          this.lstUMedida = resp.message;
          if (this.idProductos == -1){
            this.frmForm.controls['idUnidad_Medida'].setValue(this.lstUMedida[0].idUnidad_Medida)
          }
        } else {
          Swal.fire({
            title: this.Title,
            html: JSON.stringify(resp.message),
            icon: 'error'
          });
        }
      },
      error(err) {
        console.log(err);
      }
    });
  };

  loadProveedores = () => {
    this.proveedorSvc.getTodos().subscribe({
      next: (resp: any) => {
        try {
          resp = JSON.parse(resp);
        } catch (err) {}

        if (resp && resp.status == 'ok') {
          this.lstProveedores = resp.message;
          if (this.idProductos == -1){
            this.frmForm.controls['idProveedores'].setValue(this.lstProveedores[0].idProveedores)
          }
        } else {
          Swal.fire({
            title: this.Title,
            html: JSON.stringify(resp.message),
            icon: 'error'
          });
        }
      },
      error(err) {
        console.log(err);
      }
    });
  };


  loadIVA = () => {
    this.ivaSvc.getTodos().subscribe({
      next: (resp: any) => {
        try {
          resp = JSON.parse(resp);
        } catch (err) {}

        if (resp && resp.status == 'ok') {
          this.lstIVA = resp.message;
          if (this.idProductos == -1){
            this.frmForm.controls['idIVA'].setValue(this.lstIVA[0].idIVA)
          }
        } else {
          Swal.fire({
            title: this.Title,
            html: JSON.stringify(resp.message),
            icon: 'error'
          });
        }
      },
      error(err) {
        console.log(err);
      }
    });
  };

  guardar() {
    let data: ProductoInterface = {
      idProductos: this.idProductos,
      Codigo_Barras: this.frmForm.controls['Codigo_Barras'].value,
      Nombre_Producto: this.frmForm.controls['Nombre_Producto'].value,
      Graba_IVA: this.frmForm.controls['Graba_IVA'].value,
      idUnidad_Medida: this.frmForm.controls['idUnidad_Medida'].value,
      idIVA: this.frmForm.controls['idIVA'].value,
      idProveedores: this.frmForm.controls['idProveedores'].value,
      Cantidad: this.frmForm.controls['Cantidad'].value,
      Valor_Compra: this.frmForm.controls['Valor_Compra'].value,
      Valor_Venta: this.frmForm.controls['Valor_Venta'].value,
      idKardex: this.frmForm.controls['idKardex'].value,
    };

    this.productoSvc.guardar(this.idProductos, data).subscribe({
      next: (resp: any) => {
        try {
          resp = JSON.parse(resp);
        } catch (err) {}

        // console.log(resp)

        if (resp && resp.status == 'ok') {
          if (resp.message > 0) {
            this.router.navigate(['productos']);
          }
        } else {
          Swal.fire({
            title: this.Title,
            html: JSON.stringify(resp.message),
            icon: 'error'
          });
        }
      },
      error(err) {
        console.log(err);
      }
    });
  }


  cancelar = () => {
    this.router.navigate(['productos']);
  };
}

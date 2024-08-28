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
import { CommonModule, CurrencyPipe, DecimalPipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLinkActive, RouterOutlet } from '@angular/router';
import moment from 'moment';
import Swal from 'sweetalert2';

import { FacturaService} from 'src/app/services/factura.service';
import { FacturaInterface } from '../../../interfaces/factura.interface';
import { ClienteInterface } from 'src/app/interfaces/cliente.interface';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-edicion',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, RouterLinkActive, ReactiveFormsModule, DecimalPipe],
  templateUrl: './edicion.component.html',
  styleUrl: './edicion.component.scss'
})
export class EdicionComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly facturaSvc = inject(FacturaService);
  private readonly clienteSvc = inject(ClienteService);


  public Title: string = 'Factura';
  public idFactura: number = -1;
  // public dataFactura: FacturaInterface;
  public dataFactura: any;
  public lstClientes: ClienteInterface[];
  public fecha: string; 
  public habilitarNumDoc: boolean = false;
  public idClientes: number = 0;
  public porcentajeIVA: number = 15;

  public frmForm = new FormGroup({
    Fecha: new FormControl('', Validators.required),
    Sub_total: new FormControl(0.00, Validators.required),
    Sub_total_iva: new FormControl(0.0, Validators.required),
    SubTotal: new FormControl(0.0, Validators.required),
    Valor_IVA: new FormControl(0.0, Validators.required),
    Clientes_idClientes: new FormControl("", Validators.required),
    Total: new FormControl(0, [Validators.required, Validators.min(1)]),
    NumeroDoc: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.idFactura = parseInt(this.route.snapshot.paramMap.get('id'));
    
    if (isNaN(this.idFactura)) {
      this.idFactura = -1;
      this.Title += ' - Nuevo';
      this.frmForm.controls["Fecha"].setValue(moment().format("YYYY-MM-DD"));
      this.frmForm.controls["NumeroDoc"].setValue("Nuevo");
    } else {
      this.Title += ' - Edicion';
      this.loadData();
    }
    this.habilitarNumDoc=true;
    this.loadClientes();
  }

  loadData = () => {
    this.facturaSvc.getUno(this.idFactura).subscribe({
      next: (resp: any) => {
        try {
          resp = JSON.parse(resp);
        } catch (err) {}
        
        if (resp && resp.status == 'ok') {
          if (resp.message){
            this.dataFactura = resp.message;
            this.frmForm.controls["Fecha"].setValue(this.dataFactura.Fecha);
            this.frmForm.controls["Sub_total"].setValue(this.dataFactura.Sub_total);
            this.frmForm.controls["Sub_total_iva"].setValue(this.dataFactura.Sub_total_iva);
            this.frmForm.controls["NumeroDoc"].setValue(this.dataFactura.NumeroDoc);
            this.frmForm.get("Clientes_idClientes").setValue(this.dataFactura.Clientes_idClientes);
            this.totalizar();
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

  loadClientes = ()=>{
    this.clienteSvc.getTodos().subscribe({
      next: (resp: any) => {
        try {
          resp = JSON.parse(resp);
        } catch (err) {}

        if (resp && resp.status == 'ok') {
          this.lstClientes = resp.message;
          if (this.idFactura==-1) this.frmForm.get("Clientes_idClientes")?.setValue(this.lstClientes[0].idClientes.toString());
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

  guardar = () => {
    let dataFactura:any = {
      idFactura: this.idFactura,
      Fecha: moment(this.frmForm.controls["Fecha"].value).format("YYYY-MM-DD"),
      Sub_total: this.frmForm.controls["Sub_total"].value,
      Sub_total_iva: this.frmForm.controls["Sub_total_iva"].value,
      Valor_IVA: this.frmForm.controls["Valor_IVA"].value,
      Clientes_idClientes: this.frmForm.controls["Clientes_idClientes"].value,
    };

    this.facturaSvc.guardar(this.idFactura, dataFactura).subscribe({
      next: (resp: any) => {
        try {
          resp = JSON.parse(resp);
        } catch (err) {}

        // console.log(resp)
        if (resp && resp.status == 'ok') {
          if (resp.message > 0) {
            this.router.navigate(['ventas']);
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
    this.router.navigate(['ventas']);
  };

  totalizar = () =>{
    let Sub_total = parseFloat(this.frmForm.controls["Sub_total"].value.toString());
    let Sub_total_iva = parseFloat(this.frmForm.controls["Sub_total_iva"].value.toString());
    let SubTotal = 0;
    let Valor_IVA = 0;
    let Total = 0;

    SubTotal = Sub_total + Sub_total_iva;
    Valor_IVA = Sub_total_iva * (this.porcentajeIVA/100);
    Total = SubTotal + Valor_IVA;

    let l = SubTotal.toFixed(2);
    this.frmForm.controls["SubTotal"].setValue(SubTotal);
    this.frmForm.controls["Valor_IVA"].setValue(Valor_IVA);
    this.frmForm.controls["Total"].setValue(Total);

  }
}

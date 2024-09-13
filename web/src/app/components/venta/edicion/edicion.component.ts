import { Component, Input, inject, OnInit, SimpleChanges, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
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
import { ProductoService } from './../../../services/producto.service';
import { ProductoInterface } from './../../../interfaces/producto.interface';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ItemFacturaInterface } from './../../../interfaces/item.factura.interface';
import { Modal } from 'bootstrap';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'


@Component({
  selector: 'app-edicion',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, RouterLinkActive, 
    ReactiveFormsModule, DecimalPipe, SharedModule],
  templateUrl: './edicion.component.html',
  styleUrl: './edicion.component.scss'
})
export class EdicionComponent {
  @ViewChild('addProductModal') addProductModal: ElementRef;
  @ViewChild('ClienteModal') ClienteModal: ElementRef;
  @ViewChild('txtCantidad') txtCantidadObj: ElementRef;
  @ViewChild('botonAdd') botonAdd: ElementRef;
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly facturaSvc = inject(FacturaService);
  private readonly clienteSvc = inject(ClienteService);
  private readonly productoSvc = inject(ProductoService);

  public Title: string = 'Factura';
  public idFactura: number = -1;
  public dataFactura: any;
  public lstClientes: ClienteInterface[];
  public lstProductos: ProductoInterface[];
  public lstProdSeleccionados: ProductoInterface[];
  public lstClienteSeleccionado: ClienteInterface[];
  public fecha: string; 
  public habilitarNumDoc: boolean = false;
  public idClientes: number = 0;
  public porcentajeIVA: number = 15;
  public modal:Modal;

  public txtBuscar: string = '';
  public txtBuscarCliente: string = '';
  public txtCodigo: string = '';
  public txtProducto: string = '';
  public txtPVP: number = 0;
  public txtCantidad: number = 0;
  public txtTotal: number = 0;

  public txtCli_Cedula: string ="";
  public txtCli_Nombre: string ="";
  public txtCli_Direccion: string ="";
  public txtCli_Telefono: string ="";
  public txtCli_Correo: string ="";

  public empresa_nombre = "Empresa XYZ";
  public empresa_ruc = "1234567890";
  public empresa_direccion = "Calle Falsa 123, Quito, Ecuador";
  public empresa_telefono = "+593 999 999 999";
  public empresa_correo = " info@empresa.com";


  lstItems:Array<ItemFacturaInterface> = [];

  public frmForm = new FormGroup({
    Fecha: new FormControl('', Validators.required),
    Sub_total: new FormControl(0.00, Validators.required),
    Sub_total_iva: new FormControl(0.0, Validators.required),
    SubTotal: new FormControl(0.0, Validators.required),
    Valor_IVA: new FormControl(0.0, Validators.required),
    Clientes_idClientes: new FormControl("", Validators.required),
    Total: new FormControl(0, [Validators.required, Validators.min(1)]),
    NumeroDoc: new FormControl('', Validators.required),
    txtProdID: new FormControl(0 ),
    txtCodigo: new FormControl(''),
    txtProducto: new FormControl(''),
    txtPVP:new FormControl(0.00),
    txtCantidad:new FormControl(0.00),
    txtTotal:new FormControl(0.00),
    GrabaIVA:new FormControl(0),
    Stock:new FormControl(0),
    buscarCliente:new FormControl(""),
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
    this.loadProductos();

    //MOCk
    // this.lstItems.push({
    //     idProductos: 2,
    //     Codigo: "789456123",
    //     Producto: "Producto A",
    //     Cantidad: 100.0000,
    //     PVP: 80.0000,
    //     Total: 180,
    //     GrabaIVA: 1,
    //     Stock: 1000
    // });
    // this.lstItems.push({
    //     idProductos: 1,
    //     Codigo: "0603124578",
    //     Producto: "Producto B",
    //     Cantidad: 200.0000,
    //     PVP: 150.0000,
    //     Total: 30000,
    //     GrabaIVA: 1,
    //     Stock: 1000
    // });

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

  loadProductos = ()=>{
    this.productoSvc.getTodos().subscribe({
      next: (resp: any) => {
        try {
          resp = JSON.parse(resp);
        } catch (err) {}

        if (resp && resp.status == 'ok') {
          this.lstProductos = resp.message;
          // console.log(this.lstProductos)
          // if (this.idFactura==-1) this.frmForm.get("Clientes_idClientes")?.setValue(this.lstClientes[0].idClientes.toString());
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
      items:[]
    };

    let itm: Array<ItemFacturaInterface> =[];
    this.lstItems.forEach(e=>{
      itm.push({
        idProductos: e.idProductos,
        Codigo: e.Codigo,
        Cantidad: e.Cantidad,
        PVP: e.PVP,
        Total: e.Total
      })
    })

    dataFactura.items = itm;

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

    let Sub_total = 0;
    let Sub_total_iva = 0;

    this.lstItems.forEach( e => {
      if (e.GrabaIVA==0){
        Sub_total += e.Total;
      } else{
        Sub_total_iva += e.Total;
      }
    });

    let SubTotal = 0;
    let Valor_IVA = 0;
    let Total = 0;

    SubTotal = Sub_total + Sub_total_iva;
    Valor_IVA = Sub_total_iva * (this.porcentajeIVA/100);
    Total = SubTotal + Valor_IVA;

    let l = SubTotal.toFixed(2);
    this.frmForm.controls["Sub_total"].setValue(Sub_total);
    this.frmForm.controls["Sub_total_iva"].setValue(Sub_total_iva);
    this.frmForm.controls["SubTotal"].setValue(SubTotal);
    this.frmForm.controls["Valor_IVA"].setValue(Valor_IVA);
    this.frmForm.controls["Total"].setValue(Total);
  }

  totalizarItem = (desdeForm = false) => {
    let cant =  this.frmForm.controls["txtCantidad"].value;
    let pvp =  this.frmForm.controls["txtPVP"].value;
    let totalitem = cant * pvp;
    this.frmForm.controls["txtTotal"].setValue(totalitem);
    if (desdeForm){
      this.botonAdd.nativeElement.focus();
    } 
  }

  
  addItem(){
    let txtProdID =  parseFloat(this.frmForm.controls["txtProdID"].value.toString());
    let oidProductos =  this.frmForm.controls["txtProdID"].value;
    let oCodigo =  this.frmForm.controls["txtCodigo"].value;
    let oProducto =   this.frmForm.controls["txtProducto"].value;
    let oCantidad = this.frmForm.controls["txtCantidad"].value;
    let oPVP = this.frmForm.controls["txtPVP"].value;
    let oTotal = this.frmForm.controls["txtTotal"].value;
    let oGrabaIVA = this.frmForm.controls["GrabaIVA"].value;
    let oStock = parseFloat(this.frmForm.controls["Stock"].value.toString());

    if (oProducto=='' ){
      Swal.fire("Venta", "Debe seleccionar un producto para poder añadir el item", "error");
      return;
    }

    if (oCantidad == 0 || oCantidad === null || oTotal==0){
      Swal.fire("Venta", "La cantidad debe ser mayor a cero", "error");
      return;
    }
    
    if (parseFloat(oCantidad.toString()) > oStock){
      Swal.fire("Venta", "La Cantidad no de sobreparar la de la existencia actual", "error");
      return;
    }

    let found = false;
    this.lstItems.forEach(e=>{
      if (e.idProductos == txtProdID){
        found = true;
        e.Cantidad = this.frmForm.controls["txtCantidad"].value;
        e.PVP = this.frmForm.controls["txtPVP"].value;
        e.Total = this.frmForm.controls["txtTotal"].value;
      }
    })

    if (!found){
      this.lstItems.push({
        idProductos:  this.frmForm.controls["txtProdID"].value,
        Codigo:  this.frmForm.controls["txtCodigo"].value,
        Producto:   this.frmForm.controls["txtProducto"].value,
        Cantidad:  this.frmForm.controls["txtCantidad"].value,
        PVP: this.frmForm.controls["txtPVP"].value,
        Total: this.frmForm.controls["txtTotal"].value,
        GrabaIVA: this.frmForm.controls["GrabaIVA"].value,
        Stock: this.frmForm.controls["Stock"].value,
      })
    }
    // console.log(this.lstItems);

    this.frmForm.controls["txtProdID"].setValue(0);
    this.frmForm.controls["txtCodigo"].setValue("");
    this.frmForm.controls["txtProducto"].setValue("");
    this.frmForm.controls["txtCantidad"].setValue(0);
    this.frmForm.controls["txtPVP"].setValue(0);
    this.frmForm.controls["txtTotal"].setValue(0);
    this.frmForm.controls["GrabaIVA"].setValue(0);

    this.totalizar();
  }

  enterBuscarProducto(keys){
    if (keys.keyCode == 13){
      if (this.frmForm.controls["txtCodigo"].value!=''){
        this.buscarProducto(this.frmForm.controls["txtCodigo"].value);
      }
    }
  }

  buscarProducto(textoBuscar = "", abreModal = true){

    if (textoBuscar == ""){
      textoBuscar = this.frmForm.controls["txtCodigo"].value;
    }

    if (textoBuscar==""){
      return false;
    }

    this.lstProdSeleccionados= [];
    this.lstProductos.forEach(e=>{
      if (
          e.Codigo_Barras.toLowerCase() == textoBuscar.toLowerCase() || 
          e.Nombre_Producto.toLowerCase() == textoBuscar.toLowerCase() ||
          e.Nombre_Producto.toLowerCase().includes(textoBuscar.toLowerCase())
        ){
        this.lstProdSeleccionados.push(e);
      }
    })

    if (this.lstProdSeleccionados.length > 0 ){
      if (this.lstProdSeleccionados.length == 1){
        this.frmForm.controls["txtProdID"].setValue(this.lstProdSeleccionados[0].idProductos);
        this.frmForm.controls["txtCodigo"].setValue(this.lstProdSeleccionados[0].Codigo_Barras);
        this.frmForm.controls["txtProducto"].setValue(this.lstProdSeleccionados[0].Nombre_Producto);
        this.frmForm.controls["txtCantidad"].setValue(0);
        this.frmForm.controls["txtPVP"].setValue(this.lstProdSeleccionados[0].Valor_Venta);
        this.frmForm.controls["txtTotal"].setValue(0);
        this.frmForm.controls["GrabaIVA"].setValue(this.lstProdSeleccionados[0].Graba_IVA);
        this.frmForm.controls["Stock"].setValue(this.lstProdSeleccionados[0].Cantidad);
      } else {
        // Swal.showLoading();
        if (abreModal){
          this.modal = new Modal(this.addProductModal.nativeElement)
          this.modal.show();
        }
      }
    } else { 
      Swal.fire("Productos", "Producto no encontrado", "warning");
    }
    return false;
  }

  editar(idProductos){
    let found=false;
    this.lstItems.forEach(e=>{
      if (e.idProductos == idProductos){
        this.frmForm.controls["txtProdID"].setValue(e.idProductos);
        this.frmForm.controls["txtCodigo"].setValue(e.Codigo);
        this.frmForm.controls["txtProducto"].setValue(e.Producto);
        this.frmForm.controls["txtCantidad"].setValue(e.Cantidad);
        this.frmForm.controls["txtPVP"].setValue(e.PVP);
        this.frmForm.controls["txtTotal"].setValue(e.Total);
        this.frmForm.controls["GrabaIVA"].setValue(e.GrabaIVA);
        this.frmForm.controls["Stock"].setValue(e.Stock);
      }
    })
  }

  eliminar(idProductos){
    this.lstItems.forEach( (e,idx)=>{
      if (e.idProductos == idProductos){
        this.lstItems.splice(idx, 1);
      }
    });

    this.totalizar();
  }

  seleccionarItem(prodID){
    this.lstProductos.forEach(e=>{
      if (e.idProductos == prodID){
        this.frmForm.controls["txtProdID"].setValue(e.idProductos);
        this.frmForm.controls["txtCodigo"].setValue(e.Codigo_Barras);
        this.frmForm.controls["txtProducto"].setValue(e.Nombre_Producto);
        this.frmForm.controls["txtCantidad"].setValue(null);
        this.frmForm.controls["txtPVP"].setValue(e.Valor_Venta);
        this.frmForm.controls["txtTotal"].setValue(0);
        this.frmForm.controls["GrabaIVA"].setValue(e.Graba_IVA);
        this.frmForm.controls["Stock"].setValue(e.Cantidad);
      }
    })
    this.modal.hide(); 
    this.txtCantidadObj.nativeElement.focus();
  }

  enterBuscarCliente(keys){
    if (keys.keyCode == 13){
      if (this.frmForm.controls["buscarCliente"].value!=''){
        this.buscarClientes(this.frmForm.controls["buscarCliente"].value);
      }
    }
  }

  buscarClientes(textoBuscar = "", abreModal = true){
    if (textoBuscar == "" && abreModal){
      textoBuscar = this.frmForm.controls["buscarCliente"].value;
    }

    if (textoBuscar=="" && abreModal){
      return false;
    }

    this.lstClienteSeleccionado= [];
    this.lstClientes.forEach(e=>{
      if (textoBuscar=="" && !abreModal){
        this.lstClienteSeleccionado.push(e);
      } else if (
          e.Cedula.toLowerCase().includes(textoBuscar.toLowerCase()) ||
          e.Correo.toLowerCase().includes(textoBuscar.toLowerCase()) ||
          e.Direccion.toLowerCase().includes(textoBuscar.toLowerCase()) ||
          e.Nombres.toLowerCase().includes(textoBuscar.toLowerCase())
        ){
        this.lstClienteSeleccionado.push(e);
      }
    })

    if (this.lstClienteSeleccionado.length > 0 ){
      if (this.lstClienteSeleccionado.length == 1){
        this.txtCli_Cedula = this.lstClienteSeleccionado[0].Cedula;
        this.txtCli_Correo = this.lstClienteSeleccionado[0].Correo;
        this.txtCli_Direccion = this.lstClienteSeleccionado[0].Direccion;
        this.txtCli_Nombre = this.lstClienteSeleccionado[0].Nombres;
        this.txtCli_Telefono = this.lstClienteSeleccionado[0].Telefono;
        this.frmForm.controls["Clientes_idClientes"].setValue(this.lstClienteSeleccionado[0].idClientes.toString());
        this.frmForm.controls["buscarCliente"].setValue(this.txtCli_Cedula);
      } else {
        // Swal.showLoading();
        if (abreModal){
          this.modal = new Modal(this.ClienteModal.nativeElement)
          this.modal.show();
        }
      }
    } else { 
      Swal.fire("Clientes", "Cliente no encontrado", "warning");
    }
    return false;
  }


  seleccionarItemCliente(ClieID){
    this.lstClientes.forEach(e=>{
      if (e.idClientes == ClieID){
        this.txtCli_Cedula = e.Cedula;
        this.txtCli_Correo = e.Correo;
        this.txtCli_Direccion = e.Direccion;
        this.txtCli_Nombre = e.Nombres;
        this.txtCli_Telefono = e.Telefono;
        this.frmForm.controls["Clientes_idClientes"].setValue(e.idClientes.toString());
        this.frmForm.controls["buscarCliente"].setValue(this.txtCli_Cedula);
      }
    })
    this.modal.hide(); 
    this.txtBuscarCliente="";
  }

  async print(){

    var doc = new jsPDF({
      orientation: "p",
      format: 'A4',
      unit: 'mm'
    })

    /** CABECERA */
    // const imgData = await loadImage('/assets/images/logo.jpg');
    // doc.addImage(imgData, 'JPEG', 10, 10, 40, 30);
    // doc.fromHTML("", 0, 0);


    let xpos = 15;
    let ypos = 20;

    let numdoc = "003-001-0000001";
   
    // doc.setFontSize(18);
    // doc.text("Factura Número: " + "003-001-0000011", xpos, ypos);
    // ypos += 10;
    // doc.setFontSize(14);
    // doc.text(this.empresa_nombre, xpos, ypos);
    // doc.setFontSize(10);
    // ypos += 5;
    // doc.text("RUC: " + this.empresa_ruc, xpos, ypos);
    // ypos += 5;
    // doc.text("Dirección: " + this.empresa_direccion, xpos, ypos);
    // ypos += 5;
    // doc.text("Telefono: " + this.empresa_telefono, xpos, ypos);
    // ypos += 5;
    // doc.text("Correo: " + this.empresa_correo, xpos, ypos);
    
    // //Datos Cliente
    // xpos = 120;
    // ypos += 10;
    // doc.text("Razon Social: " + this.txtCli_Nombre, xpos, ypos);
    // ypos += 5;
    // doc.text("Identificación: " + this.txtCli_Cedula, xpos, ypos);
    // ypos += 5;
    // doc.text("Direccion: " + this.txtCli_Direccion, xpos, ypos);
    // ypos += 5;
    // doc.text("Telefono: " + this.txtCli_Telefono, xpos, ypos);
    // ypos += 5;
    // doc.text("Correo: " + this.txtCli_Correo, xpos, ypos);
    // ypos += 5;
    // doc.text("Fecha: " + moment(this.frmForm.controls["Fecha"].value).format("YYYY-MM-DD"), xpos, ypos);
    autoTable(doc, {
      body: [
        [
          {
            content: 'NO TIENE LOGO',
            styles: {
              halign: 'left',
              fontSize: 20,
              textColor: '#FF0000'
            }
          },
          {
            content: `R.U.C: ${ this.empresa_ruc}`,
            styles: {
              halign: 'left',
              fontSize: 15,
            }
          }
        ],
        [
          {
            content: '',
            styles: {
              halign: 'left',
              fontSize: 10,
              textColor: '#FF0000'
            }
          },
          {
            content: `FACTURA`,
            styles: {
              halign: 'left',
              fontSize: 12,
              
            }
          }
        ],
        [
          {
            content: `\n\n\n\n\n\n${this.empresa_nombre}`
            + `\n${this.empresa_ruc}`
            + `\n${this.empresa_direccion}`
            + `\n${this.empresa_telefono}`
            + `\n${this.empresa_correo}`
            + `\n\nOBLIGADO A LLEVAR CONTABILIDAD: NO`,
            styles: {
              halign: 'left'
            }
          },
          {
            content: `No. ${numdoc}`
            + `\n\nNÚMERO DE AUTORIZACIÓN`
            + `\n3008202401060236277400120010010000018591234567811`
            + `\n\nFECHA Y HORA DE AUTORIZACIÓN:    ${moment(this.frmForm.controls["Fecha"].value).format("YYYY-MM-DD HH:mm:ss")}`
            + `\n\nAMBIENTE: PRUEBAS`
            + `\n\nEMISION: NORMAL `
            + `\n\nClave de Acceso`
            + `\n3008202401060236277400120010010000018591234567811`,
            styles: {
              halign: 'left'
            }
          }
        ],
      ],
      theme: 'plain',
    });


    autoTable(doc, {
      body: [
        [
          {
            content: `Razón Social / Nombres y Apellidos: ${this.txtCli_Nombre}`
            + `\nIdentificación: ${this.txtCli_Cedula}`
            + `\nFecha:  ${moment(this.frmForm.controls["Fecha"].value).format("YYYY-MM-DD HH:mm:ss")}            Placa / Matricula:                       Guia:`
            + `\nDirección: ${this.txtCli_Direccion}`
            // + `\nDirección: ${this.txtCli_Direccion}`
            // + `\nTeléfono: ${this.txtCli_Telefono}`
            // + `\nCorreo: ${this.txtCli_Correo}`
            ,
            styles: {
              halign: 'left'
            }
          }
        ],
      ],
      theme: 'plain',
    });

    
    let itm: Array<ItemFacturaInterface> =[];
    this.lstItems.forEach(e=>{
      itm.push({
        idProductos: e.idProductos,
        Codigo: e.Codigo,
        Cantidad: e.Cantidad,
        PVP: e.PVP,
        Total: e.Total
      })
    })

    let records = this.transformarDatosPDF(itm);
    // ypos += 50;
    // ypos += 10;

    autoTable(doc, {
        // startY: ypos,  
        head: [records[0]],
        body: records.slice(1),
        theme: 'striped',
        headStyles:{
          fillColor: '#dadada',
          textColor: '#000'
        },
        styles:{
          textColor: '#000'
        }
    });

    // ypos += (records.length * 5) + 10;

    autoTable(doc, {
      // startY: ypos,  
      body: [
        [
          {content: 'Subtotal IVA 0%',styles:{halign:'right'}},
          {content: this.frmForm.controls["Sub_total"].value.toFixed(2),styles:{halign:'right'}},
        ],
        [
          {content: 'Subtotal IVA ' + this.porcentajeIVA + "%",styles:{halign:'right'}},
          {content: this.frmForm.controls["Sub_total_iva"].value.toFixed(2),styles:{halign:'right'}},
        ],
        [
          {content: 'Subtotal General',styles:{halign:'right'}},
          {content: this.frmForm.controls["SubTotal"].value.toFixed(2),styles:{halign:'right'}},
        ],
        [
          {content: 'IVA' + this.porcentajeIVA + "%",styles:{halign:'right'}},
          {content: this.frmForm.controls["Valor_IVA"].value.toFixed(2),styles:{halign:'right'}},
        ],
        [
          {content: 'Importe Total',styles:{halign:'right'}},
          {content: this.frmForm.controls["Total"].value.toFixed(2),styles:{halign:'right'}},
        ],
      ],
      theme: 'plain'
    });


    autoTable(doc, {
      body: [
        [
          {
            content: 'Información Adicional',
            styles: {
              halign: 'left',
              textColor: '#000'
            }
          },
        ],
      ]
    });

    autoTable(doc, {
      body: [
        [
          {
            content: `Direccion Cliente:`
            + `\nTeléfono Cliente: `
            + `\nCorreo Cliente: `
            + `\nForma de Pago: `
            ,
            styles: {
              halign: 'left',
              textColor: '#000'
            }
          },
          {
            content: `${this.txtCli_Direccion}`
            + `\n${this.txtCli_Telefono}`
            + `\n${this.txtCli_Correo}`
            + `\nSIN UTILIZACION DEL SISTEMA FINANCIERO`
            ,
            styles: {
              halign: 'left',
              textColor: '#000'
            }
          },
        ],
      ],
      theme: 'plain'
    })
    
    

    
    // ypos += 5;
    // doc.text("Subtotal", xpos, ypos);


    doc.save("factura.pdf");

    

  }

  transformarDatosPDF(array = []){

    const data = [];
    let cabecera = Object.keys(array[0]);
    data.push(cabecera);

    let temp = [];
    for (var i = 0; i < array.length; i++) {
        temp = [];
        for (var index in array[i]) {
            temp.push(array[i][index] == null ? '' : array[i][index]);
        }
        data.push(temp)
    }
    return data;
}
  

}


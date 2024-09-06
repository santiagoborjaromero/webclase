import { Component, Input, inject, OnInit, SimpleChanges } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLinkActive, RouterOutlet } from '@angular/router';
import { verificarCedula } from 'udv-ec';
import { ClienteInterface } from '../../../interfaces/cliente.interface';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2';
import { UnidadmedidaService } from 'src/app/services/unidadmedida.service';
import { UnidadmedidaInterface } from 'src/app/interfaces/unidadmedida.interface';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-edicion',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, RouterLinkActive, ReactiveFormsModule, SharedModule],
  templateUrl: './edicion.component.html',
  styleUrl: './edicion.component.scss'
})
export class EdicionComponent {
   /*
    0 = Presentacion Ej: Caja, Unidad, Docena, Sixpack
    1 = Unidad de Medida Ej: Gramos, Litros, Kilos
    2 = Factor de Conversion Ej: Kilos a libras
  */


  private readonly router = inject(Router);
  private readonly umedidaSvc = inject(UnidadmedidaService);
  private readonly route = inject(ActivatedRoute);
  // private readonly parent = inject(FormGroupDirective);

  public Title: string = 'Unidad de Medida';
  public idUnidad_Medida: number = -1;
  public dataUnidadMedida: UnidadmedidaInterface;
  public lstTipo = [
    {idtipo: "0", nombre: "Presentacion"},
    {idtipo: "1", nombre: "Unidad de Medida"},
    {idtipo: "2", nombre: "Factor de Conversion"},
  ];

  frmForm = new FormGroup({
    Detalle: new FormControl('', [Validators.required]),
    Tipo: new FormControl(0, Validators.required),
  });

  ngOnInit(): void {
    this.idUnidad_Medida = parseInt(this.route.snapshot.paramMap.get('id'));
    if (isNaN(this.idUnidad_Medida)) {
      this.idUnidad_Medida = -1;
      this.Title += '- Nuevo';
    } else {
      this.Title += '- Edicion';
      this.loadData();
    }
  }

  loadData = () => {
    this.umedidaSvc.getUno(this.idUnidad_Medida).subscribe({
      next: (resp: any) => {
        try {
          resp = JSON.parse(resp);
        } catch (err) {}

        if (resp && resp.status == 'ok') {
          this.dataUnidadMedida = resp.message;
          this.frmForm.patchValue({
            Detalle: this.dataUnidadMedida.Detalle,
            Tipo: this.dataUnidadMedida.Tipo,
          });
        }else{
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
    let dataUnidadMedida: UnidadmedidaInterface = {
      idUnidad_Medida: this.idUnidad_Medida,
      Detalle: this.frmForm.controls['Detalle'].value,
      Tipo: this.frmForm.controls['Tipo'].value,
    };

    this.umedidaSvc.guardar(this.idUnidad_Medida, dataUnidadMedida).subscribe({
      next: (resp: any) => {
        try {
          resp = JSON.parse(resp);
        } catch (err) {}

        // console.log(resp)

        if (resp && resp.status == 'ok') {
          if (resp.message > 0) {
            this.router.navigate(['umedidas']);
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
    this.router.navigate(['umedidas']);
  };
}

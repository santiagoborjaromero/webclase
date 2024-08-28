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

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})
export class EditorComponent {
  private readonly router = inject(Router);
  private readonly clienteSvc = inject(ClienteService);
  private readonly route = inject(ActivatedRoute);
  // private readonly parent = inject(FormGroupDirective);

  public Title: string = 'Clientes';
  public idClientes: number = -1;
  public dataCliente: ClienteInterface;

  frmForm = new FormGroup({
    Cedula: new FormControl('', [Validators.required, this.validadorCedulaEcuador]),
    Nombres: new FormControl('', Validators.required),
    Direccion: new FormControl('', Validators.required),
    Telefono: new FormControl('', Validators.required),
    Correo: new FormControl('', [Validators.email, Validators.required])
  });

  ngOnInit(): void {
    this.idClientes = parseInt(this.route.snapshot.paramMap.get('id'));
    if (isNaN(this.idClientes)) {
      this.idClientes = -1;
      this.Title += '- Nuevo';
    } else {
      this.Title += '- Edicion';
      this.loadData();
    }
  }

  loadData = () => {
    this.clienteSvc.getUno(this.idClientes).subscribe({
      next: (resp: any) => {
        try {
          resp = JSON.parse(resp);
        } catch (err) {}

        if (resp && resp.status == 'ok') {
          this.dataCliente = resp.message;
          this.frmForm.patchValue({
            Cedula: this.dataCliente.Cedula,
            Nombres: this.dataCliente.Nombres,
            Direccion: this.dataCliente.Direccion,
            Telefono: this.dataCliente.Telefono,
            Correo: this.dataCliente.Correo
          });

          /** Otra Froma */
          // this.frmForm.setValue({
          //   Cedula: this.dataCliente.Cedula,
          //   Nombres: this.dataCliente.Nombres,
          //   Direccion: this.dataCliente.Direccion,
          //   Telefono: this.dataCliente.Telefono,
          //   Correo: this.dataCliente.Correo
          // });

          /**Otra forma */
          // this.frmForm.controls["Cedula"].setValue(this.dataCliente.Cedula);
          // this.frmForm.controls["Nombres"].setValue(this.dataCliente.Nombres);
          // this.frmForm.controls["Direccion"].setValue(this.dataCliente.Direccion);
          // this.frmForm.controls["Telefono"].setValue(this.dataCliente.Telefono);
          // this.frmForm.controls["Correo"].setValue(this.dataCliente.Correo);
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
    let dataCliente: ClienteInterface = {
      idClientes: this.idClientes,
      Nombres: this.frmForm.controls['Nombres'].value,
      Direccion: this.frmForm.controls['Direccion'].value,
      Telefono: this.frmForm.controls['Telefono'].value,
      Cedula: this.frmForm.controls['Cedula'].value,
      Correo: this.frmForm.controls['Correo'].value
    };

    this.clienteSvc.guardar(this.idClientes, dataCliente).subscribe({
      next: (resp: any) => {
        try {
          resp = JSON.parse(resp);
        } catch (err) {}

        // console.log(resp)

        if (resp && resp.status == 'ok') {
          if (resp.message > 0) {
            this.router.navigate(['clientes']);
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

  validadorCedulaEcuadorRC(control: AbstractControl): ValidationErrors | null {
    let cedula = control.value;
    let valida = verificarCedula(cedula);
    return { cedulaInvalida: !valida };
  }

  validadorCedulaEcuador(control: AbstractControl): ValidationErrors | null {
    const cedula = control.value;
    if (!cedula) return null;
    if (cedula.length !== 10) return { cedulaInvalida: true };
    const provincia = parseInt(cedula.substring(0, 2), 10);
    if (provincia < 1 || provincia > 24) return { provincia: true };
    const tercerDigito = parseInt(cedula.substring(2, 3), 10);
    if (tercerDigito < 0 || tercerDigito > 5) return { cedulaInvalida: true };
    const digitoVerificador = parseInt(cedula.substring(9, 10), 10);
    const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    let suma = 0;
    for (let i = 0; i < coeficientes.length; i++) {
      const valor = parseInt(cedula.substring(i, i + 1), 10) * coeficientes[i];
      suma += valor > 9 ? valor - 9 : valor;
    }
    const resultado = suma % 10 === 0 ? 0 : 10 - (suma % 10);
    if (resultado !== digitoVerificador) return { cedulaInvalida: true };
    return null;
  }

  cancelar = () => {
    this.router.navigate(['clientes']);
  };
}

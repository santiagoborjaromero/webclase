import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UnidadmedidaInterface } from 'src/app/interfaces/unidadmedida.interface';
import { UnidadmedidaService } from 'src/app/services/unidadmedida.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-unidadmedida',
  standalone: true,
  imports: [ReactiveFormsModule, SharedModule],
  templateUrl: './unidadmedida.component.html',
  styleUrl: './unidadmedida.component.scss'
})
export class UnidadmedidaComponent {
  //TODO: UNIDAD DE MEDIDA
  /*
    0 = Presentacion Ej: Caja, Unidad, Docena, Sixpack
    1 = Unidad de Medida Ej: Gramos, Litros, Kilos
    2 = Factor de Conversion Ej: Kilos a libras
  */

  protected readonly facturaSvc = inject(UnidadmedidaService);
  private readonly router = inject(Router);

  public lstUMedida: Array<UnidadmedidaInterface> = [];
  public recentOrder: any = [];
  public Title: string = 'Unidad de Medida';

  constructor() // private facturaSvc: ClienteService
  {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.lstUMedida = [];
    this.facturaSvc.getTodos().subscribe({
      next: (resp: any) => {
        try {
          resp = JSON.parse(resp);
        } catch (err) {}

        // console.log(resp)

        if (resp && resp.status == 'ok') {
          if (resp.message.length > 0) {
            this.lstUMedida = resp.message;
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

  nuevo = () => {
    this.router.navigate(['umedida/nuevo']);
  };

  editar = (idClientes: number) => {
    this.router.navigate(['umedida/edicion/' + idClientes]);
  };

  eliminar = (idClientes: number) => {
    Swal.fire({
      title: 'Esta seguro de eliminar el registro?',
      text: 'Una vez eliminado no se podra recuperar!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.facturaSvc.eliminar(idClientes).subscribe({
          next: (resp: any) => {
            if (resp && resp.status == 'ok') {
              this.loadData();
              Swal.fire({
                title: this.Title,
                text: `La unidad ha sido eliminado con éxito`,
                icon: 'success'
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
      }
    });
  };
}

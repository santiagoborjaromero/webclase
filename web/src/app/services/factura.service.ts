import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { FacturaInterface } from '../interfaces/factura.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  private readonly http = inject(HttpClient);
  private readonly controller = "factura"

  apiurl:string=`http://localhost/uniandes/03mvc/api/controllers/${this.controller}.controller.php?op=`;

  getTodos(): Observable<FacturaInterface[]> {
    return this.http.get<FacturaInterface[]>(this.apiurl + "todos");
  }

  getUno(idFactura: number): Observable<FacturaInterface[]> {
    return this.http.get<FacturaInterface[]>(this.apiurl + "uno&idFactura="+idFactura);
  }

  guardar(idFactura: number, data: FacturaInterface): Observable<any> {
    if (idFactura==-1){
      return this.http.post<any>(this.apiurl + "insertar", data);
    } else {
      return this.http.put<any>(this.apiurl + "actualizar&idFactura=" + idFactura, data);
    }
  }

  eliminar(idFactura: number): Observable<any> {
    return this.http.delete<any>(this.apiurl + "eliminar&idFactura=" + idFactura);
  }

}

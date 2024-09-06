import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IvaInterface } from '../interfaces/iva.interface';

@Injectable({
  providedIn: 'root'
})
export class IvaService {
  private readonly http = inject(HttpClient);
  private readonly controller = "iva"

  apiurl:string=`http://localhost/uniandes/03mvc/api/controllers/${this.controller}.controller.php?op=`;

  getTodos(): Observable<IvaInterface[]> {
    return this.http.get<IvaInterface[]>(this.apiurl + "todos");
  }

  getUno(idIVA: number): Observable<IvaInterface[]> {
    return this.http.get<IvaInterface[]>(this.apiurl + "uno&idIVA="+idIVA);
  }

  guardar(idIVA: number, data: IvaInterface): Observable<any> {
    if (idIVA==-1){
      return this.http.post<any>(this.apiurl + "insertar", data);
    } else {
      return this.http.put<any>(this.apiurl + "actualizar&idIVA=" + idIVA, data);
    }
  }

  eliminar(idIVA: number): Observable<any> {
    return this.http.delete<any>(this.apiurl + "eliminar&idIVA=" + idIVA);
  }

}

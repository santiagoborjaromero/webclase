import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UnidadmedidaInterface } from '../interfaces/unidadmedida.interface';
@Injectable({
  providedIn: 'root'
})
export class UnidadmedidaService {
  private readonly http = inject(HttpClient);
  private readonly controller = "unidadmedida";

  apiurl:string=`http://localhost/uniandes/03mvc/api/controllers/${this.controller}.controller.php?op=`;

  getTodos(): Observable<UnidadmedidaInterface[]> {
    return this.http.get<UnidadmedidaInterface[]>(this.apiurl + "todos");
  }

  getUno(idUnidad_Medida: number): Observable<UnidadmedidaInterface[]> {
    return this.http.get<UnidadmedidaInterface[]>(this.apiurl + "uno&idUnidad_Medida="+idUnidad_Medida);
  }

  guardar(idUnidad_Medida: number, data: UnidadmedidaInterface): Observable<any> {
    if (idUnidad_Medida==-1){
      return this.http.post<any>(this.apiurl + "insertar", data);
    } else {
      return this.http.put<any>(this.apiurl + "actualizar&idUnidad_Medida=" + idUnidad_Medida, data);
    }
  }

  eliminar(idUnidad_Medida: number): Observable<any> {
    return this.http.delete<any>(this.apiurl + "eliminar&idUnidad_Medida=" + idUnidad_Medida);
  }

}

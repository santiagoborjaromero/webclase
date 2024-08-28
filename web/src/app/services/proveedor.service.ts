import { ProveedorInterface } from '../interfaces/proveedor.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProveedorService {
  private readonly http = inject(HttpClient);
  private readonly controller = "proveedores"

  apiurl:string=`http://localhost/uniandes/03mvc/api/controllers/${this.controller}.controller.php?op=`;

  getTodos(): Observable<ProveedorInterface[]> {
    return this.http.get<ProveedorInterface[]>(this.apiurl + "todos");
  }

  getUno(idProveedores: number): Observable<ProveedorInterface[]> {
    return this.http.get<ProveedorInterface[]>(this.apiurl + "uno&idProveedores="+idProveedores);
  }

  guardar(idProveedores: number, data: ProveedorInterface): Observable<any> {
    if (idProveedores==-1){
      return this.http.post<any>(this.apiurl + "insertar", data);
    } else {
      return this.http.put<any>(this.apiurl + "actualizar&idProveedores=" + idProveedores, data);
    }
  }

  eliminar(idProveedores: number): Observable<any> {
    return this.http.delete<any>(this.apiurl + "eliminar&idProveedores=" + idProveedores);
  }

}

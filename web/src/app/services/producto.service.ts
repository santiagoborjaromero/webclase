import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ProductoInterface } from '../interfaces/producto.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private readonly http = inject(HttpClient);
  private readonly controller = "producto"

  apiurl:string=`http://localhost/uniandes/03mvc/api/controllers/${this.controller}.controller.php?op=`;

  getTodos(): Observable<ProductoInterface[]> {
    return this.http.get<ProductoInterface[]>(this.apiurl + "todos");
  }

  getUno(idProductos: number): Observable<ProductoInterface[]> {
    return this.http.get<ProductoInterface[]>(this.apiurl + "uno&idProductos="+idProductos);
  }

  guardar(idProductos: number, data: ProductoInterface): Observable<any> {
    if (idProductos==-1){
      return this.http.post<any>(this.apiurl + "insertar", data);
    } else {
      return this.http.put<any>(this.apiurl + "actualizar&idProductos=" + idProductos, data);
    }
  }

  eliminar(idProductos: number): Observable<any> {
    return this.http.delete<any>(this.apiurl + "eliminar&idProductos=" + idProductos);
  }

}

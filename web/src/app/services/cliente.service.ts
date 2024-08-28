import { ClienteInterface } from '../interfaces/cliente.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private readonly http = inject(HttpClient);
  private readonly controller = "clientes"

  apiurl:string=`http://localhost/uniandes/03mvc/api/controllers/${this.controller}.controller.php?op=`;

  getTodos(): Observable<ClienteInterface[]> {
    return this.http.get<ClienteInterface[]>(this.apiurl + "todos");
  }

  getUno(idClientes: number): Observable<ClienteInterface[]> {
    return this.http.get<ClienteInterface[]>(this.apiurl + "uno&idClientes="+idClientes);
  }

  guardar(idClientes: number, data: ClienteInterface): Observable<any> {
    if (idClientes==-1){
      return this.http.post<any>(this.apiurl + "insertar", data);
    } else {
      return this.http.put<any>(this.apiurl + "actualizar&idClientes=" + idClientes, data);
    }
  }

  eliminar(idClientes: number): Observable<any> {
    return this.http.delete<any>(this.apiurl + "eliminar&idClientes=" + idClientes);
  }

}

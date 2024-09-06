import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginInterface } from '../interfaces/login.interface';
import { UsuariosInterface } from '../interfaces/usuarios.interface';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { General } from '../functions/general.functions';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly generalFn= inject(General);
  private readonly controller = "usuarios"
  private loggedIn = new BehaviorSubject<boolean>(false);

  apiurl:string=`http://localhost/uniandes/03mvc/api/controllers/${this.controller}.controller.php?op=`;


  constructor(){
  }

  getTodos(): Observable<UsuariosInterface[]> {
    return this.http.get<UsuariosInterface[]>(this.apiurl + "todos");
  }

  getUno(idUsuarios: number): Observable<UsuariosInterface[]> {
    return this.http.get<UsuariosInterface[]>(this.apiurl + "uno&idUsuarios="+idUsuarios);
  }

  guardar(idUsuarios: number, data: UsuariosInterface): Observable<any> {
    if (idUsuarios==-1){
      return this.http.post<any>(this.apiurl + "insertar", data);
    } else {
      return this.http.put<any>(this.apiurl + "actualizar&idUsuarios=" + idUsuarios, data);
    }
  }

  eliminar(idUsuarios: number): Observable<any> {
    return this.http.delete<any>(this.apiurl + "eliminar&idUsuarios=" + idUsuarios);
  }

  login(data: LoginInterface){
     this.http.post<any>(this.apiurl + "login", data).subscribe({
      next: (resp: any) => {
        // console.log(resp)
        if (resp){
          if ( resp.status == "ok"){
            if (resp.message){
              sessionStorage.setItem("loggedIn", this.generalFn.encriptar(true));
              sessionStorage.setItem("usuario", this.generalFn.encriptar(JSON.stringify(resp.message)));
              this.generalFn.toast("Usuario registrado correctamente")
              this.router.navigate(["/dashboard/default"]);
            } else{
              Swal.fire("Autenticacion", "Respuesta en blanco", "error");
            }
          } else {
            Swal.fire("Autenticacion", resp.message, "error");
          }
        } else {
          Swal.fire("Autenticacion", "Falla en la ruta", "error");
        }
      },
      error(err) {
      }
    });
  }

  logout(){
    sessionStorage.clear();
    localStorage.clear()
    this.router.navigate(["/login"])
  }

  isLoggedIn(){
    // return this.loggedIn.asObservable();
    let sess = sessionStorage.getItem("loggedIn");
    if (sess){
      return this.generalFn.desencriptar(sessionStorage.getItem("loggedIn"));
    }
    return "false"
  }

  checkLoginStatus(){
    let usuario = JSON.parse(this.generalFn.desencriptar(sessionStorage.getItem("usuario")));
    if (usuario){
      this.loggedIn.next(true);
    }
  }

}

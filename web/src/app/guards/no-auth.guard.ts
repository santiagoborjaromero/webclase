
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class noAuthGuard{
  private readonly router = inject(Router);
  private readonly usuariosSvc = inject(UsuariosService);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let statusLogged = this.usuariosSvc.isLoggedIn();
      // console.log("noAuth", statusLogged)
      if (statusLogged == "false" || statusLogged===undefined || statusLogged===null) {
        return true;
      }
      this.router.navigate(['/dashboard/default']);
      return false;
  }
}
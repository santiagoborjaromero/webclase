// angular import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Project import
import { AdminComponent } from './theme/layouts/admin-layout/admin-layout.component';
import { GuestComponent } from './theme/layouts/guest/guest.component';
import { AuthGuard } from './guards/auth.guard';
import { noAuthGuard } from './guards/no-auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard/default',
        loadComponent: () => import('./demo/default/dashboard/dashboard.component').then((c) => c.DefaultComponent),
        canActivate: [AuthGuard]
      },
      {
        path: 'typography',
        loadComponent: () => import('./demo/ui-component/typography/typography.component')
      },
      {
        path: 'color',
        loadComponent: () => import('./demo/ui-component/ui-color/ui-color.component')
      },
      {
        path: 'sample-page',
        loadComponent: () => import('./demo/other/sample-page/sample-page.component')
      },
      {
        path: 'proveedores',
        loadComponent: () => import('./components/proveedores/proveedores.component').then((c)=>c.ProveedoresComponent),
        canActivate: [AuthGuard]
      },
      {
        path: 'proveedor/nuevo',
        loadComponent: () => import('./components/proveedores/edicion/edicion.component').then((c)=>c.EdicionComponent),
        canActivate: [AuthGuard]
      },
      {
        path: 'proveedor/edicion/:id',
        loadComponent: () => import('./components/proveedores/edicion/edicion.component').then((c)=>c.EdicionComponent),
        canActivate: [AuthGuard]
      },
      {
        path: 'clientes',
        loadComponent: () => import('./components/clientes/clientes.component').then((c)=>c.ClientesComponent),
        canActivate: [AuthGuard]
      },
      {
        path: 'cliente/nuevo',
        // loadComponent: () => import('./components/clientes/edicion/edicion.component').then((c)=>c.EdicionComponent)
        loadComponent: () => import('./components/clientes/editor/editor.component').then((c)=>c.EditorComponent),
        canActivate: [AuthGuard]

      },
      {
        path: 'cliente/edicion/:id',
        loadComponent: () => import('./components/clientes/editor/editor.component').then((c)=>c.EditorComponent),
        canActivate: [AuthGuard]
      },


      {
        path: 'ventas',
        loadComponent: () => import('./components/venta/venta.component').then((c)=>c.VentaComponent),
        canActivate: [AuthGuard]
      },
      {
        path: 'venta/nuevo',
        loadComponent: () => import('./components/venta/edicion/edicion.component').then((c)=>c.EdicionComponent),
        canActivate: [AuthGuard]

      },
      {
        path: 'venta/edicion/:id',
        loadComponent: () => import('./components/venta/edicion/edicion.component').then((c)=>c.EdicionComponent),
        canActivate: [AuthGuard]
      },
      {
        path: 'umedidas',
        loadComponent: () => import('./components/unidadmedida/unidadmedida.component').then((c)=>c.UnidadmedidaComponent),
        canActivate: [AuthGuard]
      },
      {
        path: 'umedida/nuevo',
        loadComponent: () => import('./components/unidadmedida/edicion/edicion.component').then((c)=>c.EdicionComponent),
        canActivate: [AuthGuard]

      },
      {
        path: 'umedida/edicion/:id',
        loadComponent: () => import('./components/unidadmedida/edicion/edicion.component').then((c)=>c.EdicionComponent),
        canActivate: [AuthGuard]
      },
      {
        path: 'productos',
        loadComponent: () => import('./components/productos/productos.component').then((c)=>c.ProductosComponent),
        canActivate: [AuthGuard]
      },
      {
        path: 'producto/nuevo',
        loadComponent: () => import('./components/productos/edicion/edicion.component').then((c)=>c.EdicionComponent),
        canActivate: [AuthGuard]

      },
      {
        path: 'producto/edicion/:id',
        loadComponent: () => import('./components/productos/edicion/edicion.component').then((c)=>c.EdicionComponent),
        canActivate: [AuthGuard]
      },
      {
        path: '',
        redirectTo: '/dashboard/default',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: '',
    component: GuestComponent,
    canActivate: [noAuthGuard],
    children: [
      {
        path: 'login',
        loadComponent: () => import('./demo/authentication/login/login.component'),
        canActivate: [noAuthGuard]
      },
      {
        path: 'register',
        loadComponent: () => import('./demo/authentication/register/register.component'),
        canActivate: [noAuthGuard]
      },
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

// angular import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Project import
import { AdminComponent } from './theme/layouts/admin-layout/admin-layout.component';
import { GuestComponent } from './theme/layouts/guest/guest.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard/default',
        pathMatch: 'full'
      },
      {
        path: 'dashboard/default',
        loadComponent: () => import('./demo/default/dashboard/dashboard.component').then((c) => c.DefaultComponent)
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
        loadComponent: () => import('./components/proveedores/proveedores.component').then((c)=>c.ProveedoresComponent)
      },
      {
        path: 'proveedor/nuevo',
        loadComponent: () => import('./components/proveedores/edicion/edicion.component').then((c)=>c.EdicionComponent)
      },
      {
        path: 'proveedor/edicion/:id',
        loadComponent: () => import('./components/proveedores/edicion/edicion.component').then((c)=>c.EdicionComponent)
      },
      {
        path: 'clientes',
        loadComponent: () => import('./components/clientes/clientes.component').then((c)=>c.ClientesComponent)
      },
      {
        path: 'cliente/nuevo',
        // loadComponent: () => import('./components/clientes/edicion/edicion.component').then((c)=>c.EdicionComponent)
        loadComponent: () => import('./components/clientes/editor/editor.component').then((c)=>c.EditorComponent)

      },
      {
        path: 'cliente/edicion/:id',
        loadComponent: () => import('./components/clientes/editor/editor.component').then((c)=>c.EditorComponent)
      },


      {
        path: 'ventas',
        loadComponent: () => import('./components/venta/venta.component').then((c)=>c.VentaComponent)
      },
      {
        path: 'venta/nuevo',
        loadComponent: () => import('./components/venta/edicion/edicion.component').then((c)=>c.EdicionComponent)

      },
      {
        path: 'venta/edicion/:id',
        loadComponent: () => import('./components/venta/edicion/edicion.component').then((c)=>c.EdicionComponent)
      }
    ]
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./demo/authentication/login/login.component')
      },
      {
        path: 'register',
        loadComponent: () => import('./demo/authentication/register/register.component')
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

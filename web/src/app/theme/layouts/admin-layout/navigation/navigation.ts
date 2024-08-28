export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  groupClasses?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: NavigationItem[];
  link?: string;
  description?: string;
  path?: string;
}

export const NavigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'default',
        title: 'Dashboard',
        type: 'item',
        classes: 'nav-item',
        url: '/dashboard/default',
        icon: 'dashboard',
        breadcrumbs: false
      }
    ]
  },
  {
    id: 'fac',
    title: 'Facturación',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      // {
      //   id: 'compra',
      //   title: 'Compra',
      //   type: 'item',
      //   classes: 'nav-item',
      //   url: '/compra',
      //   icon: 'login',
      //   target: false,
      //   breadcrumbs: false
      // },
      {
        id: 'venta',
        title: 'Ventas',
        type: 'item',
        classes: 'nav-item',
        url: '/ventas',
        icon: 'login',
        target: false,
        breadcrumbs: false
      },
      
    ]
  },
  {
    id: 'admin',
    title: 'Administración',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'proveedores',
        title: 'Proveedores',
        type: 'item',
        classes: 'nav-item',
        url: '/proveedores',
        icon: 'login',
        target: false,
        breadcrumbs: false
      },
      // {
      //   id: 'productos',
      //   title: 'Productos',
      //   type: 'item',
      //   classes: 'nav-item',
      //   url: '/productos',
      //   icon: 'login',
      //   target: false,
      //   breadcrumbs: false
      // },
      {
        id: 'clientes',
        title: 'Clientes',
        type: 'item',
        classes: 'nav-item',
        url: '/clientes',
        icon: 'login',
        target: false,
        breadcrumbs: false
      },
      // {
      //   id: 'impuestos',
      //   title: 'Impuestos',
      //   type: 'item',
      //   classes: 'nav-item',
      //   url: '/impuestos',
      //   icon: 'login',
      //   target: false,
      //   breadcrumbs: false
      // },
      // {
      //   id: 'unidadmedida',
      //   title: 'Unidad de Medida',
      //   type: 'item',
      //   classes: 'nav-item',
      //   url: '/unidadmedida',
      //   icon: 'login',
      //   target: false,
      //   breadcrumbs: false
      // },
    ]
  },

];

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
        icon: 'profile',
        target: false,
        breadcrumbs: false
      }
    ]
  },
  {
    id: 'admin',
    title: 'Administración',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      // {
      //   id: 'usuarios',
      //   title: 'Usuarios',
      //   type: 'item',
      //   classes: 'nav-item',
      //   url: '/usuarios',
      //   icon: 'user',
      //   target: false,
      //   breadcrumbs: false
      // },
      {
        id: 'proveedores',
        title: 'Proveedores',
        type: 'item',
        classes: 'nav-item',
        url: '/proveedores',
        icon: 'profile',
        target: false,
        breadcrumbs: false
      },

      {
        id: 'clientes',
        title: 'Clientes',
        type: 'item',
        classes: 'nav-item',
        url: '/clientes',
        icon: 'profile',
        target: false,
        breadcrumbs: false
      },

      {
        id: 'umedida',
        title: 'Unidad de Medida',
        type: 'item',
        classes: 'nav-item',
        url: '/umedidas',
        icon: 'profile',
        target: false,
        breadcrumbs: false
      },
      {
        id: 'productos',
        title: 'Productos',
        type: 'item',
        classes: 'nav-item',
        url: '/productos',
        icon: 'profile',
        target: false,
        breadcrumbs: false
      }
      // {
      //   id: 'impuestos',
      //   title: 'Impuestos',
      //   type: 'item',
      //   classes: 'nav-item',
      //   url: '/impuestos',
      //   icon: 'profile',
      //   target: false,
      //   breadcrumbs: false
      // },
    ]
  }
];

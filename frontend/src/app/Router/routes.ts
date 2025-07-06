export const routes = {
  menu: {
    root: '/menu',
    products: '/menu/products',
    categories: '/menu/categories',
  },
  dashboard: '/dashboard',
  login: '/login',
  register: '/register',
  customers: '/customers',
  orders: '/orders',
  newOrder: '/orders/new',
};

export type RoutePathKey = keyof typeof routes;

export type RoutePath = (typeof routes)[keyof typeof routes];

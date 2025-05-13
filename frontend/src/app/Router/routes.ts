export const routes = {
  menu: '/menu',
  dashboard: '/dashboard',
  login: '/login',
  register: '/register',
  customers: '/customers',
  orders: '/orders',
  newOrder: '/orders/new',
};

export type RoutePathKey = keyof typeof routes;

export type RoutePath = (typeof routes)[keyof typeof routes];

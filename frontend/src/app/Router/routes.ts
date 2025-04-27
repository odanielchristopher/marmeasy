export const routes = {
  orders: '/orders',
  menu: '/menu',
  dashboard: '/dashboard',
  login: '/login',
  register: '/register',
  customers: '/customers',
};

export type RoutePathKey = keyof typeof routes;

export type RoutePath = (typeof routes)[keyof typeof routes];

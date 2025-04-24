export const routes = {
  customers: '/',
  orders: '/orders',
  menu: '/menu',
  dashboard: '/dashboard',
  login: '/login',
  register: '/register',
};

export type RoutePathKey = keyof typeof routes;

export type RoutePath = (typeof routes)[keyof typeof routes];

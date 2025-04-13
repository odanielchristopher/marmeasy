export const routes = {
  customers: '/',
  orders: '/orders',
  menu: '/menu',
  dashboard: '/dashboard',
};

export type RoutePathKey = keyof typeof routes;

export type RoutePath = (typeof routes)[keyof typeof routes];

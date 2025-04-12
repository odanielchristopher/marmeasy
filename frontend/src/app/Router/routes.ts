export const routes = {
  home: '/',
  orders: '/orders',
  form: '/form',
};

export type RoutePathKey = keyof typeof routes;

export type RoutePath = (typeof routes)[keyof typeof routes];

export const routes = {
  index: '/',
  orders: '/orders',
  form: '/form',
} as const;

export type RoutePathKey = keyof typeof routes;

export type RoutePath = (typeof routes)[keyof typeof routes];

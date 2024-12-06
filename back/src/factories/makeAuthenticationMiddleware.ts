import { AuthenticationMiddleware } from '../app/middlewares/AuthenticationMiddleware';

export function makeAuthenticationMiddleware() {
  return new AuthenticationMiddleware();
}

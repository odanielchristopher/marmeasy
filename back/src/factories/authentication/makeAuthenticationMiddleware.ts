import { AuthenticationMiddleware } from '../../app/shared/middlewares/AuthenticationMiddleware';


export function makeAuthenticationMiddleware() {
  return new AuthenticationMiddleware();
}

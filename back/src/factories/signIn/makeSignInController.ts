
import { SignInController } from '../../app/modules/users/signIn/SignInController';
import { makeSignInUseCase } from './makeSignInUseCase';

export function makeSignInController() {
  const signInUseCase = makeSignInUseCase();

  return new SignInController(signInUseCase);
}


import { SignInController } from '../../app/modules/users/signIn/SignInController';
import { makeSignInUseCase } from './makeSignInUseCase';

export function makeSignInController() {
  const signInController = makeSignInUseCase();

  return new SignInController(signInController);
}

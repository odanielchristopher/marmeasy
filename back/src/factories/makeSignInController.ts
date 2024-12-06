import { SignInController } from '../app/controllers/SignInController';
import { makeSignInUseCase } from './makeSignInUseCase';

export function makeSignInController() {
  const signInController = makeSignInUseCase();

  return new SignInController(signInController);
}

import { SignInUseCase } from '@app/modules/auth/useCases/SignInUseCase';

import { UsersRepository } from '../repositories/UsersRepository';

export function makeSignInUseCase() {
  const usersRepository = new UsersRepository();

  return new SignInUseCase(usersRepository);
}

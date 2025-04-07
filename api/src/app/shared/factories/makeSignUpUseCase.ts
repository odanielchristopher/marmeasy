import { SignUpUseCase } from '@app/modules/auth/useCases/SignUpUseCase';

import { UsersRepository } from '../repositories/UsersRepository';

export function makeSignUpUseCase() {
  const usersRepository = new UsersRepository();

  return new SignUpUseCase(usersRepository);
}

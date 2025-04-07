import { MeUseCase } from '@app/modules/users/useCases/MeUseCase';

import { UsersRepository } from '../repositories/UsersRepository';

export function makeMeUseCase() {
  const usersRepository = new UsersRepository();

  return new MeUseCase(usersRepository);
}

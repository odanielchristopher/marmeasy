import { FindMeUseCase } from '../../app/modules/users/findMe/FindMeUseCase';
import { UsersRepository } from '../../app/modules/users/UsersRepository';

export function makeFindMeUseCase() {
  const usersRepository = new UsersRepository();

  return new FindMeUseCase(usersRepository);
}

import { DeleteUserUseCase } from '../../app/modules/users/deleteUser/deleteUserUseCase';
import { UsersRepository } from '../../app/modules/users/UsersRepository';

export function makeDeleteUserUseCase() {
  const usersRepository = new UsersRepository();

  return new DeleteUserUseCase(usersRepository);
}

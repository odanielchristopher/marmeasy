import { EditUserUseCase } from '../../app/modules/users/editUser/EditUserUseCase';
import { UsersRepository } from '../../app/modules/users/UsersRepository';

export function makeEditUserUseCase() {
  const SALT = 10;
  const usersRepository = new UsersRepository();

  return new EditUserUseCase(usersRepository, SALT);
}

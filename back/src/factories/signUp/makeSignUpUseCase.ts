import { SignUpUseCase } from '../../app/modules/users/signUp/SignUpUseCase';
import { UsersRepository } from '../../app/modules/users/UsersRepository';

export function makeSignUpUseCase() {
  const SALT = 10;
  const usersRepository = new UsersRepository();

  return new SignUpUseCase(usersRepository, SALT);
}

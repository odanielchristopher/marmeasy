import { SignInUseCase } from '../../app/modules/users/signIn/SignInUseCase';
import { UsersRepository } from '../../app/modules/users/UsersRepository';

export function makeSignInUseCase() {
  const usersRepository = new UsersRepository();

  return new SignInUseCase(usersRepository);
}

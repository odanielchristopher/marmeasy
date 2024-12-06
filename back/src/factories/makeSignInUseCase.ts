import { AccountRepository } from '../app/Repositories/AccountRepository';
import { SignInUseCase } from '../app/useCases/SignInUseCase';

export function makeSignInUseCase() {
  const accountRepository = new AccountRepository();

  return new SignInUseCase(accountRepository);
}

import { AccountRepository } from '../app/Repositories/AccountRepository';
import { SignUpUseCase } from '../app/useCases/SignUpUseCase';

export function makeSignUpUseCase() {
  const SALT = 10;
  const accountRepository = new AccountRepository();

  return new SignUpUseCase(accountRepository, SALT);
}

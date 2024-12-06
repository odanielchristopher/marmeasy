import { hash } from 'bcryptjs';

import { AccountAlreadyExists } from '../errors/AccountAlreadyExists';
import { AccountRepository } from '../Repositories/AccountRepository';

interface IInput {
  email: string
  password: string
}

type IOutput = void | Error;

export class SignUpUseCase {

  constructor(private readonly accountRepository: AccountRepository, private readonly salt: number) {}

  async execute({ email, password }: IInput): Promise<IOutput> {
    const accountAlreadyExists = await this.accountRepository.findAccountByEmail(email);

    if (accountAlreadyExists) {
      throw new AccountAlreadyExists();
    }

    const hashedPassword = await hash(password, this.salt);

    await this.accountRepository.createAccount({
      email,
      password: hashedPassword
    });
  }
}

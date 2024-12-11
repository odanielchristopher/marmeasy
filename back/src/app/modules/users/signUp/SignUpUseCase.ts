import { hash } from 'bcryptjs';

import { AccountAlreadyExists } from '../../../shared/errors/AccountAlreadyExists';
import { UsersRepository } from '../UsersRepository';

interface IInput {
  email: string
  password: string
}

type IOutput = void | Error;

export class SignUpUseCase {

  constructor(private readonly usersRepository: UsersRepository, private readonly salt: number) {}

  async execute({ email, password }: IInput): Promise<IOutput> {
    const accountAlreadyExists = await this.usersRepository.findAccountByEmail(email);

    if (accountAlreadyExists) {
      throw new AccountAlreadyExists();
    }

    const hashedPassword = await hash(password, this.salt);

    await this.usersRepository.createUser({
      email,
      password: hashedPassword,
    });
  }
}

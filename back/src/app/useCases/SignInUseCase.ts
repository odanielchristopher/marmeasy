
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { env } from '../config/env';
import { InvalidCredentials } from '../errors/InvalidCredentials';
import { AccountRepository } from '../Repositories/AccountRepository';

interface IInput {
  email: string
  password: string
}

interface IOutput {
  accessToken: string
};

export class SignInUseCase {
  constructor(private readonly accountReposytory: AccountRepository) {}

  async execute({ email, password }: IInput): Promise<IOutput> {
    const account = await this.accountReposytory.findAccountByEmail(email);

    if (!account) {
      throw new InvalidCredentials();
    }

    const isPasswordValid = await compare(password, account.password);

    if (!isPasswordValid) {
      throw new InvalidCredentials();
    }

    const accessToken = sign(
      { sub: account.id },
      env.JWT_SECRET!,
    );

    return { accessToken };
  }
}

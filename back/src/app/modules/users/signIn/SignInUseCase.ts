
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { env } from '../../../shared/config/env';
import { InvalidCredentials } from '../../../shared/errors/InvalidCredentials';
import { UsersRepository } from '../UsersRepository';

interface IInput {
  email: string
  password: string
}

interface IOutput {
  accessToken: string
};

export class SignInUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({ email, password }: IInput): Promise<IOutput> {
    const account = await this.usersRepository.findUserByEmail(email);

    if (!account) {
      throw new InvalidCredentials();
    }

    const isPasswordValid = await compare(password, account.password);

    if (!isPasswordValid) {
      throw new InvalidCredentials();
    }

    const accessToken = sign(
      { sub: account.id },
      env.JWT_SECRET,
    );

    return { accessToken };
  }
}

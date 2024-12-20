
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { env } from '../../../shared/config/env';
import { InvalidCredentials } from '../../../shared/errors/InvalidCredentials';
import { UserNotFound } from '../../../shared/errors/UserNotFound';
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
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new UserNotFound();
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new InvalidCredentials();
    }

    const accessToken = sign(
      { sub: user.id },
      env.JWT_SECRET,
    );

    return { accessToken };
  }
}

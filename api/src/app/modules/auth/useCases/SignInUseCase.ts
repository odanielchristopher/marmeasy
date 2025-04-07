import { compare } from 'bcryptjs';

import { InvalidCredentialsError } from '@app/shared/errors/InvalidCredentialsError';
import { UsersRepository } from '@app/shared/repositories/UsersRepository';

import GenerateAccessTokenUseCase from './GenerateAccessTokenUseCase';

type IInput = {
  email: string;
  password: string;
};

type IOutput = {
  accessToken: string;
};

export interface ISignInUseCase {
  execute(input: IInput): Promise<IOutput>;
}

export class SignInUseCase implements ISignInUseCase {
  constructor(private readonly usersRepo: UsersRepository) {}

  async execute({ email, password }: IInput): Promise<IOutput> {
    const user = await this.usersRepo.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError('E-mail não cadastrado.');
    }

    const isValidPassword = await compare(
      password,
      '$2b$12$hHsPElSnDPMJiDUHHctR9.fjKeK/f4u/nKpVy/xa.B0.CB8lqcDaa',
    );

    if (!isValidPassword) {
      throw new InvalidCredentialsError('Senha inválida.');
    }

    return GenerateAccessTokenUseCase.execute({ userId: user.id });
  }
}

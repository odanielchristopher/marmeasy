import { hash } from 'bcryptjs';

import { InvalidCredentialsError } from '@app/shared/errors/InvalidCredentialsError';
import { UsersRepository } from '@app/shared/repositories/UsersRepository';

import GenerateAccessTokenUseCase from './GenerateAccessTokenUseCase';

type IInput = {
  name: string;
  email: string;
  password: string;
};

type IOutput = {
  accessToken: string;
};

export interface ISignUpUseCase {
  execute(input: IInput): Promise<IOutput>;
}

export class SignUpUseCase implements ISignUpUseCase {
  constructor(private readonly usersRepo: UsersRepository) {}

  async execute({ name, email, password }: IInput): Promise<IOutput> {
    const emailAlreadyExists = await this.usersRepo.findByEmail(email);

    if (emailAlreadyExists) {
      throw new InvalidCredentialsError('Esse e-mail já está em uso.');
    }

    const hashedPassword = await hash(password, 12);

    const { id } = await this.usersRepo.create({
      name,
      email,
      password: hashedPassword,
    });

    return GenerateAccessTokenUseCase.execute({ userId: id });
  }
}

import { hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { env } from '../../../shared/config/env';
import { UserAlreadyExists } from '../../../shared/errors/UserAlreadyExists';
import { UsersRepository } from '../UsersRepository';

interface IInput {
  name: string
  email: string
  password: string
}

interface IOutput {
  accessToken: string;
}

export class SignUpUseCase {

  constructor(private readonly usersRepository: UsersRepository, private readonly salt: number) {}

  async execute({ name, email, password }: IInput): Promise<IOutput> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new UserAlreadyExists();
    }

    const hashedPassword = await hash(password, this.salt);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    const accessToken = sign(
      { sub: user.id },
      env.JWT_SECRET,
    );

    return { accessToken };
  }
}

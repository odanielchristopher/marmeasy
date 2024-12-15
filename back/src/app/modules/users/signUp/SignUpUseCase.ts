import { hash } from 'bcryptjs';

import { UserAlreadyExists } from '../../../shared/errors/UserAlreadyExists';
import { UsersRepository } from '../UsersRepository';

interface IInput {
  name: string
  email: string
  password: string
}

interface IOutput {
  name: string;
  email: string;
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

    return user;
  }
}

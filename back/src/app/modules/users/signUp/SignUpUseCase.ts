import { hash } from 'bcryptjs';

import { AccountAlreadyExists } from '../../../shared/errors/AccountAlreadyExists';
import { UsersRepository } from '../UsersRepository';
import { IUser } from '../userEntity';

interface IInput {
  name: string
  email: string
  password: string
}

export class SignUpUseCase {

  constructor(private readonly usersRepository: UsersRepository, private readonly salt: number) {}

  async execute({ name, email, password }: IInput): Promise<IUser> {
    const accountAlreadyExists = await this.usersRepository.findUserByEmail(email);

    if (accountAlreadyExists) {
      throw new AccountAlreadyExists();
    }

    const hashedPassword = await hash(password, this.salt);

    const user = await this.usersRepository.createUser({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

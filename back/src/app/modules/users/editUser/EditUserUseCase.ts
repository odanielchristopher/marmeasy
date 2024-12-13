

import { UserNotFound } from '../../../shared/errors/UserNotFound';
import { UsersRepository } from '../UsersRepository';


interface IInput {
  userId: string
  name: string;
  email: string;
  password: string;
  newPassword: string;
};

type IOutput = void;


export class EditUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({ userId }: IInput): Promise<IOutput> {
    const user = await this.usersRepository.findUserById(userId);

    if (!user) {
      throw new UserNotFound();
    }

  }
}

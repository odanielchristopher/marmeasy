

import { UserNotFound } from '../../../shared/errors/UserNotFound';
import { IUser } from '../userEntity';
import { UsersRepository } from '../UsersRepository';


interface IInput {
  userId: string
};


export class FindMeUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({ userId }: IInput): Promise<IUser> {

    const user = await this.usersRepository.findUserById(userId);

    if (!user) {
      throw new UserNotFound();
    }

    return { ...user, name: 'daniel' };
  }
}

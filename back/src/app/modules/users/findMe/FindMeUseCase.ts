import { UserNotFound } from '../../../shared/errors/UserNotFound';
import { UsersRepository } from '../UsersRepository';


interface IInput {
  userId: string
};

interface IOutput {
  name: string;
  email: string;
}


export class FindMeUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({ userId }: IInput): Promise<IOutput> {

    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new UserNotFound();
    }

    const { email, name } = user;

    return { name, email };
  }
}

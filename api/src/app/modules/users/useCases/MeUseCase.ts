import { NotFoundError } from '@app/shared/errors/NotFoundError';
import { UsersRepository } from '@app/shared/repositories/UsersRepository';

type IInput = {
  id: string;
};

type IOutput = {
  name: string;
  email: string;
};

export interface IMeUseCase {
  execute(input: IInput): Promise<IOutput>;
}

export class MeUseCase implements IMeUseCase {
  constructor(private readonly usersRepo: UsersRepository) {}

  async execute({ id }: IInput): Promise<IOutput> {
    const user = await this.usersRepo.findById(id);

    if (!user) {
      throw new NotFoundError('Usuário não encontrado');
    }

    return user;
  }
}

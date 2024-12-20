

import { UsersRepository } from '../UsersRepository';

interface IInput {
  id: string
};

type IOutput = void;


export class DeleteUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({ id }: IInput): Promise<IOutput> {
    await this.usersRepository.delete(id);
  }
}

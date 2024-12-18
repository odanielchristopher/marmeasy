import { ClientNotFound } from '../../../shared/errors/ClientNotFound';
import { ClientsRepository } from '../ClientsRepository';

interface IInput {
  id: string;
  userId: string;
}

type IOutput = void;

export class DeleteClientUseCase {
  constructor(private readonly clientsRepository: ClientsRepository) {}

  async execute({ id, userId }: IInput): Promise<IOutput> {
    const client = await this.clientsRepository.findById(id, userId);

    if (!client) {
      throw new ClientNotFound();
    }

    await this.clientsRepository.delete(id, userId);
  }
}

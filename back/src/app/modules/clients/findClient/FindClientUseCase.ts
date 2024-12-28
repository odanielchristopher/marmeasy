import { ClientNotFound } from '../../../shared/errors/ClientNotFound';
import ClientMapper from '../../../shared/mappers/ClientMapper';
import { IClient } from '../clientEntity';
import { ClientsRepository } from '../ClientsRepository';

interface IInput {
  id: string;
  userId: string;
}

export class FindClientUseCase {
  constructor(private readonly clientsRepository: ClientsRepository) {}

  async execute({ id, userId }: IInput): Promise<IClient> {
    const client = await this.clientsRepository.findById(id, userId);

    if (!client) {
      throw new ClientNotFound();
    }

    return ClientMapper.toDomain(client);
  }
}

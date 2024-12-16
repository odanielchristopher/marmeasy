import { ClientNotFound } from '../../../shared/errors/ClientNotFound';
import { DocumentError } from '../../../shared/errors/DocumentError';
import { InvalidCredentials } from '../../../shared/errors/InvalidCredentials';
import { NotNumber } from '../../../shared/errors/NotNumber';
import ClientMapper from '../../../shared/mappers/ClientMapper';
import { IClient } from '../clientEntity';
import { ClientsRepository } from '../ClientsRepository';

export class EditClientUseCase {
  constructor(private readonly clientsRepository: ClientsRepository) {}

  async execute(client: IClient): Promise<IClient> {
    if (!client.id) {
      throw new InvalidCredentials();
    }

    const clientExists = await this.clientsRepository.findById(
      client.id,
      client.userId,
    );

    if (!clientExists) {
      throw new ClientNotFound();
    }

    if (client.document) {
      const checkClientDocument = await this.clientsRepository.findByDocument(
        client.document,
      );
      if (checkClientDocument) {
        throw new DocumentError('Error ao atualizar documento.');
      }
    }

    if (client.balance) {
      const castingBalance = Number(client.balance);

      if (!castingBalance) {
        throw new NotNumber();
      }
    }

    const updatedClient = await this.clientsRepository.update({
      ...client,
    });

    return ClientMapper.toDomain(updatedClient);
  }
}

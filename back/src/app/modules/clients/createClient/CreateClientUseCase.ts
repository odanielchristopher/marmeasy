import { DocumentError } from '../../../shared/errors/DocumentError';
import { NotNumber } from '../../../shared/errors/NotNumber';
import ClientMapper from '../../../shared/mappers/ClientMapper';
import { ClientsRepository } from '../ClientsRepository';
import { IClient } from '../clientEntity';

export class CreateClientUseCase {
  constructor(private readonly clientsRepository: ClientsRepository) {}
  async execute(client: IClient): Promise<IClient> {
    if (client.document) {
      const documentAlredyInUse = await this.clientsRepository.findByDocument(client.document);

      if (documentAlredyInUse) {
        throw new DocumentError();
      }
    }


    if (client.balance) {
      const castingBalance = Number(client.balance);

      if (!castingBalance) {
        throw new NotNumber();
      }

      client.balance = castingBalance;
    }

    const newClient = await this.clientsRepository.create({
      ...client,

    });

    return ClientMapper.toDomain(newClient);
  }
}

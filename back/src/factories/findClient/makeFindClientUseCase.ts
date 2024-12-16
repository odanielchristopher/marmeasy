import { FindClientUseCase } from '../../app/modules/clients/findClient/FindClientUseCase';
import { ClientsRepository } from '../../app/modules/clients/ClientsRepository';

export function makeFindClientUseCase() {
  const clientsRepository = new ClientsRepository();

  return new FindClientUseCase(clientsRepository);
}

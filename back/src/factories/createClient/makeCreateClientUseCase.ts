import { CreateClientUseCase } from '../../app/modules/clients/createClient/CreateClientUseCase';
import { ClientsRepository } from '../../app/modules/clients/ClientsRepository';

export function makeCreateClientUseCase() {
  const clientsRepository = new ClientsRepository();

  return new CreateClientUseCase(clientsRepository);
}

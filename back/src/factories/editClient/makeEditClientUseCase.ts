import { EditClientUseCase } from '../../app/modules/clients/editClient/EditClientUseCase';
import { ClientsRepository } from '../../app/modules/clients/ClientsRepository';

export function makeEditClientUseCase() {
  const clientsRepository = new ClientsRepository();

  return new EditClientUseCase(clientsRepository);
}

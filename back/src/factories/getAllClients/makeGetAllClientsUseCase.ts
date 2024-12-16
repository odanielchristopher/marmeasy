import { GetAllClientsUseCase } from '../../app/modules/clients/getAllClients/GetAllClientsUseCase';
import { ClientsRepository } from '../../app/modules/clients/ClientsRepository';

export function makeGetAllClientsUseCase() {
  const clientsRepository = new ClientsRepository();

  return new GetAllClientsUseCase(clientsRepository);
}

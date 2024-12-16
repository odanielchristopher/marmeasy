import { DeleteClientUseCase} from '../../app/modules/clients/deleteClient/DeleteClienteUseCase';
import { ClientsRepository } from '../../app/modules/clients/ClientsRepository';

export function makeDeleteClientUseCase() {
  const clientsRepository = new ClientsRepository();

  return new DeleteClientUseCase(clientsRepository);
}

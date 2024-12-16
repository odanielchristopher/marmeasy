import { DeleteClientController } from '../../app/modules/clients/deleteClient/DeleteClienteController';
import { makeDeleteClientUseCase } from './makeDeleteClientUseCase';

export function makeDeleteClientController() {
  const deleteClientUseCase = makeDeleteClientUseCase();

  return new DeleteClientController(deleteClientUseCase);
}

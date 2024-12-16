import { DeleteClientController } from '../../app/modules/clients/deleteClient/DeleteClientController';
import { makeDeleteClientUseCase } from './makeDeleteClientUseCase';

export function makeDeleteClientController() {
  const deleteClientUseCase = makeDeleteClientUseCase();

  return new DeleteClientController(deleteClientUseCase);
}

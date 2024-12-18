import { EditClientController } from '../../app/modules/clients/editClient/EditClientController';
import { makeEditClientUseCase } from './makeEditClientUseCase';

export function makeEditClientController() {
  const editClientUseCase = makeEditClientUseCase();

  return new EditClientController(editClientUseCase);
}

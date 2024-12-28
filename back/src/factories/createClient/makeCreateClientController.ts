import { CreateClientController } from '../../app/modules/clients/createClient/CreateClientController';
import { makeCreateClientUseCase } from './makeCreateClientUseCase';

export function makeCreateClientController() {
  const createClientUseCase = makeCreateClientUseCase();

  return new CreateClientController(createClientUseCase);
}

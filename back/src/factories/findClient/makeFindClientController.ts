import { FindClientController } from '../../app/modules/clients/findClient/FindClientController';
import { makeFindClientUseCase } from './makeFindClientUseCase';

export function makeFindClientController() {
  const findClientUseCase = makeFindClientUseCase();

  return new FindClientController(findClientUseCase);
}

import { FindMeController } from '../../app/modules/users/findMe/FindMeController';
import { makeFindMeUseCase } from './makeFindMeUseCase';

export function makeFindMeController() {
  const findMeUseCase = makeFindMeUseCase();

  return new FindMeController(findMeUseCase);
}

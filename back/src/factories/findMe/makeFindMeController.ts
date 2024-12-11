import { FindMeController } from '../../app/modules/users/findMeByToken/FindMeController';
import { makeFindMeUseCase } from './makeFindMeUseCase';

export function makeFindMeController() {
  const findMeUseCase = makeFindMeUseCase();

  return new FindMeController(findMeUseCase);
}

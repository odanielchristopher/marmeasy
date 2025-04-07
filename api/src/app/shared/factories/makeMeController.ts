import { MeController } from '@app/modules/users/controllers/MeController';

import { makeMeUseCase } from './makeMeUseCases';

export function makeMeController() {
  const meUseCase = makeMeUseCase();

  return new MeController(meUseCase);
}

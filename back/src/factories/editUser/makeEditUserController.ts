import { EditUserController } from '../../app/modules/users/editUser/EditUserController';
import { makeEditUserUseCase } from './makeEditUserUseCase';

export function makeEditUserController() {
  const findMeUseCase = makeEditUserUseCase();

  return new EditUserController(findMeUseCase);
}

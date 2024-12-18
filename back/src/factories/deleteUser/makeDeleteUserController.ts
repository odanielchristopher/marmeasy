import { DeleteUserController } from '../../app/modules/users/deleteUser/deleteUserController';
import { makeDeleteUserUseCase } from './makeDeleteUserUseCase';

export function makeDeleteUserController() {
  const findMeUseCase = makeDeleteUserUseCase();

  return new DeleteUserController(findMeUseCase);
}

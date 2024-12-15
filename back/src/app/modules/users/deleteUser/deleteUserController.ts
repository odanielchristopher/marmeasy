import { IController, IRequest, IResponse } from '../../../shared/interfaces/IController';
import { DeleteUserUseCase } from './deleteUserUseCase';

export class DeleteUserController implements IController {
  constructor(private readonly deleteUserUseCase: DeleteUserUseCase) {}

  async handle({ userId }: IRequest): Promise<IResponse> {
    try {

      console.log(userId);
      await this.deleteUserUseCase.execute({ id: userId! });

      return {
        statusCode: 204,
        body: null,
      };
    } catch {
      return {
        statusCode: 400,
        body: null,
      };
    }
  }

}

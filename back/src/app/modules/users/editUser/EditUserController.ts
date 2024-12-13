import { IController, IRequest, IResponse } from '../../../shared/interfaces/IController';
import { EditUserUseCase } from './EditUserUseCase';

export class EditUserController implements IController {
  constructor(private readonly editUserUseCase: EditUserUseCase) {}

  handle(request: IRequest): Promise<IResponse> {

    console.log(request);
    throw new Error('Method not implemented.');
  }

}

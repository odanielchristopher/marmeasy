import {
  IController,
  IRequest,
  IResponse,
} from '../../../shared/interfaces/IController';
import { DeleteClientUseCase } from './DeleteClientUseCase';

export class DeleteClientController implements IController {
  constructor(private readonly deleteClientUseCase: DeleteClientUseCase) {}

  async handle({ params, userId }: IRequest): Promise<IResponse> {
    try {
      const { id } = params;

      await this.deleteClientUseCase.execute({ id, userId: userId! });

      return {
        statusCode: 204,
        body: null,
      };
    } catch {
      return {
        statusCode: 404,
        body: {
          error: 'Cliente não encontrado',
        },
      };
    }
  }
}

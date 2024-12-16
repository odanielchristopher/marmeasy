import { IController, IRequest, IResponse } from '../../../shared/interfaces/IController';
import { FindClientUseCase} from './FindClientUseCase';

export class FindClientController implements IController {
  constructor(private readonly findClientUseCase: FindClientUseCase) {}

  async handle({ params, userId }: IRequest): Promise<IResponse> {
    try {
      const { id } = params;
      const user = await this.findClientUseCase.execute({ id, userId: userId! });

      return {
        statusCode: 200,
        body: {
          ...user,
        },
      };
    } catch {
      return {
        statusCode: 404,
        body: {
          error: 'Usuário não encontrado',
        },
      };
    }
  }
}

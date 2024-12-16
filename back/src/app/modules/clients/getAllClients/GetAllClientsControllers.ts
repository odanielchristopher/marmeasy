import { IController, IRequest, IResponse } from '../../../shared/interfaces/IController';
import { GetAllClientsUseCase } from './GetAllClientsUseCase';

export class GetAllClientController implements IController {
  constructor(private readonly getAllClientsUseCase: GetAllClientsUseCase) {}

  async handle({ userId }: IRequest): Promise<IResponse> {
    try {
      const users = await this.getAllClientsUseCase.execute({ userId: userId! });

      return {
        statusCode: 200,
        body: {
          ...users,
        },
      };
    } catch {
      return {
        statusCode: 404,
        body: {
          error: 'Usuários não encontrado',
        },
      };
    }
  }
}
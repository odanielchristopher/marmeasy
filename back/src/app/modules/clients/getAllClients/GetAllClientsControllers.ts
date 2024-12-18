import {
  IController,
  IRequest,
  IResponse,
} from '../../../shared/interfaces/IController';
import { GetAllClientsUseCase } from './GetAllClientsUseCase';

export class GetAllClientController implements IController {
  constructor(private readonly getAllClientsUseCase: GetAllClientsUseCase) {}

  async handle({ userId }: IRequest): Promise<IResponse> {
    try {
      const clients = await this.getAllClientsUseCase.execute({
        userId: userId!,
      });

      return {
        statusCode: 200,
        body: [
          ...clients,
        ],
      };
    } catch {
      return {
        statusCode: 404,
        body: {
          error: 'Nenhum cliente encontrado',
        },
      };
    }
  }
}

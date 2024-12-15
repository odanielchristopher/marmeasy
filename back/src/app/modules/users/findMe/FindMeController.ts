
import { IController, IRequest, IResponse } from '../../../shared/interfaces/IController';
import { FindMeUseCase } from './FindMeUseCase';

export class FindMeController implements IController {
  constructor(private readonly findMeUseCase: FindMeUseCase) {}

  async handle({ userId }: IRequest): Promise<IResponse> {
    try {
      const user = await this.findMeUseCase.execute({ userId: userId! });

      return {
        statusCode: 200,
        body: {
          ...user,
        },
      };
    } catch {
      return {
        statusCode: 404, // Unauthorized
        body: {
          error: 'Usuário não encontrado',
        },
      };
    }
  }
}

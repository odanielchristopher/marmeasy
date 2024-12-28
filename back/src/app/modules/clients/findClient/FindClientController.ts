import { ZodError } from 'zod';
import { ClientNotFound } from '../../../shared/errors/ClientNotFound';
import {
  IController,
  IRequest,
  IResponse,
} from '../../../shared/interfaces/IController';
import { FindClientUseCase } from './FindClientUseCase';

export class FindClientController implements IController {
  constructor(private readonly findClientUseCase: FindClientUseCase) {}

  async handle({ params, userId }: IRequest): Promise<IResponse> {
    try {
      const { id } = params;

      const user = await this.findClientUseCase.execute({
        id,
        userId: userId!,
      });

      return {
        statusCode: 200,
        body: {
          ...user,
        },
      };
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          statusCode: 400, // Bad request
          body: error.issues,
        };
      }

      if (error instanceof ClientNotFound) {
        return {
          statusCode: 404,
          body: {
            message: 'Cliente não encontrado.',
          },
        };
      }

      return {
        statusCode: 500,
        body: null,
      };
    }
  }
}

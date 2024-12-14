import { z, ZodError } from 'zod';

import { InvalidCredentials } from '../../../shared/errors/InvalidCredentials';
import { IController, IRequest, IResponse } from '../../../shared/interfaces/IController';

import { SignInUseCase } from './SignInUseCase';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export class SignInController implements IController {
  constructor(private readonly signInUseCase: SignInUseCase) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const { email, password } = schema.parse(body);

      const { accessToken } = await this.signInUseCase.execute({ email, password });

      return {
        statusCode: 200,
        body: {
          accessToken,
        },
      };
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          statusCode: 400, // Bad request
          body: error.issues,
        };
      }

      if (error instanceof InvalidCredentials) {
        return {
          statusCode: 401, // Unauthorized
          body: {
            error: 'E-mail ou senha inválidos.',
          },
        };
      }

      throw error;
    }
  }
}

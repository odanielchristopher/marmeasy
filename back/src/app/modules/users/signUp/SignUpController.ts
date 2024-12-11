import { z, ZodError } from 'zod';

import { AccountAlreadyExists } from '../../../shared/errors/AccountAlreadyExists';
import { IController, IRequest, IResponse } from '../../../shared/interfaces/IController';

import { SignUpUseCase } from './SignUpUseCase';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

export class SignUpController implements IController {
  constructor(private readonly signUpUseCase: SignUpUseCase) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const { name, email, password } = schema.parse(body);

      const user = await this.signUpUseCase.execute({ name, email, password });

      return {
        statusCode: 200,
        body: user,
      };
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          statusCode: 400,
          body: error.issues,
        };
      }

      if (error instanceof AccountAlreadyExists) {
        return {
          statusCode: 409, // Conflict
          body: {
            error: 'Esse e-mail já está em uso.',
          },
        };
      }

      throw error;
    }
  }
}

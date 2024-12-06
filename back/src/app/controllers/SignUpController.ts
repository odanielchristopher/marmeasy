import { z, ZodError } from 'zod';

import { AccountAlreadyExists } from '../errors/AccountAlreadyExists';
import { IController, IRequest, IResponse } from '../interfaces/IController';
import { SignUpUseCase } from '../useCases/SignUpUseCase';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export class SignUpController implements IController {
  constructor(private readonly signUpUseCase: SignUpUseCase) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const { email, password } = schema.parse(body);

      await this.signUpUseCase.execute({ email, password });

      return {
        statusCode: 204,
        body: null,
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

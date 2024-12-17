import { z, ZodError } from 'zod';
import { EmailAlreadyExists } from '../../../shared/errors/EmailAlreadyExists';
import { InvalidCredentials } from '../../../shared/errors/InvalidCredentials';
import { IController, IRequest, IResponse } from '../../../shared/interfaces/IController';
import { EditUserUseCase } from './EditUserUseCase';
import { UserNotFound } from '../../../shared/errors/UserNotFound';

const schema = z.object({
  userId: z.string().min(1),
  name: z.string().min(2),
  email: z.string().email(),
  currentPassword: z.string().min(6),
  newPassword: z.string().optional(),
});

export class EditUserController implements IController {
  constructor(private readonly editUserUseCase: EditUserUseCase) {}

  async handle({ body, userId }: IRequest): Promise<IResponse> {
    try {
      const user = schema.parse({
        userId,
        ...body,
      });
      const newUser = await this.editUserUseCase.execute(user);

      return {
        statusCode: 200,
        body: {
          ...newUser,
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

      if (error instanceof EmailAlreadyExists) {
        return {
          statusCode: 400,
          body: {
            error: 'E-mail já em uso.',
          },
        };
      }

      if (error instanceof UserNotFound) {
        return {
          statusCode: 404,
          body: {
            error: 'Usuário não encontrado.',
          },
        };
      }

      return {
        statusCode: 500,
        body: {
          error: 'Erro interno no servidor.',
        },
      };
    }
  }

}

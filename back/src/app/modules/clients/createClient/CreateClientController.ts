import { z, ZodError } from 'zod';
import { ClientAlreadyExists } from '../../../shared/errors/ClientAlreadyExists';
import { DocumentError } from '../../../shared/errors/DocumentError';
import { NotNumber } from '../../../shared/errors/NotNumber';
import { IController, IRequest, IResponse } from '../../../shared/interfaces/IController';
import { CreateClientUseCase } from './CreateClientUseCase';

const schema = z.object({
    name: z.string(),
    userId: z.string().uuid(),
    phone: z.string().optional(),
    address: z.string().optional(),
    type: z.enum(['FISICO', 'JURIDICO']),
    document: z.string().optional(),
    balance: z.number().or(z.string()).optional(),
});

export class CreateClientController implements IController {
  constructor(private readonly createClientUseCase: CreateClientUseCase) {}

  async handle({ body, userId }: IRequest): Promise<IResponse> {
    const { name, phone, address, type, document, balance} = body;
    try {
      const data = {
        userId,
        name,
        phone,
        address,
        type,
        document,
        balance,
      };

      const client = schema.parse(data);

      const createdClient = await this.createClientUseCase.execute(client);
      return {
        statusCode: 200,
        body: {
         ...createdClient,
        },
      };
    } catch (error) {
      // console.log(error);
      if (error instanceof ZodError) {
        return {
          statusCode: 400, // Bad request
          body: error.issues,
        };
      }

      if (error instanceof ClientAlreadyExists) {
        return {
          statusCode: 409, // Conflict
          body: { message: 'Cliente já existe.' },
        };
      }

      if (error instanceof NotNumber) {
        return {
          statusCode: 400,
          body: { message: 'Número inválido' },
        };
      }

      if (error instanceof DocumentError) {
        if (type === 'FISICO') {
          return {
            statusCode: 409,
            body: {
              message: 'Esse CPF já está em uso.',
            },
          };
        }

        return {
          statusCode: 409,
          body: {
            message: 'Esse CNPJ já está em uso.',
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

import { z, ZodError } from 'zod';
import { ClientNotFound } from '../../../shared/errors/ClientNotFound';
import { DocumentError } from '../../../shared/errors/DocumentError';
import { NotNumber } from '../../../shared/errors/NotNumber';
import { IController, IRequest, IResponse } from '../../../shared/interfaces/IController';
import { EditClientUseCase } from './EditClientUseCase';

const schema = z.object({
    name: z.string().min(2),
    phone: z.string().optional(),
    address: z.string().optional(),
    type: z.enum(['FISICO', 'JURIDICO']),
    document: z.string().optional(),
    balance: z.number().or(z.string()).optional(),
});

export class EditClientController implements IController {
  constructor(private readonly editClientUseCase: EditClientUseCase) {}

  async handle({ params, body, userId }: IRequest): Promise<IResponse> {
    try {
      const { id } = params;
      const { name, phone, address, type, document, balance } = body;

      const data = {
        name,
        phone,
        address,
        type,
        document,
        balance,
      };

      const client = schema.parse(data);

      await this.editClientUseCase.execute({id, userId: userId!, ...client});

      return {
        statusCode: 200,
        body: {
          message: 'Client updated successfully.',
        },
      };
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          statusCode: 400, // Bad request
          body: error.issues,
        };
      }

      if(error instanceof ClientNotFound) {
        return {
          statusCode: 404,
          body: {
            message: 'Client not found.',
          },
        };
      }

      if (error instanceof NotNumber) {
        return {
          statusCode: 400,
          body: { message: 'Número inválido' },
        };
      }

      if(error instanceof DocumentError) {
        return {
          statusCode: 404,
          body: {
            message: 'Error no documento.',
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

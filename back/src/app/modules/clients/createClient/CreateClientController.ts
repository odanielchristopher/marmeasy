import { z, ZodError } from 'zod';
import { IController, IRequest, IResponse } from '../../../shared/interfaces/IController';
import { CreateClientUseCase } from './CreateClientUseCase';
import { ClientType } from '../clientEntity';
import { ClientAlreadyExists } from '../../../shared/errors/ClientAlreadyExists';

const schema = z.object({
    name: z.string(),
    userId: z.string().uuid(),
    phone: z.string(),
    address: z.string(),
    type: z.nativeEnum(ClientType),
    document: z.string(),
    balance: z.number(),
});

export class CreateClientController implements IController {
  constructor(private readonly createClientUseCase: CreateClientUseCase) {}

  async handle({ body, userId }: IRequest): Promise<IResponse> {
    try {
      const { name, phone, address, type, document, balance} = body;
      console.log(userId);
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

      await this.createClientUseCase.execute(client);
      
      return {
        statusCode: 200,
        body: {
          message: 'Client created successfully.',
        },
      };
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          statusCode: 400, // Bad request
          body: error.issues,
        };
      }

      if (error instanceof ClientAlreadyExists) {
        return {
          statusCode: 409, // Conflict
          body: { message: 'Client already exists.' },
        };
      }

      return {
        statusCode: 500,
        body: null,
      };
    }
  }
}

import { FastifyReply } from 'fastify';

import { IController } from '@app/shared/@types/IController';
import { RequestWithBody } from '@app/shared/@types/TypedRequest';

import { ISignUpDto } from '../dtos/SignUpDto';
import { ISignUpUseCase } from '../useCases/SignUpUseCase';

export class SignUpController implements IController {
  constructor(private readonly signUpUseCase: ISignUpUseCase) {}

  async handler(request: RequestWithBody<ISignUpDto>, reply: FastifyReply) {
    const { name, email, password } = request.body;

    const data = await this.signUpUseCase.execute({ name, email, password });

    return reply.code(201).send(data);
  }
}

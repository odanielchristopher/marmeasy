import { FastifyReply } from 'fastify';

import { IController } from '@app/shared/@types/IController';
import { RequestWithBody } from '@app/shared/@types/TypedRequest';

import { ISignInDto } from '../dtos/SignInDto';
import { ISignInUseCase } from '../useCases/SignInUseCase';

export class SignInController implements IController {
  constructor(private readonly signInUseCase: ISignInUseCase) {}

  async handler(request: RequestWithBody<ISignInDto>, reply: FastifyReply) {
    const { email, password } = request.body;

    const data = await this.signInUseCase.execute({ email, password });

    return reply.code(200).send(data);
  }
}

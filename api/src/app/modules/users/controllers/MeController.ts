import { FastifyReply, FastifyRequest } from 'fastify';

import { IController } from '@app/shared/@types/IController';

import { IMeUseCase } from '../useCases/MeUseCase';

export class MeController implements IController {
  constructor(private readonly meUseCase: IMeUseCase) {}

  async handler({ userId }: FastifyRequest, reply: FastifyReply) {
    const data = await this.meUseCase.execute({ id: userId! });

    return reply.code(200).send(data);
  }
}

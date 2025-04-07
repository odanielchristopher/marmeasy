import { FastifyReply } from 'fastify';

import { TypedFastifyRequest } from './TypedRequest';

export interface IController<
  TBody = unknown,
  TQuery = unknown,
  TParams = unknown,
  THeaders = unknown,
> {
  handler<TReply>(
    request: TypedFastifyRequest<TBody, TQuery, TParams, THeaders>,
    reply: FastifyReply,
  ): Promise<TReply | null | void>;
}

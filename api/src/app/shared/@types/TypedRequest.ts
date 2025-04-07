import { FastifyRequest } from 'fastify';

export interface ITypedRequest<
  TBody = unknown,
  TQuery = unknown,
  TParams = unknown,
  THeaders = unknown,
> {
  readonly body: TBody;
  readonly query: TQuery;
  readonly params: TParams;
  readonly headers: THeaders;
}

// Requisição tipada com os dados genéricos
export type TypedFastifyRequest<
  TBody = unknown,
  TQuery = unknown,
  TParams = unknown,
  THeaders = unknown,
> = FastifyRequest & ITypedRequest<TBody, TQuery, TParams, THeaders>;

// Singles
export type RequestWithBody<TBody> = TypedFastifyRequest<TBody>;
export type RequestWithQuery<TQuery> = TypedFastifyRequest<unknown, TQuery>;
export type RequestWithParams<TParams> = TypedFastifyRequest<
  unknown,
  unknown,
  TParams
>;
export type RequestWithHeaders<THeaders> = TypedFastifyRequest<
  unknown,
  unknown,
  unknown,
  THeaders
>;

// Mixes
export type RequestWithBodyAndQuery<TBody, TQuery> = TypedFastifyRequest<
  TBody,
  TQuery
>;
export type RequestWithBodyAndParams<TBody, TParams> = TypedFastifyRequest<
  TBody,
  unknown,
  TParams
>;
export type RequestWithEverything<TBody, TQuery, TParams, THeaders> =
  TypedFastifyRequest<TBody, TQuery, TParams, THeaders>;

export interface IRequest {
  body: Record<string, any>;
  params: Record<string, any>;
  userId: string | undefined;
  query: Record<string, any>;
}

export interface IResponse {
  statusCode: number;
  body: Record<string, any> | null;
}

export interface IController {
  handle(request: IRequest): Promise<IResponse>;
}

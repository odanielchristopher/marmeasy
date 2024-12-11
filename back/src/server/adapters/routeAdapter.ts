import { Request, Response } from 'express';
import { IController } from '../../app/shared/interfaces/IController';

export function routeAdapter(controller: IController) {
  return async (request: Request, response: Response) => {
    const { body, statusCode } = await controller.handle({
      body: request.body,
      params: request.params,
      userId: request.metadata?.userId,
      query: request.query,
    });

    response.status(statusCode).json(body);
  };
}

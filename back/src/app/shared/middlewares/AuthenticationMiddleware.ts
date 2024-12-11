import { verify } from 'jsonwebtoken';
import { env } from '../config/env';
import { IData, IMiddleware, IRequest, IResponse } from '../interfaces/IMiddleware';

export class AuthenticationMiddleware implements IMiddleware {
  async handle({ headers }: IRequest): Promise<IResponse | IData> {
    const { authorization } = headers;

    if (!authorization) {
      return {
        statusCode: 401,
        body: null,
      };
    }

    try {
      const [ type, token ] = authorization.split(' ');

      if (type !== 'Bearer') {
        throw new Error();
      }

      const payload = verify(
        token,
        env.JWT_SECRET,
      );

      console.log(payload);

      return {
        data: {
          accountId: payload.sub,
        },
      };
    } catch {
      return {
        statusCode: 401,
        body: null,
      };
    }

  }

}

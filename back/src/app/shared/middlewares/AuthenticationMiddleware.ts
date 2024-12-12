import { verify } from 'jsonwebtoken';
import { env } from '../config/env';
import { IData, IMiddleware, IRequest, IResponse } from '../interfaces/IMiddleware';

export class AuthenticationMiddleware implements IMiddleware {
  async handle({ headers }: IRequest): Promise<IResponse | IData> {
    const { authorization: Authorization } = headers;

    if (!Authorization) {
      return {
        statusCode: 401,
        body: { message: 'Token de acesso não enviado.' },
      };
    }

    try {
      const [ type, token ] = Authorization.split(' ');

      if (type !== 'Bearer') {
        throw new Error();
      }

      const payload = verify(
        token,
        env.JWT_SECRET,
      );

      return {
        data: {
          userId: payload.sub,
        },
      };
    } catch {
      return {
        statusCode: 401,
        body: { message: 'Usuário não autorizado.' },
      };
    }

  }

}

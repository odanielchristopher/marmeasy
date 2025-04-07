import { FastifyRequest } from 'fastify';
import { JwtPayload, verify } from 'jsonwebtoken';

import { env } from '@app/shared/config/env';
import { UnauthourizedError } from '@app/shared/errors/UnauthourizedError';

export async function authenticationHook(request: FastifyRequest) {
  const { authorization } = request.headers;

  if (!authorization) {
    throw new UnauthourizedError('Missing access token.');
  }

  const [type, token] = authorization.split(' ');

  if (type !== 'Bearer') {
    throw new UnauthourizedError('Acess token type is not accepted.');
  }

  try {
    const payload = verify(token, env.jwtSecret!) as JwtPayload;

    request.userId = payload.sub;
  } catch {
    throw new UnauthourizedError('Invalid token');
  }
}

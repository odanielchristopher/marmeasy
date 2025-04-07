import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';

import { SignInDto } from '@app/modules/auth/dtos/SignInDto';
import { SignUpDto } from '@app/modules/auth/dtos/SignUpDto';
import { makeSignInController } from '@app/shared/factories/makeSignInController';
import { makeSignUpController } from '@app/shared/factories/makeSignUpController';

export const authRoutes: FastifyPluginAsyncZod = async (fastify) => {
  fastify.post(
    '/signin',
    {
      schema: {
        tags: ['auth'],
        description: 'Sign in user',
        body: SignInDto,
        response: {
          200: z.object({
            accessToken: z.string().jwt(),
          }),
        },
      },
    },
    (request, reply) => makeSignInController().handler(request, reply),
  );

  fastify.post(
    '/signup',
    {
      schema: {
        tags: ['auth'],
        description: 'Sign up user',
        body: SignUpDto,
        response: {
          200: z.object({
            accessToken: z.string().jwt(),
          }),
        },
      },
    },
    (request, reply) => makeSignUpController().handler(request, reply),
  );
};

import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';

import { makeMeController } from '@app/shared/factories/makeMeController';

export const usersRoutes: FastifyPluginAsyncZod = async (fastify) => {
  fastify.get(
    '/me',
    {
      schema: {
        tags: ['users'],
        response: {
          200: z.object({
            name: z.string(),
            email: z.string().email(),
          }),
        },
      },
    },
    (request, reply) => makeMeController().handler(request, reply),
  );
};

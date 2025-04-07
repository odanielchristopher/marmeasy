import { FastifyPluginAsync } from 'fastify';

import { authenticationHook } from '@server/hooks/authenticationHook';

import { usersRoutes } from './usersRoutes';

export const privateRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.addHook('onRequest', authenticationHook);

  fastify.register(usersRoutes, { prefix: '/users' });
};

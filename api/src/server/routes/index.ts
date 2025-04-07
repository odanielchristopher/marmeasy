import { FastifyPluginAsync } from 'fastify';
import { hasZodFastifySchemaValidationErrors } from 'fastify-type-provider-zod';
import { ZodError } from 'zod';

import { AppError } from '@app/shared/errors/IAppError';

import { privateRoutes } from './privateRoutes';
import { publicRoutes } from './publicRoutes';

export const routes: FastifyPluginAsync = async (fastify) => {
  fastify.setErrorHandler((error, _request, reply) => {
    if (error instanceof ZodError) {
      return reply.code(400).send({
        message: error.errors,
      });
    }

    if (hasZodFastifySchemaValidationErrors(error)) {
      return reply.code(400).send({
        message: error.validation.map((e) => e.message),
      });
    }

    if (error instanceof AppError) {
      return reply.code(error.httpCode).send({
        message: error.message,
      });
    }

    return error;
  });

  fastify.register(privateRoutes);
  fastify.register(publicRoutes);
};

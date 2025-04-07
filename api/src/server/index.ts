/* eslint-disable no-console */
import FastifyCors from '@fastify/cors';
import FastifySwagger from '@fastify/swagger';
import FastifySwaggerUi from '@fastify/swagger-ui';
import Fastify from 'fastify';
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod';

import { routes } from './routes';

const fastify = Fastify().withTypeProvider<ZodTypeProvider>();

fastify.setValidatorCompiler(validatorCompiler);
fastify.setSerializerCompiler(serializerCompiler);

fastify.register(FastifyCors);
fastify.register(FastifySwagger, {
  openapi: {
    info: {
      title: 'Simple Auth API',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
});
fastify.register(FastifySwaggerUi, {
  routePrefix: '/docs',
});

fastify.register(routes);

fastify.setErrorHandler((error, _request, reply) => {
  console.log(error);

  return reply.code(500).send({ message: 'Internal server error.' });
});

export { fastify };

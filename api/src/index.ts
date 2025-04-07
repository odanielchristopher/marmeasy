/* eslint-disable no-console */
import 'dotenv/config';
import { fastify } from './server';

async function main() {
  try {
    const host = await fastify.listen({ port: 3001 });

    console.log(`> Server started at ${host}`);
  } catch (error) {
    console.log(error);
  }
}

main();

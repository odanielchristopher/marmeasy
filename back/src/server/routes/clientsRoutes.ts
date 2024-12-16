import express from 'express';

import { makeCreateClientController } from '../../factories/createClient/makeCreateClientController';
import { makeFindClientController } from '../../factories/findClient/makeFindClientController';
import { makeAuthenticationMiddleware } from '../../factories/authentication/makeAuthenticationMiddleware';
import { middlewareAdapter } from '../adapters/middlewareAdapter';
import { routeAdapter } from '../adapters/routeAdapter';

export const clientsRoutes = express();

clientsRoutes.post('/clients/create', 
    middlewareAdapter(makeAuthenticationMiddleware()),
    routeAdapter(makeCreateClientController()));
    
clientsRoutes.get('/clients/:id', 
    middlewareAdapter(makeAuthenticationMiddleware()),
    routeAdapter(makeFindClientController()));
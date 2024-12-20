import express from 'express';

import { makeAuthenticationMiddleware } from '../../factories/authentication/makeAuthenticationMiddleware';
import { makeCreateClientController } from '../../factories/createClient/makeCreateClientController';
import { makeDeleteClientController } from '../../factories/deleteClient/makeDeleteClientController';
import { makeEditClientController } from '../../factories/editClient/makeEditClientController';
import { makeFindClientController } from '../../factories/findClient/makeFindClientController';
import { makeGetAllClientsController } from '../../factories/getAllClients/makeGetAllClientsController';
import { middlewareAdapter } from '../adapters/middlewareAdapter';
import { routeAdapter } from '../adapters/routeAdapter';


export const clientsRoutes = express();

clientsRoutes.post('/clients',
    middlewareAdapter(makeAuthenticationMiddleware()),
    routeAdapter(makeCreateClientController()));

clientsRoutes.get('/clients/:id',
    middlewareAdapter(makeAuthenticationMiddleware()),
    routeAdapter(makeFindClientController()));

clientsRoutes.get('/clients',
    middlewareAdapter(makeAuthenticationMiddleware()),
    routeAdapter(makeGetAllClientsController()));

clientsRoutes.delete('/clients/:id',
    middlewareAdapter(makeAuthenticationMiddleware()),
    routeAdapter(makeDeleteClientController()));

clientsRoutes.put('/clients/:id',
    middlewareAdapter(makeAuthenticationMiddleware()),
    routeAdapter(makeEditClientController()));

import { Router } from 'express';

import { usersRoutes } from './usersRoutes';
import { clientsRoutes } from './clientsRoutes';

export const routes = Router();

routes.use(usersRoutes);
routes.use(clientsRoutes);
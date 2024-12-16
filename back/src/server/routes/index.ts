import { Router } from 'express';

import { clientsRoutes } from './clientsRoutes';
import { usersRoutes } from './usersRoutes';

export const routes = Router();

routes.use(usersRoutes);
routes.use(clientsRoutes);

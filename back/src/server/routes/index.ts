import { Router } from 'express';

import { usersRoutes } from './usersRoutes';
export const routes = Router();

routes.use(usersRoutes);

import { Router } from 'express';

import { userRoutes } from './userRoutes';

export const routes = Router();

routes.use(userRoutes);

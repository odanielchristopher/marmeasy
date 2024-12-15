import { Router } from 'express';

import { usersRoutes } from './usersRoutes';
console.log('passou por aqui');
export const routes = Router();

routes.use(usersRoutes);

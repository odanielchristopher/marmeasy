import express from 'express';

import { makeSignInController } from '../../factories/signIn/makeSignInController';
import { makeSignUpController } from '../../factories/signUp/makeSignUpController';

import { makeAuthenticationMiddleware } from '../../factories/authentication/makeAuthenticationMiddleware';
import { makeFindMeController } from '../../factories/findMe/makeFindMeController';
import { middlewareAdapter } from '../adapters/middlewareAdapter';
import { routeAdapter } from '../adapters/routeAdapter';

export const usersRoutes = express();

usersRoutes.post('/users/sign-up', routeAdapter(makeSignUpController()));
usersRoutes.post('/users/sign-in', routeAdapter(makeSignInController()));
usersRoutes.get('/users/find-me',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeFindMeController()),
);
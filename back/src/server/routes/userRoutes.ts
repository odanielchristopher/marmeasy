import express from 'express';

import { makeSignInController } from '../../factories/makeSignInController';
import { makeSignUpController } from '../../factories/makeSignUpController';

import { makeAuthenticationMiddleware } from '../../factories/makeAuthenticationMiddleware';
import { makeEditAccountController } from '../../factories/mekeEditAccountController';

import { middlewareAdapter } from '../adapters/middlewareAdapter';
import { routeAdapter } from '../adapters/routeAdapter';

export const userRoutes = express();

userRoutes.post('/user/sign-up', routeAdapter(makeSignUpController()));
userRoutes.post('/user/sign-in', routeAdapter(makeSignInController()));
userRoutes.put('/user/edit/:accountId',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeEditAccountController()),
);

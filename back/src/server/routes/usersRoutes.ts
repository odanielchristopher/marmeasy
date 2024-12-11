import express from 'express';

import { makeSignInController } from '../../factories/signIn/makeSignInController';
import { makeSignUpController } from '../../factories/signUp/makeSignUpController';

import { routeAdapter } from '../adapters/routeAdapter';

export const usersRoutes = express();

usersRoutes.post('/users/sign-up', routeAdapter(makeSignUpController()));
usersRoutes.post('/users/sign-in', routeAdapter(makeSignInController()));

import express from 'express';

import { makeAuthenticationMiddleware } from '../factories/makeAuthenticationMiddleware';
import { makeSignInController } from '../factories/makeSignInController';
import { makeSignUpController } from '../factories/makeSignUpController';
import { makeEditAccountController } from '../factories/mekeEditAccountController';

import { middlewareAdapter } from './adapters/middlewareAdapter';
import { routeAdapter } from './adapters/routeAdapter';

const app = express();

app.use(express.json());

app.post('/signUp', routeAdapter(makeSignUpController()));
app.post('/signIn', routeAdapter(makeSignInController()));

app.get('/editAccount',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeEditAccountController()),
);

app.listen(3001, () => console.log('Server started at http://localhost:3001'));

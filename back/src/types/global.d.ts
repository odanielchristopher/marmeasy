// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import * as express from 'express-serve-static-core';

declare global {
    namespace Express {
      interface Request {
        userId?: string;
      }
    }
}
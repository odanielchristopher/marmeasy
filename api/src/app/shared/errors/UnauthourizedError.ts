import { AppError, HttpCode } from './IAppError';

export class UnauthourizedError extends AppError {
  constructor(message = 'Unauthourized') {
    super(HttpCode.Unauthourized, message);
  }
}

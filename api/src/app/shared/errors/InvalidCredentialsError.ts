import { AppError, HttpCode } from './IAppError';

export class InvalidCredentialsError extends AppError {
  constructor(message = 'Invalid Credentials') {
    super(HttpCode.Unauthourized, message);
  }
}

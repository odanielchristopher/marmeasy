import { AppError, HttpCode } from './IAppError';

export class ForbiddenError extends AppError {
  constructor(message = 'Forbidden') {
    super(HttpCode.Forbidden, message);
  }
}

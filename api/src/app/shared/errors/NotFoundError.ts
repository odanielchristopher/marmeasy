import { AppError, HttpCode } from './IAppError';

export class NotFoundError extends AppError {
  constructor(message = 'Not Found') {
    super(HttpCode.NotFound, message);
  }
}

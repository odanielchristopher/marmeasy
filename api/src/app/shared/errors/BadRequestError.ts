import { AppError, HttpCode } from './IAppError';

export class BadRequestError extends AppError {
  constructor(message = 'Bad Request') {
    super(HttpCode.BadRequest, message);
  }
}

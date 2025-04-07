import { AppError, HttpCode } from './IAppError';

export class ConflictError extends AppError {
  constructor(message = 'Conflict') {
    super(HttpCode.Conflict, message);
  }
}

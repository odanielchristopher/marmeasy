export enum HttpCode {
  BadRequest = 400,
  Unauthourized = 401,
  Forbidden = 403,
  NotFound = 404,
  Conflict = 409,
}

export abstract class AppError extends Error {
  name = 'AppError';

  httpCode: number;

  message: string;

  constructor(httpCode: HttpCode, message: string) {
    super();
    this.httpCode = httpCode as number;
    this.message = message;
  }
}

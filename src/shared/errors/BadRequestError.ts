import HttpError from './HttpError';

export class BadRequestError extends HttpError {
  statusCode = 400;

  constructor(message: string) {
    super(message);
    this.name = "BadRequestError";
  }
}

export default BadRequestError;
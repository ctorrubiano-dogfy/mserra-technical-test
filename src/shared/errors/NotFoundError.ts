import HttpError from './HttpError';

export class NotFoundError extends HttpError {
  statusCode = 404;

  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

export default NotFoundError;
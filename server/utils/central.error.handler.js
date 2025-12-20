export class AppError extends Error {
  constructor(message, statusCode, context = null) {
    super(message);
    this.statusCode = statusCode;
    this.context = context;
    this.isAppError = true;
    Error.captureStackTrace(this, this.constructor);
  }

  static from(err, statusCode = 500, context = null) {
    const message = err instanceof Error ? err.message : String(err);
    const appError = new AppError(message, statusCode, context);
    appError.original = err;
    return appError;
  }
}

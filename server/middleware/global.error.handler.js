import { AppError } from "../utils/central.error.handler.js";

export const globalErrorHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      code: err.statusCode,
      message: err.message,
      context: err.context
    });
  } else {
    res.status(500).json({
      message: "Internal Server Error",
      error: err.message // optional: log original error
    });
  }
};

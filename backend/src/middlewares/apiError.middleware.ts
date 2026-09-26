import { NextFunction, Request, Response } from "express";

type ApiError = Error & {
  statusCode?: number;
  errors?: unknown[];
  data?: unknown;
  success?: boolean;
};

const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err.name === "ApiError") {
    return res.status(err.statusCode ?? 500).json({
      success: false,
      message: err.message,
      errors: err.errors ?? [],
      data: err.data ?? null,
    });
  }

  return res.status(500).json({
    success: false,
    statusCode: 500,
    message: err.message || "Internal Server Error",
    data: null,
    errors: [],
  });
};

export default errorHandler;

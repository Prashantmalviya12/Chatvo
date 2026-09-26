type apiErrorType = {
  statusCode: number;
  message?: string;
  errors?: unknown[];
  data?: unknown;
};

export const ApiError = ({
    message = "Something Went Wrong",
  statusCode,
  errors = [],
  data = null,
}: apiErrorType) => {
  const error = new Error(message);
  error.name = "ApiError";

  return Object.assign(error, { statusCode, errors, success: false, data });
};

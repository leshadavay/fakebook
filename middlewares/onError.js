import ErrorHandler from "../utils/errorHandler";

const onError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  let error = { ...err, message: err.message };

  //handle for wrong mongo db object id
  if (err.name === "CastError") {
    const message = `Invalid: ${err.path}`;
    error = new ErrorHandler(message, 400);
  }

  //handle validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((value) => value.message);
    error = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    error,
    success: false,
    message: error.message,
    stack: error.stack,
  });
};

export default onError;

// const { CustomAPIError } = require('../errors');
const { StatusCodes } = require('http-status-codes');
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || 'error... something went wrong',
  };
  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ message: err.message });
  // }
  if (err.name === 'ValidationError') {
    customError.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(' and ');
    customError.statusCode = 400;
  }
  if (err.code && err.code === 11000) {
    customError.message = `user with email '${err.keyValue.email}' already exist.`;
    customError.statusCode = 400;
  }
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
  return res
    .status(customError.statusCode)
    .json({ message: customError.message });
};

module.exports = errorHandlerMiddleware;

const { NotFound } = require('http-errors');
const createError = require('http-errors');
const { ValidationError } = require('express-validation');

const { ERROR_CODES } = require('../helpers/errorCodes');
const response = require('../helpers/response');

const notFoundErrorHandler = (_req, _res, next) => {
  next(createError(404));
};

// eslint-disable-next-line no-unused-vars
const globalErrorHandler = (err, _req, res, _next) => {
  if (err instanceof NotFound) {
    return response.notFound(res, ERROR_CODES.NOT_FOUND);
  }

  if (err instanceof ValidationError) {
    return response.badRequest(res, ERROR_CODES.VALIDATION_ERROR, err);
  }

  console.log(err);

  return response.error(res, ERROR_CODES.UNKNOWN_ERROR, null);
};

module.exports = {
  globalErrorHandler,
  notFoundErrorHandler,
};

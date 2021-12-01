const { validate, Joi } = require('express-validation');

const { ERROR_CODES } = require('../helpers/errorCodes');

const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;

const registerUserValidator = validate(
  {
    body: Joi.object({
      username: Joi.string().min(3).required(),
      password: Joi.string().pattern(PASSWORD_PATTERN).message(ERROR_CODES.PASSWORD_STRENGTH).required(),
      role: Joi.string().valid('buyer', 'seller'),
    }),
  },
  {},
);

const updateUserValidator = validate(
  {
    body: Joi.object({
      username: Joi.string().min(3),
      password: Joi.string().allow('').pattern(PASSWORD_PATTERN).message(ERROR_CODES.PASSWORD_STRENGTH),
    }),
  },
  {},
);

const depositValidator = validate(
  {
    body: Joi.object({
      coin: Joi.number().min(5).valid(100, 50, 20, 10, 5).required(),
    }).required(),
  },
  {},
);

const buyValidator = validate(
  {
    body: Joi.object({
      productId: Joi.string().length(36).required(),
      numberOfProducts: Joi.number().integer().min(1).required(),
    }),
  },
  {},
);

module.exports = {
  registerUserValidator,
  updateUserValidator,
  depositValidator,
  buyValidator,
};

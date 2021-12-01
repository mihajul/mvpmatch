const { validate } = require('express-validation');
const Joi = require('joi');

const validPrice = (value) => {
  if (value % 5 !== 0) {
    throw new Error('must be divisible by 5');
  }

  return value;
};

const createProductValidator = validate(
  {
    body: Joi.object({
      cost: Joi.number().min(5).required().custom(validPrice),
      productName: Joi.string().min(3).required(),
      amountAvailable: Joi.number().integer().min(1).required(),
    }),
  },
  {},
);

const updateProductValidator = validate(
  {
    body: Joi.object({
      cost: Joi.number().min(5).custom(validPrice),
      productName: Joi.string().min(3),
      amountAvailable: Joi.number().integer().min(1),
    }),
  },
  {},
);

module.exports = {
  createProductValidator,
  updateProductValidator,
};

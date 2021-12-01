const { validate, Joi } = require('express-validation');

const loginValidator = validate(
  {
    body: Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
    }),
  },
  {},
);

module.exports = {
  loginValidator,
};

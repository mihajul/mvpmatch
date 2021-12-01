const response = require('../helpers/response');
const { ERROR_CODES } = require('../helpers/errorCodes');

module.exports = (req, res, next) => {
  if (!req.session.loggedIn) {
    return response.unauthorized(res, ERROR_CODES.UNAUTHORIZED, null);
  }
  next();
};

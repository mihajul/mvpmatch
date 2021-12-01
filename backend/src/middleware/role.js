const response = require('../helpers/response');
const { ERROR_CODES } = require('../helpers/errorCodes');
const db = require('../models');

module.exports = (seller) => async (req, res, next) => {
  let role = db.User.ROLE_BUYER;
  if (seller) {
    role = db.User.ROLE_SELLER;
  }

  const user = await db.User.findOne({
    where: { id: req.session.userId, role },
    attributes: ['id', 'role'],
  });

  if (!user) {
    return response.forbidden(res, ERROR_CODES.FORBIDDEN, null);
  }
  next();
};

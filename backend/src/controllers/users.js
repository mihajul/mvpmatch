const bcrypt = require('bcrypt');

const response = require('../helpers/response');
const { ERROR_CODES } = require('../helpers/errorCodes');
const db = require('../models');
const config = require('../config/app');

const register = async (req, res, next) => {
  try {
    const { username, password, role } = req.body;

    const user = await db.User.findOne({
      where: { username },
      attributes: ['id', 'username'],
    });

    if (user) {
      return response.conflict(res, ERROR_CODES.USER_ALREADY_EXISTS);
    }

    const pass = await bcrypt.hash(password, config.bcryptSaltRounds);

    const createdUser = await db.User.create({
      username,
      password: pass,
      role,
    });

    return response.created(res, 'User created', { id: createdUser.id });
  } catch (e) {
    next(e);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await db.User.findOne({
      where: { id: req.session.userId },
      attributes: ['id', 'username', 'deposit', 'role'],
    });

    return response.success(res, null, user);
  } catch (e) {
    next(e);
  }
};

const deposit = async (req, res, next) => {
  try {
    const { coin } = req.body;

    const user = await db.User.findOne({
      where: { id: req.session.userId },
      attributes: ['id', 'username', 'deposit', 'role'],
    });

    user.deposit += coin;
    await user.save();

    return response.success(res, null, user);
  } catch (e) {
    next(e);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await db.User.findOne({
      where: { id: req.session.userId },
      attributes: ['id', 'username', 'deposit', 'role'],
    });

    if (!user) {
      return response.notFound(res, ERROR_CODES.NOT_FOUND);
    }

    if (username) {
      const existingUser = await db.User.findOne({
        where: { username },
      });

      if (existingUser && existingUser.id !== req.session.userId) {
        return response.conflict(res, ERROR_CODES.USER_ALREADY_EXISTS);
      }

      user.username = username;
    }

    if (password) {
      const pass = await bcrypt.hash(password, config.bcryptSaltRounds);
      user.password = pass;
    }

    await user.save();

    return response.success(res);
  } catch (e) {
    next(e);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    await db.User.destroy({ where: { id: req.session.userId } });
    await req.session.destroy();

    return response.success(res);
  } catch (e) {
    next(e);
  }
};

const resetDeposit = async (req, res, next) => {
  try {
    const user = await db.User.findOne({
      where: { id: req.session.userId },
      attributes: ['id', 'username', 'deposit', 'role'],
    });

    user.deposit = 0;
    await user.save();

    return response.success(res, null, user);
  } catch (e) {
    next(e);
  }
};

const buy = async (req, res, next) => {
  try {
    const { productId, numberOfProducts } = req.body;

    const user = await db.User.findOne({
      where: { id: req.session.userId },
      attributes: ['id', 'username', 'deposit', 'role'],
    });

    const product = await db.Product.findOne({
      where: { id: productId },
    });

    if (!product) {
      return response.notFound(res, ERROR_CODES.NOT_FOUND);
    }

    if (product.amountAvailable < numberOfProducts) {
      return response.forbidden(res, ERROR_CODES.NOT_ENOUGH_PRODUCTS);
    }

    const cost = product.cost * numberOfProducts;
    if (cost > user.deposit) {
      return response.forbidden(res, ERROR_CODES.INSUFFICIENT_FUNDS);
    }

    const rest = user.deposit - cost;

    user.deposit = 0;
    await user.save();

    product.amountAvailable -= numberOfProducts;
    await product.save();

    const ret = {
      product,
      numberOfProducts,
      spent: cost,
      coins: calculateCoins(rest),
    };
    return response.success(res, null, ret);
  } catch (e) {
    next(e);
  }
};

const calculateCoins = (total) => {
  let remainder = total;
  const change = [];
  db.User.COINS.forEach((coin) => {
    change.push(Math.floor(remainder / coin));
    remainder %= coin;
  });

  return change.reverse();
};

module.exports = {
  getCurrentUser,
  register,
  updateUser,
  deleteUser,
  deposit,
  resetDeposit,
  buy,
};

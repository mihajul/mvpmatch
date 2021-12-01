const bcrypt = require('bcrypt');
const dayjs = require('dayjs');

const response = require('../helpers/response');
const { ERROR_CODES } = require('../helpers/errorCodes');
const db = require('../models');

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await db.User.findOne({
      where: { username },
      attributes: ['id', 'username', 'password'],
    });

    if (!user) {
      return response.forbidden(res, ERROR_CODES.INVALID_USERNAME_OR_PASSWORD);
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return response.forbidden(res, ERROR_CODES.INVALID_USERNAME_OR_PASSWORD);
    }

    req.session.loggedIn = true;
    req.session.userId = user.id;

    return response.success(res, 'Session created', { id: user.id });
  } catch (e) {
    next(e);
  }
};

const logoutAll = async (req, res) => {
  const sessions = await req.sessionStore.sessionModel.findAll();

  for (const session of sessions) {
    if (JSON.parse(session.dataValues.data).userId === req.session.userId && session.sid !== req.session.id) {
      await req.sessionStore.sessionModel.destroy({
        where: { sid: session.sid },
      });
    }
  }
  return response.success(res, 'Sessions destroyed');
};

const logout = async (req, res) => {
  await req.session.destroy();
  return response.success(res, 'Session destroyed');
};

const getCurrent = async (req, res) => {
  await req.session.touch();

  const sessions = await req.sessionStore.sessionModel.findAll();

  const userSessions = sessions.filter((session) => {
    const data = JSON.parse(session.dataValues.data);
    return data.userId === req.session.userId && dayjs(session.expires).isAfter(dayjs());
  });

  return response.success(res, null, {
    isLoggedIn: Boolean(req.session.loggedIn),
    sessions: userSessions.length,
  });
};

module.exports = {
  login,
  logout,
  logoutAll,
  getCurrent,
};

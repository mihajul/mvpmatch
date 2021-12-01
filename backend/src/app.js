require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const { globalErrorHandler, notFoundErrorHandler } = require('./middleware/errorHandlers');
const indexRouter = require('./routes/index');
const sessionsRouter = require('./routes/sessions');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const config = require('./config/app');
const sequelize = require('./db');

const app = express();

app.use(logger('dev'));

const corsOptions = {
  origin: config.appUrl,
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

app.use(
  session({
    secret: config.cookieSecret,
    store: new SequelizeStore({
      db: sequelize,
    }),
    saveUninitialized: false,
    resave: false,
    rolling: true,
    cookie: {
      maxAge: config.cookieMaxAge,
      httpOnly: true,
      secure: config.cookieSecure,
    },
  }),
);

const router = express.Router();

router.use('/', indexRouter);
router.use('/sessions', sessionsRouter);
router.use('/users', usersRouter);
router.use('/products', productsRouter);

app.use('/api', router);

app.use(notFoundErrorHandler);
app.use(globalErrorHandler);

module.exports = app;

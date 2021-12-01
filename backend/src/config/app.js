const ENVIRONMENT = process.env.NODE_ENV || 'development';

const config = {
  cookieSecret: process.env.COOKIE_SECRET || 'Lcb5w0pWuNag6IR5',
  cookieMaxAge: (process.env.COOKIE_MAX_AGE_MINUTES || 10) * 60 * 1000,
  cookieSecure: ENVIRONMENT === 'production',
  bcryptSaltRounds: 10,
  appUrl: process.env.APP_URL,
};

module.exports = config;

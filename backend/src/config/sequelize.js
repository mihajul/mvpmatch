require('dotenv').config();

const ENVIRONMENT = process.env.NODE_ENV || 'development';

const defaultConfig = {
  url: process.env.DATABASE_URL,
  dialect: 'postgres',
  logging: false,
};

const config = {
  development: {
    ...defaultConfig,
  },
  test: {
    ...defaultConfig,
    url: process.env.DATABASE_TEST_URL,
  },
  production: {
    ...defaultConfig,
    ssl: true,
    dialectOptions: {
      ssl: true,
    },
  },
};

module.exports = config[ENVIRONMENT];

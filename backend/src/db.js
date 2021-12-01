const Sequelize = require('sequelize');

const config = require('./config/sequelize');

const sequelize = new Sequelize(config.url, config);

module.exports = sequelize;

const sequelize = require('../src/db');

afterAll(() => sequelize.close());

const request = require('supertest');
const bcrypt = require('bcrypt');

const db = require('../src/models');
const config = require('../src/config/app');

const TEST_PASSWORD = 'asdQWE123!';
const TEST_SELLER_USERNAME = 'test_seller';
const TEST_BUYER_USERNAME = 'test_buyer';

const createUser = async (type) => {
  let username = TEST_BUYER_USERNAME;
  if (type === 'seller') {
    username = TEST_SELLER_USERNAME;
  }

  const hashedPassword = await bcrypt.hash(TEST_PASSWORD, config.bcryptSaltRounds);

  try {
    let user = await db.User.findOne({
      where: {
        username,
      },
    });

    if (!user) {
      user = await db.User.create({
        username,
        password: hashedPassword,
        role: 'seller',
      });
    }
    return user;
  } catch (error) {
    console.debug('Skipping creation. User already exists.');
  }
};

const createProduct = async () => {
  try {
    const user = await createUser('seller');

    let product = await db.Product.findOne({
      where: {
        productName: 'test_product',
      },
    });
    if (!product) {
      product = await db.Product.create({
        productName: 'test_product',
        cost: 10,
        amountAvailable: 15,
        sellerId: user.id,
      });
    }
    return product;
  } catch (error) {
    console.debug('Skipping creation. Product already exists.');
  }
};

const login = async (app, type) => {
  let username = TEST_BUYER_USERNAME;

  if (type === 'seller') {
    username = TEST_SELLER_USERNAME;
    await createUser('seller');
  } else {
    await createUser('buyer');
  }

  const response = await request(app).post('/api/sessions').send({
    username,
    password: TEST_PASSWORD,
  });

  const [cookie] = response.header['set-cookie'][0].split(';');

  return {
    cookie,
    userId: response.body.data.id,
  };
};

module.exports = {
  TEST_SELLER_USERNAME,
  TEST_BUYER_USERNAME,
  createUser,
  login,
  createProduct,
};

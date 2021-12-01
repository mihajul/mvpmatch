const request = require('supertest');

const app = require('../../src/app');
const { login, createProduct } = require('../util');

describe('Register endpoint ', () => {
  it('should create a new buyer user', async () => {
    const res = await request(app).post('/api/users').send({
      username: 'test_buyer',
      password: 'asdQWE123!',
      role: 'buyer',
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('success', true);
  });

  it('should create a new seller user', async () => {
    const res = await request(app).post('/api/users').send({
      username: 'test_seller',
      password: 'asdQWE123!',
      role: 'seller',
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('success', true);
  });

  it('should not create a user with duplicate username', async () => {
    const res = await request(app).post('/api/users').send({
      username: 'test_seller',
      password: 'asdQWE123!',
      role: 'seller',
    });

    expect(res.statusCode).toEqual(409);
    expect(res.body).toHaveProperty('success', false);
  });
});

describe('Deposit endpoint ', () => {
  let sellerCookie;
  let buyerCookie;

  beforeAll(async () => {
    ({ cookie: buyerCookie } = await login(app, 'buyer'));
    ({ cookie: sellerCookie } = await login(app, 'seller'));
  });

  it('should deposit a coin for a buyer', async () => {
    const res = await request(app).post('/api/users/deposit').set('Cookie', buyerCookie).send({
      coin: 100,
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body.data).toHaveProperty('deposit', 100);
  });

  it('should deposit another coin for a buyer', async () => {
    const res = await request(app).post('/api/users/deposit').set('Cookie', buyerCookie).send({
      coin: 20,
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body.data).toHaveProperty('deposit', 120);
  });

  it('should not deposit a coin for a seller', async () => {
    const res = await request(app).post('/api/users/deposit').set('Cookie', sellerCookie).send({
      coin: 100,
    });
    expect(res.statusCode).toEqual(403);
    expect(res.body).toHaveProperty('success', false);
  });
});

describe('Buy endpoint ', () => {
  let sellerCookie;
  let buyerCookie;

  beforeAll(async () => {
    ({ cookie: buyerCookie } = await login(app, 'buyer'));
    ({ cookie: sellerCookie } = await login(app, 'seller'));
  });

  it('should not allow a seller to buy', async () => {
    const product = await createProduct();
    const res = await request(app).post('/api/users/buy').set('Cookie', sellerCookie).send({
      productId: product.id,
      numberOfProducts: 4,
    });
    expect(res.statusCode).toEqual(403);
    expect(res.body).toHaveProperty('success', false);
  });

  it('should buy a product', async () => {
    const product = await createProduct();
    const res = await request(app).post('/api/users/buy').set('Cookie', buyerCookie).send({
      productId: product.id,
      numberOfProducts: 4,
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body.data).toHaveProperty('spent', 40);
    expect(res.body.data).toHaveProperty('coins', [0, 1, 1, 1, 0]);
  });

  it("should not buy a product if there aren't sufficient products", async () => {
    const product = await createProduct();
    const res = await request(app).post('/api/users/buy').set('Cookie', buyerCookie).send({
      productId: product.id,
      numberOfProducts: 20,
    });
    expect(res.statusCode).toEqual(403);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('message', 'Not enough products');
  });

  it("should not buy a product if there aren't sufficient funds", async () => {
    const product = await createProduct();
    const res = await request(app).post('/api/users/buy').set('Cookie', buyerCookie).send({
      productId: product.id,
      numberOfProducts: 10,
    });
    expect(res.statusCode).toEqual(403);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('message', 'Insufficient funds');
  });
});

describe('Create product endpoint ', () => {
  let sellerCookie;
  let buyerCookie;
  let sellerUserId;

  beforeAll(async () => {
    ({ cookie: buyerCookie } = await login(app, 'buyer'));
    ({ cookie: sellerCookie, userId: sellerUserId } = await login(app, 'seller'));
  });

  it('should not allow a buyer to create a product', async () => {
    const res = await request(app).post('/api/products').set('Cookie', buyerCookie).send({
      productName: 'test_product1',
      cost: 5,
      amountAvailable: 10,
    });
    expect(res.statusCode).toEqual(403);
    expect(res.body).toHaveProperty('success', false);
  });

  it('should create a product', async () => {
    let res = await request(app).post('/api/products').set('Cookie', sellerCookie).send({
      productName: 'test_product1',
      cost: 25,
      amountAvailable: 10,
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('success', true);

    const productId = res.body.data.id;

    res = await request(app).get(`/api/products/${productId}`).set('Cookie', sellerCookie).send();
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body.data).toHaveProperty('productName', 'test_product1');
    expect(res.body.data).toHaveProperty('cost', 25);
    expect(res.body.data).toHaveProperty('amountAvailable', 10);
    expect(res.body.data).toHaveProperty('sellerId', sellerUserId);
  });
});

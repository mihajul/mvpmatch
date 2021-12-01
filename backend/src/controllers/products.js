var validateUUID = require('uuid-validate');

const response = require('../helpers/response');
const { ERROR_CODES } = require('../helpers/errorCodes');
const db = require('../models');

const createProduct = async (req, res, next) => {
  try {
    const { productName, amountAvailable, cost } = req.body;

    const createdProduct = await db.Product.create({
      productName,
      amountAvailable,
      cost,
      sellerId: req.session.userId,
    });

    return response.created(res, 'Product created', { id: createdProduct.id });
  } catch (e) {
    next(e);
  }
};

const getProducts = async (req, res, next) => {
  const { sellerId } = req.params;

  try {
    let where = {};

    if (sellerId) {
      where = {
        sellerId,
      };
    }
    const user = await db.Product.findAll({
      where,
      attributes: ['id', 'productName', 'cost', 'amountAvailable'],
      include: [
        {
          model: db.User,
          attributes: ['id', 'username'],
        },
      ],
    });

    return response.success(res, null, user);
  } catch (e) {
    next(e);
  }
};

const getProduct = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!validateUUID(id)) {
      return response.badRequest(res, ERROR_CODES.BAD_REQUEST);
    }

    const product = await db.Product.findByPk(id);

    if (!product) {
      return response.notFound(res, ERROR_CODES.NOT_FOUND);
    }

    return response.success(res, null, product);
  } catch (e) {
    next(e);
  }
};

const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const { productName, amountAvailable, cost } = req.body;

  try {
    if (!validateUUID(id)) {
      return response.badRequest(res, ERROR_CODES.BAD_REQUEST);
    }

    const existingProduct = await db.Product.findByPk(id);

    if (!existingProduct) {
      return response.notFound(res, ERROR_CODES.NOT_FOUND);
    }

    if (existingProduct.sellerId !== req.session.userId) {
      return response.forbidden(res, ERROR_CODES.FORBIDDEN);
    }

    existingProduct.productName = productName;
    existingProduct.cost = cost;
    existingProduct.amountAvailable = amountAvailable;

    await existingProduct.save();

    return response.success(res, null, existingProduct);
  } catch (e) {
    next(e);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!validateUUID(id)) {
      return response.badRequest(res, ERROR_CODES.BAD_REQUEST);
    }

    const existingProduct = await db.Product.findByPk(id);

    if (!existingProduct) {
      return response.notFound(res, ERROR_CODES.NOT_FOUND);
    }

    if (existingProduct.sellerId !== req.session.userId) {
      return response.forbidden(res, ERROR_CODES.FORBIDDEN);
    }

    await db.Product.destroy({
      where: {
        id,
      },
    });

    return response.success(res);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};

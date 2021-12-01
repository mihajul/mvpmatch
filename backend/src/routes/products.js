const express = require('express');

const auth = require('../middleware/auth');
const role = require('../middleware/role');
const { createProduct, getProducts, getProduct, updateProduct, deleteProduct } = require('../controllers/products');
const { updateProductValidator, createProductValidator } = require('../validators/products');

const router = express.Router();

router.post('/', auth, role(true), createProductValidator, createProduct);
router.get('/', auth, getProducts);
router.get('/:id', auth, getProduct);
router.get('/users/:sellerId', auth, getProducts);

router.put('/:id', auth, role(true), updateProductValidator, updateProduct);
router.delete('/:id', auth, role(true), deleteProduct);

module.exports = router;

const express = require('express');

const router = express.Router();
const response = require('../helpers/response');

router.get('/', (req, res) => response.success(res, 'Success', {}));

module.exports = router;

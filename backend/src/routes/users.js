const express = require('express');

const auth = require('../middleware/auth');
const {
  register,
  getCurrentUser,
  updateUser,
  deleteUser,
  resetDeposit,
  deposit,
  buy,
} = require('../controllers/users');
const { registerUserValidator, updateUserValidator, depositValidator, buyValidator } = require('../validators/users');
const role = require('../middleware/role');

const router = express.Router();

router.post('/', registerUserValidator, register);
router.get('/me', auth, getCurrentUser);
router.put('/me', auth, updateUserValidator, updateUser);
router.delete('/me', auth, deleteUser);

router.post('/reset', auth, role(false), resetDeposit);
router.post('/deposit', auth, role(false), depositValidator, deposit);
router.post('/buy', auth, role(false), buyValidator, buy);

module.exports = router;

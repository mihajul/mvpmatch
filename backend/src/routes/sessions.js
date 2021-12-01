const express = require('express');

const auth = require('../middleware/auth');
const sessionsController = require('../controllers/sessions');
const { loginValidator } = require('../validators/sessions');

const router = express.Router();

router.post('/', loginValidator, sessionsController.login);
router.delete('/current', auth, sessionsController.logout);
router.delete('/all', auth, sessionsController.logoutAll);
router.get('/current', sessionsController.getCurrent);

module.exports = router;

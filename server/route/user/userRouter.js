const router = require('express').Router();
const controller = require('./userController');
const auth = require('../auth');

router.get('/', auth.isLoggedIn, auth.isAdmin, controller.get);
router.post('/', controller.post);

router.get('/me', auth.isLoggedIn, controller.me);

module.exports = router;

const router = require('express').Router();
const controller = require('./userController');
const auth = require('../auth');

router.get('/', auth.redirectIfNeedsLogin, auth.redirectIfNeedsAdmin, controller.get);
router.post('/', controller.post);

router.get('/me', auth.redirectIfNeedsLogin, controller.me);

module.exports = router;

const router = require('express').Router();
const auth = require('../auth');
const controller = require('./rootController');

router.get('/', auth.redirectIfNeedsLogin, controller.getMenu, controller.get);

module.exports = router;

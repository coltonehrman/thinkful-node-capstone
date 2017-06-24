const router = require('express').Router();
const controller = require('./rootController');

router.get('/', controller.getMenu, controller.get);

module.exports = router;

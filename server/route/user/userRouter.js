const router = require('express').Router();
const controller = require('./userController');

router.get('/', controller.get);

module.exports = router;

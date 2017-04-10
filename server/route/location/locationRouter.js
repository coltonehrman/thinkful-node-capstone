const router = require('express').Router();
const controller = require('./locationController');

router.get('/', controller.get, controller.getOne);

module.exports = router;

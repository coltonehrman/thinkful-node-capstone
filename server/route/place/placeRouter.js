const router = require('express').Router();
const controller = require('./placeController');

router.get('/', controller.get, controller.getByLocationId);

module.exports = router;

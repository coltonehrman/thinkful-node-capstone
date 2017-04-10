const router = require('express').Router();
const controller = require('./placeController');

router.get('/', controller.get);
router.get('/:name', controller.getOne);

module.exports = router;

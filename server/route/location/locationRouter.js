const router = require('express').Router();
const controller = require('./locationController');

router.get('/', controller.get, controller.getOne);
router.post('/', controller.post);

module.exports = router;

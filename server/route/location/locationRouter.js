const router = require('express').Router();
const controller = require('./locationController');

router.get('/', controller.get, controller.getOne);
router.post('/', controller.post);

router.get('/:id', controller.getById);

module.exports = router;

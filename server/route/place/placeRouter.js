const router = require('express').Router();
const controller = require('./placeController');

router.get('/', controller.get, controller.getByLocationId);
router.post('/', controller.savePhoto, controller.post);
router.delete('/:id', controller.delete);

module.exports = router;

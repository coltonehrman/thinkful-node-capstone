const router = require('express').Router();
const auth = require('../auth');
const controller = require('./locationController');

router.get('/', controller.get, controller.getOne);
router.post('/', controller.post);

router.get('/:id', auth.redirectIfNeedsLogin, controller.getLocationPageMenu, controller.getLocationPage);

module.exports = router;

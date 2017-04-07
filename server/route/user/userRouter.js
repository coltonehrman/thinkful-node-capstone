const router = require('express').Router();
const controller = require('./userController');

router.get('/', controller.get);
router.post('/', controller.post);

module.exports = router;

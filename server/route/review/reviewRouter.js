const router = require('express').Router();
const controller = require('./reviewController');

router.post('/', controller.post);
//router.delete('/:id', controller.delete);

module.exports = router;

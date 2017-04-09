const router = require('express').Router();
const controller = require('./authController');

router.get('/login', controller.getLoginMenu, controller.getLogin);
router.post('/login', controller.postLogin);

router.get('/signup', controller.getSignupMenu, controller.getSignup);

router.get('/logout', controller.logout);

module.exports = router;

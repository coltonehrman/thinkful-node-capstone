const logger = require('../../util/logger');

exports.isLoggedIn = (req, res, next) => {
  if (!req.user) {
    logger.error('User is not logged in!');
    return res.redirect('/login');
  }
  return next();
};

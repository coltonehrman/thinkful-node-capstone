const fn = require('../../util/functions');
const logger = require('../../util/logger');

exports.redirectIfNeedsLogin = (req, res, next) => {
  if (!fn.isLoggedIn(req.user)) {
    logger.error('User is not logged in!');
    return res.redirect('/login');
  }
  return next();
};

exports.redirectIfNeedsAdmin = (req, res, next) => {
  if (!fn.isAdmin(req.user)) {
    logger.error('User is not authorized!');
    return res.redirect('/');
  }
  return next();
};

exports.login = (user, req, res, next) => {
  req.login(user, (err) => {
    if (err) {
      return next(err);
    }
    return res.json({ redirect: '/' });
  });
};

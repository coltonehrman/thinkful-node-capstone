const logger = require('../../util/logger');

exports.isLoggedIn = (req, res, next) => {
  if (!req.user) {
    logger.error('User is not logged in!');
    return res.redirect('/login');
  }
  return next();
};

exports.isAdmin = (req, res, next) => {
  if (!req.user.admin) {
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

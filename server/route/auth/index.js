const fn = require('../../util/functions');
const logger = require('../../util/logger');

exports.redirectIfNeedsLogin = (req, res, next) => {
  let url = '/login';
  if (!fn.isLoggedIn(req.user)) {
    logger.error('User is not logged in!');
    if (req.params.id) {
      url += `?redirect=${req.params.id}`;
    }
    return res.redirect(url);
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

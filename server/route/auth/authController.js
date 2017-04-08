const path = require('path');
const ejs = require('ejs');
const passport = require('passport');
const logger = require('../../util/logger');
const { compiler } = require('../../middleware/webpackMiddleware');

exports.getLogin = (req, res, next) => {
  compiler.outputFileSystem.readFile(path.resolve(compiler.outputPath, 'login.ejs'), (err, file) => {
    if (err) {
      return next(err);
    }
    res.set('content-type', 'text/html');
    return res.send(ejs.render(file.toString(), { navItems: [] }));
  });
};

exports.postLogin = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      logger.log('err login');
      return next(err);
    }
    if (!user) {
      logger.log('bad login');
      return res.status(401).json({ message: info.message });
    }
    return req.login(user, (loginErr) => {
      if (loginErr) {
        return next(err);
      }
      // from where user came
      return res.json({ redirect: '/' });
    });
  })(req, res, next);
};

exports.getSignup = (req, res, next) => {
  compiler.outputFileSystem.readFile(path.resolve(compiler.outputPath, 'signup.ejs'), (err, file) => {
    if (err) {
      return next(err);
    }
    res.set('content-type', 'text/html');
    return res.send(ejs.render(file.toString(), { navItems: [] }));
  });
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/is-loggedout');
};

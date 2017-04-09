const path = require('path');
const ejs = require('ejs');
const passport = require('passport');
const logger = require('../../util/logger');
const { getMenu } = require('../../util/functions');
const { compiler } = require('../../middleware/webpackMiddleware');

exports.getLoginMenu = (req, res, next) => {
  const items = [
    {
      text: 'Home',
      link: '/',
      onLoggedIn: true,
    },
    {
      text: 'Signup',
      link: '/signup',
      onLoggedIn: false,
    },
  ];

  req.menu = getMenu(items, typeof req.user !== 'undefined');
  next();
};

exports.getLogin = (req, res, next) => {
  compiler.outputFileSystem.readFile(path.resolve(compiler.outputPath, 'login.ejs'), (err, file) => {
    if (err) {
      return next(err);
    }
    res.set('content-type', 'text/html');
    return res.send(ejs.render(file.toString(), { menu: req.menu }));
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

exports.getSignupMenu = (req, res, next) => {
  const items = [
    {
      text: 'Home',
      link: '/',
      onLoggedIn: true,
      onLoggedOut: false,
    },
    {
      text: 'Login',
      link: '/login',
      onLoggedIn: false,
      onLoggedOut: true,
    },
  ];

  req.menu = getMenu(items, typeof req.user !== 'undefined');
  next();
};

exports.getSignup = (req, res, next) => {
  compiler.outputFileSystem.readFile(path.resolve(compiler.outputPath, 'signup.ejs'), (err, file) => {
    if (err) {
      return next(err);
    }
    res.set('content-type', 'text/html');
    return res.send(ejs.render(file.toString(), { menu: req.menu }));
  });
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/is-loggedout');
};

const ejs = require('ejs');
const passport = require('passport');
const logger = require('../../util/logger');
const { getMenu, getFile } = require('../../util/functions');

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
  getFile('login.ejs')
    .then((file) => {
      if (file) {
        res.set('content-type', 'text/html');
        return res.send(ejs.render(file.toString(), { redirect: req.query.redirect, menu: req.menu }));
      }
      return res.render('login', { menu: req.menu });
    })
    .catch(err => next(err));
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
      if (req.body.redirect) {
        return res.json({ redirect: `/locations/${req.body.redirect}` });
      }
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
  getFile('signup.ejs')
    .then((file) => {
      if (file) {
        res.set('content-type', 'text/html');
        return res.send(ejs.render(file.toString(), { menu: req.menu }));
      }
      return res.render('signup', { menu: req.menu });
    })
    .catch(err => next(err));
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/login');
};

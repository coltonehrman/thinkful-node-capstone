const path = require('path');
const passport = require('passport');
const { compiler } = require('../../middleware/webpackMiddleware');

exports.getLogin = (req, res, next) => {
  compiler.outputFileSystem.readFile(path.resolve(compiler.outputPath, 'login.html'), (err, file) => {
    if (err) {
      return next(err);
    }
    res.set('content-type', 'text/html');
    return res.send(file);
  });
};

exports.postLogin = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.log('bad login');
      return next(err);
    }
    if (!user) {
      console.log('bad login');
      return res.json({ message: info.message });
    }
    return req.login(user, (loginErr) => {
      if (loginErr) {
        return next(err);
      }
      // from where user came
      return res.redirect('/');
    });
  })(req, res, next);
};

exports.getSignup = (req, res, next) => {
  compiler.outputFileSystem.readFile(path.resolve(compiler.outputPath, 'signup.html'), (err, file) => {
    if (err) {
      return next(err);
    }
    res.set('content-type', 'text/html');
    return res.send(file);
  });
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/is-loggedout');
};

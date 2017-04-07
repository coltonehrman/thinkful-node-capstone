const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../config/webpack.config.development');
const logger = require('./util/logger');
const userRouter = require('./route/user/userRouter');

const app = express();

require('./middleware/appMiddleware')(app);
const passport = require('./middleware/passportMiddleware')(app);

const compiler = webpack(webpackConfig);

mongoose.Promise = global.Promise;
mongoose.connect(config.db.url);

function isLoggedIn(req, res, next) {
  if (!req.user) {
    logger.error('User is not logged in!');
    return res.redirect('/login');
  }
  return next();
}

app.get('/login', (req, res, next) => {
  compiler.outputFileSystem.readFile(path.resolve(compiler.outputPath, 'login.html'), (err, file) => {
    if (err) {
      return next(err);
    }
    res.set('content-type', 'text/html');
    return res.send(file);
  });
});

app.get('/', isLoggedIn, (req, res, next) => {
  compiler.outputFileSystem.readFile(path.resolve(compiler.outputPath, 'main.html'), (err, file) => {
    if (err) {
      return next(err);
    }
    res.set('content-type', 'text/html');
    return res.send(file);
  });
});

app.use('/users', userRouter);

app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.log('bad login');
      return next(err);
    }
    if (!user) {
      console.log('bad login');
      return res.json({ message: info.message });
    }
    req.login(user, (loginErr) => {
      if (loginErr) {
        return next(err);
      }
      // from where user came
      return res.redirect('/');
    });
  })(req, res, next);
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/is-loggedout');
});

if (config.env === config.dev) {
  app.use(webpackDevMiddleware(compiler));
}

app.use((err, req, res, next) => { // eslint-disable-line
  logger.log('error handler');
  logger.error(err.stack);
  res.status(500).send('Server error!');
});

module.exports = app;

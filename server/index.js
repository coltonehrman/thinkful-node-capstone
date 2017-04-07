const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const mongoose = require('mongoose');
const config = require('./config');
const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../config/webpack.config.devserver');
const logger = require('./util/logger');

const userRouter = require('./route/user/userRouter');
const User = require('./route/user/userModel');

mongoose.Promise = global.Promise;
mongoose.connect(config.db.url);

const app = express();

require('colors');

passport.use(new LocalStrategy(
  {},
  (username, password, done) => {
    User.findOne({ username })
      .exec()
      .then((user) => {
        if (!user) {
          return done('Error!');
        }
        // user.authenticate(password)
        //   .then(())
        // Check username password
        return done(null, user);
      })
      .catch(err => done(err));
  } // eslint-disable-line
));

passport.serializeUser((user, cb) => {
  cb(null, user._id); // eslint-disable-line
});

passport.deserializeUser((id, cb) => {
  User.findById(id)
    .select('-password')
    .exec()
    .then((user) => {
      if (!user) {
        return cb(new Error('Deserialization failed!'));
      }
      return cb(null, user);
    });
});

app.use(session({
  secret: config.secret,
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

require('./middleware/appMiddleware')(app);

if (config.env === config.dev) {
  app.use(webpackMiddleware(webpack(webpackConfig)));
}

app.use('/users', userRouter);

app.post('/login',
  passport.authenticate('local', { failureRedirect: '/fail-login' }),
  (req, res) => {
    // You have successfully logged in
    res.redirect('/is-loggedin');
  });

app.get('/logout', (req, res) => {
  // You have successfully logged out
  req.logout();
  res.redirect('/is-loggedout');
});

app.use((err, req, res, next) => { // eslint-disable-line
  logger.error(err.stack);
  res.status(500).send('Server error!');
});

module.exports = app;

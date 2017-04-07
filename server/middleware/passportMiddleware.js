const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const config = require('../config');
const User = require('../route/user/userModel');

module.exports = (app) => {
  passport.use(new LocalStrategy(
    {},
    (username, password, done) => {
      User.findOne({ username })
        .exec()
        .then((user) => {
          if (!user) {
            return done(null, false, { message: 'Incorrect username!!' });
          }
          return user.authenticate(password)
            .then((res) => {
              if (res !== true) {
                return done(null, false, { message: 'Incorrect password!!' });
              }
              return done(null, user.toJson());
            });
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
};

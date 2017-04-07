const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const logger = require('./util/logger');
const auth = require('./route/auth');

const app = express();

const { webpackMiddleware, compiler } = require('./middleware/webpackMiddleware');
require('./middleware/appMiddleware')(app);
require('./middleware/passportMiddleware')(app);

mongoose.Promise = global.Promise;
mongoose.connect(config.db.url);

app.use('/', require('./route/auth/authRouter'));

app.get('/', auth.isLoggedIn, (req, res, next) => {
  compiler.outputFileSystem.readFile(path.resolve(compiler.outputPath, 'main.html'), (err, file) => {
    if (err) {
      return next(err);
    }
    res.set('content-type', 'text/html');
    return res.send(file);
  });
});

app.use('/users', require('./route/user/userRouter'));

if (config.env === config.dev) {
  app.use(webpackMiddleware);
}

app.get('*', (req, res) => res.redirect('/'));

app.use((err, req, res, next) => { // eslint-disable-line
  logger.error(err.stack);
  res.status(500).json({ message: err.message });
});

module.exports = app;

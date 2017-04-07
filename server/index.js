const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../config/webpack.config.devserver');
const userRouter = require('./route/user/userRouter');
const logger = require('./util/logger');

mongoose.Promise = global.Promise;
mongoose.connect(config.db.url);

const app = express();

require('./middleware/appMiddleware')(app);

if (config.env === config.dev) {
  app.use(webpackMiddleware(webpack(webpackConfig)));
}

app.use('/users', userRouter);

app.use((err, req, res, next) => { // eslint-disable-line
  logger.error(err.stack);
  res.status(500).send('Server error!');
});

module.exports = app;

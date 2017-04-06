const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../config/webpack.config.devserver');
const userRouter = require('./route/user/userRouter');

mongoose.Promise = global.Promise;
mongoose.connect(config.db.url);

const app = express();

require('./middleware/appMiddleware')(app);

if (config.env === config.dev) {
  console.log('development config'); // eslint-disable-line
  app.use(webpackMiddleware(webpack(webpackConfig)));
}

app.use('/users', userRouter);

app.use((err, req, res, next) => { // eslint-disable-line
  console.error(err.stack); // eslint-disable-line
  res.status(500).send('Server error!');
});

module.exports = app;

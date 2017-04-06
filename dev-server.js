const express = require('express');
const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./config/webpack.config.devserver');

const app = express();

app.use(webpackMiddleware(webpack(webpackConfig)));

app.listen(3000, () => {
  console.log(`App is listening...`);
});

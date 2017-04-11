const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../../config/webpack.config.development');
const config = require('../config');

let compiler;
let webpackMiddleware;

if (config.env !== config.prod) {
  compiler = webpack(webpackConfig);
  webpackMiddleware = webpackDevMiddleware(compiler);
}

module.exports = {
  compiler,
  webpackMiddleware,
};

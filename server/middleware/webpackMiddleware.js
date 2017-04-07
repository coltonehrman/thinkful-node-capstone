const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../../config/webpack.config.development');

const compiler = webpack(webpackConfig);

module.exports = {
  compiler,
  webpackMiddleware: webpackDevMiddleware(compiler),
};

const baseConfig = require('./webpack.config.base');
const merge = require('webpack-merge');
const webpack = require('webpack');

const GLOBALS = {
  'process.env': {
    NODE_ENV: JSON.stringify('development'),
  },
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'true')),
};

module.exports = merge(baseConfig, {
  entry: {
    application: [
      'webpack-hot-middleware/client',
    ],
    vendor: ['jquery', 'jquery-bar-rating'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin(GLOBALS),
  ],
});

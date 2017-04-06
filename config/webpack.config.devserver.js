const devConfig = require('./webpack.config.development');
const merge = require('webpack-merge');

module.exports = merge(devConfig, {
  output: {
    publicPath: '/',
  },
});

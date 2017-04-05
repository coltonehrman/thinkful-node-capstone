const baseConfig = require('./webpack.config.base');
const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');

const GLOBALS = {
  'process.env': {
    NODE_ENV: JSON.stringify('development'),
  },
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'true')),
};

module.exports = merge(baseConfig, {
  devtool: 'source-map',
  entry: {
    app: path.resolve(__dirname, '../src/client/js/app.js'),
    vendor: ['jquery', 'jquery-bar-rating'],
  },
  output: {
    publicPath: '../client/',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader!autoprefixer-loader?browsers=last 2 versions',
            options: { sourceMap: true },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin(GLOBALS),
  ],
});

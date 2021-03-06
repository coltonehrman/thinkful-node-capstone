const baseConfig = require('./webpack.config.base');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = merge(baseConfig, {
  devtool: 'source-map',
  output: {
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.sass$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?sourceMap!autoprefixer-loader?browsers=last 2 versions',
            'sass-loader',
          ],
          publicPath: '../',
        }),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('./css/styles.css'),
  ],
});

const baseConfig = require('./webpack.config.base');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = merge(baseConfig, {
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /jquery-bar-rating/,
        use: ['imports-loader?jQuery=jquery,$=jquery,define=>false'],
      },
      {
        test: /\.sass$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?sourceMap!autoprefixer-loader?browsers=last 2 versions',
            'sass-loader?sourceMap',
          ],
        }),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
  ],
});

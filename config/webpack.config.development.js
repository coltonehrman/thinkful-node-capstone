const baseConfig = require('./webpack.config.base');
const merge = require('webpack-merge');

module.exports = merge(baseConfig, {
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /jquery-bar-rating/,
        use: ['imports-loader?jQuery=jquery,$=jquery,define=>false'],
      },
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
});

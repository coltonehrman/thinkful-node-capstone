const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  output: {
    filename: 'js/[name].[chunkhash].js',
    path: path.resolve(__dirname, '../build/client'),
    publicPath: '../client/',
  },
  resolve: {
    modules: [
      path.join(__dirname, '../src/client/sass'),
      path.join(__dirname, '../src/client/assets'),
      path.join(__dirname, '../src/client/js'),
      'node_modules',
    ],
    extensions: ['.js', '.json', '.sass'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, '../src/client/js'),
          path.resolve(__dirname, '../node_modules/jquery-bar-rating'),
        ],
        use: ['imports-loader?jQuery=jquery,$=jquery,this=>window', 'babel-loader'],
      },
      {
        test: /\.sass$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: 'file-loader?name=fonts/[name].[ext]',
      },
      {
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'images/[name].[ext]?[hash]',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: { bypassOnDebug: true },
          },
        ],
        test: /\.(png|jpg|jpeg|gif|svg)$/,
      },
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'js/vendor.[chunkhash].js',
    }),
    new HtmlWebpackPlugin({
      template: './src/client/index.html',
    }),
  ],
};

const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: resolve('client/views/main/main.js'),
    login: resolve('client/views/login/login.js'),
    signup: resolve('client/views/signup/signup.js'),
    vendor: ['jquery', 'jquery-bar-rating', 'hammer', 'materialize'],
  },
  output: {
    filename: 'js/[name].[chunkhash].js',
    path: resolve('build/client'),
    publicPath: './',
  },
  resolve: {
    modules: [
      resolve('client/assets'),
      resolve('client/sass'),
      'node_modules',
    ],
    alias: {
      hammer: resolve('client/js/hammer.js'),
      materialize: resolve('client/js/materialize.js'),
    },
    extensions: ['.js', '.sass', 'jpg'],
  },
  module: {
    rules: [
      {
        test: /\.ejs$/,
        use: 'ejs-compiled-loader',
      },
      {
        test: /\.js$/,
        include: [
          resolve('client/js'),
        ],
        use: ['babel-loader'],
      },
      {
        test: /jquery-bar-rating/,
        use: ['imports-loader?jQuery=jquery,$=jquery,define=>false,exports=>false'],
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
      filename: 'main.ejs',
      template: './client/views/main/main.ejs',
      chunks: ['main', 'vendor'],
    }),
    new HtmlWebpackPlugin({
      filename: 'login.ejs',
      template: './client/views/login/login.ejs',
      chunks: ['login', 'vendor'],
    }),
    new HtmlWebpackPlugin({
      filename: 'signup.ejs',
      template: './client/views/signup/signup.ejs',
      chunks: ['signup', 'vendor'],
    }),
  ],
};

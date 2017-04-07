const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: path.resolve(__dirname, '../client/main/main.js'),
    login: path.resolve(__dirname, '../client/login/login.js'),
    signup: path.resolve(__dirname, '../client/signup/signup.js'),
    vendor: ['jquery', 'jquery-bar-rating'],
  },
  output: {
    filename: 'js/[name].[chunkhash].js',
    path: path.resolve(__dirname, '../build/client'),
    publicPath: './',
  },
  resolve: {
    modules: [
      path.join(__dirname, '../client/sass'),
      path.join(__dirname, '../client/assets'),
      path.join(__dirname, '../client/js'),
      'node_modules',
    ],
    extensions: ['.js', '.json', '.sass', 'jpg'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, '../client/js'),
        ],
        use: ['babel-loader'],
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
      filename: 'main.html',
      template: './client/main/main.html',
      chunks: ['main', 'vendor'],
    }),
    new HtmlWebpackPlugin({
      filename: 'login.html',
      template: './client/login/login.html',
      chunks: ['login', 'vendor'],
    }),
    new HtmlWebpackPlugin({
      filename: 'signup.html',
      template: './client/signup/signup.html',
      chunks: ['signup', 'vendor'],
    }),
  ],
};

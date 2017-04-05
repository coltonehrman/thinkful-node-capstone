const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  output: {
    filename: 'js/[name].[chunkhash].js',
    path: path.resolve(__dirname, '../build/client'),
    publicPath: '/',
  },
  resolve: {
    modules: [
      path.join(__dirname, '../src/client/sass'),
      path.join(__dirname, '../src/client/assets'),
      path.join(__dirname, '../src/client/js'),
      'node_modules',
    ],
    alias: {
      models: path.join(__dirname, '../src/client/js/models'),
    },
    extensions: ['.js', '.json', '.scss'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, '../src/client/js'),
        use: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader!autoprefixer-loader?browsers=last 2 versions' },
          { loader: 'sass-loader' },
        ],
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
    new webpack.ProvidePlugin({
      fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'js/vendor.bundle.js',
      minChunks: Infinity,
    }),
    new HtmlWebpackPlugin({
      template: './src/client/index.html',
    }),
  ],
};

const app = require('./src/server');
const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./config/webpack.config.devserver');
const config = require('./src/server/config');

app.use(webpackMiddleware(webpack(webpackConfig)));

app.use((err, req, res, next) => { // eslint-disable-line
  console.error(err.stack); // eslint-disable-line
  res.status(500).send('Server error!');
});

app.listen(config.port, () => {
  console.log(`listening on http://localhost:${config.port}`); // eslint-disable-line
});

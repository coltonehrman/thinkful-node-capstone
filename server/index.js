const express = require('express');
const config = require('./config');
const logger = require('./util/logger');

const app = express();

const { webpackMiddleware } = require('./middleware/webpackMiddleware');
require('./middleware/appMiddleware')(app);
require('./middleware/passportMiddleware')(app);

app.use('/', require('./route/auth/authRouter'));
app.use('/', require('./route/root/rootRouter'));
app.use('/users', require('./route/user/userRouter'));

if (config.env === config.dev) {
  app.use(webpackMiddleware);
}

app.get('*', (req, res) => res.redirect('/'));

app.use((err, req, res, next) => { // eslint-disable-line
  logger.error(err.stack);
  res.status(500).json({ message: err.message });
});

module.exports = app;

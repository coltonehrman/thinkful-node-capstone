const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary');
const config = require('./config');
const logger = require('./util/logger');

const app = express();

require('./middleware/appMiddleware')(app);
require('./middleware/passportMiddleware')(app);

app.set('view engine', 'ejs');
app.set('views', path.resolve('build', 'client'));
mongoose.Promise = global.Promise;

app.use('/', require('./route/auth/authRouter'));
app.use('/', require('./route/root/rootRouter'));
app.use('/users', require('./route/user/userRouter'));
app.use('/locations', require('./route/location/locationRouter'));
app.use('/places', require('./route/place/placeRouter'));
app.use('/reviews', require('./route/review/reviewRouter'));

if (config.env === config.dev) {
  const { webpackMiddleware } = require('./middleware/webpackMiddleware'); // eslint-disable-line
  app.use(webpackMiddleware);
  cloudinary.config(config.cloudinaryConfig);
} else {
  app.use(express.static(path.resolve('build', 'client')));
}

app.use((err, req, res, next) => { // eslint-disable-line
  logger.error(err.stack);
  res.status(500).json({ message: err.message });
});

let server;

function runServer(databaseUrl = config.db.url, port = config.port) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, {
      useMongoClient: true,
    }, connectErr => { // eslint-disable-line
      if (connectErr) {
        return reject(connectErr);
      }
      server = app.listen(port, () => {
        logger.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', (appErr) => {
        mongoose.disconnect();
        reject(appErr);
      });
    });
  });
}

function closeServer() {
  return mongoose.connection.close().then(() => { // eslint-disable-line
    return new Promise((resolve, reject) => {
      logger.log('Closing server');
      return server.close((err) => {
        if (err) {
          return reject(err);
        }
        return resolve();
      });
    });
  });
}

module.exports = {
  app,
  runServer,
  closeServer,
};

const morgan = require('morgan');
const bodyParser = require('body-parser');
const config = require('../config');

module.exports = (app) => {
  app.use(morgan('dev', {
    skip: () => config.logging,
  }));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
};

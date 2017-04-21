const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const config = require('../config');

module.exports = (app) => {
  if (config.env === config.dev) {
    app.use(morgan('dev'));
  }
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(fileUpload());
  app.use('/photos', express.static(path.resolve('photos')));
};

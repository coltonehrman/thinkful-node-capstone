const express = require('express');
const config = require('./config');
require('mongoose').connect(config.db.url);

const app = express();

require('./middleware/appMiddleware')(app);

module.exports = app;

const config = {
  dev: 'development',
  test: 'testing',
  prod: 'production',
  port: process.env.PORT || 3000,
};

config.env = process.env.NODE_ENV || config.dev;

let envConfig;
try {
  envConfig = require('./' + config.env); // eslint-disable-line
  envConfig = envConfig || {};
} catch (e) {
  envConfig = {};
}

module.exports = Object.assign({}, config, envConfig);

const { runServer } = require('./server');
const logger = require('./server/util/logger');

runServer().catch(err => logger.error(err));

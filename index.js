const app = require('./server');
const config = require('./server/config');
const logger = require('./server/util/logger');

app.listen(config.port, () => {
  logger.log(`listening on http://localhost:${config.port}`);
});

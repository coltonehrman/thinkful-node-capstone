const app = require('./server');
const config = require('./server/config');

app.listen(config.port, () => {
  console.log(`listening on http://localhost:${config.port}`); // eslint-disable-line
});

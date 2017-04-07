const config = require('../config');
require('colors');

const noop = () => {};
const log = config.logging ? console.log.bind(console) : noop; // eslint-disable-line

module.exports = {
  log(...args) {
    const tag = '[ ✨ LOG ✨ ]'.green;
    const logs = args.map((arg) => {
      if (typeof arg === 'object') {
        return `${tag} ${JSON.stringify(arg, null, 2).cyan}`;
      }
      return `${tag} ${arg.cyan}`;
    });
    log(...logs);
  },

  error(...args) {
    const logs = args.map((arg) => {
      const err = arg.stack || arg;
      const name = err.name || '[ ❌ ERROR ❌ ]';
      return `${name.yellow} ${err.red}`;
    });

    log(...logs);
  },
};

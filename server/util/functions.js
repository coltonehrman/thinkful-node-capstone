const path = require('path');
const config = require('../config');
const { compiler } = require('../middleware/webpackMiddleware');

exports.getMenu = (items, loggedIn) => (
  items.filter(item => item.onLoggedIn === loggedIn)
);

exports.getFile = (fileName) => { // eslint-disable-line
  return new Promise((resolve, reject) => {
    if (compiler && config.env !== config.prod) {
      compiler.outputFileSystem.readFile(path.resolve(compiler.outputPath, fileName),
      (err, file) => {
        if (err) {
          return reject(err);
        }
        return resolve(file.toString());
      });
    } else {
      resolve(null);
    }
  });
};

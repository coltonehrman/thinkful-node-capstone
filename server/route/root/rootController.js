const path = require('path');
const ejs = require('ejs');
const { getMenu } = require('../../util/functions');
const { compiler } = require('../../middleware/webpackMiddleware');

exports.getMenu = (req, res, next) => {
  const items = [
    {
      text: 'Login',
      link: '/',
      onLoggedIn: false,
      onLoggedOut: true,
    },
    {
      text: 'Signup',
      link: '/signup',
      onLoggedIn: false,
      onLoggedOut: true,
    },
    {
      text: 'Logout',
      link: '/logout',
      onLoggedIn: true,
      onLoggedOut: false,
    },
  ];

  req.menu = getMenu(items, typeof req.user !== 'undefined');
  next();
};

exports.get = (req, res, next) => {
  compiler.outputFileSystem.readFile(path.resolve(compiler.outputPath, 'main.ejs'), (err, file) => {
    if (err) {
      return next(err);
    }
    res.set('content-type', 'text/html');
    return res.send(ejs.render(file.toString(), { menu: req.menu }));
  });
};

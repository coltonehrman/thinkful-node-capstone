const ejs = require('ejs');
const { getMenu, getFile } = require('../../util/functions');

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
  getFile('main.ejs')
    .then((file) => {
      if (file) {
        res.set('content-type', 'text/html');
        return res.send(ejs.render(file.toString(), { menu: req.menu }));
      }
      return res.render('main', { menu: req.menu });
    })
    .catch(err => next(err));
};

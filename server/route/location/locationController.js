const ejs = require('ejs');
const Location = require('../../model/locationModel');
const { getMenu, getFile } = require('../../util/functions');

exports.getLocationPageMenu = (req, res, next) => {
  const items = [
    {
      text: 'Home',
      link: '/',
      onLoggedIn: true,
      onLoggedOut: true,
    },
    {
      text: 'Login',
      link: '/login',
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
    },
  ];

  req.menu = getMenu(items, typeof req.user !== 'undefined');
  next();
};

exports.get = (req, res, next) => {
  if (req.query.name) {
    return next();
  }
  return Location.find({})
    .exec()
    .then(locations => res.json(locations.map(loc => loc.toJson())))
    .catch(err => next(err));
};

exports.getOne = (req, res, next) => {
  const { name } = req.query;
  Location.findOne({ name })
    .exec()
    .then((location) => {
      if (!location) {
        return res.json(location);
      }
      return res.json(location.toJson());
    })
    .catch(err => next(err));
};

exports.getLocationPage = (req, res, next) => {
  getFile('location.ejs')
    .then((file) => {
      if (file) {
        res.set('content-type', 'text/html');
        return res.send(ejs.render(file.toString(), { menu: req.menu }));
      }
      return res.render('location', { menu: req.menu });
    })
    .catch(err => next(err));
};

exports.post = (req, res, next) => {
  const { name } = req.body;
  Location.create({ name })
    .then(location => res.json(location.toJson()))
    .catch(err => next(err));
};

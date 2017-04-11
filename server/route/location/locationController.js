const path = require('path');
const ejs = require('ejs');
const Location = require('../../model/locationModel');
const { getMenu } = require('../../util/functions');
const { compiler } = require('../../middleware/webpackMiddleware');

exports.getLocationPageMenu = (req, res, next) => {
  const items = [
    {
      text: 'Home',
      link: '/',
      onLoggedIn: true,
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
  compiler.outputFileSystem.readFile(path.resolve(compiler.outputPath, 'location.ejs'), (err, file) => {
    if (err) {
      return next(err);
    }
    res.set('content-type', 'text/html');
    return res.send(ejs.render(file.toString(), { menu: req.menu }));
  });
};

exports.post = (req, res, next) => {
  const { name } = req.body;
  Location.create({ name })
    .then(location => res.json(location.toJson()))
    .catch(err => next(err));
};

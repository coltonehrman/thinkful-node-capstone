const Location = require('../../model/locationModel');

exports.get = (req, res, next) => {
  if (req.query.name) {
    return next();
  }
  return Location.find({})
    .exec()
    .then(locations => res.json(locations))
    .catch(err => next(err));
};

exports.getOne = (req, res, next) => {
  const name = req.params.name;
  Location.find({ name })
    .exec()
    .then(location => res.json(location))
    .catch(err => next(err));
};

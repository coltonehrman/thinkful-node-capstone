const Location = require('../../model/locationModel');

exports.get = (req, res, next) => {
  if (req.query.name) {
    return next();
  }
  return Location.find({})
    .exec()
    .then(locations => res.json(locations.toJson()))
    .catch(err => next(err));
};

exports.getOne = (req, res, next) => {
  const { name } = req.query;
  Location.findOne({ name })
    .exec()
    .then(location => res.json(location.toJson()))
    .catch(err => next(err));
};

exports.getById = (req, res, next) => {
  const { id } = req.params;
  Location.findById(id)
    .exec()
    .then(location => res.json(location.toJson()))
    .catch(err => next(err));
};

exports.post = (req, res, next) => {
  const { name } = req.body;
  Location.create({ name })
    .then(location => res.json(location.toJson()))
    .catch(err => next(err));
};

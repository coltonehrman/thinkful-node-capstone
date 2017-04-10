const Place = require('../../model/placeModel');

exports.get = (req, res, next) => {
  Place.find({})
    .exec()
    .then(places => res.json(places))
    .catch(err => next(err));
};

exports.getOne = (req, res, next) => {
  const name = req.params.name;
  Place.find({ name })
    .exec()
    .then(place => res.json(place))
    .catch(err => next(err));
};

exports.post = (req, res, next) => {
  
};

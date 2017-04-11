const Location = require('../../model/locationModel');
const Place = require('../../model/placeModel');

exports.get = (req, res, next) => {
  if (req.query.location_id) {
    return next();
  }
  return Place.find({})
    .exec()
    .then(places => res.json(places))
    .catch(err => next(err));
};

exports.getByLocationId = (req, res, next) => {
  const { location_id } = req.query;
  Location.findById(location_id)
    .populate('places')
    .exec()
    .then(location => res.json(location.places))
    .catch(err => next(err));
};

exports.post = (req, res, next) => {
  const { name, description, location } = req.body;
  let place = null;
  Place.create({ name, description, location })
    .then((newPlace) => {
      place = newPlace;
      return Location.findByIdAndUpdate(location, {
        $addToSet: { places: place._id },
      }).exec();
    })
    .then(() => res.json(place))
    .catch(err => next(err));
};

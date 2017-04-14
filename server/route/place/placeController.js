const path = require('path');
const Location = require('../../model/locationModel');
const Place = require('../../model/placeModel');

exports.get = (req, res, next) => {
  if (req.query.location_id) {
    return next();
  }
  return Place.find({})
    .exec()
    .then(places => res.json(places.map(place => place.toJson(req.user.id))))
    .catch(err => next(err));
};

exports.getByLocationId = (req, res, next) => {
  const { location_id } = req.query;
  Location.findById(location_id)
    .populate('places')
    .exec()
    .then(location => res.json(location.places.map(place => place.toJson(req.user.id))))
    .catch(err => next(err));
};

exports.savePhoto = (req, res, next) => {
  if (!req.files || !req.files.photo) {
    return next();
  }
  const photo = req.files.photo;
  const photoPath = path.resolve('photos', photo.name);

  return photo.mv(photoPath, (err) => {
    if (err) {
      return next(err);
    }
    req.photo = `/photos/${photo.name}`;
    return next();
  });
};

exports.post = (req, res, next) => {
  const { name, description, location } = req.body;
  const data = { name, description, location, user: req.user.id };
  if (req.photo) {
    data.photo = req.photo;
  }
  let place = null;
  Place.create(data)
    .then((newPlace) => {
      place = newPlace.toJson(req.user.id);
      return Location.findByIdAndUpdate(location, {
        $addToSet: { places: place.id },
      }).exec();
    })
    .then(() => res.json(place))
    .catch(err => next(err));
};

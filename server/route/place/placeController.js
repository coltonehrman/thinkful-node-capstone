const cloudinary = require('cloudinary');
const Location = require('../../model/locationModel');
const Place = require('../../model/placeModel');
const Review = require('../../model/reviewModel');

exports.get = (req, res, next) => {
  if (req.query.location_id) {
    return next();
  }
  return Place.find({})
    .populate('reviews')
    .exec()
    .then(places => res.json(places.map(place => place.toJson(req.user.id))))
    .catch(err => next(err));
};

exports.getByLocationId = (req, res, next) => {
  const { location_id } = req.query;
  Location.findById(location_id)
    .populate({
      path: 'places',
      populate: [{ path: 'user' }, {
        path: 'reviews',
        populate: { path: 'author', select: 'username' },
      }],
    })
    .exec()
    .then((location) => {
      const userId = (req.user) ? req.user.id : null;
      return res.json(location.places.map(place => place.toJson(userId)));
    })
    .catch(next);
};

exports.savePhoto = (req, res, next) => {
  if (!req.body || !req.body.photo) {
    return next();
  }

  return cloudinary.v2.uploader.upload(req.body.photo, (err, result) => {
    if (err) {
      return next(err);
    }

    req.photo = result.url;
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
      place.user = req.user.username;
      return Location.findByIdAndUpdate(location, {
        $addToSet: { places: place.id },
      }).exec();
    })
    .then(() => res.json(place))
    .catch(err => next(err));
};

exports.delete = (req, res, next) => {
  const { id } = req.params;
  let removedPlace;
  Place.findByIdAndRemove(id).exec()
    .then((place) => {
      removedPlace = place;

      return Review.find({
        place: removedPlace.id,
      }).remove().exec();
    })
    .then(() =>
      Location.findByIdAndUpdate(removedPlace.location, {
        $pull: { places: removedPlace.id },
      }).exec() // eslint-disable-line
    )
    .then(() => res.status(204).end())
    .catch(err => next(err));
};

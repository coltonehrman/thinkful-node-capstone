const Review = require('../../model/reviewModel');
const Place = require('../../model/placeModel');

exports.post = (req, res, next) => {
  const { author_id, place_id, description } = req.body;
  let reviewPlace;

  Place.findById(place_id)
    .then((place) => {
      reviewPlace = place;
      return Review.create({ author_id, place_id, description });
    })
    .then((review) => {
      reviewPlace.reviews.push(review);
      reviewPlace.save();
      res.json(review.toJson());
    })
    .catch(err => next(err));
};

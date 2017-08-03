/* eslint no-underscore-dangle: 0 */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PlaceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    require: true,
  },
  location: {
    ref: 'location',
    require: true,
    type: Schema.Types.ObjectId,
  },
  photo: String,
  user: {
    ref: 'user',
    require: true,
    type: Schema.Types.ObjectId,
  },
  reviews: [{
    ref: 'review',
    type: Schema.Types.ObjectId,
    default: [],
  }],
});

PlaceSchema.methods = {
  isOwner(id) {
    const thisId = this.user._id || this.user;
    return thisId.toString() === id.toString();
  },
  toJson(userId) {
    const place = this.toObject();
    place.id = this._id;
    place.isOwner = userId && this.isOwner(userId);
    delete place._id;

    if (place.user.constructor === Object) {
      const username = place.user.username;
      delete place.user;
      place.user = username;
    }

    return place;
  },
};

module.exports = mongoose.model('place', PlaceSchema);

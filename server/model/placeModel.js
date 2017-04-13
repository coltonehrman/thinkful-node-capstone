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
});

// FIXME:
PlaceSchema.virtual('canDelete').get(function (id) {
  return this.user === id;
});

PlaceSchema.methods = {
  toJson() {
    const place = this.toObject();
    place.id = this._id;
    delete place._id;
    return place;
  },
};

module.exports = mongoose.model('place', PlaceSchema);

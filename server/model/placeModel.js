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
  user: {
    ref: 'user',
    require: true,
    type: Schema.Types.ObjectId,
  },
});

module.exports = mongoose.model('place', PlaceSchema);

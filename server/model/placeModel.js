const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PlaceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    ref: 'location',
    type: Schema.Types.ObjectId,
  },
});

module.exports = mongoose.model('place', PlaceSchema);

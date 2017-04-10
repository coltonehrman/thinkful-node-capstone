const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  places: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
});

module.exports = mongoose.model('location', LocationSchema);

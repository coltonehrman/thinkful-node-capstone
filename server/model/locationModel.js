const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  places: [{
    ref: 'place',
    type: Schema.Types.ObjectId,
    default: [],
  }],
});

LocationSchema.methods = {
  toJson() {
    const { _id, name, places } = this.toObject();
    return {
      id: _id,
      name,
      places,
    };
  },
};

module.exports = mongoose.model('location', LocationSchema);

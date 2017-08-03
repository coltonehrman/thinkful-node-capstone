const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  author: {
    ref: 'user',
    require: true,
    type: Schema.Types.ObjectId,
  },
  place: {
    ref: 'place',
    require: true,
    type: Schema.Types.ObjectId,
  },
  description: {
    type: String,
    require: true,
  },
  timestamp: {
    type: Date,
    require: true,
    default: Date.now,
  },
});

ReviewSchema.methods = {
  toJson() {
    const { _id, author, place, description, timestamp } = this.toObject();
    return {
      id: _id,
      author,
      place,
      description,
      timestamp,
    };
  },
};

module.exports = mongoose.model('review', ReviewSchema);

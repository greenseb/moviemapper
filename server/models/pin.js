const mongoose = require('./index');

const pinSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
   }
  },
{ timestamps: true }
);

module.exports = mongoose.model('Pin', pinSchema);
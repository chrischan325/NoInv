const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  eventName: { type: String, required: true },
  invited: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
}, {
  timestamps: true,
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
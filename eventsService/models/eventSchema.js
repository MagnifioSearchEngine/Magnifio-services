const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  eventId: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  }

});

const User = mongoose.model('calanderEvents', Schema, 'Events');

module.exports = User;

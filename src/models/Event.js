const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      start: { type: String, required: true }, // E.g., '3pm'
      end: { type: String, required: false }, // E.g., '4pm'
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['scheduled', 'completed', 'cancelled'],
      default: 'scheduled',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema);

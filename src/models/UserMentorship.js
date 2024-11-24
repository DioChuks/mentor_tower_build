const mongoose = require('mongoose');

const MentorshipSchema = new mongoose.Schema({
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mentee: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: false }, // Optional message from the mentee
  status: { type: String, enum: ['active', 'pending', 'rejected'], default: 'active' }
}, { timestamps: true });

module.exports = mongoose.model('UserMentorship', MentorshipSchema);

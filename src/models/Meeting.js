const { Schema, model } = require('mongoose')

const MeetingSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    scheduledBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    scheduledFor: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    scheduledAt: {
      type: Date,
      required: true
    },
    duration: {
      type: Number,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['scheduled', 'completed', 'canceled'],
      default: 'scheduled'
    }
  },
  { timestamps: true }
)

const Meeting = model('Meeting', MeetingSchema)

module.exports = Meeting
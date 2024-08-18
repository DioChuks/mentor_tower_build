const { Schema, model, Types } = require('mongoose')

const jobTypes = ['remote', 'contract', 'fulltime', 'onsite']

const JobSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: false
    },
    type: {
      type: [String],
      enum: jobTypes,
      required: true
    },
    company: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    user: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    }
  },
  { timestamps: true }
)

const Job = model('Job', JobSchema)

module.exports = Job

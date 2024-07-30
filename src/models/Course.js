const { Schema, model, Types } = require('mongoose')

const CourseSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false
    },
    image: {
      type: [String],
      enum: jobTypes,
      required: true
    },
    price: {
      type: String,
      required: true
    },
    rating: {
      type: String,
      required: true
    },
    owner: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    review: {
      type: [Types.ObjectId],
      default: [],
      required: false
    }
  },
  { timestamps: true }
)

const Course = model('Course', CourseSchema)

module.exports = Course

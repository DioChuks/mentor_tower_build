const { Schema, model } = require('mongoose')

const ReviewSchema = new Schema(
  {
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: false
    }
  },
  { timestamps: true }
)

const Review = model('Review', ReviewSchema)

module.exports = Review

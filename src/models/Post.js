const { Schema, model, Types } = require('mongoose')

const CommentSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: 'User',
      required: true
    },
    comment: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

const PostSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    tier: {
      type: String,
      required: false
    },
    content: {
      type: String,
      required: false
    },
    type: {
      type: String,
      required: true
    },
    likes: {
      type: Number,
      default: 0
    },
    comments: [CommentSchema],
    no_of_tagged: {
      type: Number,
      required: false
    }
  },
  { timestamps: true }
)

const Post = model('Post', PostSchema)

module.exports = Post

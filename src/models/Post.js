const { Schema, model, Types } = require('mongoose');

// Separate Comment Schema
const CommentSchema = new Schema(
  {
    postId: {
      type: Types.ObjectId,
      ref: 'Post',
      required: true
    },
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
);

const PostSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
      index: true // Index for faster queries
    },
    content: {
      type: String,
      required: false
    },
    type: {
      type: String,
      required: true,
      index: true // Index for faster queries
    },
    likes: {
        type: [{ type: Types.ObjectId, ref: 'User' }],
        default: []
    },
    no_of_tagged: {
      type: Number,
      required: false
    }
  },
  { timestamps: true }
);

// Virtual field to calculate comment count
PostSchema.virtual('commentCount', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'postId',
  count: true
});

// Set toJSON and toObject to include virtuals
PostSchema.set('toJSON', { virtuals: true });
PostSchema.set('toObject', { virtuals: true });

const Post = model('Post', PostSchema);
const Comment = model('Comment', CommentSchema);

module.exports = { Post, Comment };

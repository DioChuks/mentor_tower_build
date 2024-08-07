const { Schema, model, Types } = require('mongoose')

const MemberSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
)

const GroupSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: false
    },
    description: {
      type: String,
      required: true
    },
    members: [MemberSchema],
    rules: {
      type: String,
      required: false
    }
  },
  { timestamps: true }
)

const Group = model('Group', GroupSchema)

module.exports = Group

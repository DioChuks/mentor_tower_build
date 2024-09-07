const { Schema, model, Types } = require('mongoose')

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
    members: {
        type: [{type: Types.ObjectId, ref: 'User'}],
        default: []
    },
    rules: {
      type: String,
      required: false
    },
    owner: {
        type: Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    }
  },
  { timestamps: true }
)

const Group = model('Group', GroupSchema)

module.exports = Group

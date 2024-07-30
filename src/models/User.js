const { Schema, model } = require('mongoose')
const validator = require('validator')
const { UserRole } = require('../contracts/roles')
const toJSON = require('../config/toJson')
const { compare, hash } = require('bcrypt')

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email')
        }
      }
    },
    isEmailVerified: {
      type: Boolean,
      default: false
    },
    phone: {
      type: Number,
      required: false
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.Mentee
    },
    dob: {
      type: Date,
      required: false
    },
    bio: {
      type: String,
      required: false
    },
    tier: {
      type: String,
      required: false
    },
    areaOfInterest: {
      type: String,
      required: false
    }
  },
  { timestamps: true }
)

UserSchema.plugin(toJSON)

UserSchema.static('isEmailTaken', async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } })
  return !!user
})

UserSchema.method('isPasswordMatch', async function (password) {
  const user = this
  return compare(password, user.password)
})

UserSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified('password')) {
    user.password = await hash(user.password, 8)
  }
  next()
})

const User = model('User', UserSchema)

module.exports = User

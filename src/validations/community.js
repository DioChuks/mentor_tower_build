const Joi = require('joi')
const { postSize } = require('./validate/custom')

const communityBody = {
  name: Joi.string().required(),
  tier: Joi.string().required(),
  content: Joi.string().required().custom(postSize)
}

const newCommPost = {
  body: Joi.object().keys(communityBody)
}

const updateCommPost = {
  body: Joi.object().keys({
    content: Joi.string().required()
  })
}

const commentSchema = {
  body: Joi.object().keys({
    user: Joi.string().required(),
    comment: Joi.string().required()
  })
}

module.exports = {
  newCommPost,
  updateCommPost,
  commentSchema
}
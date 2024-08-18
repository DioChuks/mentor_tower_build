const Joi = require('joi')
const { postSize } = require('./validate/custom')

const postBody = {
  user: Joi.string().required(),
  content: Joi.string().required().custom(postSize),
  type: Joi.string().required()
}

const newPost = {
  body: Joi.object().keys(postBody)
}

const updatePost = {
  body: Joi.object().keys({
    content: Joi.string().required()
  })
}

const commentJoi = {
  body: Joi.object().keys({
    user: Joi.string().required(),
    comment: Joi.string().required()
  })
}

module.exports = {
  newPost,
  updatePost,
  commentJoi
}

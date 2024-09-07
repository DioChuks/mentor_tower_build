const Joi = require('joi')

const groupBody = {
  name: Joi.string().required(),
  image: Joi.string(),
  description: Joi.string().required(),
  rules: Joi.string(),
}

const newGroup = {
  body: Joi.object().keys(groupBody)
}

const updateGroup = {
  body: Joi.object().keys({
    name: Joi.string(),
    image: Joi.string(),
    description: Joi.string(),
    rules: Joi.string(),
  })
}

const addMember = {
  body: Joi.object().keys({
    new_member: Joi.string().required(),
  })
}

module.exports = {
  newGroup,
  updateGroup,
  addMember
}

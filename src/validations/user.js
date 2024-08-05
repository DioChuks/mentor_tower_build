const Joi = require('joi')

const userDetails = {
    name: Joi.string().required(),
    areaOfInterest: Joi.array(),
    bio: Joi.string().required(),
    phone: Joi.number(),
    dob: Joi.string(),
}

const validateUpdateUser = {
    body: Joi.object().keys(userDetails)
}

module.exports = {
  validateUpdateUser
}

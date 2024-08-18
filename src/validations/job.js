const Joi = require('joi')

const jobBody = {
  title: Joi.string().required(),
  image: Joi.string().required(),
  type: Joi.string().required(),
  company: Joi.string().required(),
  address: Joi.string().required(),
  user: Joi.string().required()
}

const newJob = {
  body: Joi.object().keys(jobBody)
}

const updateJob = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    image: Joi.string().required(),
    type: Joi.string().required(),
    company: Joi.string().required(),
    address: Joi.string().required(),
  })
}

module.exports = {
  newJob,
  updateJob
}

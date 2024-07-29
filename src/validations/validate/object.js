const Joi = require('joi')
const { StatusCodes } = require('http-status-codes')
const pick = require('../../utils/pick')
const ApiError = require('../../errors/ApiError');

const validate = schema => (req, _res, next) => {
  const validSchema = pick(schema, ['params', 'query', 'body'])
  const object = pick(req, Object.keys(validSchema))
  console.log('Object to be validated:', object) // Log the object to be validated
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' } })
    .validate(object)

  if (error) {
    const errorMessage = error.details
      .map(details => details.message)
      .join(', ')
    return next(new ApiError(StatusCodes.BAD_REQUEST, errorMessage))
  }
  Object.assign(req, value)
  console.log('Validated value:', value) // Log the validated value
  return next()
}

module.exports = validate

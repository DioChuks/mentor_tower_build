const { StatusCodes } = require('http-status-codes')
const ApiError = require('../../errors/ApiError');

const validateJob = (req, res, next) => {
    const { title, image, type, company, address, user } = req.body

    if (!user) {
        return next(
          new ApiError(StatusCodes.BAD_REQUEST, 'Property user is required and value must be of the User ID.')
        )
    }

    const jobTypes = ['remote', 'contract', 'fulltime', 'onsite']

    if (!jobTypes.includes(type)) {
      return next(
        new ApiError(
          StatusCodes.BAD_REQUEST,
          "type is required and must be a string of either 'remote', 'contract', 'fulltime', 'onsite'."
        )
      )
    }

    if (!title || typeof title !== 'string') {
      return next(
        new ApiError(
          StatusCodes.BAD_REQUEST,
          'title is required and must be a string'
        )
      )
    }

    if (!image || typeof image !== 'string') {
      return next(
        new ApiError(
          StatusCodes.BAD_REQUEST,
          'image is required and must be a string'
        )
      )
    }

    if (!company || typeof company !== 'string') {
      return next(
        new ApiError(
          StatusCodes.BAD_REQUEST,
          'company is required and must be a string'
        )
      )
    }

    if (!address || typeof address !== 'string') {
      return next(
        new ApiError(
          StatusCodes.BAD_REQUEST,
          'address is required and must be a string'
        )
      )
    }

    // If all validations pass, move to the next middleware
    return next()
}

module.exports = validateJob

const multer = require('multer')
const { StatusCodes } = require('http-status-codes')
const ApiError = require('../../errors/ApiError');

// Set up multer for file uploads
const upload = multer({
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB file size limit
  fileFilter(req, file, cb) {
    if (
      !file.mimetype.startsWith('image/') &&
      !file.mimetype.startsWith('video/')
    ) {
      return cb(
        new ApiError(
          StatusCodes.BAD_REQUEST,
          'Only image and video files are allowed'
        )
      )
    }
    cb(null, true)
  }
}).single('content')

const validatePost = (req, res, next) => {
  upload(req, res, err => {
    if (err) {
      return next(err)
    }

    const { user, type, content } = req.body

    if (!user) {
        return next(
          new ApiError(StatusCodes.BAD_REQUEST, 'Property user is required and value must be of the User ID.')
        )
    }

    const postTypes = ['community', 'library', 'group']

    if (!postTypes.includes(type)) {
      return next(
        new ApiError(
          StatusCodes.BAD_REQUEST,
          "type is required and must be a string of either 'community', 'library', 'group'."
        )
      )
    }

    // Validate post_content: it should be a string
    if (!content || typeof content !== 'string') {
      return next(
        new ApiError(
          StatusCodes.BAD_REQUEST,
          'Post content is required and must be a string'
        )
      )
    }

    // If all validations pass, move to the next middleware
    return next()
  })
}

module.exports = validatePost

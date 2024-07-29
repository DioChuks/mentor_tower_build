const passport = require('passport')
const { StatusCodes, ReasonPhrases } = require('http-status-codes')
const ApiError = require('../errors/ApiError')
const { roleRights } = require('../contracts/roles')
const { jwtError } = require('../utils/jwt')
const getAccessTokenFromHeaders = require('../utils/headers')

const IsAuth =
  (...requiredRights) =>
  async (req, res, next) => {
    try {
      await new Promise((resolve, reject) => {
        passport.authenticate(
          'jwt',
          { session: false },
          verifyCallback(req, resolve, reject, requiredRights)
        )(req, res, next)
      })
      next()
    } catch (err) {
      if (err instanceof jwtError) {
        return res.status(StatusCodes.FORBIDDEN).json({
          message: ReasonPhrases.FORBIDDEN,
          status: StatusCodes.FORBIDDEN
        })
      }
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: ReasonPhrases.INTERNAL_SERVER_ERROR,
        status: StatusCodes.INTERNAL_SERVER_ERROR
      })
    }
    return next()
  }

const verifyCallback =
  (req, resolve, reject, requiredRights) => async (err, user, info) => {
    if (err || info || !user) {
      return reject(
        new ApiError(StatusCodes.UNAUTHORIZED, 'Please authenticate')
      )
    }
    req.user = user

    if (requiredRights.length) {
      const userRights = roleRights.get(user.role)
      if (
        !userRights ||
        (!requiredRights.every(requiredRight =>
          userRights.includes(requiredRight)
        ) &&
          req.params['userId'] !== user.id)
      ) {
        return reject(new ApiError(StatusCodes.FORBIDDEN, 'Forbidden'))
      }
    }

    resolve()
  }

const GateRoute = async (req, res, next) => {
  const { accessToken } = getAccessTokenFromHeaders(req.headers)

  if (!accessToken) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: ReasonPhrases.UNAUTHORIZED,
      status: StatusCodes.UNAUTHORIZED
    })
  }

  return next()
}

module.exports = { IsAuth, GateRoute }

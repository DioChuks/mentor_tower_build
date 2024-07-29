const { Router } = require('express')
const validate = require('../validations/validate/object')
const { GateRoute } = require('../middlewares/auth')
const validateCommunityPost = require('../validations/validate/post')
const { commentSchema, updateCommPost } = require('../validations/community')
const {
  createCommunityPost,
  getCommunityPosts,
  getCommunityPostById,
  updateCommunityPost,
  deleteCommunityPost,
  likeCommunityPost,
  commentOnCommunityPost
} = require('../controllers/CommunityController')

const commPostRouter = Router()

commPostRouter.use(GateRoute)

commPostRouter.post('/', validateCommunityPost, createCommunityPost)
commPostRouter.get('/', getCommunityPosts)
commPostRouter.get('/post/:id', getCommunityPostById)
commPostRouter.patch('/post/:id', validate(updateCommPost), updateCommunityPost)
commPostRouter.delete('/post/:id', deleteCommunityPost)

commPostRouter.post('/:id/like', likeCommunityPost)
commPostRouter.post('/:id/comment', validate(commentSchema), commentOnCommunityPost)

module.exports = commPostRouter

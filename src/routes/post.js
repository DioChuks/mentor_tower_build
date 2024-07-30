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
} = require('../controllers/PostController')

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



/**
 * @swagger
 * tags:
 *   name: Communities
 *   description: Community management
 */

/**
 * @swagger
 * /community:
 *   post:
 *     summary: Create a new community post
 *     tags: [Communities]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               tier:
 *                 type: string
 *               content:
 *                 type: string
 *               type:
 *                 type: string
 *               no_of_tagged:
 *                 type: number
 *     responses:
 *       201:
 *         description: The community post was successfully created
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /community:
 *   get:
 *     summary: Get all community posts
 *     tags: [Communities]
 *     responses:
 *       200:
 *         description: List of community posts
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /community/post/{id}:
 *   get:
 *     summary: Get a community post by ID
 *     tags: [Communities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Community post ID
 *     responses:
 *       200:
 *         description: Community post data
 *       404:
 *         description: Community post not found
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /community/post/{id}:
 *   patch:
 *     summary: Update a community post by ID
 *     tags: [Communities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Community post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               tier:
 *                 type: string
 *               content:
 *                 type: string
 *               type:
 *                 type: string
 *               no_of_tagged:
 *                 type: number
 *     responses:
 *       200:
 *         description: The community post was successfully updated
 *       404:
 *         description: Community post not found
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /community/post/{id}:
 *   delete:
 *     summary: Delete a community post by ID
 *     tags: [Communities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Community post ID
 *     responses:
 *       200:
 *         description: Community post deleted successfully
 *       404:
 *         description: Community post not found
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /community/{id}/like:
 *   post:
 *     summary: Like a community post
 *     tags: [Communities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Community post ID
 *     responses:
 *       200:
 *         description: Community post liked successfully
 *       404:
 *         description: Community post not found
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /community/{id}/comment:
 *   post:
 *     summary: Comment on a community post
 *     tags: [Communities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Community post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *               comment:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comment added successfully
 *       404:
 *         description: Community post not found
 *       500:
 *         description: Some server error
 */
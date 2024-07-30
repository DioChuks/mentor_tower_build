const catchAsync = require('../utils/catchAsync')
const PostService = require('../services/PostService')
const { StatusCodes, ReasonPhrases } = require('http-status-codes')

const postService = new PostService();

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - name
 *         - type
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the post
 *         name:
 *           type: string
 *         tier:
 *           type: string
 *         content:
 *           type: string
 *         type:
 *           type: string
 *         likes:
 *           type: number
 *           default: 0
 *         comments:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *               comment:
 *                 type: string
 *         no_of_tagged:
 *           type: number
 *       example:
 *         id: d5fE_asz
 *         name: Sample Post
 *         tier: Tier 1
 *         content: This is a sample post.
 *         type: community
 *         likes: 5
 *         comments:
 *           - user: 605c5f6e0f8e4e5c0c8e6e0d
 *             comment: Great post!
 *         no_of_tagged: 3
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
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       201:
 *         description: The community post was successfully created
 *       500:
 *         description: Some server error
 */

const createCommunityPost = async (req, res, next) => {
  console.log('Request Body:', req.body) // Log the request body
  try {
    const newCommunityPost = await postService.createPost(req.body)
    console.log('Created Community Post:', newCommunityPost) // Log the created community
    res.status(StatusCodes.CREATED).json(newCommunityPost)
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /community:
 *   get:
 *     summary: Get all community posts
 *     tags: [Communities]
 *     responses:
 *       200:
 *         description: List of community posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       500:
 *         description: Some server error
 */

const getCommunityPosts = catchAsync(async (_req, res) => {
  try {
    const communities = await postService.getCommunityPosts()
    res.status(StatusCodes.CREATED).json(communities)
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json(ReasonPhrases.BAD_REQUEST)
  }
})

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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Community post not found
 *       500:
 *         description: Some server error
 */

const getCommunityPostById = catchAsync(async (req, res) => {
  try {
    const community = await postService.getPostById(req.params.id)
    if (!community) {
      return res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND)
    }
    res.status(StatusCodes.OK).json(community)
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json(ReasonPhrases.BAD_REQUEST)
  }
})

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
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: The community post was successfully updated
 *       404:
 *         description: Community post not found
 *       500:
 *         description: Some server error
 */

const updateCommunityPost = catchAsync(async (req, res) => {
  try {
    const community = await postService.updatePost(
      req.params.id,
      req.body
    )
    if (!community) {
      return res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND)
    }
    res.status(StatusCodes.OK).json(community)
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json(ReasonPhrases.BAD_REQUEST)
  }
})

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

const deleteCommunityPost = catchAsync(async (req, res) => {
  try {
    const community = await postService.deletePost(req.params.id)
    if (!community) {
      return res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND)
    }
    res.status(StatusCodes.OK).json(community)
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json(ReasonPhrases.BAD_REQUEST)
  }
})

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

const likeCommunityPost = async (req, res, next) => {
  try {
    const { id } = req.params
    const community = await postService.likePost(id)

    if (!community) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Community post not found' })
    }

    res.status(StatusCodes.OK).json(community)
  } catch (error) {
    next(error)
  }
}

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

const commentOnCommunityPost = async (req, res, next) => {
  try {
    const { id } = req.params
    const { user, comment } = req.body

    const community = await postService.commentOnPost(id, user, comment)

    if (!community) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Community post not found' })
    }

    res.status(StatusCodes.OK).json(community)
  } catch (error) {
    next(error)
  }
}


module.exports = {
  createCommunityPost,
  getCommunityPosts,
  getCommunityPostById,
  updateCommunityPost,
  deleteCommunityPost,
  likeCommunityPost,
  commentOnCommunityPost
}


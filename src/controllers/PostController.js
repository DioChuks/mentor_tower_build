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
 * /post:
 *   post:
 *     summary: Create a new type of post
 *     tags: [Posts]
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

const createNewPost = catchAsync(async (_req, res) => {
  console.log('Request Body:', _req.body) // Log the request body
  try {
    const newPost = await postService.createPost(_req.body)
    console.log('Created New Post:', newPost) // Log the created post
    res.status(StatusCodes.CREATED).json(newPost)
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json(error.message)
  }
})

/**
 * @swagger
 * /community:
 *   get:
 *     summary: Get all type posts
 *     tags: [Posts]
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

const getPosts = catchAsync(async (_req, res) => {
  try {
    const { type } = _req.params
    const postTypes = ['community', 'library', 'group']

    if (!postTypes.includes(type)) {
        throw new Error("type is required and must be a string of either 'community', 'library', 'group'.")
    }

    const { page = 1, limit = 10 } = _req.query
    const communities = await postService.getPosts(type, _req.user._id, page,limit)
    res.status(StatusCodes.OK).json(communities)
  } catch (error) {
    console.error('process failed at controller method',error)
    res.status(StatusCodes.BAD_REQUEST).json({message: error.message})
  }
})

const getCommunityPosts = catchAsync(async (_req, res) => {
  try {
    const communities = await postService.getCommunityPosts()
    res.status(StatusCodes.OK).json(communities)
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({message: error.message})
  }
})

const getLibraryPosts = catchAsync(async (_req, res) => {
  try {
    const libraries = await postService.getLibraryPosts()
    res.status(StatusCodes.OK).json(libraries)
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({message: error.message})
  }
})

const getGroupPosts = catchAsync(async (_req, res) => {
  try {
    const groups = await postService.getGroupPosts()
    res.status(StatusCodes.OK).json(groups)
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({message: error.message})
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

const getOnePostById = catchAsync(async (req, res) => {
  try {
    const community = await postService.getPostById(req.params.id)
    if (!community) {
      return res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND)
    }
    res.status(StatusCodes.OK).json(community)
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({message: error.message})
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

const updateOnePost = catchAsync(async (req, res) => {
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
    res.status(StatusCodes.BAD_REQUEST).json({message: error.message})
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

const deleteOnePost = catchAsync(async (req, res) => {
  try {
    const community = await postService.deletePost(req.params.id)
    if (!community) {
      return res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND)
    }
    res.status(StatusCodes.OK).json(community)
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({message: error.message})
  }
})

// toggle like or not on a post
const likeOrUnlikePost = catchAsync(async (req, res) => {
    try {
        const { id } = req.params
        const userId = req.user.id

        const result = await postService.toggleLikePost(id, userId)

        res.status(200).json({
            message: result.isLiked ? 'Post liked' : 'Post unliked',
            post: result.post,
            isLiked: result.isLiked,
            totalLikes: result.totalLikes
        })
    } catch (error) {
        console.log('process failed at controller')
        res.status(StatusCodes.BAD_REQUEST).json({message: error.message})
    }
})

const commentOnOnePost = catchAsync(async(req, res) => {
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
    res.status(StatusCodes.BAD_REQUEST).json({message: error.message})
  }
})

const getCommentsForPost = catchAsync(async(req, res) => {
    try {
        const { id } = req.params
        const { page = 1, limit = 10 } = req.query
        const comments = await postService.getCommentsForPost(id, parseInt(page), parseInt(limit))
        res.status(StatusCodes.OK).json(comments)
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({message: error.message})
    }
})


module.exports = {
  createNewPost,
  getPosts,
  getCommunityPosts,
  getLibraryPosts,
  getGroupPosts,
  getOnePostById,
  updateOnePost,
  deleteOnePost,
  likeOrUnlikePost,
  commentOnOnePost,
  getCommentsForPost
}

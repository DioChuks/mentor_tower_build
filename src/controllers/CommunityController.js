const catchAsync = require('../utils/catchAsync')
const PostService = require('../services/PostService')
const { StatusCodes, ReasonPhrases } = require('http-status-codes')

const postService = new PostService();

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

const getCommunityPosts = catchAsync(async (_req, res) => {
  try {
    const communities = await postService.getCommunityPosts()
    res.status(StatusCodes.CREATED).json(communities)
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json(ReasonPhrases.BAD_REQUEST)
  }
})

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
const Post = require('../models/Post')

class PostService {
  async createPost(data) {
    console.log('Data to be saved:', data) // Log the data to be saved
    const post = new Post(data)
    return post.save()
  }

  async getCommunityPosts() {
    return Post.find({ type: 'community' }).exec()
  }

  async getLibraryPosts() {
    return Post.find({ type: 'library' }).exec()
  }

  async getGroupPosts() {
    return Post.find({ type: 'group' }).exec()
  }

  async getPostById(id) {
    return Post.findById(id).exec()
  }

  async updatePost(id, data) {
    return Post.findByIdAndUpdate(id, data, { new: true }).exec()
  }

  async deletePost(id) {
    return Post.findByIdAndDelete(id).exec()
  }

  async likePost(id) {
    return Post.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } },
      { new: true }
    ).exec()
  }

  async toggleLikePost(postId, userId) {
    const post = await Post.findById(postId)
    if (!post) {
      throw new Error()
    }

    const isLiked = post.likes.includes(userId)

    if (isLiked) {
      // Unlike the post
      post.likes.pull(userId)
    } else {
      // Like the post
      post.likes.push(userId)
    }

    await post.save()

    return {
      post,
      isLiked: !isLiked,
      totalLikes: post.likes.length
    }
  }

  async commentOnPost(id, user, comment) {
    return Post.findByIdAndUpdate(
      id,
      { $push: { comments: { user, comment } } },
      { new: true }
    ).exec()
  }
}

module.exports = PostService;

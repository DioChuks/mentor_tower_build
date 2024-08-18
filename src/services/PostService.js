const Post = require('../models/Post')

class PostService {
  async createPost(data) {
    const { user, content, type } = data

    const post = new Post({
        user,
        content,
        type,
        likes: [],
        comments: []
    })

    return post.save()
  }

  async getCommunityPosts() {
    return Post.find({ type: 'community' }).populate('user', 'name tier role').exec()
  }

  async getLibraryPosts() {
    return Post.find({ type: 'library' }).populate('user', 'name tier role').exec()
  }

  async getGroupPosts() {
    return Post.find({ type: 'group' }).populate('user', 'name tier role').exec()
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

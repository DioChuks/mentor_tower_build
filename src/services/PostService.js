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

  async commentOnPost(id, user, comment) {
    return Post.findByIdAndUpdate(
      id,
      { $push: { comments: { user, comment } } },
      { new: true }
    ).exec()
  }
}

module.exports = PostService;
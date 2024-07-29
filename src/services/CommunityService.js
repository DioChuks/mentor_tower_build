const Post = require('../models/Post')

class CommunityService {
  constructor() {}
  async createCommunityPost(data) {
    console.log('Data to be saved:', data) // Log the data to be saved
    const communityPost = new Post(data)
    return communityPost.save()
  }

  async getCommunityPosts() {
    return Post.find({ type: 'community' }).exec()
  }

  async getCommunityPostById(id) {
    return Post.findById(id).exec()
  }

  async updateCommunityPost(id, data) {
    return Post.findByIdAndUpdate(id, data, { new: true }).exec()
  }

  async deleteCommunityPost(id) {
    return Post.findByIdAndDelete(id).exec()
  }

  async likeCommPost(id) {
    return Post.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } },
      { new: true }
    ).exec()
  }

  async commentCommPost(id, user, comment) {
    return Post.findByIdAndUpdate(
      id,
      { $push: { comments: { user, comment } } },
      { new: true }
    ).exec()
  }
}

module.exports = CommunityService;
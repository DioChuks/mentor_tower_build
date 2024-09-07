const { Post, Comment } = require('../models/Post')

class PostService {
  // Create a new post
    async createPost(data) {
        const { user, content, type, no_of_tagged } = data

        const post = new Post({
            user,
            content,
            type,
            no_of_tagged,
            likes: []
        })

        return post.save()
    }

    async getPosts(type, userId, page = 1, limit = 10) {
        const posts = await Post.find({ type: type })
        .populate('user', 'name tier role')
        .populate('commentCount') // Include the comment count via virtual field
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 })
        .exec()

        const postsWithLikes = posts.map(post => {
            const isLiked = post.likes.includes(userId)
            return {
                ...post.toObject(),
                isLiked
            }
        })

        return postsWithLikes
    }

    // Get all community posts with limited user details and comment count
    async getCommunityPosts() {
        return Post.find({ type: 'community' })
        .populate('user', 'name tier role')
        .populate('commentCount') // Include the comment count via virtual field
        .exec()
    }

    // Get all library posts with limited user details and comment count
    async getLibraryPosts() {
        return Post.find({ type: 'library' })
        .populate('user', 'name tier role')
        .populate('commentCount') // Include the comment count via virtual field
        .exec()
    }

    // Get all group posts with limited user details and comment count
    async getGroupPosts() {
        return Post.find({ type: 'group' })
        .populate('user', 'name tier role')
        .populate('commentCount') // Include the comment count via virtual field
        .exec()
    }

    // Get a single post by its ID with limited user details and comment count
    async getPostById(id) {
        return Post.findById(id)
        .populate('user', 'name tier role')
        .populate('commentCount') // Include the comment count via virtual field
        .exec()
    }

    // Update an existing post
    async updatePost(id, data) {
        return Post.findByIdAndUpdate(id, data, { new: true })
        .populate('user', 'name tier role')
        .populate('commentCount') // Include the comment count via virtual field
        .exec()
    }

    // Delete a post by its ID
    async deletePost(id) {
        return Post.findByIdAndDelete(id).exec()
    }

    // Toggle like/unlike on a post
    async toggleLikePost(postId, userId) {
        const post = await Post.findById(postId)
        if (!post) {
            throw new Error('Post not found')
        }

        if (!Array.isArray(post.likes)) {
            post.likes = [];
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

    // Add a comment to a post (separate Comment model)
    async commentOnPost(postId, userId, commentText) {
        const comment = new Comment({
            postId,
            user: userId,
            comment: commentText
        })

        await comment.save()

        return comment
    }

    // Get comments for a specific post with pagination
    async getCommentsForPost(postId, page = 1, limit = 10) {
        return Comment.find({ postId })
        .populate('user', 'name')
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 })
        .exec()
    }
}

module.exports = PostService

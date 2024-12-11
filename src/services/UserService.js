const { StatusCodes } = require('http-status-codes')
const mongoose = require('mongoose')
const User = require('../models/User')
const ApiError = require('../errors/ApiError')
const { UserRole } = require('../contracts/roles')

// Function to register a new user
const registerUser = async userBody => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Email already taken')
  }
  return User.create(userBody)
}

// Function to query users with pagination
const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options)
  return users
}

// Function to get a user by ID
const getUserById = async id => User.findById(id)

// Function to get a user by email
const getUserByEmail = async email => User.findOne({ email })

// Function to update a user by ID
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId)
  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not found')
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Email already taken')
  }
  Object.assign(user, updateBody)
  await user.save()
  return user
}

// Function to delete a user by ID
const deleteUserById = async userId => {
  const user = await getUserById(userId)
  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not found')
  }
  await user.deleteOne()
  return user
}

// Function to get all users that are mentors
const getAllMentors = async () => {
  const mentors = await User.find({ role: UserRole.Mentor })
  return mentors
}

/**
 * Search mentees of a specific mentor
 * @param {String} mentorId - The ID of the mentor
 * @param {String} query - The search query
 * @returns {Array} - List of mentees
 */
const searchMentees = async (mentorId, query) => {
  const mentees = await User.find({
    role: 'mentee', // Ensure they are mentees
    mentor: mentorId, // Only mentees assigned to this mentor
    $or: [
      { name: { $regex: query, $options: 'i' } }, // Case-insensitive search on name
      { email: { $regex: query, $options: 'i' } } // Case-insensitive search on email
    ]
  }).select('name email role');
  return mentees;
};

/**
 * Search mentors of a specific mentee
 * @param {String} menteeId - The ID of the mentee
 * @param {String} query - The search query
 * @returns {Array} - List of mentors
 */
const searchMentors = async (menteeId, query) => {
  const mentors = await User.find({
    role: 'mentor', // Ensure they are mentors
    mentees: menteeId, // Only mentors with this mentee
    $or: [
      { name: { $regex: query, $options: 'i' } }, // Case-insensitive search on name
      { email: { $regex: query, $options: 'i' } } // Case-insensitive search on email
    ]
  }).select('name email role');
  return mentors;
};

/**
 * Search all mentors
 * @param {String} query - The search query
 * @returns {Array} - List of mentors
 */
const searchAllMentors = async (query) => {
  const mentors = await User.find({
    role: 'mentor', // Only users with a 'mentor' role
    $or: [
      { name: { $regex: query, $options: 'i' } }, // Case-insensitive search on name
      { email: { $regex: query, $options: 'i' } } // Case-insensitive search on email
    ]
  }).select('name email role');
  return mentors;
};

module.exports = {
  registerUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
  getAllMentors,
  searchMentees,
  searchMentors,
  searchAllMentors
}

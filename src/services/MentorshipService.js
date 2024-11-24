const Mentorship = require('../models/UserMentorship');
const User = require('../models/User');
const ApiError = require('../errors/ApiError');
const { StatusCodes } = require('http-status-codes');

/**
 * Get mentees for a mentor
 * @param {String} mentorId - The ID of the mentor
 * @returns {Array} - List of mentees
 */
const getMenteesForMentor = async (mentorId) => {
  const Mentorships = await Mentorship.find({ mentor: mentorId, status: 'active' })
    .populate('mentee', 'name email role'); // Include mentee details
  return Mentorships.map(rel => rel.mentee);
};

/**
 * Get mentors for a mentee
 * @param {String} menteeId - The ID of the mentee
 * @returns {Array} - List of mentors
 */
const getMentorsForMentee = async (menteeId) => {
  const Mentorships = await Mentorship.find({ mentee: menteeId, status: 'active' })
    .populate('mentor', 'name email role'); // Include mentor details
  return Mentorships.map(rel => rel.mentor);
};

/**
 * Get mentorship applicants for a specific mentor
 * @param {String} mentorId - The ID of the mentor
 * @returns {Array} - List of applicants
 */
const getApplicantsForMentor = async (mentorId) => {
    const applications = await Mentorship.find({ mentor: mentorId, status: 'pending' })
      .populate('mentee', 'name email role'); // Populate mentee details
    return applications;
  };

module.exports = { getMenteesForMentor, getMentorsForMentee, getApplicantsForMentor };

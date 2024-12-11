const { searchMentees, searchMentors, searchAllMentors } = require('../services/UserService');

/**
 * Search mentees for a mentor
 * @route GET /v1/search/my-mentees
 * @param req
 * @param res
 * @param next
 */
const searchMyMentees = async (req, res, next) => {
  try {
    const { query } = req.query;
    const mentorId = req.user.id; // Assuming the authenticated user is the mentor
    const mentees = await searchMentees(mentorId, query);
    res.status(200).json({ success: true, mentees });
  } catch (error) {
    next(error);
  }
};

/**
 * Search mentors for a mentee
 * @route GET /v1/search/my-mentors
 * @param req
 * @param res
 * @param next
 */
const searchMyMentors = async (req, res, next) => {
  try {
    const { query } = req.query;
    const menteeId = req.user.id; // Assuming the authenticated user is the mentee
    const mentors = await searchMentors(menteeId, query);
    res.status(200).json({ success: true, mentors });
  } catch (error) {
    next(error);
  }
};

/**
 * Search all mentors
 * @route GET /v1/search/mentors
 * @param req
 * @param res
 * @param next
 */
const httpSearchMentors = async (req, res, next) => {
    try {
      const { query } = req.query;
      const mentors = await searchAllMentors(query);
      res.status(200).json({ success: true, mentors });
    } catch (error) {
      next(error);
    }
  };

module.exports = { searchMyMentees, searchMyMentors, httpSearchMentors };

const { getMenteesForMentor, getMentorsForMentee, getApplicantsForMentor } = require('../services/MentorshipService');

/**
 * Get mentee list for a mentor
 */
const getMentees = async (req, res, next) => {
  try {
    const { mentorId } = req.params;
    const mentees = await getMenteesForMentor(mentorId);
    res.status(200).json({ success: true, mentees });
  } catch (error) {
    next(error);
  }
};

/**
 * Get mentor list for a mentee
 */
const getMentors = async (req, res, next) => {
  try {
    const { menteeId } = req.params;
    const mentors = await getMentorsForMentee(menteeId);
    res.status(200).json({ success: true, mentors });
  } catch (error) {
    next(error);
  }
};

/**
 * Get list of mentorship applicants for a mentor
 * @param req
 * @param res
 * @param next
 */
const getApplicants = async (req, res, next) => {
    try {
      const { mentorId } = req.params;
      const applicants = await getApplicantsForMentor(mentorId);
      res.status(200).json({ success: true, applicants });
    } catch (error) {
      next(error);
    }
  };

module.exports = { getMentees, getMentors, getApplicants };

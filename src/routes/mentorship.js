const express = require('express');
const { getMentees, getMentors, getApplicants } = require('../controllers/MentorshipController');
const { GateRoute } = require('../middlewares/auth');

const router = express.Router(GateRoute);

/**
 * @route GET /v1/mentorships/mentors/:mentorId/mentees
 * @desc Get mentee list for a mentor
 */
router.get('/mentors/:mentorId/mentees', getMentees);

/**
 * @route GET /v1/mentorships/mentees/:menteeId/mentors
 * @desc Get mentor list for a mentee
 */
router.get('/mentees/:menteeId/mentors', getMentors);

/**
 * @route GET /v1/mentorships/:mentorId/applicants
 * @desc Get list of mentorship applicants for a mentor
 * @access Protected
 */
router.get('/:mentorId/applicants', getApplicants);

module.exports = router;

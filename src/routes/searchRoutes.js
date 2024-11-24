const express = require('express');
const { searchMyMentees, searchMyMentors } = require('../controllers/SearchController');
const { GateRoute} = require('../middlewares/auth');

const router = express.Router(GateRoute);

/**
 * @route GET /v1/search/my-mentees
 * @desc Search mentees for the authenticated mentor
 * @access Protected
 */
router.get('/my-mentees', searchMyMentees);

/**
 * @route GET /v1/search/my-mentors
 * @desc Search mentors for the authenticated mentee
 * @access Protected
 */
router.get('/my-mentors', searchMyMentors);

module.exports = router;

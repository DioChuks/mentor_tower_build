const express = require('express');
const userController = require('../controllers/UserController');
// this would be an unauthenticated route
const router = express.Router();

router.get('/', userController.getMentors);

module.exports = router;
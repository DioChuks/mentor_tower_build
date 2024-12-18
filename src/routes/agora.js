const express = require('express');
const agoraController = require('../controllers/AgoraController');

const agoraRouter = express.Router();

// RTC Token Generation Endpoint
agoraRouter.get('/generate-rtc-token', agoraController.generateRtcToken);
// RTM Token Generation Endpoint
agoraRouter.get('/generate-rtm-token', agoraController.generateRtmToken);

module.exports = agoraRouter;
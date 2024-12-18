const AgoraTokenService = require("../services/AgoraService");

const agoraTokenService = new AgoraTokenService(
    process.env.AGORA_APP_ID, 
    process.env.AGORA_APP_CERTIFICATE
);

const generateRtcToken = (req, res) => {
    try {
      const { channelName, uid } = req.query;
  
      if (!channelName || !uid) {
        return res.status(400).json({ 
          error: 'Channel name and UID are required' 
        });
      }
  
      const token = agoraTokenService.generateRtcToken(
        channelName, 
        uid
      );
  
      res.json({ token });
    } catch (error) {
      console.error('RTC Token Generation Error:', error);
      res.status(500).json({ 
        error: 'Failed to generate RTC token' 
      });
    }
};

const generateRtmToken = (req, res) => {
    try {
      const { userId } = req.query;
  
      if (!userId) {
        return res.status(400).json({ 
          error: 'User ID is required' 
        });
      }
  
      const token = agoraTokenService.generateRtmToken(userId);
  
      res.json({ token });
    } catch (error) {
      console.error('RTM Token Generation Error:', error);
      res.status(500).json({ 
        error: 'Failed to generate RTM token' 
      });
    }
};

module.exports = {
    generateRtcToken,
    generateRtmToken
}
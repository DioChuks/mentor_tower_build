const { RtcTokenBuilder, RtmTokenBuilder, RtcRole, RtmRole } = require('agora-token');

class AgoraTokenService {
    constructor(appId, appCertificate) {
        this.appId = appId;
        this.appCertificate = appCertificate;
        if (appId == undefined || appId == "" || appCertificate == undefined || appCertificate == "") {
            console.log("Need to set environment variable AGORA_APP_ID and AGORA_APP_CERTIFICATE");
            process.exit(1);
        }
    }

    generateRtcToken(channelName, uid, role=RtcRole.PUBLISHER) {
        const expirationTime = 3600;
        const currentTimestamp = Math.floor(Date.now() / 1000);
        const privilegeExpiredTs = currentTimestamp + expirationTime;

        return RtcTokenBuilder.buildTokenWithUid(this.appId, this.appCertificate, channelName, uid, role, privilegeExpiredTs);
    }

    generateRtmToken(userId) {
        const expirationTime = 3600;
        const currentTimestamp = Math.floor(Date.now() / 1000);
        const privilegeExpiredTs = currentTimestamp + expirationTime;

        return RtmTokenBuilder.buildToken(this.appId, this.appCertificate, userId, RtmRole.RtmUser, privilegeExpiredTs);
    }
}

module.exports = AgoraTokenService
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calendar = void 0;
const googleapis_1 = require("googleapis");
const oAuth2Client = new googleapis_1.google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_REDIRECT_URI);
oAuth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN
});
exports.calendar = googleapis_1.google.calendar({ version: 'v3', auth: oAuth2Client });

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const google_1 = require("../config/google");
const generateMeetLink = () => __awaiter(void 0, void 0, void 0, function* () {
    const event = {
        summary: 'Meeting',
        description: 'Mentorship Meeting',
        start: {
            dateTime: new Date().toISOString(),
            timeZone: 'America/Los_Angeles'
        },
        end: {
            dateTime: new Date(new Date().getTime() + 60 * 60 * 1000).toISOString(),
            timeZone: 'America/Los_Angeles'
        },
        conferenceData: {
            createRequest: {
                requestId: 'some-random-string',
                conferenceSolutionKey: { type: 'hangoutsMeet' }
            }
        }
    };
    const response = yield google_1.calendar.events.insert({
        calendarId: 'primary',
        requestBody: event,
        conferenceDataVersion: 1
    });
    const meetLink = response.data.hangoutLink;
    return meetLink || '';
});
exports.default = generateMeetLink;

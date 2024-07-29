const { calendar } = require('../config/google')

const generateMeetLink = async () => {
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
  }

  const response = await calendar.events.insert({
    calendarId: 'primary',
    requestBody: event,
    conferenceDataVersion: 1
  })

  const meetLink = response.data.hangoutLink
  return meetLink || ''
}

module.exports = generateMeetLink

import { google } from 'googleapis'


import authGoogleCalendar from '../authGoogleCalendar'


function listEvents(auth) {
  const calendar = google.calendar({version: 'v3', auth});
  calendar.events.list({
    calendarId: 'aukpddfuci20k00kqm51tkl3rc@group.calendar.google.com',
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const events = res.data.items;
    if (events.length) {
      console.log('Upcoming 10 events:');
      events.map((event, i) => {
        const start = event.start.dateTime || event.start.date;
        console.log(`${start} - ${event.summary}`);
      });
    } else {
      console.log('No upcoming events found.');
    }
  });
}

const auth = authGoogleCalendar()

export default {
	name: 'schedule',
	aliases: ['sch'],
	description: 'Расписание стримов на неделю',
	execute(message, args) {
		const events = listEvents(auth)
		console.log(events);
		const answer = 'https://calendar.google.com/calendar/embed?src=aukpddfuci20k00kqm51tkl3rc%40group.calendar.google.com&ctz=Europe%2FMoscow'
		message.channel.send(answer);
	},
};
import { google } from 'googleapis';
import { GOOGLE_APPLICATION_CREDENTIALS, GOOGLE_CALENDAR_ID } from '../config';

const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];

const getAuth = () => new google.auth.GoogleAuth({
  keyFile: GOOGLE_APPLICATION_CREDENTIALS,
  scopes: SCOPES,
});

const auth = getAuth();

const calendarApi = google.calendar({ version: 'v3', auth });

const listEvents = async () => {
  const res = await calendarApi.events.list({
    calendarId: GOOGLE_CALENDAR_ID,
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  }).catch((e) => console.log(e));
  return res.data.items;
};

export {
  listEvents,
};

export default calendarApi;

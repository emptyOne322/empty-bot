import { google } from 'googleapis'
import { GOOGLE_APPLICATION_CREDENTIALS } from '../config'

const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];

const getAuth = () => {
  return  new google.auth.GoogleAuth({
  keyFile: GOOGLE_APPLICATION_CREDENTIALS,
  scopes: SCOPES,
});
}

const auth = getAuth()


export default google.calendar({version: 'v3', auth});

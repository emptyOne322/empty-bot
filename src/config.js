import { config } from 'dotenv';

config();
const prefix = process.env.PREFIX;

const { GOOGLE_CALENDAR_ID, GOOGLE_APPLICATION_CREDENTIALS } = process.env;

export {
  prefix,
  GOOGLE_CALENDAR_ID,
  GOOGLE_APPLICATION_CREDENTIALS,
};

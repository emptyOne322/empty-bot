import { config } from 'dotenv'

config()
const prefix = process.env.PREFIX

const GOOGLE_CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID

export {
	prefix,
	GOOGLE_CALENDAR_ID
}

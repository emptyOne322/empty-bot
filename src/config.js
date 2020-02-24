import { config } from 'dotenv'

config()
const prefix = process.env.PREFIX

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY

export {
	prefix,
	GOOGLE_API_KEY
}
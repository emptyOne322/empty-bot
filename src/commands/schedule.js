import { google } from 'googleapis'

import { GOOGLE_API_KEY } from '../config' 
import formatDate from '../lib/formatDate'
import { EMBED_COLOR } from './constants'

const  listEvents = async () => {
	let events
  const calendar = google.calendar({version: 'v3', auth: GOOGLE_API_KEY});
  await new Promise((resolve, reject) => {
		calendar.events.list({
	    calendarId: 'aukpddfuci20k00kqm51tkl3rc@group.calendar.google.com',
	    timeMin: (new Date()).toISOString(),
	    maxResults: 10,
	    singleEvents: true,
	    orderBy: 'startTime',
	  }, (err, res) => {
	    if (err) {
				reject()
			}
	    events = res.data.items
			resolve()
	  })
	}
		
	)
	return events
}

export default {
	name: 'schedule',
	aliases: ['sch'],
	description: 'Расписание стримов на неделю',
	async execute(message, args) {
		const events = await listEvents()
		const eventsAsStringArray = events.map(e => {
			const startTime = formatDate(e.start.dateTime)
			return `**${e.summary}** - ${startTime}`
		})
		const eventsAsString = eventsAsStringArray.join('\n')
		
		const embed = {
			color: EMBED_COLOR,
			title: 'Ближашие стримы',
			description: eventsAsString
		}

		
		message.channel.send(`<@${message.author.id}>`, {embed});
	},
};
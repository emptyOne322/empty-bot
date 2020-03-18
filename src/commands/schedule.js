import { google } from 'googleapis'

import { GOOGLE_API_KEY } from '../config' 
import formatDate from '../lib/formatDate'
import { EMBED_COLOR } from './constants'

export default {
	name: 'schedule',
	aliases: ['sch'],
	description: 'Ближайшие стримы',
	async execute(message, args) {
		const events = await listEvents()
		if(!events.length) {
			const vpr = message.channel.guild.emojis.get('534814958186135553')
			const vprAsString = vpr.toString()
			message.channel.send(`Милорд <@${message.channel.guild.ownerID}>, народ требует расписания ${vprAsString}${vprAsString}${vprAsString}`);
		}
		else {
			const eventsAsString = eventsToString(events)
			
			const embed = {
				title: 'Ближашие стримы',
				description: eventsAsString,
				color: EMBED_COLOR,
			}
			message.channel.send(`<@${message.author.id}>`, {embed});
		}
		
	},
};

const eventsToString = (events = []) => {
	const eventsAsStringArray = events.map(e => {
		const startTime = formatDate(e.start.dateTime)
		return `**${startTime}** - ${e.summary}`
	})
	return eventsAsStringArray.join('\n')
}

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
	})
	return events
}
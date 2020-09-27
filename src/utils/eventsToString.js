import formatDate from '../lib/formatDate'

const eventsToString = (events = []) => {
	const eventsAsStringArray = events.map(e => {
		const startTime = formatDate(e.start.dateTime)
		return `**${startTime}** - ${e.summary}`
	})
	return eventsAsStringArray.join('\n')
}

export default eventsToString

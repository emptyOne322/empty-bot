export default {
	name: 'расписание',
	description: 'Расписание стримов на неделю',
	execute(message, args) {
		const answer = 'https://calendar.google.com/calendar/embed?src=aukpddfuci20k00kqm51tkl3rc%40group.calendar.google.com&ctz=Europe%2FMoscow'
		message.channel.send(answer);
	},
};
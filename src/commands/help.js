// import commands from './index'
// console.log('commands: ', commands);

export default {
	name: 'help',
	description: 'Показывает список комманд',
	execute(message, args) {
		// const msg = Object.keys(commands).reduce((commandKey, acc) => {
		// 	console.log(commandKey);
		// 	// const commandLine =`!${commandKey} - ${commands[commandKey].description}` 
		// 	// return acc + commandLine
		// })
		message.channel.send(
			'> help - Показывает список комманд \n'+
			'> ping - ping \n'+
			'> schedule - Расписание стримов на неделю \n'
		)
	},
}
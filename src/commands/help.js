import { prefix }  from '../config'

const getCommandsList = async () => {
	const commands = await import('./index.js')
	return commands.default
}


export default {
	name: 'help',
	description: 'Показывает список комманд',
	execute : async (message, args) => {
		const commands = await getCommandsList()
		
		const commandsArray = Object.keys(commands).map(key => {
			return `**${prefix}${commands[key].name}** - ${commands[key].description} \n`
		})
		
		const answer = '>>> '+ commandsArray.join('')
		
		message.channel.send(answer)
	},
}
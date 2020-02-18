import { prefix }  from '../config'
import { EMBED_COLOR } from './constants'


const getCommandsList = async () => {
	const commands = await import('./index.js')
	return commands.default
}


export default {
	name: 'help',
	aliases: ['h'],
	description: 'Показывает список комманд',
	execute : async (message, args) => {
		const commands = await getCommandsList()
		
		const commandsArray= Object.keys(commands).map(key => {
			const command = commands[key]
			let res = `**\n\`${prefix}${command.name}\` - ${command.description}  **\n`
			if(command.aliases) {
				const aliasesAsString = command.aliases.join(', ')
				res += `или: ${aliasesAsString} \n`
			}
			
			return res 
		})
		
		const commandsAsString = commandsArray.join('')
		
		const embed = {
			color: EMBED_COLOR,
			title: 'Что я могу!',
			description: commandsAsString
		}
		
		message.channel.send({embed: embed})
	},
}
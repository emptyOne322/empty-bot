import fs from 'fs'

// const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

commandFiles.forEach(file => {
	// const command = require(`./commands/${file}`)
	// bot.commands.set(command.name, command);
})

export default {
	name: 'help',
	description: 'Shows commands list',
	execute(message, args) {
		// const message = bot.commands.reduce(command => )
		// bot.commands.forEach(command => {
		// 	message.channel.send(
		// 
		// 	)
		// })
	},
}
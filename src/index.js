import '@babel/polyfill'
import 'intl'

import Discord from 'discord.js'

import commands from './commands'
import { prefix } from './config'
import { guildMemberAdd, guildMemberRemove } from './events'
import { prefix, GOOGLE_CALENDAR_ID, TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET } from './config'
import calendarApi from './apies/calendarApi'


const initBot = () => {
	const bot = new Discord.Client()
	bot.commands = new Discord.Collection();
	bot.login(process.env.BOT_TOKEN)
	return bot
}

const prepareCommands = (bot) =>{
	Object.keys(commands).forEach((commandKey) => {
		bot.commands.set(commandKey, commands[commandKey]);
	})
}

const checkCommandName = (bot, name) => {
	
	let commandName = name
	
	
	bot.commands.find((cmd) => {
		if(cmd.aliases && cmd.aliases.includes(name)) {
			commandName = cmd.name
			return true
		}
	})
	
	if (!bot.commands.has(commandName)) return;
	
	return bot.commands.get(commandName);
}

const bot = initBot()
prepareCommands(bot)

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`)
});

bot.on('guildMemberAdd', guildMemberAdd)

bot.on('guildMemberRemove', guildMemberRemove)

bot.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	let commandName = args.shift().toLowerCase();

	console.log(`called command name: ${commandName}`);

	

	const command = checkCommandName(bot, commandName)
	
	if(!command) return 
	
	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
})


import Discord from 'discord'

import commands from './commands'

import { config } from 'dotenv'

config()

const prefix = process.env.PREFIX

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
	console.log(bot.commands);
}

const bot = initBot()
prepareCommands(bot)

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`)
});

bot.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	console.log(`called command name: ${commandName}`);

	if (!bot.commands.has(commandName)) return;

	const command = bot.commands.get(commandName);

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
})


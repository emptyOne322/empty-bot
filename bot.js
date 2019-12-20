const Discord = require('discord.js')
const fs = require('fs')

const { token, prefix } = require('./config.json')

const bot = new Discord.Client()
bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

commandFiles.forEach(file => {
	const command = require(`./commands/${file}`);
	bot.commands.set(command.name, command);
})

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`)
});
 
bot.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();
	
	console.log(commandName);
	
	if (!bot.commands.has(commandName)) return;

	const command = bot.commands.get(commandName);

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
})
 
bot.login(token)
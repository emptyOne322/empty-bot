import { prefix } from '../config'

export default (bot) => (message) => {
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

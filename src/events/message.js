import { prefix } from '../config';

const checkCommandName = (bot, name) => {
  let commandName = name;

  bot.commands.find((cmd) => {
    if (cmd.aliases && cmd.aliases.includes(name)) {
      commandName = cmd.name;
      return true;
    }
    return false;
  });

  if (!bot.commands.has(commandName)) return undefined;

  return bot.commands.get(commandName);
};

export default (bot) => (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  global.console.log(`called command name: ${commandName}`);

  const command = checkCommandName(bot, commandName);

  if (!command) return;

  try {
    command.execute(message, args, bot);
  } catch (error) {
    global.console.error(error);
    message.reply('there was an error trying to execute that command!');
  }
};

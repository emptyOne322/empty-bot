import Discord from 'discord.js'

import commands from './commands'
import { guildMemberAdd, guildMemberRemove, ready, message } from './events'

const prepareCommands = (bot) =>{
  Object.keys(commands).forEach((commandKey) => {
    bot.commands.set(commandKey, commands[commandKey]);
  })
}

const initBot = () => {
	const bot = new Discord.Client()
	bot.commands = new Discord.Collection();

  bot.on('ready', ready(bot))

  bot.on('guildMemberAdd', guildMemberAdd)

  bot.on('guildMemberRemove', guildMemberRemove)

  bot.on('message', message(bot))

  prepareCommands(bot)

	return bot
}


export default initBot()

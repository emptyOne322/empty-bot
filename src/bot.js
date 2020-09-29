import Discord from 'discord.js';

import commands from './commands';
import {
  guildMemberAdd, guildMemberRemove, ready, message,
} from './events';

import { createMarkCron, createScheduleCron } from './jobs';

const prepareCommands = (bot) => {
  Object.keys(commands).forEach((commandKey) => {
    bot.commands.set(commandKey, commands[commandKey]);
  });
};

const initBot = () => {
  const bot = new Discord.Client();
  bot.commands = new Discord.Collection();

  bot.on('ready', ready(bot, [createMarkCron, createScheduleCron]));

  bot.on('guildMemberAdd', guildMemberAdd(bot));

  bot.on('guildMemberRemove', guildMemberRemove(bot));

  bot.on('message', message(bot));

  prepareCommands(bot);

  return bot;
};

export default initBot();

import createMarkCron from '../jobs/createMarkCron';

export default (bot) => () => {
  bot.emojisDictionary = bot.emojis.reduce(
    (acc, i) => {
      acc[i.name] = i.toString();
      return acc;
    },
    {},
  );

  createMarkCron(bot);

  global.console.log(`Logged in as ${bot.user.tag}!`);
};

export default (bot, callbacks = []) => () => {
  bot.emojisDictionary = bot.emojis.reduce(
    (acc, i) => {
      acc[i.name] = i.toString();
      return acc;
    },
    {},
  );

  callbacks.forEach((func) => {
    func(bot);
  });

  global.console.log(`Logged in as ${bot.user.tag}!`);
};

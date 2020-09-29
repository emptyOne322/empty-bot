export default (bot) => (member) => {
  const { guild } = member;
  if (guild.systemChannel) {
    const ttr = bot.emojisDictionary.tuturu;
    guild.systemChannel.send(`<@${member.user.id}> вступил в наши ряды! Добро пожаловать ${ttr}`);
  }
};

export default (bot) => (member) => {
  const { guild } = member;
  if (guild.systemChannel) {
    const vpr = bot.emojisDictionary.violet_pay_respect;
    guild.systemChannel.send(`${member.user.username} покинул нас ${vpr}${vpr}${vpr}`);
  }
};

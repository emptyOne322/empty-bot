export default (bot) => (member) => {
	const { guild } = member
	const memberTag = member.user.tag;
	if(guild.systemChannel){
		const ttr = bot.emojisDictionary['tuturu']
		guild.systemChannel.send(`<@${member.user.id}> вступил в наши ряды! Добро пожаловать ${ttr}`);
	}
}

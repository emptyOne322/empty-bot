export default (bot) => (member) => {
	const { guild } = member
	const memberTag = member.user.tag;
	if(guild.systemChannel){
		const vpr = bot.emojisDictionary['violet_pay_respect']
		guild.systemChannel.send(`<@${member.user.id}> покинул нас ${vpr}${vpr}${vpr}`);
	}
}

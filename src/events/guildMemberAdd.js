export default (member) => {
	const { guild } = member
	const memberTag = member.user.tag;
	if(guild.systemChannel){
		const ttr = guild.emojis.get('502159408604905473')
		const ttrAsString = ttr.toString()
		guild.systemChannel.send(`<@${member.user.id}> вступил в наши ряды! Добро пожаловать ${ttrAsString}`);
	}
}

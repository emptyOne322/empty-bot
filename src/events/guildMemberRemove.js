import emojis from '../emojies'

export default (member) => {
	const { guild } = member
	const memberTag = member.user.tag;
	if(guild.systemChannel){
		const vpr = guild.emojis.get('534814958186135553')
		const vprAsString = vpr.toString()
		guild.systemChannel.send(`<@${member.user.id}> покинул нас ${vprAsString}${vprAsString}${vprAsString}`);
	}
}

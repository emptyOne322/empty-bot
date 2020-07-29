import emojis from '../emojis'

export default (member) => {
	const { guild } = member
	const memberTag = member.user.tag;
	console.log(guild.emojis);
	if(guild.systemChannel){
		const vpr = guild.emojis.get('534814958186135553')
		const vprAsString = vpr.toString()
		guild.systemChannel.send(`<@${member.user.id}> покинул нас ${vprAsString}${vprAsString}${vprAsString}`);
	}
}

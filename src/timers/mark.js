import Discord from 'discord.js'

export default (bot) => {
  const guild = bot.guilds.first()
  const role = getMarkRole(bot, guild)
  console.log(role);

  const users = bot.users.filter(i => !i.bot && i.discriminator != 9025 && i)
  const marked = users.random()
  const markedGuildMember = guild.members.find((i) => i.id === marked.id)
  console.log(markedGuildMember);

  markedGuildMember.roles.cache.add(role)


}

const ROLE_NAME = 'Пазорный столб'

const getMarkRole = (bot, guild) => {
  let role = guild.roles.find(i => i.name == ROLE_NAME)
  if(!role) {
    const roleData = {
      data: {
        name: ROLE_NAME,
        color: 'BLACK',
        deny: ["CHANGE_NICKNAME"]
      }
    }
    const role = new Discord.Role(bot, roleData, guild)
  }
  console.log(role);
  return role
}

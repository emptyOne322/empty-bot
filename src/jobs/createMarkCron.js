import Discord from 'discord.js'
import cron from 'node-cron'

import { WEEK } from '../constants'

export default (bot) => {

  const mark = async (fireTime) => {
    const guild = bot.guilds.first()

    const role = await createMarkRole(guild)

    const markedUser = getMarkedUser(bot, guild)


    markedUser.addRole(role.id)
    bot.setTimeout(removeMarkRole, WEEk, markedUser, role)

    const pd = bot.emojisDictionary['PepoDance']
    const hh = bot.emojisDictionary['heh']
    guild.systemChannel.send(`>>> **${markedUser.user.username}** получает благославение ${pd}${pd}${pd} Пользуйся с умом ${hh}`)

  }

  const job = cron.schedule('00 11 * * 1', mark, {timezone: 'Europe/Moscow'})
}



const ROLE_NAME = 'Благословенный'

const ROLE = {
  name: ROLE_NAME,
  color: '#0DA5CE',
  permissions: ["MOVE_MEMBERS", "MUTE_MEMBERS"],
  position: 13,//todo: find better disition
  hoist: true,
}

const getMarkedUser = (bot, guild) => {
  const users = bot.users.filter(i => !i.bot && i.discriminator != 9025 && i)
  const marked = users.random()
  const markedGuildMember = guild.members.find((i) => i.id === marked.id)
  return markedGuildMember
}

const createMarkRole = async (guild) => {
  let role = guild.roles.find(i => i.name == ROLE_NAME)
  if(role) {
    console.log(`Role ${ROLE_NAME} already exists`);
    return role
  }
  role = await guild.createRole(ROLE)
    .then(r => {console.log(`Role ${ROLE_NAME} created`); return r;})
    .catch(e => {console.log(e);})


  return role
}

const removeMarkRole = (member, role) => {
  member.removeRole(role.id)
}

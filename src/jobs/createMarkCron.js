import cron from 'node-cron';

import { WEEK } from '../constants';

const ROLE_NAME = 'Благословенный';

const ROLE = {
  name: ROLE_NAME,
  color: '#0DA5CE',
  permissions: ['MOVE_MEMBERS', 'MUTE_MEMBERS'],
  position: 13, // todo: find better disition
  hoist: true,
};

const removeMarkRole = (member, role) => {
  member.removeRole(role.id);
};

const createMarkRole = async (guild) => {
  let role = guild.roles.find((i) => i.name === ROLE_NAME);
  if (role) {
    global.console.log(`Role ${ROLE_NAME} already exists`);
    return role;
  }
  role = await guild.createRole(ROLE)
    .then((r) => { global.console.log(`Role ${ROLE_NAME} created`); return r; })
    .catch((e) => { global.console.log(e); });

  return role;
};

const getMarkedUser = (bot, guild) => {
  const users = bot.users.filter((i) => !i.bot && i.discriminator !== 9025 && i);
  const marked = users.random();
  const markedGuildMember = guild.members.find((i) => i.id === marked.id);
  return markedGuildMember;
};

export default (bot) => {
  const mark = async () => {
    const guild = bot.guilds.first();

    const role = await createMarkRole(guild);

    const markedUser = getMarkedUser(bot, guild);

    markedUser.addRole(role.id);
    bot.setTimeout(removeMarkRole, WEEK, markedUser, role);

    const pd = bot.emojisDictionary.PepoDance;
    const hh = bot.emojisDictionary.heh;
    guild.systemChannel.send(`>>> **${markedUser.user.username}** получает благославение ${pd}${pd}${pd} Пользуйся с умом ${hh}`);
  };

  cron.schedule('00 11 * * 1', mark, { timezone: 'Europe/Moscow' });
};

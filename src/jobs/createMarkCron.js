import cron from 'node-cron';

const ROLE_NAME = 'Благословенный';

const ROLE = {
  name: ROLE_NAME,
  color: '#0DA5CE',
  permissions: ['MOVE_MEMBERS', 'MUTE_MEMBERS'],
  position: 13, // todo: find better disition
  hoist: true,
};

const createMarkRole = async (guild) => {
  let role = guild.roles.cache.find((i) => i.name === ROLE_NAME);
  if (role) {
    global.console.log(`Role ${ROLE_NAME} already exists`);
    return role;
  }
  role = await guild.roles.create({ data: ROLE })
    .then((r) => { global.console.log(`Role ${ROLE_NAME} created`); return r; })
    .catch((e) => { global.console.log(e); });

  return role;
};

const getMarkedUser = (bot, guild) => {
  const users = bot.users.cache.filter((i) => !i.bot && i.discriminator !== 9025 && i);
  const marked = users.random();
  const markedGuildMember = guild.members.cache.find((i) => i.id === marked.id);
  return markedGuildMember;
};

const removeRoleFromOldUser = (guild, role) => {
  const member = role.members.first();
  if (member) {
    member.roles.remove(role);
  }
};

export default (bot) => {
  const mark = async () => {
    const guild = bot.guilds.cache.first();

    const role = await createMarkRole(guild);

    removeRoleFromOldUser(guild, role);

    const markedUser = getMarkedUser(bot, guild);

    markedUser.roles.add(role.id);

    const pd = bot.emojisDictionary.PepoDance;
    const hh = bot.emojisDictionary.heh;
    guild.systemChannel.send(`>>> **${markedUser.user.username}** получает благославение ${pd}${pd}${pd} Пользуйся с умом ${hh}`);
  };

  cron.schedule('00 11 * * 1', mark, { timezone: 'Europe/Moscow' });
};

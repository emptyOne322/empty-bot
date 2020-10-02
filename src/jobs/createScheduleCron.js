import cron from 'node-cron';

import { listEvents } from '../apies/calendarApi';
import eventsToString from '../utils/eventsToString';
import { EMBED_COLOR } from '../constants';

export default (bot) => {
  const postSchedule = async () => {
    const events = await listEvents();
    const guild = bot.guilds.cache.first();
    if (events.length) {
      const eventsAsString = eventsToString(events);
      const embed = {
        title: 'Стримы на этой неделе',
        description: eventsAsString,
        color: EMBED_COLOR,
      };
      guild.systemChannel.send({ embed });
    }
  };

  cron.schedule('00 12 * * 1', postSchedule, { timezone: 'Europe/Moscow' });
};

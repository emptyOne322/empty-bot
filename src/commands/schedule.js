import { listEvents } from '../apies/calendarApi';
import eventsToString from '../utils/eventsToString';
import { EMBED_COLOR } from '../constants';

export default {
  name: 'schedule',
  aliases: ['sch'],
  description: 'Ближайшие стримы',
  async execute(message, args, bot) {
    const events = await listEvents();

    if (!events.length) {
      const vpr = bot.emojisDictionary.violet_pay_respect;
      message.channel.send(`Милорд <@${message.channel.guild.ownerID}>, народ требует расписания ${vpr}${vpr}${vpr}`);
    } else {
      const eventsAsString = eventsToString(events);

      const embed = {
        title: 'Ближайшие стримы',
        description: eventsAsString,
        color: EMBED_COLOR,
      };
      message.channel.send(`<@${message.author.id}>`, { embed });
    }
  },
};

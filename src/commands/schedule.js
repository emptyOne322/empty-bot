import calendarApi from '../apies/calendarApi';
import formatDate from '../lib/formatDate';
import { EMBED_COLOR } from './constants';
import { GOOGLE_CALENDAR_ID } from '../config';

const listEvents = async () => {
  const res = await calendarApi.events.list({
    calendarId: GOOGLE_CALENDAR_ID,
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  }).catch((e) => global.console.log(e));
  return res.data.items;
};

const eventsToString = (events = []) => {
  const eventsAsStringArray = events.map((e) => {
    const startTime = formatDate(e.start.dateTime);
    return `**${startTime}** - ${e.summary}`;
  });
  return eventsAsStringArray.join('\n');
};

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

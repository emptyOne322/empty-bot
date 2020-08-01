import '@babel/polyfill'
import 'intl'

import bot from './bot'

bot.login(process.env.BOT_TOKEN)

const Discord = require('discord.js')
const { token, prefix } = require('./config.json')

const bot = new Discord.Client()

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`)
});
 
bot.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong')
  }
})
 
bot.login(token)
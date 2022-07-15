const { Opengram } = require('../src/opengram')

function createBot (token, options) {
  const bot = new Opengram(token, options)
  bot.context.botInfo = { username: 'bot', first_name: 'Bot', id: 42, is_bot: true }
  return bot
}

module.exports = { createBot }

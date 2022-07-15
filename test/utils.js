const { Opengram } = require('../src/opengram')

function createBot (token, options) {
  const bot = new Opengram(token, options)
  bot.context.botInfo = { username: 'bot' }
  return bot
}

module.exports = { createBot }

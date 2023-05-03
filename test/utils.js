const { Opengram } = require('../src')

function createBot (token, options) {
  const bot = new Opengram(token, options)
  bot.context.botInfo = { username: 'bot', first_name: 'Bot', id: 42, is_bot: true }
  return bot
}

function createError (code, message) {
  const codes = {
    400: 'Bad Request'
  }
  const err = new Error(`${codes[code]}: ${message}`)
  err.error_code = code
  err.description = message
  return err
}

module.exports = { createBot, createError }

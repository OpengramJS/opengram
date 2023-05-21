const { Opengram } = require('../src')

/**
 * Creates mock bot instance
 *
 * @param {string|undefined} [token] Bot tocken
 * @param {OpengramOptions} [options] Options
 * @return {Opengram}
 */
function createBot (token = '5593542136:AAHtE-hMEkXsNjvN4ncDWKEBvA-q7ZzHTgI', options) {
  const bot = new Opengram(token, options)
  bot.username = 'bot'
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

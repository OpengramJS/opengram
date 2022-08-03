/**
 * This class represents errors that are thrown by Opengram because the Telegram Bot API responded with an error.
 * Instances of this class hold the information that the Telegram backend returned.
 * If this error is thrown, Opengram could successfully communicate with the Telegram Bot API servers,
 * however, an error code was returned for the respective method call.
 * @extends Error
 */
class TelegramError extends Error {
  constructor (payload = {}, on) {
    super(`${payload.error_code}: ${payload.description}`)
    this.code = payload.error_code
    this.response = payload
    this.description = payload.description
    this.parameters = payload.parameters || {}
    this.on = on || {}
  }
}

module.exports = { TelegramError }

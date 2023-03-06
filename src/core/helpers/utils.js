const crypto = require('crypto')

/**
 * Return text of media caption / message / channel post or `undefined` if not provided
 *
 * Usage example:
 * ```js
 * // Returns entities of channel post
 * getEntities(ctx.channelPost)
 *
 * // Returns entities of message or media caption
 * getEntities(ctx.message)
 * ```
 *
 * @private
 * @param {Message} message Message object for extracting entities
 * @return {string|Array}
 */
function getEntities (message) {
  if (message == null) return []
  if ('caption_entities' in message) return message.caption_entities ?? []
  if ('entities' in message) return message.entities ?? []
  return []
}

/**
 * Return text of media caption / message / channel post / callback query / short name of the game or `undefined`
 * if not provided
 *
 * Usage example:
 * ```js
 * // Returns text of channel post
 * getText(ctx.channelPost)
 *
 * // Returns text of message or media caption
 * getText(ctx.message)
 *
 * // Returns data of callback query
 * getText(ctx.callbackQuery)
 * ```
 *
 * @private
 * @param {Message} message Message object for extracting text
 * @return {string|undefined}
 */
function getText (
  message
) {
  if (message == null) return undefined
  if ('caption' in message) return message.caption
  if ('text' in message) return message.text
  if ('data' in message) return message.data
  if ('game_short_name' in message) return message.game_short_name
  return undefined
}

/**
 * Returns {@link Message} object for current update.
 * Works for
 * - `context.message`
 * - `context.editedMessage`
 * - `context.callbackQuery.message`
 * - `context.channelPost`
 * - `context.editedChannelPost`
 *
 * @param {OpengramContext} ctx Update context for extracting {@link Message} object
 * @return {Message|undefined}
 */
function getMessageFromAnySource (ctx) {
  return (
    ctx.message ||
    ctx.editedMessage ||
    (ctx.callbackQuery && ctx.callbackQuery.message) ||
    ctx.channelPost ||
    ctx.editedChannelPost
  )
}

/**
 * Returns `message_thread_id` from {@link Message} object for current update.
 *
 * @param {OpengramContext} ctx Update context for extracting `message_thread_id` from {@link Message} object
 * @return {number|undefined}
 */
function getThreadId (ctx) {
  const msg = getMessageFromAnySource(ctx)
  return msg?.is_topic_message ? msg.message_thread_id : undefined
}

/**
 * Prints warning messages
 *
 * @param {string} text Text of warning
 * @return {void}
 */
function showWarning (text) {
  process.emitWarning(text)
}

/**
 * Call native "crypto.timingSafeEqual" methods.
 * All passed values will be converted into strings first.
 *
 * Runtime is always corresponding to the length of the first parameter (string
 * a).
 *
 * @author Michael Raith
 * @param {string} a First string
 * @param {string} b Second string
 * @private
 * @return {boolean}
 */
function timingSafeEqual (a, b) {
  const strA = String(a)
  const strB = String(b)
  const aLen = Buffer.byteLength(strA)
  const bLen = Buffer.byteLength(strB)

  // Always use length of a to avoid leaking the length. Even if this is a
  // false positive because one is a prefix of the other, the explicit length
  // check at the end will catch that.
  const bufA = Buffer.allocUnsafe(aLen)
  bufA.write(strA)
  const bufB = Buffer.allocUnsafe(aLen)
  bufB.write(strB)

  return crypto.timingSafeEqual(bufA, bufB) && aLen === bLen
}

module.exports = { getEntities, getText, getMessageFromAnySource, getThreadId, showWarning, timingSafeEqual }

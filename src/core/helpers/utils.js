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
 * @private
 * @param {object} updateData
 * @return {string|array}
 */
function getEntities (updateData) {
  if (updateData == null) return []
  if ('caption_entities' in updateData) return updateData.caption_entities ?? []
  if ('entities' in updateData) return updateData.entities ?? []
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
 * @private
 * @param {object} updateData
 * @return {string|undefined}
 */
function getText (
  updateData
) {
  if (updateData == null) return undefined
  if ('caption' in updateData) return updateData.caption
  if ('text' in updateData) return updateData.text
  if ('data' in updateData) return updateData.data
  if ('game_short_name' in updateData) return updateData.game_short_name
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

module.exports = { getEntities, getText, getMessageFromAnySource }

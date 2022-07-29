const Markup = require('./markup')

/** Class for building extra parameters of messages */
class Extra {
  /**
   * @constructor
   * @param {object} [opts] Initial extra parameters
   * ```js
   * // Loads `reply_to_message_id: 1` parameter
   * new Extra({ reply_to_message_id: 1 })
   * ```
   */
  constructor (opts) {
    this.load(opts)
  }

  /**
   * Loads extra parameters from object to Extra instance
   * ```js
   * // Returns new instance with `reply_to_message_id: 1`
   * Extra.load({ reply_to_message_id: 1 })
   * // Loads `reply_to_message_id: 1` parameter to exists instance
   * new Extra().load({ reply_to_message_id: 1 })
   * ```
   * @param {object} opts Extra parameters object
   * @return {Extra}
   */
  load (opts = {}) {
    return Object.assign(this, opts)
  }

  /**
   * Adding reply to message
   * @see https://core.telegram.org/bots/api#sendmessage
   * @param {number} messageId Message id to reply
   * @return {Extra}
   */
  inReplyTo (messageId) {
    this.reply_to_message_id = messageId
    return this
  }

  /**
   * Enable / Disable notification for message
   * @see https://core.telegram.org/bots/api#sendmessage
   * @param {boolean} [value=true]
   * @return {Extra}
   */
  notifications (value = true) {
    this.disable_notification = !value
    return this
  }

  /**
   * Enable / Disable web preview for links in message
   * @see https://core.telegram.org/bots/api#sendmessage
   * @param {boolean} [value=true]
   * @return {Extra}
   */
  webPreview (value = true) {
    this.disable_web_page_preview = !value
    return this
  }

  /**
   * Markup factory function
   * @name markupCallback
   * @function
   * @param {Markup} markup Empty created Markup instance
   *
   * @example
   * Extra.markdown().markup((markup) => markup.removeKeyboard())
   */

  /**
   * Adds (inline-)keyboard markup to Extra instance
   *
   * ```js
   * // Example with factory function
   * ctx.reply('Hello',
   *   Extra.markdown()
   *     .markup((markup) => markup.removeKeyboard())
   * )
   *
   * // With Markup instance / object
   * const { Markup } = require('opengram')
   * const keyboard = Markup.inlineKeyboard([Markup.callbackButton('Anime', 'data')])
   *
   * ctx.reply('Hello',
   *   Extra.markdown().markup(keyboard)
   * )
   * ```
   *
   * @see https://core.telegram.org/bots/api#sendmessage
   * @param {object|markupCallback} markup
   * @return {Extra}
   */
  markup (markup) {
    if (typeof markup === 'function') {
      markup = markup(new Markup())
    }
    this.reply_markup = { ...markup }
    return this
  }

  /**
   * Enable / Disable `parse_mode: 'HTML'` for message
   * @see https://core.telegram.org/bots/api#formatting-options
   * @param {boolean} [value=true]
   * @return {Extra}
   */
  HTML (value = true) {
    this.parse_mode = value ? 'HTML' : undefined
    return this
  }

  /**
   * Enable / Disable `parse_mode: 'Markdown'` for message
   * @see https://core.telegram.org/bots/api#formatting-options
   * @param {boolean} [value=true]
   * @return {Extra}
   */
  markdown (value = true) {
    this.parse_mode = value ? 'Markdown' : undefined
    return this
  }

  /**
   * Enable / Disable `parse_mode: 'MarkdownV2'` for message
   * @see https://core.telegram.org/bots/api#formatting-options
   * @param {boolean} [value=true]
   * @return {Extra}
   */
  markdownV2 (value = true) {
    this.parse_mode = value ? 'MarkdownV2' : undefined
    return this
  }

  /**
   * Adds caption for the animation, audio, document, photo, video or voice
   * @see https://core.telegram.org/bots/api#sendmessage
   * @param {string} [caption] The text of caption
   * @return {Extra}
   */
  caption (caption = '') {
    this.caption = caption
    return this
  }

  /**
   * Adds entities for message text
   * @see https://core.telegram.org/bots/api#sendmessage
   * @param {MessageEntity[]} entities Array of entities
   * @return {Extra}
   */
  entities (entities) {
    this.entities = entities
    return this
  }

  /**
   * Adds caption entities for the animation, audio, document, photo, video or voice
   * @see https://core.telegram.org/bots/api#sendmessage
   * @param {MessageEntity[]} entities Array of entities
   * @return {Extra}
   */
  captionEntities (entities) {
    this.caption_entities = entities
    return this
  }

  /**
   * Adding reply to message
   * @see https://core.telegram.org/bots/api#sendmessage
   * @param {number} messageId Message id to reply
   * @return {Extra}
   */
  static inReplyTo (messageId) {
    return new Extra().inReplyTo(messageId)
  }

  /**
   * Enable / Disable notification for message
   * @see https://core.telegram.org/bots/api#sendmessage
   * @param {boolean} [value=true]
   * @return {Extra}
   */
  static notifications (value) {
    return new Extra().notifications(value)
  }

  /**
   * Enable / Disable web preview for links in message
   * @see https://core.telegram.org/bots/api#sendmessage
   * @param {boolean} [value=true]
   * @return {Extra}
   */
  static webPreview (value) {
    return new Extra().webPreview(value)
  }

  /**
   * Loads extra parameters from object to Extra instance
   * ```js
   * // Returns new instance with `reply_to_message_id: 1`
   * Extra.load({ reply_to_message_id: 1 })
   * // Loads `reply_to_message_id: 1` parameter to exists instance
   * new Extra().load({ reply_to_message_id: 1 })
   * ```
   * @param {object} opts Extra parameters object
   * @return {Extra}
   */
  static load (opts) {
    return new Extra(opts)
  }

  /**
   * Adds (inline-)keyboard markup to Extra instance
   *
   * ```js
   * // Example with factory function
   * ctx.reply('Hello',
   *   Extra.markdown()
   *     .markup((markup) => markup.removeKeyboard())
   * )
   *
   * // With Markup instance / object
   * const { Markup } = require('opengram')
   * const keyboard = Markup.inlineKeyboard([Markup.callbackButton('Anime', 'data')])
   *
   * ctx.reply('Hello',
   *   Extra.markdown().markup(keyboard)
   * )
   * ```
   *
   * @see https://core.telegram.org/bots/api#sendmessage
   * @param {object|Markup|markupCallback} markup
   * @return {object}
   */
  static markup (markup) {
    return new Extra().markup(markup)
  }

  /**
   * Adds entities for message text
   * @see https://core.telegram.org/bots/api#sendmessage
   * @param {MessageEntity[]} entities Array of entities
   * @return {Extra}
   */
  static entities (entities) {
    return new Extra().entities(entities)
  }

  /**
   * Enable / Disable `parse_mode: 'HTML'` for message
   * @see https://core.telegram.org/bots/api#formatting-options
   * @param {boolean} [value=true]
   * @return {Extra}
   */
  static HTML (value) {
    return new Extra().HTML(value)
  }

  /**
   * Enable / Disable `parse_mode: 'Markdown'` for message
   * @see https://core.telegram.org/bots/api#formatting-options
   * @param {boolean} [value=true]
   * @return {Extra}
   */
  static markdown (value) {
    return new Extra().markdown(value)
  }

  /**
   * Enable / Disable `parse_mode: 'MarkdownV2'` for message
   * @see https://core.telegram.org/bots/api#formatting-options
   * @param {boolean} [value=true]
   * @return {Extra}
   */
  static markdownV2 (value) {
    return new Extra().markdownV2(value)
  }

  /**
   * Adds caption for the animation, audio, document, photo, video or voice
   * @see https://core.telegram.org/bots/api#sendmessage
   * @param {string} [caption] The text of caption
   * @return {Extra}
   */
  static caption (caption) {
    return new Extra().caption(caption)
  }

  /**
   * Adds caption entities for the animation, audio, document, photo, video or voice
   * @see https://core.telegram.org/bots/api#sendmessage
   * @param {MessageEntity[]} entities Array of entities
   * @return {Extra}
   */
  static captionEntities (entities) {
    return new Extra().captionEntities(entities)
  }
}

/**
 * Markup class. You can import Markup from Extra
 * ```js
 * const { Extra: { Markup } } = require('opengram')
 * ```
 * @type {Markup}
 */
Extra.Markup = Markup

module.exports = Extra

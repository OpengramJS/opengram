const { getMessageFromAnySource, getText, getEntities } = require('./core/helpers/utils')

const UpdateTypes = [
  'callback_query',
  'channel_post',
  'chosen_inline_result',
  'edited_channel_post',
  'edited_message',
  'inline_query',
  'shipping_query',
  'pre_checkout_query',
  'message',
  'poll',
  'poll_answer',
  'my_chat_member',
  'chat_member',
  'chat_join_request'
]

const MessageSubTypes = [
  'voice',
  'video_note',
  'video',
  'animation',
  'venue',
  'text',
  'supergroup_chat_created',
  'successful_payment',
  'sticker',
  'pinned_message',
  'photo',
  'new_chat_title',
  'new_chat_photo',
  'new_chat_members',
  'migrate_to_chat_id',
  'migrate_from_chat_id',
  'location',
  'left_chat_member',
  'invoice',
  'group_chat_created',
  'game',
  'dice',
  'document',
  'delete_chat_photo',
  'contact',
  'channel_chat_created',
  'audio',
  'connected_website',
  'passport_data',
  'poll',
  'forward_date',
  'message_auto_delete_timer_changed',
  'voice_chat_started',
  'voice_chat_ended',
  'voice_chat_participants_invited',
  'voice_chat_scheduled',
  'web_app_data',
  'forum_topic_created',
  'forum_topic_closed',
  'forum_topic_reopened'
]

const MessageSubTypesMappingForChannelMode = {
  forward_date: 'forward'
}

const MessageSubTypesMapping = {
  video_chat_scheduled: 'voice_chat_scheduled',
  video_chat_started: 'voice_chat_started',
  video_chat_ended: 'voice_chat_ended',
  video_chat_participants_invited: 'voice_chat_participants_invited'
}

/**
 * When your bot receives a message, Telegram sends an update object to your
 * bot. The update contains information about the chat, the user, and of course
 * the message itself. There are numerous other updates, too:
 * {@link https://core.telegram.org/bots/api#update}
 *
 * When Opengram receives an update, it wraps this update into a context object
 * for you. Context objects are commonly named `ctx`. A context object does two
 * things:
 * 1. **`ctx.update`** holds the update object that you can use to process the
 *    message. This includes providing useful shortcuts for the update, for
 *    instance, `ctx.message` is a shortcut that gives you the message object from
 *    the update.
 * 2. **`ctx.telegram`** gives you access to the full Telegram Bot API so that you
 *    can directly call any method, such as responding via
 *    `ctx.telegram.sendMessage`. Also, here, the context objects has some useful
 *    shortcuts for you. For instance, if you want to send a message to the same
 *    chat that a message comes from (i.e. just respond to a user) you can call
 *    `ctx.reply`. This is nothing but a wrapper for `ctx.telegram.sendMessage` with
 *    the right `chat_id` pre-filled for you. Almost all methods of the Telegram
 *    Bot API have their own shortcut directly on the context object, so you
 *    probably never really have to use `ctx.telegram` at all.
 *
 * This context object is then passed to all the listeners (called
 * middleware) that you register on your bot. Because this is so useful, the
 * context object is often used to hold more information. One example are
 * sessions (a chat-specific data storage that is stored in some store - RAM for in
 * memory sessions / database / file system), and another example is `ctx.match` that
 * is used by `bot.action` and other methods to keep information about how
 * a regular expression was matched.
 */
class OpengramContext {
  /**
   * Constructor of Opengram context object
   *
   * @param {object} update Raw update object from telegram
   * @param {Telegram} telegram Instance of {@link Telegram}
   * @param {ContextOptions} options Extra options
   */
  constructor (update, telegram, options) {
    this.tg = telegram
    this.update = update
    this.options = options
    this.updateType = UpdateTypes.find((key) => key in this.update)

    if (this.updateType === 'message' || (this.options.channelMode && this.updateType === 'channel_post')) {
      this.updateSubTypes = MessageSubTypes
        .filter((key) => key in this.update[this.updateType])
        .map((type) => MessageSubTypesMappingForChannelMode[type] || type)
    } else {
      this.updateSubTypes = []
    }
    Object.getOwnPropertyNames(OpengramContext.prototype)
      .filter((key) => key !== 'constructor' && typeof this[key] === 'function')
      .forEach((key) => (this[key] = this[key].bind(this)))
  }

  /**
   * Getter for getting bot username from bot info object
   *
   * @return {string}
   */
  get me () {
    return this.botInfo && this.botInfo.username
  }

  /**
   * Returns instance of {@link Telegram} for api calls
   *
   * Alias for `context.tg`
   *
   * @return {Telegram}
   */
  get telegram () {
    return this.tg
  }

  /**
   * Returns {@link Message} object for current update
   *
   * Shortcut to `context.update.message`
   *
   * @return {Message}
   */
  get message () {
    return this.update.message
  }

  /**
   * Returns {@link Message} object for current update.
   *
   * Shortcut to
   * - `context.message`
   * - `context.editedMessage`
   * - `context.callbackQuery.message`
   * - `context.channelPost`
   * - `context.editedChannelPost`
   *
   * @return {Message|undefined}
   */
  get anyMessage () {
    return getMessageFromAnySource(this)
  }

  /**
   * Returns {@link Message} object for current update.
   *
   * Shortcut to
   * - `context.message.caption`
   * - `context.editedMessage.caption`
   * - `context.callbackQuery.message.caption`
   * - `context.ctx.channelPost.caption`
   * - `context.editedChannelPost.caption`
   * - `context.message.text`
   * - `context.editedMessage.text`
   * - `context.callbackQuery.message.text`
   * - `context.ctx.channelPost.text`
   * - `context.editedChannelPost.text`
   *
   * @return {string|undefined}
   */
  get anyText () {
    const message = getMessageFromAnySource(this)
    return message && getText(message)
  }

  /**
   * Returns {@link Message} object for current update.
   *
   * Shortcut to
   * - `context.message.entities`
   * - `context.editedMessage.entities`
   * - `context.callbackQuery.message.entities`
   * - `context.channelPost.entities`
   * - `context.editedChannelPost.entities`
   * - `context.message.caption_entities`
   * - `context.editedMessage.caption_entities`
   * - `context.callbackQuery.message.caption_entities`
   * - `context.channelPost.caption_entities`
   * - `context.editedChannelPost.caption_entities`
   *
   * @return {MessageEntity[]}
   */
  get anyEntities () {
    const message = getMessageFromAnySource(this)
    return message && getEntities(message)
  }

  /**
   * Returns {@link Message edited message} object for current update
   *
   * Shortcut to `context.update.edited_message`
   *
   * @return {Message}
   */
  get editedMessage () {
    return this.update.edited_message
  }

  /**
   * Returns {@link InlineQuery} object for current update
   *
   * Shortcut to `context.update.inline_query`
   *
   * @return {InlineQuery}
   */
  get inlineQuery () {
    return this.update.inline_query
  }

  /**
   * Returns {@link ShippingQuery} object for current update
   *
   * Shortcut to `context.update.shipping_query`
   *
   * @return {ShippingQuery}
   */
  get shippingQuery () {
    return this.update.shipping_query
  }

  /**
   * Returns {@link PreCheckoutQuery} object for current update
   *
   * Shortcut to `context.update.pre_checkout_query`
   *
   * @return {PreCheckoutQuery}
   */
  get preCheckoutQuery () {
    return this.update.pre_checkout_query
  }

  /**
   * Returns {@link ChosenInlineResult} object for current update
   *
   * Shortcut to `context.update.chosen_inline_result`
   *
   * @return {ChosenInlineResult}
   */
  get chosenInlineResult () {
    return this.update.chosen_inline_result
  }

  /**
   * Returns {@link Message channel post} object for current update
   *
   * Shortcut to `context.update.channel_post`
   *
   * @return {Message}
   */
  get channelPost () {
    return this.update.channel_post
  }

  /**
   * Returns {@link Message edited channel post} object for current update
   *
   * Shortcut to `context.update.edited_channel_post`
   *
   * @return {Message}
   */
  get editedChannelPost () {
    return this.update.edited_channel_post
  }

  /**
   * Returns {@link CallbackQuery} object for current update
   *
   * Shortcut to `context.update.callback_query`
   *
   * @return {CallbackQuery}
   */
  get callbackQuery () {
    return this.update.callback_query
  }

  /**
   * Returns {@link Poll} object for current update
   *
   * Shortcut to `context.update.poll`
   *
   * @return {Poll}
   */
  get poll () {
    return this.update.poll
  }

  /**
   * Returns {@link PollAnswer} object for current update
   *
   * Shortcut to `context.update.poll_answer`
   *
   * @return {PollAnswer}
   */
  get pollAnswer () {
    return this.update.poll_answer
  }

  /**
   * Returns {@link ChatMemberUpdated} object for current update
   *
   * Shortcut to `context.update.my_chat_member`
   *
   * @return {ChatMemberUpdated}
   */
  get myChatMember () {
    return this.update.my_chat_member
  }

  /**
   * Returns {@link ChatMemberUpdated} object for current update
   *
   * Shortcut to `context.update.chat_member`
   *
   * @return {ChatMemberUpdated}
   */
  get chatMember () {
    return this.update.chat_member
  }

  /**
   * Returns {@link ChatJoinRequest} object for current update
   *
   * Shortcut to `context.update.chat_join_request`
   *
   * @return {ChatJoinRequest}
   */
  get chatJoinRequest () {
    return this.update.chat_join_request
  }

  /**
   * Returns {@link Chat} object for current update
   *
   * Shortcut to
   * - `context.myChatMember.chat`
   * - `context.chatMember.chat`
   * - `context.chatJoinRequest.chat`
   * - `context.message.chat`
   * - `context.editedMessage.chat`
   * - `context.callbackQuery.message.chat`
   * - `context.channelPost.chat`
   * - `context.editedChannelPost.chat`
   *
   * @return {Chat}
   */
  get chat () {
    const message = this.myChatMember ||
      this.chatMember ||
      this.chatJoinRequest ||
      getMessageFromAnySource(this)
    return message && message.chat
  }

  /**
   * Returns {@link Chat} object for current update
   *
   * Shortcut to
   * - `context.message.sender_chat`
   * - `context.editedMessage.sender_chat`
   * - `context.callbackQuery.message.sender_chat`
   * - `context.channelPost.sender_chat`
   * - `context.editedChannelPost.sender_chat`
   *
   * @return {Chat}
   */
  get senderChat () {
    const message = getMessageFromAnySource(this)
    return message && message.sender_chat
  }

  /**
   * Returns {@link User} object for current update
   *
   * Shortcut to
   * - `context.inlineQuery.from`
   * - `context.shippingQuery.from`
   * - `context.preCheckoutQuery.from`
   * - `context.chosenInlineResult.from`
   * - `context.myChatMember.from`
   * - `context.chatJoinRequest.from`
   * - `context.message.from`
   * - `context.editedMessage.from`
   * - `context.callbackQuery.message.from`
   * - `context.channelPost.from`
   * - `context.editedChannelPost.from`
   *
   * @return {User}
   */
  get from () {
    const message = this.callbackQuery ||
      this.inlineQuery ||
      this.shippingQuery ||
      this.preCheckoutQuery ||
      this.chosenInlineResult ||
      this.myChatMember ||
      this.chatMember ||
      this.chatJoinRequest ||
      getMessageFromAnySource(this)

    return message && message.from
  }

  /**
   * Returns inline message id string for current update
   *
   * Shortcut to `context.callbackQuery.inline_message_id`, `context.chosenInlineResult.inline_message_id`
   *
   * @return {string}
   */
  get inlineMessageId () {
    return (this.callbackQuery && this.callbackQuery.inline_message_id) || (this.chosenInlineResult && this.chosenInlineResult.inline_message_id)
  }

  /**
   * Returns {@link PassportData} object for current update
   *
   * Shortcut to `context.message.passport_data`
   *
   * @return {PassportData}
   */
  get passportData () {
    return this.message && this.message.passport_data
  }

  /**
   * Getter returns state object, available only in current update which be destroyed after update processed
   * > You can store some temporary data for sharing with other middlewares in chain
   *
   * @return {object}
   */
  get state () {
    if (!this.contextState) {
      this.contextState = {}
    }
    return this.contextState
  }

  /**
   * Setter for state object, available only in current update which be destroyed after update processed
   * > You can store some temporary data for sharing with other middlewares in chain
   *
   * @param {object} value New state object
   *
   * @return {void}
   */
  set state (value) {
    this.contextState = { ...value }
  }

  /**
   * Getter for webhookReply
   *
   * Use this property to control reply via webhook feature for current context.
   *
   * @return {boolean}
   */
  get webhookReply () {
    return this.tg.webhookReply
  }

  /**
   * Setter for webhookReply
   *
   * Use this property to control reply via webhook feature for current context.
   *
   * @param {boolean} enable Value
   * @return {void}
   */
  set webhookReply (enable) {
    this.tg.webhookReply = enable
  }

  /**
   * Method used for checking is method available for current update
   *
   * @private
   * @param {*} value Value to check
   * @param {string} method Method name
   * @throws {TypeError}
   */
  assert (value, method) {
    if (!value) {
      throw new TypeError(`Opengram: "${method}" isn't available for "${this.updateType}::${this.updateSubTypes}"`)
    }
  }

  /**
   * Use this method to send answers to current inline query.
   *
   * On success, `True` is returned.
   * No more than **50** results per query are allowed.
   *
   * @see https://core.telegram.org/bots/api#answerinlinequery
   * @param {InlineQueryResult[]} results A array of results for the inline query
   * @param {object|Extra} [extra] Other parameters
   * @throws {TelegramError}
   * @return {Promise<boolean>}
   */
  answerInlineQuery (results, extra) {
    this.assert(this.inlineQuery, 'answerInlineQuery')
    return this.telegram.answerInlineQuery(this.inlineQuery.id, results, extra)
  }

  /**
   * Use this method to send answers to current callback query sent from
   * [inline keyboards](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating).
   * The answer will be displayed to the user as a notification at the top of the chat screen or as an alert.
   *
   * On success, `True` is returned.
   *
   * Alternatively, the user can be redirected to the specified Game URL. For this option to work, you must first
   * create a game for your bot via [@BotFather](https://t.me/BotFather) and accept the terms.
   * Otherwise, you may use links like `t.me/your_bot?start=XXXX` that open your bot with a parameter.
   *
   * @see https://core.telegram.org/bots/api#answercallbackquery
   * @param {string} text Text of the notification. If not specified, nothing will be shown to the user, 0-200 characters
   * @param {boolean} [showAlert] If True, an alert will be shown by the client instead of a notification at the top of the
   *    chat screen. Defaults to false.
   * @param {object} [extra] Other parameters
   * @throws {TelegramError}
   * @return {Promise<boolean>}
   */
  answerCbQuery (text, showAlert, extra) {
    this.assert(this.callbackQuery, 'answerCbQuery')
    return this.telegram.answerCbQuery(this.callbackQuery.id, text, showAlert, extra)
  }

  /**
   * Alias to {@link answerCbQuery} for game query
   *
   * @see https://core.telegram.org/bots/api#answercallbackquery
   * @param {string} [url] URL that will be opened by the user's client. If you have created a Game and accepted the conditions
   *    via [@BotFather](https://t.me/BotFather), specify the URL that opens your game - note that this will only work
   *    if the query comes from a `callback_game` button.
   * @throws {TelegramError}
   * @return {Promise}
   */
  answerGameQuery (url) {
    this.assert(this.callbackQuery, 'answerGameQuery')
    return this.telegram.answerGameQuery(this.callbackQuery.id, url)
  }

  /**
   * If you sent an invoice requesting a shipping address and the parameter `is_flexible` was specified,
   * the Bot API will send an Update with a `shipping_query` field to the bot. Use this method to reply to cvurrent
   * shipping queries.
   *
   * On success, `True` is returned.
   *
   * @see https://core.telegram.org/bots/api#answershippingquery
   * @param {boolean} ok Specify True if delivery to the specified address is possible and False if there are any problems
   *    (for example, if delivery to the specified address is not possible)
   * @param {ShippingOption[]} [shippingOptions] Required if ok is True. Array of available shipping options.
   * @param {string} [errorMessage] Required if ok is False. Error message in human-readable form that explains why it
   *    is impossible to complete the order (e.g. "Sorry, delivery to your desired address is unavailable').
   *    Telegram will display this message to the user.
   * @throws {TelegramError}
   * @return {Promise<boolean>}
   */
  answerShippingQuery (ok, shippingOptions, errorMessage) {
    this.assert(this.shippingQuery, 'answerShippingQuery')
    return this.telegram.answerShippingQuery(this.shippingQuery.id, ok, shippingOptions, errorMessage)
  }

  /**
   * Once the user has confirmed their payment and shipping details, the Bot API sends the final confirmation in the
   * form of an {@link Update} with the field `pre_checkout_query`.
   * Use this method to respond to current pre-checkout queries.
   *
   * On success, `True` is returned.
   *
   * **Note:** The Bot API must receive an answer within 10 seconds after
   * the pre-checkout query was sent.
   *
   * @see https://core.telegram.org/bots/api#answerprecheckoutquery
   * @param {boolean} ok Specify True if everything is alright (goods are available, etc.) and the bot is ready to proceed
   *    with the order. Use False if there are any problems.
   * @param {string} [errorMessage] Required if ok is False. Error message in human readable form that explains the reason for
   *    failure to proceed with the checkout (e.g. "Sorry, somebody just bought the last of our amazing black T-shirts
   *    while you were busy filling out your payment details. Please choose a different color or garment!").
   *    Telegram will display this message to the user.
   * @throws {TelegramError}
   * @return {Promise<boolean>}
   */
  answerPreCheckoutQuery (ok, errorMessage) {
    this.assert(this.preCheckoutQuery, 'answerPreCheckoutQuery')
    return this.telegram.answerPreCheckoutQuery(this.preCheckoutQuery.id, ok, errorMessage)
  }

  /**
   * Use this method to edit text and game inline messages for current from current update.
   *
   * On success, if the edited message is not an inline message, the edited {@link Message} is returned,
   * otherwise `True` is returned.
   *
   * @see https://core.telegram.org/bots/api#editmessagetext
   * @param {string} text New text of the message, 1-4096 characters after entities parsing
   * @param {object|Extra} [extra] Other parameters
   * @throws {TelegramError}
   * @return {Promise<boolean|Message>}
   */
  editMessageText (text, extra) {
    this.assert(this.callbackQuery || this.inlineMessageId, 'editMessageText')
    return this.inlineMessageId
      ? this.telegram.editMessageText(
        undefined,
        undefined,
        this.inlineMessageId,
        text,
        extra
      )
      : this.telegram.editMessageText(
        this.chat.id,
        this.callbackQuery.message.message_id,
        undefined,
        text,
        extra
      )
  }

  /**
   * Use this method to edit captions of inline messages / messages from current update.
   *
   * On success, if the edited message is not an inline message, the edited {@link Message} is returned,
   * otherwise `True` is returned.
   *
   * @see https://core.telegram.org/bots/api#editmessagecaption
   * @param {string} [caption] New caption of the message, 0-1024 characters after entities parsing
   * @param {object|Extra} [extra] Other parameters
   * @throws {TelegramError}
   * @return {Promise<boolean|Message>}
   */
  editMessageCaption (caption, extra) {
    this.assert(this.callbackQuery || this.inlineMessageId, 'editMessageCaption')
    return this.inlineMessageId
      ? this.telegram.editMessageCaption(
        undefined,
        undefined,
        this.inlineMessageId,
        caption,
        extra
      )
      : this.telegram.editMessageCaption(
        this.chat.id,
        this.callbackQuery.message.message_id,
        undefined,
        caption,
        extra
      )
  }

  /**
   * Use this method to edit animation, audio, document, photo, or video inline messages / messages from current update.
   * If a message is part of a message album, then it can be edited only to an audio for audio albums,
   * only to a document for document albums and to a photo or a video otherwise. When an inline message is edited,
   * a new file can't be uploaded; use a previously uploaded file via its `file_id` or specify a URL.
   *
   * On success, if the edited message is not an inline message, the edited {@link Message} is returned,
   * otherwise `True` is returned.
   *
   * @see https://core.telegram.org/bots/api#editmessagemedia
   * @param {InputMedia} media Object for a new media content of the message
   * @param {object|Extra} [extra] Other parameters
   * @throws {TelegramError}
   * @return {Promise<boolean|Message>}
   */
  editMessageMedia (media, extra) {
    this.assert(this.callbackQuery || this.inlineMessageId, 'editMessageMedia')
    return this.inlineMessageId
      ? this.telegram.editMessageMedia(
        undefined,
        undefined,
        this.inlineMessageId,
        media,
        extra
      )
      : this.telegram.editMessageMedia(
        this.chat.id,
        this.callbackQuery.message.message_id,
        undefined,
        media,
        extra
      )
  }

  /**
   * Use this method to edit only the reply markup of inline message / message from current update.
   *
   * On success, if the edited message is not an inline message, the edited {@link Message} is
   * returned, otherwise `True` is returned.
   *
   * @see https://core.telegram.org/bots/api#editmessagereplymarkup
   * @param {object|Extra} [markup] Other parameters
   * @throws {TelegramError}
   * @return {Promise<boolean|Message>}
   */
  editMessageReplyMarkup (markup) {
    this.assert(this.callbackQuery || this.inlineMessageId, 'editMessageReplyMarkup')
    return this.inlineMessageId
      ? this.telegram.editMessageReplyMarkup(
        undefined,
        undefined,
        this.inlineMessageId,
        markup
      )
      : this.telegram.editMessageReplyMarkup(
        this.chat.id,
        this.callbackQuery.message.message_id,
        undefined,
        markup
      )
  }

  /**
   * Use this method to edit live location inline message / message from current update.
   * A location can be edited until its `live_period` expires or editing
   * is explicitly disabled by a call to {@link stopMessageLiveLocation}.
   *
   * On success, if the edited message is not an inline message, the edited {@link Message} is returned,
   * otherwise `True` is returned.
   *
   * @see https://core.telegram.org/bots/api#editmessagelivelocation
   * @param {number} latitude Latitude of new location
   * @param {number} longitude Longitude of new location
   * @param {object|Extra} [extra] Other parameters
   * @throws {TelegramError}
   * @return {Promise<boolean|Message>}
   */
  editMessageLiveLocation (latitude, longitude, extra) {
    this.assert(this.callbackQuery || this.inlineMessageId, 'editMessageLiveLocation')
    return this.inlineMessageId
      ? this.telegram.editMessageLiveLocation(
        undefined,
        undefined,
        this.inlineMessageId,
        latitude,
        longitude,
        extra
      )
      : this.telegram.editMessageLiveLocation(
        this.chat.id,
        this.callbackQuery.message.message_id,
        undefined,
        latitude,
        longitude,
        extra
      )
  }

  /**
   * Use this method to edit live location inline message / message from current update.
   * A location can be edited until its `live_period` expires or
   * editing is explicitly disabled by a call to {@link stopMessageLiveLocation}.
   *
   * On success, if the edited message is not an inline message, the edited {@link Message} is returned,
   * otherwise `True` is returned.
   *
   * @see https://core.telegram.org/bots/api#stopmessagelivelocation
   * @param {object|Markup} [markup] Other parameters
   * @throws {TelegramError}
   * @return {Promise<boolean|Message>}
   */
  stopMessageLiveLocation (markup) {
    this.assert(this.callbackQuery || this.inlineMessageId, 'stopMessageLiveLocation')
    return this.inlineMessageId
      ? this.telegram.stopMessageLiveLocation(
        undefined,
        undefined,
        this.inlineMessageId,
        markup
      )
      : this.telegram.stopMessageLiveLocation(
        this.chat.id,
        this.callbackQuery.message.message_id,
        undefined,
        markup
      )
  }

  /**
   * Use this method to send text messages to current chat.
   *
   * On success, the sent {@link Message} is returned.
   *
   * @see https://core.telegram.org/bots/api#sendmessage
   * @param {string} text Text of the message to be sent, 1-4096 characters after entities parsing
   * @param {MessageExtraParams|Extra} [extra] Other parameters
   * @throws {TelegramError}
   * @return {Promise<Message>}
   */
  reply (text, extra) {
    this.assert(this.chat, 'reply')
    return this.telegram.sendMessage(this.chat.id, text, extra)
  }

  /**
   * Use this method to get up-to-date information about current chat (current name of the user for one-on-one
   * conversations, current username of a user, group or channel, etc.).
   *
   * Returns a {@link Chat} object on success.
   *
   * @see https://core.telegram.org/bots/api#getchat
   * @throws {TelegramError}
   * @return {Promise<Chat>}
   */
  getChat () {
    this.assert(this.chat, 'getChat')
    return this.telegram.getChat(this.chat.id)
  }

  /**
   * Use this method to generate a new primary invite link for current chat; any previously generated primary link
   * is revoked. The bot must be an administrator in the chat for this to work and must have the appropriate
   * administrator rights.
   *
   * Returns the new invite link as `String` on success.
   *
   * **Note:** Each administrator in a chat generates their own invite links. Bots can't use invite links generated by
   * other administrators. If you want your bot to work with invite links,
   * it will need to generate its own link using exportChatInviteLink or by calling the getChat method.
   * If your bot needs to generate a new primary invite link replacing its previous one, use exportChatInviteLink again.
   *
   * @see https://core.telegram.org/bots/api#exportchatinvitelink
   * @throws {TelegramError}
   * @return {Promise}
   */
  exportChatInviteLink () {
    this.assert(this.chat, 'exportChatInviteLink')
    return this.telegram.exportChatInviteLink(this.chat.id)
  }

  /**
   * Use this method to ban a user in current group, a supergroup or a channel. In the case of supergroups and channels,
   * the user will not be able to return to the chat on their own using invite links, etc.,
   * unless {@link unbanChatMember unbanned} first.
   * The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights.
   *
   * Returns `True` on success.
   *
   * @see https://core.telegram.org/bots/api#banchatmember
   * @param {number} userId Unique identifier of the target user
   * @param {object|Extra} [extra] Other parameters
   * @throws {TelegramError}
   * @return {Promise<boolean>}
   */
  banChatMember (userId, extra) {
    this.assert(this.chat, 'banChatMember')
    return this.telegram.banChatMember(this.chat.id, userId, extra)
  }

  /**
   * Alias to {@link banChatMember}, but have different arguments
   *
   * @see https://core.telegram.org/bots/api#banchatmember
   * @param {number} userId Unique identifier of the target user
   * @param {number} [untilDate] Date when the user will be unbanned, unix time. If user is banned for more than 366 days or less
   *    than 30 seconds from the current time they are considered to be banned forever.
   *    Applied for supergroups and channels only.
   * @param {object} [extra] Other parameters
   * @throws {TelegramError}
   * @return {Promise<boolean>}
   */
  kickChatMember (userId, untilDate, extra) {
    this.assert(this.chat, 'kickChatMember')
    return this.telegram.kickChatMember(this.chat.id, userId, untilDate, extra)
  }

  /**
   * Use this method to unban a previously banned user in current supergroup or channel. The user will **not** return
   * to the group or channel automatically, but will be able to join via link, etc. The bot must be an administrator
   * for this to work. By default, this method guarantees that after the call the user is not a member of the chat,
   * but will be able to join it. So if the user is a member of the chat they will also be **removed** from the chat.
   * If you don't want this, use the parameter `only_if_banned`.
   *
   * Returns `True` on success.
   *
   * @see https://core.telegram.org/bots/api#unbanchatmember
   * @param {number} userId Unique identifier of the target user
   * @param {object|Extra} [extra] Other parameters
   * @throws {TelegramError}
   * @return {Promise<boolean>}
   */
  unbanChatMember (userId, extra) {
    this.assert(this.chat, 'unbanChatMember')
    return this.telegram.unbanChatMember(this.chat.id, userId, extra)
  }

  /**
   * Use this method to restrict a user in current supergroup. The bot must be an administrator in the supergroup
   * for this to work and must have the appropriate administrator rights. Pass True for all permissions to lift
   * restrictions from a user.
   *
   * Returns `True` on success.
   *
   * @see https://core.telegram.org/bots/api#restrictchatmember
   * @param {number} userId Unique identifier of the target user
   * @param {object} [extra] Other parameters
   * @throws {TelegramError}
   * @return {Promise<boolean>}
   */
  restrictChatMember (userId, extra) {
    this.assert(this.chat, 'restrictChatMember')
    return this.telegram.restrictChatMember(this.chat.id, userId, extra)
  }

  /**
   * Use this method to promote or demote a user in a supergroup or a channel. The bot must be an administrator
   * in the chat for this to work and must have the appropriate administrator rights. Pass `False` for all boolean
   * parameters to demote a user.
   *
   * Returns `True` on success.
   *
   * @see https://core.telegram.org/bots/api#promotechatmember
   * @param {number} userId Unique identifier of the target user
   * @param {object} [extra] Other parameters
   * @throws {TelegramError}
   * @return {Promise<boolean>}
   */
  promoteChatMember (userId, extra) {
    this.assert(this.chat, 'promoteChatMember')
    return this.telegram.promoteChatMember(this.chat.id, userId, extra)
  }

  /**
   * Use this method to ban a channel chat in current supergroup or a channel. Until the chat is
   * {@link unbanChatMember unbanned}, the owner of the banned chat won't be able to send messages on behalf
   * of **any of their channels**. The bot must be an administrator in the supergroup or channel for this
   * to work and must have the appropriate administrator rights.
   *
   * Returns `True` on success.
   *
   * @see https://core.telegram.org/bots/api#banchatsenderchat
   * @param {number} senderChatId Unique identifier of the target sender chat
   * @throws {TelegramError}
   * @return {Promise<boolean>}
   */
  banChatSenderChat (senderChatId) {
    this.assert(this.chat, 'banChatSenderChat')
    return this.telegram.banChatSenderChat(this.chat.id, senderChatId)
  }

  /**
   * Use this method to unban a previously banned channel chat in current supergroup or channel.
   * The bot must be an administrator for this to work and must have the appropriate administrator rights.
   *
   * Returns `True` on success.
   *
   * @see https://core.telegram.org/bots/api#unbanchatsenderchat
   * @param {number} senderChatId Unique identifier of the target sender chat
   * @throws {TelegramError}
   * @return {Promise<boolean>}
   */
  unbanChatSenderChat (senderChatId) {
    this.assert(this.chat, 'unbanChatSenderChat')
    return this.telegram.unbanChatSenderChat(this.chat.id, senderChatId)
  }

  /**
   * Use this method to set a custom title for an administrator in current supergroup promoted by the bot.
   *
   * Returns `True` on success.
   *
   * @see https://core.telegram.org/bots/api#setchatadministratorcustomtitle
   * @param {number} userId Unique identifier of the target user
   * @param {string} title New custom title for the administrator; 0-16 characters, emoji are not allowed
   * @throws {TelegramError}
   * @return {Promise<boolean>}
   */
  setChatAdministratorCustomTitle (userId, title) {
    this.assert(this.chat, 'setChatAdministratorCustomTitle')
    return this.telegram.setChatAdministratorCustomTitle(this.chat.id, userId, title)
  }

  /**
   * Use this method to set a new profile photo for current chat. Photos can't be changed for private chats.
   * The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights.
   *
   * Returns `True` on success.
   *
   * @see https://core.telegram.org/bots/api#setchatphoto
   * @param {attachmentFile} photo New chat photo, uploaded using multipart/form-data
   * @throws {TelegramError}
   * @return {Promise<boolean>}
   */
  setChatPhoto (photo) {
    this.assert(this.chat, 'setChatPhoto')
    return this.telegram.setChatPhoto(this.chat.id, photo)
  }

  /**
   * Use this method to delete current chat photo. Photos can't be changed for private chats. The bot must be an
   * administrator in the chat for this to work and must have the appropriate administrator rights.
   *
   * Returns `True` on success.
   *
   * @see https://core.telegram.org/bots/api#deletechatphoto
   * @throws {TelegramError}
   * @return {Promise<boolean>}
   */
  deleteChatPhoto () {
    this.assert(this.chat, 'deleteChatPhoto')
    return this.telegram.deleteChatPhoto(this.chat.id)
  }

  /**
   * Use this method to change the title of a chat. Titles can't be changed for current private chats.
   * The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights.
   *
   * Returns `True` on success.
   *
   * @see https://core.telegram.org/bots/api#setchattitle
   * @param {string} title New chat title, 1-255 characters
   * @throws {TelegramError}
   * @return {Promise<boolean>}
   */
  setChatTitle (title) {
    this.assert(this.chat, 'setChatTitle')
    return this.telegram.setChatTitle(this.chat.id, title)
  }

  /**
   * Use this method to change the description of current group, a supergroup or a channel.
   * The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights.
   *
   * Returns `True` on success.
   * https://core.telegram.org/bots/api#setchatdescription
   *
   * @param {string} [description] New chat description, 0-255 characters
   * @throws {TelegramError}
   * @return {Promise<boolean>}
   */
  setChatDescription (description) {
    this.assert(this.chat, 'setChatDescription')
    return this.telegram.setChatDescription(this.chat.id, description)
  }

  /**
   * Use this method to add a message to the list of pinned messages in current chat. If the chat is not a private chat,
   * the bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' administrator
   * right in a supergroup or 'can_edit_messages' administrator right in a channel.
   *
   * Returns `True` on success.
   *
   * @see https://core.telegram.org/bots/api#pinchatmessage
   * @param {number} messageId Identifier of a message to pin
   * @param {object} [extra] Other parameters
   * @throws {TelegramError}
   * @return {Promise<boolean>}
   */
  pinChatMessage (messageId, extra) {
    this.assert(this.chat, 'pinChatMessage')
    return this.telegram.pinChatMessage(this.chat.id, messageId, extra)
  }

  /**
   * Use this method to remove a message from the list of pinned messages in chat from current update.
   * If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have
   * the 'can_pin_messages' administrator right in a supergroup or 'can_edit_messages' administrator
   * right in a channel.
   *
   * Returns `True` on success.
   *
   * @see https://core.telegram.org/bots/api#unpinchatmessage
   * @param {object} [extra] Other parameters
   * @throws {TelegramError}
   * @return {Promise<boolean>}
   */
  unpinChatMessage (extra) {
    this.assert(this.chat, 'unpinChatMessage')
    return this.telegram.unpinChatMessage(this.chat.id, extra)
  }

  /**
   * Use this method to clear the list of pinned messages in chat from current update.
   * If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must
   * have the 'can_pin_messages' administrator right in a supergroup or 'can_edit_messages' administrator
   * right in a channel.
   *
   * Returns `True` on success.
   *
   * @see https://core.telegram.org/bots/api#unpinallchatmessages
   * @throws {TelegramError}
   * @return {Promise<boolean>}
   */
  unpinAllChatMessages () {
    this.assert(this.chat, 'unpinAllChatMessages')
    return this.telegram.unpinAllChatMessages(this.chat.id)
  }

  /**
   * Use this method for your bot to leave from group, supergroup or channel from current update.
   *
   * Returns `True` on success.
   *
   * @see https://core.telegram.org/bots/api#leavechat
   * @throws {TelegramError}
   * @return {Promise<boolean>}
   */
  leaveChat () {
    this.assert(this.chat, 'leaveChat')
    return this.telegram.leaveChat(this.chat.id)
  }

  /**
   * Use this method to set default chat permissions for all members in chat from current update.
   * The bot must be an administrator in the group
   * or a supergroup for this to work and must have the `can_restrict_members` administrator rights.
   *
   * Returns `True` on success.
   *
   * @see https://core.telegram.org/bots/api#setchatpermissions
   * @param {ChatPermissions} permissions A object for new default chat permissions
   * @throws {TelegramError}
   * @return {Promise<boolean>}
   */
  setChatPermissions (permissions) {
    this.assert(this.chat, 'setChatPermissions')
    return this.telegram.setChatPermissions(this.chat.id, permissions)
  }

  /**
   * Use this method to get a list of administrators in chat from current update.
   *
   * On success, returns an Array of {@link ChatMember}
   * objects that contains information about all chat administrators except other bots. If the chat is a group
   * or a supergroup and no administrators were appointed, only the creator will be returned.
   *
   * @see https://core.telegram.org/bots/api#getchatadministrators
   * @throws {TelegramError}
   * @return {Promise<ChatMember[]>}
   */
  getChatAdministrators () {
    this.assert(this.chat, 'getChatAdministrators')
    return this.telegram.getChatAdministrators(this.chat.id)
  }

  /**
   * Use this method to get information about a member of chat from current update.
   *
   * Returns a {@link ChatMember} object on success.
   *
   * @see https://core.telegram.org/bots/api#getchatmember
   * @param {number|string} userId Unique identifier of the target user
   * @throws {TelegramError}
   * @return {Promise<ChatMember>}
   */
  getChatMember (userId) {
    this.assert(this.chat, 'getChatMember')
    return this.telegram.getChatMember(this.chat.id, userId)
  }

  /**
   * Use this method to get the number of members in chat from current update.
   *
   * Returns `Int` on success.
   *
   * @see https://core.telegram.org/bots/api#getchatmembercount
   * @deprecated Use {@link getChatMemberCount}
   * @throws {TelegramError}
   * @return {Promise<number>}
   */
  getChatMembersCount () {
    this.assert(this.chat, 'getChatMembersCount')
    return this.telegram.getChatMemberCount(this.chat.id)
  }

  /**
   * Use this method to get the number of members in chat from current update.
   *
   * Returns `Int` on success.
   *
   * @see https://core.telegram.org/bots/api#getchatmembercount
   * @deprecated Use {@link getChatMemberCount}
   * @throws {TelegramError}
   * @return {Promise<number>}
   */
  getChatMemberCount () {
    this.assert(this.chat, 'getChatMemberCount')
    return this.telegram.getChatMemberCount(this.chat.id)
  }

  /**
   * Use this method to get the current value of the bot's menu button in private chat from current update,
   * or the default menu button.
   *
   * Returns {@link MenuButton} on success.
   *
   * @see https://core.telegram.org/bots/api#getchatmenubutton
   * @throws {TelegramError}
   * @return {Promise<MenuButton>}
   */
  getChatMenuButton () {
    this.assert(this.chat, 'getChatMenuButton')
    return this.telegram.getChatMenuButton(this.chat.id)
  }

  /**
   * Use this method to change the bot's menu button in private chat from current update, or the default menu button.
   *
   * Returns `True` on success.
   *
   * @see https://core.telegram.org/bots/api#setchatmenubutton
   * @param {MenuButton} [menuButton] Unique identifier for the target private chat.
   *    If not specified, default bot's menu button will be changed
   * @throws {TelegramError}
   * @return {Promise<boolean>}
   */
  setChatMenuButton (menuButton) {
    this.assert(this.chat, 'setChatMenuButton')
    return this.telegram.setChatMenuButton(this.chat.id, menuButton)
  }

  /**
   * Use this method to change the default administrator rights requested by the bot when it's added as
   * an administrator to groups or channels. These rights will be suggested to users, but they are free to modify
   * the list before adding the bot.
   *
   * Returns `True` on success.
   * https://core.telegram.org/bots/api#setmydefaultadministratorrights
   *
   * @param {ChatAdministratorRights} [rights] Object describing new default administrator rights.
   * If not specified, the default administrator rights will be cleared.
   * @param {boolean} [forChannels] Pass True to change the default administrator rights of the bot in channels.
   *    Otherwise, the default administrator rights of the bot for groups and supergroups will be changed.
   * @throws {TelegramError}
   * @return {Promise<boolean>}
   */
  setMyDefaultAdministratorRights (rights, forChannels) {
    return this.telegram.setMyDefaultAdministratorRights(rights, forChannels)
  }

  /**
   * Use this method to get the current default administrator rights of the bot.
   *
   * Returns {@link ChatAdministratorRights} on success.
   *
   * @see https://core.telegram.org/bots/api#getmydefaultadministratorrights
   * @param {boolean} [forChannels] Pass True to get default administrator rights of the bot in channels.
   *    Otherwise, default administrator rights of the bot for groups and supergroups will be returned.
   * @throws {TelegramError}
   * @return {Promise<ChatAdministratorRights>}
   */
  getMyDefaultAdministratorRights (forChannels) {
    return this.telegram.getMyDefaultAdministratorRights(forChannels)
  }

  /**
   * Informs current user that some of the Telegram Passport elements they provided contains errors.
   * The user will not be able to re-submit their Passport to you until the errors are fixed
   * (the contents of the field for which you returned the error must change).
   *
   * Returns `True` on success.
   *
   * Use this if the data submitted by the user doesn't satisfy the standards your service requires for any reason.
   * For example, if a birthday date seems invalid, a submitted document is blurry, a scan shows evidence of tampering,
   * etc. Supply some details in the error message to make sure the user knows how to correct the issues.
   *
   * @see https://core.telegram.org/bots/api#setpassportdataerrors
   * @param {PassportElementError[]} errors Array describing the errors
   * @throws {TelegramError}
   * @return {Promise<boolean>}
   */
  setPassportDataErrors (errors) {
    this.assert(this.chat, 'setPassportDataErrors')
    return this.telegram.setPassportDataErrors(this.from.id, errors)
  }

  /**
   * Use this method to send message with photo to chat from current update.
   *
   * On success, the sent {@link Message} is returned.
   *
   * @see https://core.telegram.org/bots/api#sendmessage
   * @param {attachmentFile} photo Photo to send. Pass a `file_id` as String to send a photo that exists on the
   *    Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a photo from the Internet,
   *    or upload a new photo using multipart/form-data.
   *    The photo must be at most 10 MB in size.
   *    The photo's width and height must not exceed 10000 in total.
   *    Width and height ratio must be at most 20.
   *    [More information on Sending Files »](https://core.telegram.org/bots/api#sending-files)
   * @param {MessageExtraParams|Extra} [extra] Other parameters
   * @throws {TelegramError}
   * @return {Promise<Message>}
   */
  replyWithPhoto (photo, extra) {
    this.assert(this.chat, 'replyWithPhoto')
    return this.telegram.sendPhoto(this.chat.id, photo, extra)
  }

  /**
   * Use this method to send a group of photos, videos, documents or audios as an album to chat from current update.
   * Documents and audio files can be only grouped on an album with messages of the same type.
   *
   * On success, an array of {@link Message Messages}
   * that were sent is returned.
   *
   * @see https://core.telegram.org/bots/api#sendmediagroup
   * @param {Array<InputMediaPhoto|InputMediaAudio|InputMediaVideo|InputMediaDocument>} media A array describing
   *    messages to be sent, must include 2-10 items
   * @param {object|Extra} [extra] Other parameters
   * @throws {TelegramError}
   * @return {Promise<Message[]>}
   */
  replyWithMediaGroup (media, extra) {
    this.assert(this.chat, 'replyWithMediaGroup')
    return this.telegram.sendMediaGroup(this.chat.id, media, extra)
  }

  /**
   * Use this method to send audio files to chat from current update,
   * if you want Telegram clients to display them in the music player.
   * Your audio must be in the `.MP3` or `.M4A` format.
   *
   * On success, the sent {@link Message} is returned.
   * Bots can currently send audio files of up to 50 MB in size, this limit may be changed in the future.
   *
   * For sending voice messages, use the {@link OpengramContext#replyWithVoice} method instead.
   *
   * @see https://core.telegram.org/bots/api#sendaudio
   * @param {attachmentFile} audio Audio file to send. Pass a `file_id` as String to send an audio file that exists on the Telegram
   *    servers (recommended), pass an HTTP URL as a String for Telegram to get an audio file from the Internet,
   *    or upload a new one using multipart/form-data.
   *    [More information on Sending Files »](https://core.telegram.org/bots/api#sending-files)
   * @param {object|Extra} [extra] Other parameters
   * @throws {TelegramError}
   * @return {Promise<Message>}
   */
  replyWithAudio (audio, extra) {
    this.assert(this.chat, 'replyWithAudio')
    return this.telegram.sendAudio(this.chat.id, audio, extra)
  }

  /**
   * Use this method to send an animated emoji that will display a random value to chat from current update.
   *
   * On success, the sent {@link Message} is returned.
   *
   * @see https://core.telegram.org/bots/api#sendphoto
   * @param {object|Extra} [extra] Other parameters
   * @throws {TelegramError}
   * @return {Promise<Message>}
   */
  replyWithDice (extra) {
    this.assert(this.chat, 'replyWithDice')
    return this.telegram.sendDice(this.chat.id, extra)
  }

  /**
   * Use this method to send general files to chat from current update.
   *
   * On success, the sent {@link Message} is returned.
   * Bots can currently send files of any type of up to 50 MB in size, this limit may be changed in the future.
   *
   * @see https://core.telegram.org/bots/api#senddocument
   * @param {attachmentFile} document Document to send. Pass a `file_id` as String to send a document that exists
   *    on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a photo from the Internet,
   *    or upload a new photo using multipart/form-data.
   *    [More information on Sending Files »](https://core.telegram.org/bots/api#sending-files)
   * @param {object|Extra} [extra] Other parameters
   * @throws {TelegramError}
   * @return {Promise<Message>}
   */
  replyWithDocument (document, extra) {
    this.assert(this.chat, 'replyWithDocument')
    return this.telegram.sendDocument(this.chat.id, document, extra)
  }

  /**
   * Use this method to send static `.WEBP`, animated `.TGS`, or video `.WEBM` stickers to chat from current update.
   *
   * On success, the sent {@link Message} is returned.
   *
   * @see https://core.telegram.org/bots/api#sendsticker
   * @param {attachmentFile} sticker Sticker to send. Pass a `file_id` as String to send a file that exists on
   *    the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a .WEBP file from the
   *    Internet, or upload a new one using multipart/form-data.
   *    [More information on Sending Files »](https://core.telegram.org/bots/api#sending-files)
   * @param {stickerExtraParams|Extra} [extra] Other parameters
   * @throws {TelegramError}
   * @return {Promise<Message>}
   */
  replyWithSticker (sticker, extra) {
    this.assert(this.chat, 'replyWithSticker')
    return this.telegram.sendSticker(this.chat.id, sticker, extra)
  }

  /**
   * Use this method to send video files to chat from current update,
   * Telegram clients support MPEG4 videos (other formats may be sent as {@link Document}).
   *
   * On success, the sent {@link Message} is returned.
   *
   * Bots can currently send video files of up to 50 MB in size, this limit may be changed in the future.
   *
   * @see https://core.telegram.org/bots/api#sendvideo
   * @param {attachmentFile} video Video to send. Pass a `file_id` as String to send a video that
   *    exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get
   *    a video from the Internet, or upload a new video using multipart/form-data.
   *    [More information on Sending Files »](https://core.telegram.org/bots/api#sending-files)
   * @param {object|Extra} [extra] Other parameters
   * @throws {TelegramError}
   * @return {Promise<Message>}
   */
  replyWithVideo (video, extra) {
    this.assert(this.chat, 'replyWithVideo')
    return this.telegram.sendVideo(this.chat.id, video, extra)
  }

  /**
   * Use this method to send animation files to chat from current update (GIF or H.264/MPEG-4 AVC video without sound).
   *
   * On success, the sent {@link Message} is returned.
   *
   * Bots can currently send animation files of up to 50 MB in size, this limit may be changed in the future.
   *
   * @see https://core.telegram.org/bots/api#sendanimation
   * @param {attachmentFile} animation Animation to send. Pass a `file_id` as String to send an animation that exists
   *    on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get an animation from
   *    the Internet, or upload a new animation using multipart/form-data.
   *    [More information on Sending Files »](https://core.telegram.org/bots/api#sending-files)
   * @param {object|Extra} [extra] Other parameters
   * @throws {TelegramError}
   * @return {Promise<Message>}
   */
  replyWithAnimation (animation, extra) {
    this.assert(this.chat, 'replyWithAnimation')
    return this.telegram.sendAnimation(this.chat.id, animation, extra)
  }

  /**
   * As of [v.4.0](https://telegram.org/blog/video-messages-and-telescope), Telegram clients support rounded square
   * MPEG4 videos of up to 1 minute long.
   * Use this method to send video messages to chat from current update.
   *
   * On success, the sent {@link Message} is returned.
   *
   * @see https://core.telegram.org/bots/api#sendvideonote
   * @param {attachmentFile} videoNote Video note to send. Pass a `file_id` as String to send a video note that exists on
   *    the Telegram servers (recommended) or upload a new video using multipart/form-data.
   *    [More information on Sending Files »](https://core.telegram.org/bots/api#sending-files).
   *    Sending video notes by a URL is currently unsupported
   * @param {object|Extra} [extra] Other parameters
   * @throws {TelegramError}
   * @return {Promise<Message>}
   */
  replyWithVideoNote (videoNote, extra) {
    this.assert(this.chat, 'replyWithVideoNote')
    return this.telegram.sendVideoNote(this.chat.id, videoNote, extra)
  }

  /**
   * Use this method to send invoice to current chat.
   *
   * On success, the sent {@link Message} is returned.
   *
   * @see https://core.telegram.org/bots/api#sendinvoice
   * @param {object} invoice Other invoice parameters
   * @param {object|Extra} [extra] Other parameters
   * @throws {TelegramError}
   * @return {Promise<Message>}
   */
  replyWithInvoice (invoice, extra) {
    this.assert(this.chat, 'replyWithInvoice')
    return this.telegram.sendInvoice(this.chat.id, invoice, extra)
  }

  /**
   * Use this method to send a game to chat from current update.
   *
   * On success, the sent {@link Message} is returned.
   *
   * @see https://core.telegram.org/bots/api#sendgame
   * @param {string} gameName Short name of the game, serves as the unique identifier for the game.
   *    Set up your games via [@BotFather](https://t.me/BotFather).
   * @param {object|Extra} [extra] Other parameters
   * @throws {TelegramError}
   * @return {Promise<Message>}
   */
  replyWithGame (gameName, extra) {
    this.assert(this.chat, 'replyWithGame')
    return this.telegram.sendGame(this.chat.id, gameName, extra)
  }

  /**
   * Use this method to send audio files to chat from current update,
   * if you want Telegram clients to display the file as a playable voice message.
   * For this to work, your audio must be in an .OGG file encoded
   * with OPUS (other formats may be sent as {@link Audio} or {@link Document}).
   *
   * On success, the sent {@link Message} is returned.
   * Bots can currently send voice messages of up to 50 MB in size, this limit may be changed in the future.
   *
   * @see https://core.telegram.org/bots/api#sendvoice
   * @param {attachmentFile} voice Audio file to send. Pass a file_id as String to send a file that exists on the
   *    Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a file from the Internet,
   *    or upload a new one using multipart/form-data.
   * @param {object|Extra} [extra] Other parameters
   * @throws {TelegramError}
   * @return {Promise<Message>}
   */
  replyWithVoice (voice, extra) {
    this.assert(this.chat, 'replyWithVoice')
    return this.telegram.sendVoice(this.chat.id, voice, extra)
  }

  /**
   * Use this method to send a native poll with type `regular` to chat from current update.
   *
   * On success, the sent {@link Message} is returned.
   *
   * @see https://core.telegram.org/bots/api#sendpoll
   * @param {string} question Poll question, 1-300 characters
   * @param {string[]} options List of answer options, 2-10 strings 1-100 characters each
   * @param {object|Extra} [extra] Other parameters
   * @throws {TelegramError}
   * @return {Promise<Message>}
   */
  replyWithPoll (question, options, extra) {
    this.assert(this.chat, 'replyWithPoll')
    return this.telegram.sendPoll(this.chat.id, question, options, extra)
  }

  /**
   * Use this method to send a native poll with type `quiz` to chat from current update.
   *
   * On success, the sent {@link Message} is returned.
   *
   * @see https://core.telegram.org/bots/api#sendpoll
   * @param {string} question Poll question, 1-300 characters
   * @param {string[]} options List of answer options, 2-10 strings 1-100 characters each
   * @param {object|Extra} [extra] Other parameters
   * @throws {TelegramError}
   * @return {Promise<Message>}
   */
  replyWithQuiz (question, options, extra) {
    this.assert(this.chat, 'replyWithQuiz')
    return this.telegram.sendQuiz(this.chat.id, question, options, extra)
  }

  /**
   * Use this method to stop a poll in chat from current update. which was sent by the bot.
   *
   * On success, the stopped {@link Poll} is returned.
   *
   * @see https://core.telegram.org/bots/api#stoppoll
   * @param {number} messageId Identifier of the original message with the poll
   * @param {object|Extra} [extra] Other parameters
   * @throws {TelegramError}
   * @return {Promise<Poll>}
   */
  stopPoll (messageId, extra) {
    this.assert(this.chat, 'stopPoll')
    return this.telegram.stopPoll(this.chat.id, messageId, extra)
  }

  /**
   * Use this method when you need to tell the user that something is happening on the bot's side.
   * The status is set for 5 seconds or less (when a message arrives from your bot,
   * Telegram clients clear its typing status).
   *
   * Returns `True` on success.
   *
   * Example: The [ImageBot](https://t.me/imagebot) needs some time to process a request and upload the image.
   * Instead of sending a text message along the lines of “Retrieving image, please wait…”,
   * the bot may use {@link replyWithChatAction} with `action = upload_photo`. The user will see a “sending photo”
   * status for the bot.
   *
   * We only recommend using this method when a response from the bot will take a **noticeable** amount of time to arrive.
   *
   * @see https://core.telegram.org/bots/api#sendchataction
   * @param {Action} action Type of action to broadcast. Choose one, depending on what the user is about to receive:
   *    `typing` for text messages,
   *    `upload_photo` for {@link replyWithPhoto photos},
   *    `record_video` or `upload_video` for {@link replyWithVideo videos},
   *    `record_voice` or `upload_voice` for {@link replyWithVoice voice} notes,
   *    `upload_document` for general {@link replyWithDocument files},
   *    `choose_sticker` for {@link replyWithSticker stickers},
   *    `find_location` for {@link replyWithLocation location data},
   *    `record_video_note` or `upload_video_note` for {@link replyWithVideoNote video notes}.
   * @throws {TelegramError}
   * @return {Promise<boolean>}
   */
  replyWithChatAction (action) {
    this.assert(this.chat, 'replyWithChatAction')
    return this.telegram.sendChatAction(this.chat.id, action)
  }

  /**
   * Use this method to send point on the map to chat from current update.
   *
   * On success, the sent {@link Message} is returned.
   *
   * @see https://core.telegram.org/bots/api#sendlocation
   * @param {number} latitude Latitude of the location
   * @param {number} longitude Longitude of the location
   * @param {object|Extra} [extra] Other parameters
   * @throws {TelegramError}
   * @return {Promise}
   */
  replyWithLocation (latitude, longitude, extra) {
    this.assert(this.chat, 'replyWithLocation')
    return this.telegram.sendLocation(this.chat.id, latitude, longitude, extra)
  }

  /**
   * Use this method to send information about a venue to chat from current update.
   *
   * On success, the sent {@link Message} is returned.
   *
   * @see https://core.telegram.org/bots/api#sendvenue
   * @param {number} latitude Latitude of the venue
   * @param {number} longitude Longitude of the venue
   * @param {string} title Name of the venue
   * @param {string} address Address of the venue
   * @param {object|Extra} [extra] Other parameters
   * @throws {TelegramError}
   * @return {Promise<Message>}
   */
  replyWithVenue (latitude, longitude, title, address, extra) {
    this.assert(this.chat, 'replyWithVenue')
    return this.telegram.sendVenue(this.chat.id, latitude, longitude, title, address, extra)
  }

  /**
   * Use this method to send phone contacts to chat from current update.
   *
   * On success, the sent {@link Message} is returned.
   *
   * @see https://core.telegram.org/bots/api#sendcontact
   * @param {string} phoneNumber Contact's phone number
   * @param {string} firstName Contact's first name
   * @param {object|Extra} [extra] Other parameters
   * @throws {TelegramError}
   * @return {Promise<Message>}
   */
  replyWithContact (phoneNumber, firstName, extra) {
    this.assert(this.from, 'replyWithContact')
    return this.telegram.sendContact(this.chat.id, phoneNumber, firstName, extra)
  }

  /**
   * Use this method to get a sticker set.
   *
   * On success, a {@link StickerSet} object is returned.
   *
   * @see https://core.telegram.org/bots/api#getstickerset
   * @param {string} name Name of the sticker set
   * @throws {TelegramError}
   * @return {Promise<StickerSet>}
   */
  getStickerSet (name) {
    return this.telegram.getStickerSet(name)
  }

  /**
   * Use this method to set a new group sticker set for supergroup from current update.
   * The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights.
   * Use the field `can_set_sticker_set` optionally returned in {@link getChat} requests to check if the
   * bot can use this method.
   *
   * Returns `True` on success.
   *
   * @see https://core.telegram.org/bots/api#setchatstickerset
   * @param {string} setName Name of the sticker set to be set as the group sticker set
   * @throws {TelegramError}
   * @return {Promise<boolean>}
   */
  setChatStickerSet (setName) {
    this.assert(this.chat, 'setChatStickerSet')
    return this.telegram.setChatStickerSet(this.chat.id, setName)
  }

  /**
   * Use this method to delete a group sticker set from current supergroup. The bot must be an administrator in the chat for
   * this to work and must have the appropriate administrator rights. Use the field `can_set_sticker_set` optionally
   * returned in {@link getChat} requests to check if the bot can use this method.
   *
   * Returns `True` on success.
   *
   * @see https://core.telegram.org/bots/api#deletechatstickerset
   * @throws {TelegramError}
   * @return {Promise<boolean>}
   */
  deleteChatStickerSet () {
    this.assert(this.chat, 'deleteChatStickerSet')
    return this.telegram.deleteChatStickerSet(this.chat.id)
  }

  /**
   * Use this method to create a topic in a forum supergroup chat. The bot must be an administrator in the chat for this
   * to work and must have the can_manage_topics administrator rights.
   *
   * Returns information about the created topic as a {@link ForumTopic} object.
   *
   * @see https://core.telegram.org/bots/api#createforumtopic
   *
   * @param {string} name Topic name, 1-128 characters
   * @param {object} [extra] Other parameters
   *
   * @throws {TelegramError}
   * @return {Promise<ForumTopic>}
   */
  createForumTopic (name, extra) {
    this.assert(this.chat, 'createForumTopic')
    return this.telegram.createForumTopic(this.chat.id, name, extra)
  }

  /**
   * Use this method to edit name and icon of a topic in a forum supergroup chat. The bot must be an administrator in
   * the chat for this to work and must have can_manage_topics administrator rights, unless it is the creator of the
   * topic.
   *
   * Returns `True` on success.
   *
   * @see https://core.telegram.org/bots/api#editforumtopic
   * @param {string} name Topic name, 1-128 characters
   * @param {string} iconCustomEmojiId New unique identifier of the custom emoji shown as the topic icon.
   *   Use {@link getForumTopicIconStickers} to get all allowed custom emoji identifiers.
   *
   * @throws {TelegramError}
   * @return {Promise<boolean>}
   */
  editForumTopic (name, iconCustomEmojiId) {
    this.assert(this.chat, 'editForumTopic')
    this.assert(this.message?.message_thread_id, 'editForumTopic')
    return this.telegram.editForumTopic(this.chat.id, this.message.message_thread_id, {
      name,
      icon_custom_emoji_id: iconCustomEmojiId
    })
  }

  /**
   * Use this method to close an open topic in a forum supergroup chat. The bot must be an administrator in the chat
   * for this to work and must have the can_manage_topics administrator rights, unless it is the creator of the topic.
   * Returns `True` on success.
   *
   * @see https://core.telegram.org/bots/api#closeforumtopic
   * @throws {TelegramError}
   * @return {Promise<boolean>}
   */
  closeForumTopic () {
    this.assert(this.chat, 'closeForumTopic')
    this.assert(this.message?.message_thread_id, 'closeForumTopic')
    return this.telegram.closeForumTopic(this.chat.id, this.message.message_thread_id)
  }

  /**
   * Use this method to reopen a closed topic in a forum supergroup chat. The bot must be an administrator in the chat
   * for this to work and must have the can_manage_topics administrator rights, unless it is the creator of the topic.
   * Returns `True` on success.
   *
   * @see https://core.telegram.org/bots/api#reopenforumtopic
   * @throws {TelegramError}
   * @return {Promise<boolean>}
   */
  reopenForumTopic () {
    this.assert(this.chat, 'reopenForumTopic')
    this.assert(this.message?.message_thread_id, 'reopenForumTopic')

    return this.telegram.reopenForumTopic(this.chat.id, this.message.message_thread_id)
  }

  /**
   * Use this method to delete a forum topic along with all its messages in a forum supergroup chat. The bot must be an
   * administrator in the chat for this to work and must have the can_delete_messages administrator rights.
   * Returns `True` on success.
   *
   * @see https://core.telegram.org/bots/api#deleteforumtopic
   * @throws {TelegramError}
   * @return {Promise<boolean>}
   */
  deleteForumTopic () {
    this.assert(this.chat, 'deleteForumTopic')
    this.assert(this.message?.message_thread_id, 'deleteForumTopic')

    return this.telegram.deleteForumTopic(this.chat.id, this.message.message_thread_id)
  }

  /**
   * Use this method to clear the list of pinned messages in a forum topic. The bot must be an administrator in the chat
   * for this to work and must have the can_pin_messages administrator right in the supergroup. Returns True on success.
   *
   * @see https://core.telegram.org/bots/api#unpinallforumtopicmessages
   *
   * @throws {TelegramError}
   * @return {Promise<boolean>}
   */
  unpinAllForumTopicMessages () {
    this.assert(this.chat, 'unpinAllForumTopicMessages')
    this.assert(this.message?.message_thread_id, 'unpinAllForumTopicMessages')

    return this.telegram.unpinAllForumTopicMessages(this.chat.id, this.message.message_thread_id)
  }

  /**
   * Use this method to move a sticker in a set created by the bot to a specific position.
   *
   * Returns `True` on success.
   *
   * @see https://core.telegram.org/bots/api#setstickerpositioninset
   * @param {string} sticker File identifier of the sticker
   * @param {number} position New sticker position in the set, zero-based
   *
   * @throws {TelegramError}
   * @return {Promise<boolean>}
   */
  setStickerPositionInSet (sticker, position) {
    return this.telegram.setStickerPositionInSet(sticker, position)
  }

  /**
   * Use this method to set the thumbnail of a sticker set. Animated thumbnails can be set for animated sticker
   * sets only. Video thumbnails can be set only for video sticker sets only.
   *
   * Returns `True` on success.
   *
   * @see https://core.telegram.org/bots/api#setstickersetthumb
   * @param {string} name Sticker set name
   * @param {number} userId User identifier of the sticker set owner
   * @param {attachmentFile} [thumb] A **PNG** image with the thumbnail, must be up to 128 kilobytes in size and have width and height
   *    exactly 100px, or a **TGS** animation with the thumbnail up to 32 kilobytes in size;
   *    see https://core.telegram.org/stickers#animated-sticker-requirements for animated sticker technical requirements,
   *    or a **WEBM** video with the thumbnail up to 32 kilobytes in size;
   *    see https://core.telegram.org/stickers#video-sticker-requirements for video sticker technical
   *    requirements. Pass a file_id as a String to send a file that already exists on the Telegram servers,
   *    pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one
   *    using multipart/form-data.
   *    [More information on Sending Files »](https://core.telegram.org/bots/api#sending-files).
   *    Animated sticker set thumbnails can't be uploaded via HTTP URL.
   * @throws {TelegramError}
   * @return {Promise<boolean>}
   */
  setStickerSetThumb (name, userId, thumb) {
    return this.telegram.setStickerSetThumb(name, userId, thumb)
  }

  /**
   * Use this method to delete a sticker from a set created by the bot.
   *
   * Returns `True` on success.
   *
   * @see https://core.telegram.org/bots/api#deletestickerfromset
   * @param {string} sticker File identifier of the sticker
   * @throws {TelegramError}
   * @return {Promise<boolean>}
   */
  deleteStickerFromSet (sticker) {
    return this.telegram.deleteStickerFromSet(sticker)
  }

  /**
   * Use this method to upload a .PNG file with a sticker owned by current user for later use in
   * {@link Telegram.createNewStickerSet createNewStickerSet} and {@link Telegram.addStickerToSet addStickerToSet}
   * methods (can be used multiple times).
   *
   * Returns the uploaded {@link File} on success.
   *
   * @see https://core.telegram.org/bots/api#uploadstickerfile
   * @param {attachmentFile} stickerFile **PNG** image with the sticker, must be up to 512 kilobytes in size,
   *    dimensions must not exceed 512px, and either width or height must be exactly 512px.
   *    [More information on Sending Files »](https://core.telegram.org/bots/api#sending-files).
   * @throws {TelegramError}
   * @return {Promise<File>}
   */
  uploadStickerFile (stickerFile) {
    this.assert(this.from, 'uploadStickerFile')
    return this.telegram.uploadStickerFile(this.from.id, stickerFile)
  }

  /**
   * Use this method to create a new sticker set owned by current user. The bot will be able to edit the sticker set
   * thus created. You must use exactly one of the fields `png_sticker`, `tgs_sticker`, or `webm_sticker`.
   *
   * Returns `True` on success.
   *
   * @see https://core.telegram.org/bots/api#createnewstickerset
   * @param {string} name Short name of sticker set, to be used in `t.me/addstickers/` URLs (e.g., *animals*).
   *    Can contain only English letters, digits and underscores. Must begin with a letter,
   *    can't contain consecutive underscores and must end in `"_by_<bot_username>"`. `<bot_username>`
   *    is case insensitive. 1-64 characters.
   * @param {string} title Sticker set title, 1-64 characters
   * @param {object} stickerData Other parameters
   * @throws {TelegramError}
   * @return {Promise<boolean>}
   */
  createNewStickerSet (name, title, stickerData) {
    this.assert(this.from, 'createNewStickerSet')
    return this.telegram.createNewStickerSet(this.from.id, name, title, stickerData)
  }

  /**
   * Use this method to add a new sticker to a set created by the bot for user from current update.
   * You **must** use exactly one of the fields `png_sticker`, `tgs_sticker`, or `webm_sticker`.
   * Animated stickers can be added to animated sticker sets and only to them.
   * Animated sticker sets can have up to 50 stickers. Static sticker sets can have up to 120 stickers.
   *
   * Returns `True` on success.
   *
   * @see https://core.telegram.org/bots/api#addstickertoset
   * @param {string} name Sticker set name
   * @param {object} stickerData Other parameters
   * @throws {TelegramError}
   * @return {Promise<boolean>}
   */
  addStickerToSet (name, stickerData) {
    this.assert(this.from, 'addStickerToSet')
    return this.telegram.addStickerToSet(this.from.id, name, stickerData)
  }

  /**
   * Use this method to get the current list of the bot's commands for the given scope and user language.
   *
   * Returns Array of {@link BotCommand} on success. If commands aren't set, an empty list is returned.
   *
   * @see https://core.telegram.org/bots/api#getmycommands
   * @param {object|Extra} [extra] Other parameters
   * @throws {TelegramError}
   * @return {Promise<BotCommand[]>}
   */
  getMyCommands (extra) {
    return this.telegram.getMyCommands(extra)
  }

  /**
   * Use this method to change the list of the bot's commands. See
   * [https://core.telegram.org/bots#commands](https://core.telegram.org/bots#commands) for more details
   * about bot commands.
   *
   * Returns `True` on success.
   *
   * @see https://core.telegram.org/bots/api#setmycommands
   * @param {BotCommand[]} commands List of bot commands to be set as the list of the bot's commands.
   *    At most 100 commands can be specified.
   * @param {object|Extra} [extra] Other parameters
   * @throws {TelegramError}
   * @return {Promise<boolean>}
   */
  setMyCommands (commands, extra) {
    return this.telegram.setMyCommands(commands, extra)
  }

  /**
   * Use this method to delete the list of the bot's commands for the given scope and user language.
   * After deletion, higher level commands will be shown to affected users.
   *
   * Returns `True` on success.
   *
   * @see https://core.telegram.org/bots/api#deletemycommands
   * @param {object|Extra} [extra] Other parameters
   * @throws {TelegramError}
   * @return {Promise<boolean>}
   */
  deleteMyCommands (extra) {
    return this.telegram.deleteMyCommands(extra)
  }

  /**
   * Use this method to send text messages with Markdown (`parse_mode: 'Markdown'`) to chat from current update.
   *
   * On success, the sent {@link Message} is returned.
   *
   * @see https://core.telegram.org/bots/api#sendmessage
   * @param {string} markdown Text with Markdown of the message to be sent, 1-4096 characters after entities parsing
   * @param {MessageExtraParams|Extra} [extra] Other parameters
   * @throws {TelegramError}
   * @return {Promise<Message>}
   */
  replyWithMarkdown (markdown, extra) {
    return this.reply(markdown, { parse_mode: 'Markdown', ...extra })
  }

  /**
   * Use this method to send text messages with MarkdownV2 (`parse_mode: 'MarkdownV2'`) to chat from current update.
   *
   * On success, the sent {@link Message} is returned.
   *
   * @see https://core.telegram.org/bots/api#sendmessage
   * @param {string} markdown Text with MarkdownV2 of the message to be sent, 1-4096 characters after entities parsing
   * @param {MessageExtraParams|Extra} [extra] Other parameters
   * @throws {TelegramError}
   * @return {Promise<Message>}
   */
  replyWithMarkdownV2 (markdown, extra) {
    return this.reply(markdown, { parse_mode: 'MarkdownV2', ...extra })
  }

  /**
   * Use this method to send text messages with HTML (`parse_mode: 'HTML'`) to chat from current update.
   *
   * On success, the sent {@link Message} is returned.
   *
   * @see https://core.telegram.org/bots/api#sendmessage
   * @param {string} html Text with HTML of the message to be sent, 1-4096 characters after entities parsing
   * @param {MessageExtraParams|Extra} [extra] Other parameters
   * @throws {TelegramError}
   * @return {Promise<Message>}
   */
  replyWithHTML (html, extra) {
    return this.reply(html, { parse_mode: 'HTML', ...extra })
  }

  /**
   * Use this method to delete message from current update or message with id specified in arguments,
   * including service messages, with the following limitations:
   * - A message can only be deleted if it was sent less than 48 hours ago.
   * - A dice message in a private chat can only be deleted if it was sent more than 24 hours ago.
   * - Bots can delete outgoing messages in private chats, groups, and supergroups.
   * - Bots can delete incoming messages in private chats.
   * - Bots granted can_post_messages permissions can delete outgoing messages in channels.
   * - If the bot is an administrator of a group, it can delete any message there.
   * - If the bot has can_delete_messages permission in a supergroup or a channel, it can delete any message there.
   *
   * Returns `True` on success.
   *
   * @see https://core.telegram.org/bots/api#deletemessage
   * @param {number} messageId Identifier of the message to delete
   * @throws {TelegramError}
   * @return {Promise<boolean>}
   */
  deleteMessage (messageId) {
    this.assert(this.chat, 'deleteMessage')
    if (typeof messageId !== 'undefined') {
      return this.telegram.deleteMessage(this.chat.id, messageId)
    }
    const message = getMessageFromAnySource(this)
    this.assert(message, 'deleteMessage')
    return this.telegram.deleteMessage(this.chat.id, message.message_id)
  }

  /**
   * Use this method to forward messages of any kind from current chat. Service messages can't be forwarded.
   *
   * On success, the sent {@link Message} is returned.
   *
   * @see https://core.telegram.org/bots/api#forwardmessage
   * @param {string|number} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {forwardExtraParams|Extra} [extra] Other parameters
   * @throws {TelegramError}
   * @return {Promise<Message>}
   */
  forwardMessage (chatId, extra) {
    this.assert(this.chat, 'forwardMessage')
    const message = getMessageFromAnySource(this)
    this.assert(message, 'forwardMessage')
    return this.telegram.forwardMessage(chatId, this.chat.id, message.message_id, extra)
  }

  /**
   * Use this method to copy messages of any kind from current chat. Service messages and invoice messages can't be copied.
   * The method is analogous to the method {@link forwardMessage}, but the copied message doesn't have a link to the
   * original message.
   *
   * Returns the {@link MessageId} of the sent message on success.
   *
   * @see https://core.telegram.org/bots/api#copymessage
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {object|Extra} [extra] Other parameters
   * @throws {TelegramError}
   * @return {Promise<MessageId>}
   */
  copyMessage (chatId, extra) {
    const message = getMessageFromAnySource(this)
    this.assert(message, 'copyMessage')
    return this.telegram.copyMessage(chatId, message.chat.id, message.message_id, extra)
  }

  /**
   * Use this method to create an additional invite link for chat from current update.
   * The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights.
   * The link can be revoked using the method
   * {@link Telegram.revokeChatInviteLink revokeChatInviteLink}.
   *
   * Returns the new invite link as {@link ChatInviteLink} object.
   *
   * @see https://core.telegram.org/bots/api#createchatinvitelink
   * @param {object|Extra} [extra] Other parameters
   * @throws {TelegramError}
   * @return {Promise<ChatInviteLink>}
   */
  createChatInviteLink (extra) {
    this.assert(this.chat, 'createChatInviteLink')
    return this.telegram.createChatInviteLink(this.chat.id, extra)
  }

  /**
   * Use this method to edit a non-primary invite link created by the bot for chat from current update.
   * The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights.
   *
   * Returns the edited invite link
   * as a {@link ChatInviteLink} object.
   *
   * @see https://core.telegram.org/bots/api#editchatinvitelink
   * @param {string} inviteLink The invite link to edit
   * @param {object|Extra} [extra] Other parameters
   * @throws {TelegramError}
   * @return {Promise<ChatInviteLink>}
   */
  editChatInviteLink (inviteLink, extra) {
    this.assert(this.chat, 'editChatInviteLink')
    return this.telegram.editChatInviteLink(this.chat.id, inviteLink, extra)
  }

  /**
   * Use this method to revoke an invite link created by the bot for chat from current update.
   * If the primary link is revoked, a new link is automatically generated.
   * The bot must be an administrator in the chat for this to work and must
   * have the appropriate administrator rights.
   *
   * Returns the revoked invite link as {@link ChatInviteLink} object.
   *
   * @see https://core.telegram.org/bots/api#revokechatinvitelink
   * @param {string} inviteLink The invite link to revoke
   * @throws {TelegramError}
   * @return {Promise<ChatInviteLink>}
   */
  revokeChatInviteLink (inviteLink) {
    this.assert(this.chat, 'revokeChatInviteLink')
    return this.telegram.revokeChatInviteLink(this.chat.id, inviteLink)
  }

  /**
   * Use this method to approve join request for chat from current update.
   * The bot must be an administrator in the chat for this to work and must have
   * the `can_invite_users` administrator right.
   *
   * Returns `True` on success.
   *
   * @see https://core.telegram.org/bots/api#approvechatjoinrequest
   * @param {number} userId Unique identifier of the target user
   * @throws {TelegramError}
   * @return {Promise<boolean>}
   */
  approveChatJoinRequest (userId) {
    this.assert(this.chat, 'approveChatJoinRequest')
    return this.telegram.approveChatJoinRequest(this.chat.id, userId)
  }

  /**
   * Use this method to decline join request for chat from current update.
   * The bot must be an administrator in the chat for this to work and must have
   * the `can_invite_users` administrator right.
   *
   * Returns `True` on success.
   *
   * @see https://core.telegram.org/bots/api#declinechatjoinrequest
   * @param {number} userId Unique identifier of the target user
   * @throws {TelegramError}
   * @return {Promise<boolean>}
   */
  declineChatJoinRequest (userId) {
    this.assert(this.chat, 'declineChatJoinRequest')
    return this.telegram.declineChatJoinRequest(this.chat.id, userId)
  }

  /**
   * Use this method to get information about custom emoji stickers by their identifiers.
   *
   * Returns an Array of {@link Sticker} objects.
   *
   * @see https://core.telegram.org/bots/api#getcustomemojistickers
   * @param {string[]} customEmojiIds List of custom emoji identifiers. At most 200 custom emoji identifiers can be
   *    specified.
   * @throws {TelegramError}
   * @return {Promise<Sticker[]>}
   */
  getCustomEmojiStickers (customEmojiIds) {
    return this.telegram.getCustomEmojiStickers(customEmojiIds)
  }

  /**
   * Use this method to create a link for an invoice.
   *
   * Returns the created invoice link as `String` on success.
   *
   * @see https://core.telegram.org/bots/api#createinvoicelink
   * @param {Invoice} invoice Object with invoice properties
   * @throws {TelegramError}
   * @return {Promise<string>}
   */
  createInvoiceLink (invoice) {
    return this.telegram.createInvoiceLink(invoice)
  }
}

module.exports = { OpengramContext, MessageSubTypesMappingForChannelMode, MessageSubTypesMapping }

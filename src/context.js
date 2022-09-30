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
  'web_app_data'
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
   * @return {string}
   */
  get me () {
    return this.botInfo && this.botInfo.username
  }

  /**
   * Returns instance of {@link Telegram} for api calls
   *
   * Alias for `context.tg`
   * @return {Telegram}
   */
  get telegram () {
    return this.tg
  }

  /**
   * Returns {@link Message} object for current update
   *
   * Shortcut to `context.update.message`
   * @return {Message}
   */
  get message () {
    return this.update.message
  }

  /**
   * Returns {@link Message edited message} object for current update
   *
   * Shortcut to `context.update.edited_message`
   * @return {Message}
   */
  get editedMessage () {
    return this.update.edited_message
  }

  /**
   * Returns {@link InlineQuery} object for current update
   *
   * Shortcut to `context.update.inline_query`
   * @return {InlineQuery}
   */
  get inlineQuery () {
    return this.update.inline_query
  }

  /**
   * Returns {@link ShippingQuery} object for current update
   *
   * Shortcut to `context.update.shipping_query`
   * @return {ShippingQuery}
   */
  get shippingQuery () {
    return this.update.shipping_query
  }

  /**
   * Returns {@link PreCheckoutQuery} object for current update
   *
   * Shortcut to `context.update.pre_checkout_query`
   * @return {PreCheckoutQuery}
   */
  get preCheckoutQuery () {
    return this.update.pre_checkout_query
  }

  /**
   * Returns {@link ChosenInlineResult} object for current update
   *
   * Shortcut to `context.update.chosen_inline_result`
   * @return {ChosenInlineResult}
   */
  get chosenInlineResult () {
    return this.update.chosen_inline_result
  }

  /**
   * Returns {@link Message channel post} object for current update
   *
   * Shortcut to `context.update.channel_post`
   * @return {Message}
   */
  get channelPost () {
    return this.update.channel_post
  }

  /**
   * Returns {@link Message edited channel post} object for current update
   *
   * Shortcut to `context.update.edited_channel_post`
   * @return {Message}
   */
  get editedChannelPost () {
    return this.update.edited_channel_post
  }

  /**
   * Returns {@link CallbackQuery} object for current update
   *
   * Shortcut to `context.update.callback_query`
   * @return {CallbackQuery}
   */
  get callbackQuery () {
    return this.update.callback_query
  }

  /**
   * Returns {@link Poll} object for current update
   *
   * Shortcut to `context.update.poll`
   * @return {Poll}
   */
  get poll () {
    return this.update.poll
  }

  /**
   * Returns {@link PollAnswer} object for current update
   *
   * Shortcut to `context.update.poll_answer`
   * @return {PollAnswer}
   */
  get pollAnswer () {
    return this.update.poll_answer
  }

  /**
   * Returns {@link ChatMemberUpdated} object for current update
   *
   * Shortcut to `context.update.my_chat_member`
   * @return {ChatMemberUpdated}
   */
  get myChatMember () {
    return this.update.my_chat_member
  }

  /**
   * Returns {@link ChatMemberUpdated} object for current update
   *
   * Shortcut to `context.update.chat_member`
   * @return {ChatMemberUpdated}
   */
  get chatMember () {
    return this.update.chat_member
  }

  /**
   * Returns {@link ChatJoinRequest} object for current update
   *
   * Shortcut to `context.update.chat_join_request`
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
   * - `context.chatJoinRequest.chat`
   * - `context.message.chat`
   * - `context.editedMessage.chat`
   * - `context.callbackQuery.message.chat`
   * - `context.channelPost.chat`
   * - `context.editedChannelPost.chat`
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
   * @return {boolean}
   */
  get webhookReply () {
    return this.tg.webhookReply
  }

  /**
   * Setter for webhookReply
   *
   * Use this property to control reply via webhook feature for current context.
   * @param {boolean} enable
   * @return {void}
   */
  set webhookReply (enable) {
    this.tg.webhookReply = enable
  }

  /**
   * Method used for checking is method available for current update
   * @private
   * @param value Value to check
   * @param method Method name
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
   * @see https://core.telegram.org/bots/api#answercallbackquery
   * @param [url] URL that will be opened by the user's client. If you have created a Game and accepted the conditions
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
   * @see https://core.telegram.org/bots/api#banchatmember
   * @param userId Unique identifier of the target user
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
   * @see https://core.telegram.org/bots/api#banchatmember
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
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
   * @param {string} [description] New chat description, 0-255 characters
   * @throws {TelegramError}
   * @return {Promise<boolean>}
   */
  setChatDescription (description) {
    this.assert(this.chat, 'setChatDescription')
    return this.telegram.setChatDescription(this.chat.id, description)
  }

  pinChatMessage (messageId, extra) {
    this.assert(this.chat, 'pinChatMessage')
    return this.telegram.pinChatMessage(this.chat.id, messageId, extra)
  }

  unpinChatMessage (extra) {
    this.assert(this.chat, 'unpinChatMessage')
    return this.telegram.unpinChatMessage(this.chat.id, extra)
  }

  unpinAllChatMessages () {
    this.assert(this.chat, 'unpinAllChatMessages')
    return this.telegram.unpinAllChatMessages(this.chat.id)
  }

  leaveChat () {
    this.assert(this.chat, 'leaveChat')
    return this.telegram.leaveChat(this.chat.id)
  }

  setChatPermissions (permissions) {
    this.assert(this.chat, 'setChatPermissions')
    return this.telegram.setChatPermissions(this.chat.id, permissions)
  }

  getChatAdministrators () {
    this.assert(this.chat, 'getChatAdministrators')
    return this.telegram.getChatAdministrators(this.chat.id)
  }

  getChatMember (userId) {
    this.assert(this.chat, 'getChatMember')
    return this.telegram.getChatMember(this.chat.id, userId)
  }

  getChatMembersCount () {
    this.assert(this.chat, 'getChatMembersCount')
    return this.telegram.getChatMemberCount(this.chat.id)
  }

  getChatMemberCount () {
    this.assert(this.chat, 'getChatMemberCount')
    return this.telegram.getChatMemberCount(this.chat.id)
  }

  getChatMenuButton () {
    this.assert(this.chat, 'getChatMenuButton')
    return this.telegram.getChatMenuButton(this.chat.id)
  }

  setChatMenuButton (menuButton) {
    this.assert(this.chat, 'setChatMenuButton')
    return this.telegram.setChatMenuButton(this.chat.id, menuButton)
  }

  setMyDefaultAdministratorRights (rights, forChannels) {
    return this.telegram.setMyDefaultAdministratorRights(rights, forChannels)
  }

  getMyDefaultAdministratorRights (forChannels) {
    return this.telegram.getMyDefaultAdministratorRights(forChannels)
  }

  setPassportDataErrors (errors) {
    this.assert(this.chat, 'setPassportDataErrors')
    return this.telegram.setPassportDataErrors(this.from.id, errors)
  }

  replyWithPhoto (photo, extra) {
    this.assert(this.chat, 'replyWithPhoto')
    return this.telegram.sendPhoto(this.chat.id, photo, extra)
  }

  replyWithMediaGroup (media, extra) {
    this.assert(this.chat, 'replyWithMediaGroup')
    return this.telegram.sendMediaGroup(this.chat.id, media, extra)
  }

  replyWithAudio (audio, extra) {
    this.assert(this.chat, 'replyWithAudio')
    return this.telegram.sendAudio(this.chat.id, audio, extra)
  }

  replyWithDice (extra) {
    this.assert(this.chat, 'replyWithDice')
    return this.telegram.sendDice(this.chat.id, extra)
  }

  replyWithDocument (document, extra) {
    this.assert(this.chat, 'replyWithDocument')
    return this.telegram.sendDocument(this.chat.id, document, extra)
  }

  replyWithSticker (sticker, extra) {
    this.assert(this.chat, 'replyWithSticker')
    return this.telegram.sendSticker(this.chat.id, sticker, extra)
  }

  replyWithVideo (video, extra) {
    this.assert(this.chat, 'replyWithVideo')
    return this.telegram.sendVideo(this.chat.id, video, extra)
  }

  replyWithAnimation (animation, extra) {
    this.assert(this.chat, 'replyWithAnimation')
    return this.telegram.sendAnimation(this.chat.id, animation, extra)
  }

  replyWithVideoNote (videoNote, extra) {
    this.assert(this.chat, 'replyWithVideoNote')
    return this.telegram.sendVideoNote(this.chat.id, videoNote, extra)
  }

  replyWithInvoice (invoice, extra) {
    this.assert(this.chat, 'replyWithInvoice')
    return this.telegram.sendInvoice(this.chat.id, invoice, extra)
  }

  replyWithGame (gameName, extra) {
    this.assert(this.chat, 'replyWithGame')
    return this.telegram.sendGame(this.chat.id, gameName, extra)
  }

  replyWithVoice (voice, extra) {
    this.assert(this.chat, 'replyWithVoice')
    return this.telegram.sendVoice(this.chat.id, voice, extra)
  }

  replyWithPoll (question, options, extra) {
    this.assert(this.chat, 'replyWithPoll')
    return this.telegram.sendPoll(this.chat.id, question, options, extra)
  }

  replyWithQuiz (question, options, extra) {
    this.assert(this.chat, 'replyWithQuiz')
    return this.telegram.sendQuiz(this.chat.id, question, options, extra)
  }

  stopPoll (messageId, extra) {
    this.assert(this.chat, 'stopPoll')
    return this.telegram.stopPoll(this.chat.id, messageId, extra)
  }

  replyWithChatAction (action) {
    this.assert(this.chat, 'replyWithChatAction')
    return this.telegram.sendChatAction(this.chat.id, action)
  }

  replyWithLocation (latitude, longitude, extra) {
    this.assert(this.chat, 'replyWithLocation')
    return this.telegram.sendLocation(this.chat.id, latitude, longitude, extra)
  }

  replyWithVenue (latitude, longitude, title, address, extra) {
    this.assert(this.chat, 'replyWithVenue')
    return this.telegram.sendVenue(this.chat.id, latitude, longitude, title, address, extra)
  }

  replyWithContact (phoneNumber, firstName, extra) {
    this.assert(this.from, 'replyWithContact')
    return this.telegram.sendContact(this.chat.id, phoneNumber, firstName, extra)
  }

  getStickerSet (name) {
    return this.telegram.getStickerSet(name)
  }

  setChatStickerSet (setName) {
    this.assert(this.chat, 'setChatStickerSet')
    return this.telegram.setChatStickerSet(this.chat.id, setName)
  }

  deleteChatStickerSet () {
    this.assert(this.chat, 'deleteChatStickerSet')
    return this.telegram.deleteChatStickerSet(this.chat.id)
  }

  setStickerPositionInSet (sticker, position) {
    return this.telegram.setStickerPositionInSet(sticker, position)
  }

  setStickerSetThumb (name, userId, thumb) {
    return this.telegram.setStickerSetThumb(name, userId, thumb)
  }

  deleteStickerFromSet (sticker) {
    return this.telegram.deleteStickerFromSet(sticker)
  }

  uploadStickerFile (stickerFile) {
    this.assert(this.from, 'uploadStickerFile')
    return this.telegram.uploadStickerFile(this.from.id, stickerFile)
  }

  createNewStickerSet (name, title, stickerData) {
    this.assert(this.from, 'createNewStickerSet')
    return this.telegram.createNewStickerSet(this.from.id, name, title, stickerData)
  }

  addStickerToSet (name, stickerData) {
    this.assert(this.from, 'addStickerToSet')
    return this.telegram.addStickerToSet(this.from.id, name, stickerData)
  }

  getMyCommands (extra) {
    return this.telegram.getMyCommands(extra)
  }

  setMyCommands (commands, extra) {
    return this.telegram.setMyCommands(commands, extra)
  }

  deleteMyCommands (extra) {
    return this.telegram.deleteMyCommands(extra)
  }

  replyWithMarkdown (markdown, extra) {
    return this.reply(markdown, { parse_mode: 'Markdown', ...extra })
  }

  replyWithMarkdownV2 (markdown, extra) {
    return this.reply(markdown, { parse_mode: 'MarkdownV2', ...extra })
  }

  replyWithHTML (html, extra) {
    return this.reply(html, { parse_mode: 'HTML', ...extra })
  }

  deleteMessage (messageId) {
    this.assert(this.chat, 'deleteMessage')
    if (typeof messageId !== 'undefined') {
      return this.telegram.deleteMessage(this.chat.id, messageId)
    }
    const message = getMessageFromAnySource(this)
    this.assert(message, 'deleteMessage')
    return this.telegram.deleteMessage(this.chat.id, message.message_id)
  }

  forwardMessage (chatId, extra) {
    this.assert(this.chat, 'forwardMessage')
    const message = getMessageFromAnySource(this)
    this.assert(message, 'forwardMessage')
    return this.telegram.forwardMessage(chatId, this.chat.id, message.message_id, extra)
  }

  copyMessage (chatId, extra) {
    const message = getMessageFromAnySource(this)
    this.assert(message, 'copyMessage')
    return this.telegram.copyMessage(chatId, message.chat.id, message.message_id, extra)
  }

  createChatInviteLink (extra) {
    this.assert(this.chat, 'createChatInviteLink')
    return this.telegram.createChatInviteLink(this.chat.id, extra)
  }

  editChatInviteLink (inviteLink, extra) {
    this.assert(this.chat, 'editChatInviteLink')
    return this.telegram.editChatInviteLink(this.chat.id, inviteLink, extra)
  }

  revokeChatInviteLink (inviteLink) {
    this.assert(this.chat, 'revokeChatInviteLink')
    return this.telegram.revokeChatInviteLink(this.chat.id, inviteLink)
  }

  approveChatJoinRequest (userId) {
    this.assert(this.chat, 'approveChatJoinRequest')
    return this.telegram.approveChatJoinRequest(this.chat.id, userId)
  }

  declineChatJoinRequest (userId) {
    this.assert(this.chat, 'declineChatJoinRequest')
    return this.telegram.declineChatJoinRequest(this.chat.id, userId)
  }

  getCustomEmojiStickers (customEmojiIds) {
    return this.telegram.getCustomEmojiStickers(customEmojiIds)
  }

  createInvoiceLink (invoice) {
    return this.telegram.createInvoiceLink(invoice)
  }
}

function getMessageFromAnySource (ctx) {
  return (
    ctx.message ||
    ctx.editedMessage ||
    (ctx.callbackQuery && ctx.callbackQuery.message) ||
    ctx.channelPost ||
    ctx.editedChannelPost
  )
}

module.exports = { OpengramContext, MessageSubTypesMappingForChannelMode, MessageSubTypesMapping }

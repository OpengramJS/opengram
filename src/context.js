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

  get poll () {
    return this.update.poll
  }

  get pollAnswer () {
    return this.update.poll_answer
  }

  get myChatMember () {
    return this.update.my_chat_member
  }

  get chatMember () {
    return this.update.chat_member
  }

  get chatJoinRequest () {
    return this.update.chat_join_request
  }

  get chat () {
    const message = this.myChatMember ||
      this.chatMember ||
      this.chatJoinRequest ||
      getMessageFromAnySource(this)
    return message && message.chat
  }

  get senderChat () {
    const message = getMessageFromAnySource(this)
    return message && message.sender_chat
  }

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

  get inlineMessageId () {
    return (this.callbackQuery && this.callbackQuery.inline_message_id) || (this.chosenInlineResult && this.chosenInlineResult.inline_message_id)
  }

  get passportData () {
    return this.message && this.message.passport_data
  }

  get state () {
    if (!this.contextState) {
      this.contextState = {}
    }
    return this.contextState
  }

  set state (value) {
    this.contextState = { ...value }
  }

  get webhookReply () {
    return this.tg.webhookReply
  }

  set webhookReply (enable) {
    this.tg.webhookReply = enable
  }

  assert (value, method) {
    if (!value) {
      throw new TypeError(`Opengram: "${method}" isn't available for "${this.updateType}::${this.updateSubTypes}"`)
    }
  }

  answerInlineQuery (results, extra) {
    this.assert(this.inlineQuery, 'answerInlineQuery')
    return this.telegram.answerInlineQuery(this.inlineQuery.id, results, extra)
  }

  answerCbQuery (text, showAlert, extra) {
    this.assert(this.callbackQuery, 'answerCbQuery')
    return this.telegram.answerCbQuery(this.callbackQuery.id, text, showAlert, extra)
  }

  answerGameQuery (url) {
    this.assert(this.callbackQuery, 'answerGameQuery')
    return this.telegram.answerGameQuery(this.callbackQuery.id, url)
  }

  answerShippingQuery (ok, shippingOptions, errorMessage) {
    this.assert(this.shippingQuery, 'answerShippingQuery')
    return this.telegram.answerShippingQuery(this.shippingQuery.id, ok, shippingOptions, errorMessage)
  }

  answerPreCheckoutQuery (ok, errorMessage) {
    this.assert(this.preCheckoutQuery, 'answerPreCheckoutQuery')
    return this.telegram.answerPreCheckoutQuery(this.preCheckoutQuery.id, ok, errorMessage)
  }

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

  reply (text, extra) {
    this.assert(this.chat, 'reply')
    return this.telegram.sendMessage(this.chat.id, text, extra)
  }

  getChat () {
    this.assert(this.chat, 'getChat')
    return this.telegram.getChat(this.chat.id)
  }

  exportChatInviteLink () {
    this.assert(this.chat, 'exportChatInviteLink')
    return this.telegram.exportChatInviteLink(this.chat.id)
  }

  banChatMember (userId, extra) {
    this.assert(this.chat, 'banChatMember')
    return this.telegram.banChatMember(this.chat.id, userId, extra)
  }

  kickChatMember (userId, untilDate, extra) {
    this.assert(this.chat, 'kickChatMember')
    return this.telegram.kickChatMember(this.chat.id, userId, untilDate, extra)
  }

  unbanChatMember (userId, extra) {
    this.assert(this.chat, 'unbanChatMember')
    return this.telegram.unbanChatMember(this.chat.id, userId, extra)
  }

  restrictChatMember (userId, extra) {
    this.assert(this.chat, 'restrictChatMember')
    return this.telegram.restrictChatMember(this.chat.id, userId, extra)
  }

  promoteChatMember (userId, extra) {
    this.assert(this.chat, 'promoteChatMember')
    return this.telegram.promoteChatMember(this.chat.id, userId, extra)
  }

  banChatSenderChat (senderChatId) {
    this.assert(this.chat, 'banChatSenderChat')
    return this.telegram.banChatSenderChat(this.chat.id, senderChatId)
  }

  unbanChatSenderChat (senderChatId) {
    this.assert(this.chat, 'unbanChatSenderChat')
    return this.telegram.unbanChatSenderChat(this.chat.id, senderChatId)
  }

  setChatAdministratorCustomTitle (userId, title) {
    this.assert(this.chat, 'setChatAdministratorCustomTitle')
    return this.telegram.setChatAdministratorCustomTitle(this.chat.id, userId, title)
  }

  setChatPhoto (photo) {
    this.assert(this.chat, 'setChatPhoto')
    return this.telegram.setChatPhoto(this.chat.id, photo)
  }

  deleteChatPhoto () {
    this.assert(this.chat, 'deleteChatPhoto')
    return this.telegram.deleteChatPhoto(this.chat.id)
  }

  setChatTitle (title) {
    this.assert(this.chat, 'setChatTitle')
    return this.telegram.setChatTitle(this.chat.id, title)
  }

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

const replicators = require('./core/replicators')
const ApiClient = require('./core/network/client')
const { isAbsolute } = require('path')

/**
 * Class which implements sugar for direct Telegram Bots API calls
 */
class Telegram extends ApiClient {
  /**
   * A simple method for testing your bot's authentication token. Requires no parameters.
   * Returns basic information about the bot in form of a {@link User} object.
   * @see https://core.telegram.org/bots/api#getme
   * @return {Promise<User>}
   */
  getMe () {
    return this.callApi('getMe')
  }

  /**
   * Use this method to get basic information about a file and prepare it for downloading.
   * For the moment, bots can download files of up to 20MB in size. On success, a
   * {@link File} object is returned.
   * The file can then be downloaded via the link `https://api.telegram.org/file/bot<token>/<file_path>`,
   * where `<file_path>` is taken from the response. It is guaranteed that the link will be valid for at least 1 hour.
   * When the link expires, a new one can be requested by calling {@link getFile}
   * @see https://core.telegram.org/bots/api#getfile
   * @param {string} fileId File identifier to get information about.
   *    For example `AgACAgIAAx0CQjQWAgABBL1TYuJg8dI5tgABhPn_grF1nRzR-aMtAAJRvDEbb9cQSzO9zjdgGjp1AQADAgADcwADKQQ`
   * @return {Promise<File>}
   */
  getFile (fileId) {
    return this.callApi('getFile', { file_id: fileId })
  }

  /**
   * Calls {@link getFile} method with `fileId` or file object and return result
   * @see https://core.telegram.org/bots/api#getfile
   * @see https://core.telegram.org/bots/api#file
   * @param {string|File} fileId File identifier to get information about.
   *    For example `AgACAgIAAx0CQjQWAgABBL1TYuJg8dI5tgABhPn_grF1nRzR-aMtAAJRvDEbb9cQSzO9zjdgGjp1AQADAgADcwADKQQ`
   * @return {Promise<URL>}
   */
  async getFileLink (fileId) {
    if (typeof fileId === 'string') {
      fileId = await this.getFile(fileId)
    } else if (fileId.file_path === undefined) {
      fileId = await this.getFile(fileId.file_id)
    }

    // Local bot API instances return the absolute path to the file
    if (fileId.file_path !== undefined && isAbsolute(fileId.file_path)) {
      const url = new URL(this.options.apiRoot)
      url.port = ''
      url.pathname = fileId.file_path
      url.protocol = 'file:'
      return url
    }

    return new URL(
      `./file/${this.options.apiPrefix}${this.token}/${fileId.file_path}`,
      this.options.apiRoot
    )
  }

  /**
   * Use this method to receive incoming updates using long polling
   * ([wiki](https://en.wikipedia.org/wiki/Push_technology#Long_polling)).
   * An Array of [Update](https://core.telegram.org/bots/api#update) objects is returned.
   * @see https://core.telegram.org/bots/api#getupdates
   * @param {number} [timeout=0] - Timeout in seconds for long polling.
   *    Defaults to 0, i.e. usual short polling. Should be positive,
   *    short polling should be used for testing purposes only.
   * @param {number} [limit=100] - Limits the number of updates to be retrieved. Values between 1-100 are accepted. Defaults to 100.
   * @param {number} [offset] - Identifier of the first update to be returned.
   *    Must be greater by one than the highest among the identifiers of previously received updates.
   *    By default, updates starting with the earliest unconfirmed update are returned.
   *    An update is considered confirmed as soon as {@link getUpdates} is called with an `offset`
   *    higher than its `update_id`. The negative offset can be specified to retrieve updates starting from `-offset`
   *    update from the end of the updates queue. All previous updates will forgotten.
   * @param {string[]} [allowedUpdates] - Array of allowed updates or update name
   *     For example, specify `["message", "edited_channel_post", "callback_query"]` to only receive
   *     updates of these types. See [Update](https://core.telegram.org/bots/api#update) for a complete list of
   *     available update types.
   *     Specify an empty list to receive all update types except `chat_member` (default).
   *     If not specified, the previous setting will be used.
   *
   *     Please note that this parameter doesn't affect updates created before
   * @return {Promise<object[]>}
   */
  getUpdates (timeout, limit, offset, allowedUpdates) {
    const url = `getUpdates?offset=${offset}&limit=${limit}&timeout=${timeout}`
    return this.callApi(url, {
      allowed_updates: allowedUpdates
    })
  }

  /**
   * Use this method to get current webhook status. Requires no parameters.
   * On success, returns a {@link WebhookInfo} object.
   * If the bot is using {@link getUpdates}, will return an object with the *url* field empty.
   * @see https://core.telegram.org/bots/api#getwebhookinfo
   * @return {Promise<WebhookInfo>}
   */
  getWebhookInfo () {
    return this.callApi('getWebhookInfo')
  }

  /**
   * Use this method to get data for high score tables.
   * Will return the score of the specified user and several of their neighbors in a game.
   * On success, returns an Array of {@link GameHighScore} objects.
   * @see https://core.telegram.org/bots/api#getgamehighscores
   * @param {number} userId Target user id
   * @param {number} [inlineMessageId] Required if `inline_message_id` is not specified.
   *    Unique identifier for the target chat
   * @param {number} [chatId] Required if `inline_message_id` is not specified. Identifier of the sent message
   * @param {number} [messageId] Required if `chat_id` and `message_id` are not specified. Identifier of the inline message
   * @return {Promise<GameHighScore[]>}
   */
  getGameHighScores (userId, inlineMessageId, chatId, messageId) {
    return this.callApi('getGameHighScores', {
      user_id: userId,
      inline_message_id: inlineMessageId,
      chat_id: chatId,
      message_id: messageId
    })
  }

  /**
   * Use this method to set the score of the specified user in a game message. On success,
   * if the message is not an inline message, the {@link Message} is returned,
   * otherwise True is returned.
   * Returns an error, if the new score is not greater than the user's current score in the chat and `force` is False.
   * @see https://core.telegram.org/bots/api#setgamescore
   * @param {number} userId User identifier
   * @param {number} score New score, must be non-negative
   * @param {number} [inlineMessageId] Required if `chat_id` and `message_id` are not specified. Identifier
   *    of the inline message
   * @param {number} [chatId] Required if inline_message_id is not specified. Unique identifier for the target chat
   * @param {number} [messageId] Required if `inline_message_id` is not specified. Identifier of the sent message
   * @param {boolean} [editMessage=true] Pass True, if the game message should not be automatically edited to include
   *    the current scoreboard
   * @param {boolean} [force] Pass True, if the high score is allowed to decrease.
   *    This can be useful when fixing mistakes or banning cheaters
   * @return {Promise<Message>}
   */
  setGameScore (userId, score, inlineMessageId, chatId, messageId, editMessage = true, force) {
    return this.callApi('setGameScore', {
      force,
      score,
      user_id: userId,
      inline_message_id: inlineMessageId,
      chat_id: chatId,
      message_id: messageId,
      disable_edit_message: !editMessage
    })
  }

  /**
   * Use this method to specify a URL and receive incoming updates via an outgoing webhook.
   * Whenever there is an update for the bot, we will send an HTTPS POST request to the specified URL,
   * containing a JSON-serialized [Update](https://core.telegram.org/bots/api#update).
   * In case of an unsuccessful request, we will give up after a reasonable amount of attempts. Returns True on success.
   *
   * If you'd like to make sure that the webhook was set by you, you can specify secret data in the parameter
   * `secret_token`. If specified, the request will contain a header `X-Telegram-Bot-Api-Secret-Token` with
   * the secret token as content.
   * @see https://core.telegram.org/bots/api#setwebhook
   * @param {string} url HTTPS URL to send updates to. Use an empty string to remove webhook integration
   * @param {setWebhookExtra} [extra]
   * @return {Promise}
   */
  setWebhook (url, extra) {
    return this.callApi('setWebhook', { url, ...extra })
  }

  /**
   * Use this method to remove webhook integration if you decide to switch back to {@link Telegram#getUpdates}.
   * Returns True on success.
   * @see https://core.telegram.org/bots/api#deletewebhook
   * @param {deleteWebhookExtra} [extra]
   * @return {Promise}
   */
  deleteWebhook (extra) {
    return this.callApi('deleteWebhook', extra)
  }

  /**
   * Use this method to send text messages. On success, the sent {@link Message} is returned.
   * @see https://core.telegram.org/bots/api#sendmessage
   * @param {string|number} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {string} text Text of the message to be sent, 1-4096 characters after entities parsing
   * @param {MessageExtraParams} extra Extra params
   * @return {Promise<Message>}
   */
  sendMessage (chatId, text, extra) {
    return this.callApi('sendMessage', { chat_id: chatId, text, ...extra })
  }

  /**
   * Use this method to forward messages of any kind. Service messages can't be forwarded. On success, the sent
   * {@link Message} is returned.
   * @see https://core.telegram.org/bots/api#forwardmessage
   * @param {string|number} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {string|number} fromChatId Unique identifier for the chat where the original message was sent
   * (or channel username in the format `@channelusername`)
   * @param {number} messageId Message identifier in the chat specified in from_chat_id
   * @param {forwardExtraParams} [extra]
   * @return {Promise<Message>}
   */
  forwardMessage (chatId, fromChatId, messageId, extra) {
    return this.callApi('forwardMessage', {
      chat_id: chatId,
      from_chat_id: fromChatId,
      message_id: messageId,
      ...extra
    })
  }

  /**
   * Use this method when you need to tell the user that something is happening on the bot's side.
   * The status is set for 5 seconds or less (when a message arrives from your bot,
   * Telegram clients clear its typing status). Returns True on success.
   *
   * Example: The [ImageBot](https://t.me/imagebot) needs some time to process a request and upload the image.
   * Instead of sending a text message along the lines of “Retrieving image, please wait…”,
   * the bot may use {@link sendChatAction} with `action = upload_photo`. The user will see a “sending photo”
   * status for the bot.
   *
   * We only recommend using this method when a response from the bot will take a **noticeable** amount of time to arrive.
   * @see https://core.telegram.org/bots/api#sendchataction
   * @param {string|number} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param action Type of action to broadcast. Choose one, depending on what the user is about to receive: typing
   *    for text messages,
   *    upload_photo for {@link sendMessage photos},
   *    record_video or upload_video for {@link sendVideo videos},
   *    record_voice or upload_voice for {@link sendVoice voice} notes,
   *    upload_document for general {@link sendDocument files},
   *    choose_sticker for {@link sendSticker stickers},
   *    find_location for {@link sendLocation location data},
   *    record_video_note or upload_video_note for {@link sendVideoNote video notes}.
   * @return {Promise}
   */
  sendChatAction (chatId, action) {
    return this.callApi('sendChatAction', { chat_id: chatId, action })
  }

  /**
   * Use this method to get a list of profile pictures for a user. Returns a {@link UserProfilePhotos} object.
   * @see https://core.telegram.org/bots/api#getuserprofilephotos
   * @param {number} userId Unique identifier of the target user
   * @param {number} [offset] Sequential number of the first photo to be returned. By default, all photos are returned.
   * @param {number} [limit] Limits the number of photos to be retrieved. Values between 1-100 are accepted.
   *    Defaults to 100.
   * @return {Promise<UserProfilePhotos>}
   */
  getUserProfilePhotos (userId, offset, limit) {
    return this.callApi('getUserProfilePhotos', { user_id: userId, offset, limit })
  }

  /**
   * Use this method to send point on the map. On success, the sent
   * [Message](https://core.telegram.org/bots/api#message) is returned.
   * @see https://core.telegram.org/bots/api#sendlocation
   * @param chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {number} latitude Latitude of the location
   * @param {number} longitude Longitude of the location
   * @param {object} [extra]
   * @return {Promise}
   */
  sendLocation (chatId, latitude, longitude, extra) {
    return this.callApi('sendLocation', { chat_id: chatId, latitude, longitude, ...extra })
  }

  /**
   * Use this method to send information about a venue. On success, the sent
   * [Message](https://core.telegram.org/bots/api#message) is returned.
   * @see https://core.telegram.org/bots/api#sendvenue
   * @param chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {number} latitude Latitude of the venue
   * @param {number} longitude Longitude of the venue
   * @param {string} title Name of the venue
   * @param {string} address Address of the venue
   * @param {object} [extra]
   * @return {Promise}
   */
  sendVenue (chatId, latitude, longitude, title, address, extra) {
    return this.callApi('sendVenue', {
      latitude,
      longitude,
      title,
      address,
      chat_id: chatId,
      ...extra
    })
  }

  /**
   * Use this method to send invoices. On success, the sent
   * [Message](https://core.telegram.org/bots/api#message) is returned.
   * @see https://core.telegram.org/bots/api#sendinvoice
   * @param {string|number} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {object} invoice
   * @param {object} [extra]
   * @return {Promise}
   */
  sendInvoice (chatId, invoice, extra) {
    return this.callApi('sendInvoice', { chat_id: chatId, ...invoice, ...extra })
  }

  /**
   * Use this method to send phone contacts. On success, the sent
   * [Message](https://core.telegram.org/bots/api#message) is returned.
   * @see https://core.telegram.org/bots/api#sendcontact
   * @param {string|number} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {string} phoneNumber Contact's phone number
   * @param {string} firstName Contact's first name
   * @param {object} [extra]
   * @return {Promise}
   */
  sendContact (chatId, phoneNumber, firstName, extra) {
    return this.callApi('sendContact', { chat_id: chatId, phone_number: phoneNumber, first_name: firstName, ...extra })
  }

  /**
   * Use this method to send photos. On success, the sent
   * [Message](https://core.telegram.org/bots/api#message) is returned.
   * @see https://core.telegram.org/bots/api#sendphoto
   * @param chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {attachmentFile} photo Photo to send. Pass a file_id as String to send a photo that exists on the
   *    Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a photo from the Internet,
   *    or upload a new photo using multipart/form-data.
   *    The photo must be at most 10 MB in size.
   *    The photo's width and height must not exceed 10000 in total.
   *    Width and height ratio must be at most 20.
   *    [More information on Sending Files »](https://core.telegram.org/bots/api#sending-files)
   * @param {object} [extra]
   * @return {Promise}
   */
  sendPhoto (chatId, photo, extra) {
    return this.callApi('sendPhoto', { chat_id: chatId, photo, ...extra })
  }

  /**
   * Use this method to send an animated emoji that will display a random value. On success, the sent
   * [Message](https://core.telegram.org/bots/api#message) is returned.
   * @see https://core.telegram.org/bots/api#sendphoto
   * @param chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {object} [extra]
   * @return {Promise}
   */
  sendDice (chatId, extra) {
    return this.callApi('sendDice', { chat_id: chatId, ...extra })
  }

  /**
   * Use this method to send general files. On success, the sent
   * [Message](https://core.telegram.org/bots/api#message) is returned.
   * Bots can currently send files of any type of up to 50 MB in size, this limit may be changed in the future.
   * @see https://core.telegram.org/bots/api#senddocument
   * @param {string|number} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {Buffer|stream|string} document Document to send. Pass a file_id as String to send a document that exists
   *    on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a photo from the Internet,
   *    or upload a new photo using multipart/form-data.
   *    [More information on Sending Files »](https://core.telegram.org/bots/api#sending-files)
   * @param {object} [extra]
   * @return {Promise<Message>}
   */
  sendDocument (chatId, document, extra) {
    return this.callApi('sendDocument', { chat_id: chatId, document, ...extra })
  }

  /**
   * Use this method to send audio files, if you want Telegram clients to display them in the music player.
   * Your audio must be in the `.MP3` or `.M4A` format. On success, the sent
   * [Message](https://core.telegram.org/bots/api#message) is returned.
   * Bots can currently send audio files of up to 50 MB in size, this limit may be changed in the future.
   *
   * For sending voice messages, use the {@link Telegram#sendVoice} method instead.
   * @see https://core.telegram.org/bots/api#sendaudio
   * @param chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param audio Audio file to send. Pass a file_id as String to send an audio file that exists on the Telegram
   *    servers (recommended), pass an HTTP URL as a String for Telegram to get an audio file from the Internet,
   *    or upload a new one using multipart/form-data.
   *    [More information on Sending Files »](https://core.telegram.org/bots/api#sending-files)
   * @param {object} [extra]
   * @return {Promise}
   */
  sendAudio (chatId, audio, extra) {
    return this.callApi('sendAudio', { chat_id: chatId, audio, ...extra })
  }

  /**
   *
   * @param chatId
   * @param sticker
   * @param extra
   * @return {Promise}
   */
  sendSticker (chatId, sticker, extra) {
    return this.callApi('sendSticker', { chat_id: chatId, sticker, ...extra })
  }

  /**
   *
   * @param chatId
   * @param video
   * @param extra
   * @return {Promise}
   */
  sendVideo (chatId, video, extra) {
    return this.callApi('sendVideo', { chat_id: chatId, video, ...extra })
  }

  /**
   *
   * @param chatId
   * @param animation
   * @param extra
   * @return {Promise}
   */
  sendAnimation (chatId, animation, extra) {
    return this.callApi('sendAnimation', { chat_id: chatId, animation, ...extra })
  }

  /**
   *
   * @param chatId
   * @param videoNote
   * @param extra
   * @return {Promise}
   */
  sendVideoNote (chatId, videoNote, extra) {
    return this.callApi('sendVideoNote', { chat_id: chatId, video_note: videoNote, ...extra })
  }

  /**
   *
   * @param chatId
   * @param voice
   * @param extra
   * @return {Promise}
   */
  sendVoice (chatId, voice, extra) {
    return this.callApi('sendVoice', { chat_id: chatId, voice, ...extra })
  }

  /**
   *
   * @param chatId
   * @param gameName
   * @param extra
   * @return {Promise}
   */
  sendGame (chatId, gameName, extra) {
    return this.callApi('sendGame', { chat_id: chatId, game_short_name: gameName, ...extra })
  }

  /**
   *
   * @param chatId
   * @param media
   * @param extra
   * @return {Promise}
   */
  sendMediaGroup (chatId, media, extra) {
    return this.callApi('sendMediaGroup', { chat_id: chatId, media, ...extra })
  }

  /**
   *
   * @param chatId
   * @param question
   * @param options
   * @param extra
   * @return {Promise}
   */
  sendPoll (chatId, question, options, extra) {
    return this.callApi('sendPoll', { chat_id: chatId, type: 'regular', question, options, ...extra })
  }

  /**
   *
   * @param chatId
   * @param question
   * @param options
   * @param extra
   * @return {Promise}
   */
  sendQuiz (chatId, question, options, extra) {
    return this.callApi('sendPoll', { chat_id: chatId, type: 'quiz', question, options, ...extra })
  }

  /**
   *
   * @param chatId
   * @param messageId
   * @param extra
   * @return {Promise}
   */
  stopPoll (chatId, messageId, extra) {
    return this.callApi('stopPoll', { chat_id: chatId, message_id: messageId, ...extra })
  }

  /**
   *
   * @param chatId
   * @return {Promise}
   */
  getChat (chatId) {
    return this.callApi('getChat', { chat_id: chatId })
  }

  /**
   *
   * @param chatId
   * @return {Promise}
   */
  getChatAdministrators (chatId) {
    return this.callApi('getChatAdministrators', { chat_id: chatId })
  }

  /**
   *
   * @param chatId
   * @param userId
   * @return {Promise}
   */
  getChatMember (chatId, userId) {
    return this.callApi('getChatMember', { chat_id: chatId, user_id: userId })
  }

  /**
   *
   * @param chatId
   * @return {Promise}
   */
  getChatMembersCount (chatId) {
    return this.callApi('getChatMemberCount', { chat_id: chatId })
  }

  /**
   *
   * @param chatId
   * @return {Promise}
   */
  getChatMemberCount (chatId) {
    return this.callApi('getChatMemberCount', { chat_id: chatId })
  }

  /**
   *
   * @param inlineQueryId
   * @param results
   * @param extra
   * @return {Promise}
   */
  answerInlineQuery (inlineQueryId, results, extra) {
    return this.callApi('answerInlineQuery', { inline_query_id: inlineQueryId, results, ...extra })
  }

  /**
   *
   * @param chatId
   * @param permissions
   * @return {Promise}
   */
  setChatPermissions (chatId, permissions) {
    return this.callApi('setChatPermissions', { chat_id: chatId, permissions })
  }

  /**
   *
   * @param chatId
   * @param userId
   * @param extra
   * @return {Promise}
   */
  banChatMember (chatId, userId, extra) {
    return this.callApi('banChatMember', { chat_id: chatId, user_id: userId, ...extra })
  }

  /**
   *
   * @param chatId
   * @param userId
   * @param untilDate
   * @param extra
   * @return {Promise}
   */
  kickChatMember (chatId, userId, untilDate, extra) {
    return this.callApi('banChatMember', { chat_id: chatId, user_id: userId, until_date: untilDate, ...extra })
  }

  /**
   *
   * @param chatId
   * @param userId
   * @param extra
   * @return {Promise}
   */
  promoteChatMember (chatId, userId, extra) {
    return this.callApi('promoteChatMember', { chat_id: chatId, user_id: userId, ...extra })
  }

  /**
   *
   * @param chatId
   * @param userId
   * @param extra
   * @return {Promise}
   */
  restrictChatMember (chatId, userId, extra) {
    return this.callApi('restrictChatMember', { chat_id: chatId, user_id: userId, ...extra })
  }

  /**
   *
   * @param chatId
   * @param senderChatId
   * @return {Promise}
   */
  banChatSenderChat (chatId, senderChatId) {
    return this.callApi('banChatSenderChat', { chat_id: chatId, sender_chat_id: senderChatId })
  }

  /**
   *
   * @param chatId
   * @param senderChatId
   * @return {Promise}
   */
  unbanChatSenderChat (chatId, senderChatId) {
    return this.callApi('unbanChatSenderChat', { chat_id: chatId, sender_chat_id: senderChatId })
  }

  /**
   *
   * @param chatId
   * @param userId
   * @param title
   * @return {Promise}
   */
  setChatAdministratorCustomTitle (chatId, userId, title) {
    return this.callApi('setChatAdministratorCustomTitle', { chat_id: chatId, user_id: userId, custom_title: title })
  }

  /**
   *
   * @param chatId
   * @return {Promise}
   */
  exportChatInviteLink (chatId) {
    return this.callApi('exportChatInviteLink', { chat_id: chatId })
  }

  /**
   *
   * @param chatId
   * @param photo
   * @return {Promise}
   */
  setChatPhoto (chatId, photo) {
    return this.callApi('setChatPhoto', { chat_id: chatId, photo })
  }

  /**
   *
   * @param chatId
   * @return {Promise}
   */
  deleteChatPhoto (chatId) {
    return this.callApi('deleteChatPhoto', { chat_id: chatId })
  }

  /**
   *
   * @param chatId
   * @param title
   * @return {Promise}
   */
  setChatTitle (chatId, title) {
    return this.callApi('setChatTitle', { chat_id: chatId, title })
  }

  /**
   *
   * @param chatId
   * @param description
   * @return {Promise}
   */
  setChatDescription (chatId, description) {
    return this.callApi('setChatDescription', { chat_id: chatId, description })
  }

  /**
   *
   * @param chatId
   * @param messageId
   * @param extra
   * @return {Promise}
   */
  pinChatMessage (chatId, messageId, extra) {
    return this.callApi('pinChatMessage', { chat_id: chatId, message_id: messageId, ...extra })
  }

  /**
   *
   * @param chatId
   * @param extra
   * @return {Promise}
   */
  unpinChatMessage (chatId, extra) {
    return this.callApi('unpinChatMessage', { chat_id: chatId, ...extra })
  }

  /**
   *
   * @param chatId
   * @return {Promise}
   */
  unpinAllChatMessages (chatId) {
    return this.callApi('unpinAllChatMessages', { chat_id: chatId })
  }

  /**
   *
   * @param chatId
   * @return {Promise}
   */
  getChatMenuButton (chatId) {
    return this.callApi('getChatMenuButton', { chat_id: chatId })
  }

  /**
   *
   * @param chatId
   * @param menuButton
   * @return {Promise}
   */
  setChatMenuButton (chatId, menuButton) {
    return this.callApi('setChatMenuButton', { chat_id: chatId, menu_button: menuButton })
  }

  /**
   *
   * @param rights
   * @param forChannels
   * @return {Promise}
   */
  setMyDefaultAdministratorRights (rights, forChannels) {
    return this.callApi('setMyDefaultAdministratorRights', { rights, for_channels: forChannels })
  }

  /**
   *
   * @param forChannels
   * @return {Promise}
   */
  getMyDefaultAdministratorRights (forChannels) {
    return this.callApi('getMyDefaultAdministratorRights', { for_channels: forChannels })
  }

  /**
   *
   * @param chatId
   * @return {Promise}
   */
  leaveChat (chatId) {
    return this.callApi('leaveChat', { chat_id: chatId })
  }

  /**
   *
   * @param chatId
   * @param userId
   * @param extra
   * @return {Promise}
   */
  unbanChatMember (chatId, userId, extra) {
    return this.callApi('unbanChatMember', { chat_id: chatId, user_id: userId, ...extra })
  }

  /**
   *
   * @param callbackQueryId
   * @param text
   * @param showAlert
   * @param extra
   * @return {Promise}
   */
  answerCbQuery (callbackQueryId, text, showAlert, extra) {
    return this.callApi('answerCallbackQuery', {
      text,
      show_alert: showAlert,
      callback_query_id: callbackQueryId,
      ...extra
    })
  }

  /**
   *
   * @param callbackQueryId
   * @param url
   * @return {Promise}
   */
  answerGameQuery (callbackQueryId, url) {
    return this.callApi('answerCallbackQuery', {
      url,
      callback_query_id: callbackQueryId
    })
  }

  /**
   *
   * @param shippingQueryId
   * @param ok
   * @param shippingOptions
   * @param errorMessage
   * @return {Promise}
   */
  answerShippingQuery (shippingQueryId, ok, shippingOptions, errorMessage) {
    return this.callApi('answerShippingQuery', {
      ok,
      shipping_query_id: shippingQueryId,
      shipping_options: shippingOptions,
      error_message: errorMessage
    })
  }

  /**
   *
   * @param preCheckoutQueryId
   * @param ok
   * @param errorMessage
   * @return {Promise}
   */
  answerPreCheckoutQuery (preCheckoutQueryId, ok, errorMessage) {
    return this.callApi('answerPreCheckoutQuery', {
      ok,
      pre_checkout_query_id: preCheckoutQueryId,
      error_message: errorMessage
    })
  }

  /**
   *
   * @param chatId
   * @param messageId
   * @param inlineMessageId
   * @param text
   * @param extra
   * @return {Promise}
   */
  editMessageText (chatId, messageId, inlineMessageId, text, extra) {
    return this.callApi('editMessageText', {
      text,
      chat_id: chatId,
      message_id: messageId,
      inline_message_id: inlineMessageId,
      ...extra
    })
  }

  /**
   *
   * @param chatId
   * @param messageId
   * @param inlineMessageId
   * @param caption
   * @param extra
   * @return {Promise}
   */
  editMessageCaption (chatId, messageId, inlineMessageId, caption, extra) {
    return this.callApi('editMessageCaption', {
      caption,
      chat_id: chatId,
      message_id: messageId,
      inline_message_id: inlineMessageId,
      ...extra
    })
  }

  /**
   *
   * @param chatId
   * @param messageId
   * @param inlineMessageId
   * @param media
   * @param extra
   * @return {Promise}
   */
  editMessageMedia (chatId, messageId, inlineMessageId, media, extra = {}) {
    return this.callApi('editMessageMedia', {
      chat_id: chatId,
      message_id: messageId,
      inline_message_id: inlineMessageId,
      media: {
        ...media,
        parse_mode: extra.parse_mode,
        caption: extra.caption,
        caption_entities: extra.caption_entities
      },
      reply_markup: extra.reply_markup
    })
  }

  /**
   *
   * @param chatId
   * @param messageId
   * @param inlineMessageId
   * @param extra
   * @return {Promise}
   */
  editMessageReplyMarkup (chatId, messageId, inlineMessageId, extra) {
    return this.callApi('editMessageReplyMarkup', {
      chat_id: chatId,
      message_id: messageId,
      inline_message_id: inlineMessageId,
      ...extra
    })
  }

  /**
   *
   * @param chatId
   * @param messageId
   * @param inlineMessageId
   * @param latitude
   * @param longitude
   * @param extra
   * @return {Promise}
   */
  editMessageLiveLocation (chatId, messageId, inlineMessageId, latitude, longitude, extra) {
    return this.callApi('editMessageLiveLocation', {
      chat_id: chatId,
      message_id: messageId,
      inline_message_id: inlineMessageId,
      latitude,
      longitude,
      ...extra
    })
  }

  /**
   *
   * @param chatId
   * @param messageId
   * @param inlineMessageId
   * @param extra
   * @return {Promise}
   */
  stopMessageLiveLocation (chatId, messageId, inlineMessageId, extra) {
    return this.callApi('stopMessageLiveLocation', {
      chat_id: chatId,
      message_id: messageId,
      inline_message_id: inlineMessageId,
      ...extra
    })
  }

  /**
   *
   * @param chatId
   * @param messageId
   * @return {Promise}
   */
  deleteMessage (chatId, messageId) {
    return this.callApi('deleteMessage', {
      chat_id: chatId,
      message_id: messageId
    })
  }

  setChatStickerSet (chatId, setName) {
    return this.callApi('setChatStickerSet', {
      chat_id: chatId,
      sticker_set_name: setName
    })
  }

  /**
   *
   * @param chatId
   * @return {Promise}
   */
  deleteChatStickerSet (chatId) {
    return this.callApi('deleteChatStickerSet', { chat_id: chatId })
  }

  /**
   *
   * @param name
   * @return {Promise}
   */
  getStickerSet (name) {
    return this.callApi('getStickerSet', { name })
  }

  /**
   *
   * @param ownerId
   * @param stickerFile
   * @return {Promise}
   */
  uploadStickerFile (ownerId, stickerFile) {
    return this.callApi('uploadStickerFile', {
      user_id: ownerId,
      png_sticker: stickerFile
    })
  }

  /**
   *
   * @param ownerId
   * @param name
   * @param title
   * @param stickerData
   * @return {Promise}
   */
  createNewStickerSet (ownerId, name, title, stickerData) {
    return this.callApi('createNewStickerSet', {
      name,
      title,
      user_id: ownerId,
      ...stickerData
    })
  }

  /**
   *
   * @param ownerId
   * @param name
   * @param stickerData
   * @param isMasks
   * @return {Promise}
   */
  addStickerToSet (ownerId, name, stickerData, isMasks) {
    return this.callApi('addStickerToSet', {
      name,
      user_id: ownerId,
      is_masks: isMasks,
      ...stickerData
    })
  }

  /**
   *
   * @param sticker
   * @param position
   * @return {Promise}
   */
  setStickerPositionInSet (sticker, position) {
    return this.callApi('setStickerPositionInSet', {
      sticker,
      position
    })
  }

  /**
   *
   * @param name
   * @param userId
   * @param thumb
   * @return {Promise}
   */
  setStickerSetThumb (name, userId, thumb) {
    return this.callApi('setStickerSetThumb', { name, user_id: userId, thumb })
  }

  /**
   *
   * @param sticker
   * @return {Promise}
   */
  deleteStickerFromSet (sticker) {
    return this.callApi('deleteStickerFromSet', { sticker })
  }

  /**
   *
   * @param extra
   * @return {Promise}
   */
  getMyCommands (extra) {
    return this.callApi('getMyCommands', extra)
  }

  /**
   *
   * @param commands
   * @param extra
   * @return {Promise}
   */
  setMyCommands (commands, extra) {
    return this.callApi('setMyCommands', { commands, ...extra })
  }

  /**
   *
   * @param extra
   * @return {Promise}
   */
  deleteMyCommands (extra) {
    return this.callApi('deleteMyCommands', extra)
  }

  /**
   *
   * @param userId
   * @param errors
   * @return {Promise}
   */
  setPassportDataErrors (userId, errors) {
    return this.callApi('setPassportDataErrors', {
      user_id: userId,
      errors
    })
  }

  /**
   *
   * @param chatId
   * @param message
   * @param extra
   * @return {Promise}
   */
  sendCopy (chatId, message, extra) {
    if (!message) {
      throw new Error('Message is required')
    }
    if (message.chat && message.chat.id && message.message_id) {
      return this.copyMessage(chatId, message.chat.id, message.message_id, extra)
    }
    const type = Object.keys(replicators.copyMethods).find((type) => message[type])
    if (!type) {
      throw new Error('Unsupported message type')
    }
    const opts = {
      chat_id: chatId,
      ...replicators[type](message),
      ...extra
    }
    return this.callApi(replicators.copyMethods[type], opts)
  }

  /**
   *
   * @param chatId
   * @param fromChatId
   * @param messageId
   * @param extra
   * @return {Promise}
   */
  copyMessage (chatId, fromChatId, messageId, extra) {
    return this.callApi('copyMessage', {
      chat_id: chatId,
      from_chat_id: fromChatId,
      message_id: messageId,
      ...extra
    })
  }

  /**
   *
   * @param chatId
   * @param extra
   * @return {Promise}
   */
  createChatInviteLink (chatId, extra) {
    return this.callApi('createChatInviteLink', {
      chat_id: chatId,
      ...extra
    })
  }

  /**
   *
   * @param chatId
   * @param inviteLink
   * @param extra
   * @return {Promise}
   */
  editChatInviteLink (chatId, inviteLink, extra) {
    return this.callApi('editChatInviteLink', {
      chat_id: chatId,
      invite_link: inviteLink,
      ...extra
    })
  }

  /**
   *
   * @param chatId
   * @param inviteLink
   * @return {Promise}
   */
  revokeChatInviteLink (chatId, inviteLink) {
    return this.callApi('revokeChatInviteLink', {
      chat_id: chatId,
      invite_link: inviteLink
    })
  }

  /**
   *
   * @param chatId
   * @param userId
   * @return {Promise}
   */
  approveChatJoinRequest (chatId, userId) {
    return this.callApi('approveChatJoinRequest', {
      chat_id: chatId,
      user_id: userId
    })
  }

  /**
   *
   * @param chatId
   * @param userId
   * @return {Promise}
   */
  declineChatJoinRequest (chatId, userId) {
    return this.callApi('declineChatJoinRequest', {
      chat_id: chatId,
      user_id: userId
    })
  }
}

module.exports = Telegram

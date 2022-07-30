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
   * @throws {TelegramError}
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
   * @throws {TelegramError}
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
   * @throws {TelegramError}
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
   * @throws {TelegramError}
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
   * @throws {TelegramError}
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
   * @throws {TelegramError}
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
   * @throws {TelegramError}
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
   * In case of an unsuccessful request, we will give up after a reasonable amount of attempts.
   * Returns `True` on success.
   *
   * If you'd like to make sure that the webhook was set by you, you can specify secret data in the parameter
   * `secret_token`. If specified, the request will contain a header `X-Telegram-Bot-Api-Secret-Token` with
   * the secret token as content.
   * @see https://core.telegram.org/bots/api#setwebhook
   * @param {string} url HTTPS URL to send updates to. Use an empty string to remove webhook integration
   * @param {setWebhookExtra} [extra]
   * @throws {TelegramError}
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
   * @throws {TelegramError}
   * @return {Promise<boolean>}
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
   * @param {MessageExtraParams|Extra} extra Extra params
   * @throws {TelegramError}
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
   * @param {forwardExtraParams|Extra} [extra]
   * @throws {TelegramError}
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
   * @throws {TelegramError}
   * @return {Promise<boolean>}
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
   * @throws {TelegramError}
   * @return {Promise<UserProfilePhotos>}
   */
  getUserProfilePhotos (userId, offset, limit) {
    return this.callApi('getUserProfilePhotos', { user_id: userId, offset, limit })
  }

  /**
   * Use this method to send point on the map. On success, the sent
   * [Message](https://core.telegram.org/bots/api#message) is returned.
   * @settps://core.telegram.org/bots/api#sendlocation
      *@param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {number} latitude Latitude of the location
   * @param {number} longitude Longitude of the location
   * @param {object|Extra} [extra]
   * @throws {TelegramError}
   * @return {Promise}
   */
  sendLocation (chatId, latitude, longitude, extra) {
    return this.callApi('sendLocation', { chat_id: chatId, latitude, longitude, ...extra })
  }

  /**
   * Use this method to send information about a venue. On success, the sent
   * [Message](https://core.telegram.org/bots/api#message) is returned.
   * @settps://core.telegram.org/bots/api#sendvenue
      *@param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {number} latitude Latitude of the venue
   * @param {number} longitude Longitude of the venue
   * @param {string} title Name of the venue
   * @param {string} address Address of the venue
   * @param {object|Extra} [extra]
   * @throws {TelegramError}
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
   * @param {object|Extra} [extra]
   * @throws {TelegramError}
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
   * @param {object|Extra} [extra]
   * @throws {TelegramError}
   * @return {Promise}
   */
  sendContact (chatId, phoneNumber, firstName, extra) {
    return this.callApi('sendContact', { chat_id: chatId, phone_number: phoneNumber, first_name: firstName, ...extra })
  }

  /**
   * Use this method to send photos. On success, the sent
   * [Message](https://core.telegram.org/bots/api#message) is returned.
   * @see https://core.telegram.org/bots/api#sendphoto
   * @param {string|number} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {attachmentFile} photo Photo to send. Pass a `file_id` as String to send a photo that exists on the
   *    Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a photo from the Internet,
   *    or upload a new photo using multipart/form-data.
   *    The photo must be at most 10 MB in size.
   *    The photo's width and height must not exceed 10000 in total.
   *    Width and height ratio must be at most 20.
   *    [More information on Sending Files »](https://core.telegram.org/bots/api#sending-files)
   * @param {object|Extra} [extra]
   * @throws {TelegramError}
   * @return {Promise}
   */
  sendPhoto (chatId, photo, extra) {
    return this.callApi('sendPhoto', { chat_id: chatId, photo, ...extra })
  }

  /**
   * Use this method to send an animated emoji that will display a random value. On success, the sent
   * [Message](https://core.telegram.org/bots/api#message) is returned.
   * @see https://core.telegram.org/bots/api#sendphoto
   * @param {string|number} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {object|Extra} [extra]
   * @throws {TelegramError}
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
   * @param {attachmentFile} document Document to send. Pass a `file_id` as String to send a document that exists
   *    on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a photo from the Internet,
   *    or upload a new photo using multipart/form-data.
   *    [More information on Sending Files »](https://core.telegram.org/bots/api#sending-files)
   * @param {object|Extra} [extra]
   * @throws {TelegramError}
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
   * @param  {string|number} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {attachmentFile} audio Audio file to send. Pass a `file_id` as String to send an audio file that exists on the Telegram
   *    servers (recommended), pass an HTTP URL as a String for Telegram to get an audio file from the Internet,
   *    or upload a new one using multipart/form-data.
   *    [More information on Sending Files »](https://core.telegram.org/bots/api#sending-files)
   * @param {object|Extra} [extra]
   * @throws {TelegramError}
   * @return {Promise<Message>}
   */
  sendAudio (chatId, audio, extra) {
    return this.callApi('sendAudio', { chat_id: chatId, audio, ...extra })
  }

  /**
   * Use this method to send static `.WEBP`, animated `.TGS`, or video `.WEBM` stickers. On success, the sent {@link Message} is returned.
   * @see https://core.telegram.org/bots/api#sendsticker
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {attachmentFile} sticker Sticker to send. Pass a `file_id` as String to send a file that exists on
   *    the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a .WEBP file from the
   *    Internet, or upload a new one using multipart/form-data.
   *    [More information on Sending Files »](https://core.telegram.org/bots/api#sending-files)
   * @param {stickerExtraParams|Extra} [extra]
   * @throws {TelegramError}
   * @return {Promise<Message>}
   */
  sendSticker (chatId, sticker, extra) {
    return this.callApi('sendSticker', { chat_id: chatId, sticker, ...extra })
  }

  /**
   * Use this method to send video files, Telegram clients support MPEG4 videos (other formats may
   * be sent as {@link Document}). On success, the sent {@link Message} is returned. Bots can currently send video
   * files of up to 50 MB in size, this limit may be changed in the future.
   * @see https://core.telegram.org/bots/api#sendvideo
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {attachmentFile} video Video to send. Pass a `file_id` as String to send a video that
   *    exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get
   *    a video from the Internet, or upload a new video using multipart/form-data.
   *    [More information on Sending Files »](https://core.telegram.org/bots/api#sending-files)
   * @param {object|Extra} [extra]
   * @throws {TelegramError}
   * @return {Promise<Message>}
   */
  sendVideo (chatId, video, extra) {
    return this.callApi('sendVideo', { chat_id: chatId, video, ...extra })
  }

  /**
   * Use this method to send animation files (GIF or H.264/MPEG-4 AVC video without sound). On success,
   * the sent {@link Message} is returned. Bots can currently send animation files of up to 50 MB in size,
   * this limit may be changed in the future.
   * @see https://core.telegram.org/bots/api#sendanimation
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {attachmentFile} animation Animation to send. Pass a `file_id` as String to send an animation that exists
   *    on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get an animation from
   *    the Internet, or upload a new animation using multipart/form-data.
   *    [More information on Sending Files »](https://core.telegram.org/bots/api#sending-files)
   * @param {object|Extra} [extra]
   * @throws {TelegramError}
   * @return {Promise<Message>}
   */
  sendAnimation (chatId, animation, extra) {
    return this.callApi('sendAnimation', { chat_id: chatId, animation, ...extra })
  }

  /**
   * As of [v.4.0](https://telegram.org/blog/video-messages-and-telescope), Telegram clients support rounded square
   * MPEG4 videos of up to 1 minute long.
   * Use this method to send video messages. On success, the sent Message is returned.
   * @see https://core.telegram.org/bots/api#sendvideonote
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {attachmentFile} videoNote Video note to send. Pass a `file_id` as String to send a video note that exists on
   *    the Telegram servers (recommended) or upload a new video using multipart/form-data.
   *    [More information on Sending Files »](https://core.telegram.org/bots/api#sending-files).
   *    Sending video notes by a URL is currently unsupported
   * @param {object|Extra} [extra]
   * @throws {TelegramError}
   * @return {Promise<Message>}
   */
  sendVideoNote (chatId, videoNote, extra) {
    return this.callApi('sendVideoNote', { chat_id: chatId, video_note: videoNote, ...extra })
  }

  /**
   * Use this method to send audio files, if you want Telegram clients to display the file as a playable voice message.
   * For this to work, your audio must be in an .OGG file encoded
   * with OPUS (other formats may be sent as {@link Audio} or {@link Document}). On success, the sent {@link Message}
   * is returned.
   * Bots can currently send voice messages of up to 50 MB in size, this limit may be changed in the future.
   * @see https://core.telegram.org/bots/api#sendvoice
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {attachmentFile} voice Audio file to send. Pass a file_id as String to send a file that exists on the
   *    Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a file from the Internet,
   *    or upload a new one using multipart/form-data.
   * @param {object|Extra} [extra]
   * @throws {TelegramError}
   * @return {Promise<Message>}
   */
  sendVoice (chatId, voice, extra) {
    return this.callApi('sendVoice', { chat_id: chatId, voice, ...extra })
  }

  /**
   * Use this method to send a game. On success, the sent {@link Message} is returned.
   * @see https://core.telegram.org/bots/api#sendgame
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {string} gameName Short name of the game, serves as the unique identifier for the game.
   *    Set up your games via @BotFather.
   * @param {object|Extra} [extra]
   * @throws {TelegramError}
   * @return {Promise<Message>}
   */
  sendGame (chatId, gameName, extra) {
    return this.callApi('sendGame', { chat_id: chatId, game_short_name: gameName, ...extra })
  }

  /**
   * Use this method to send a group of photos, videos, documents or audios as an album. Documents and audio files
   * can be only grouped in an album with messages of the same type. On success, an array of {@link Message Messages}
   * that were sent is returned.
   * @see https://core.telegram.org/bots/api#sendmediagroup
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {array<InputMediaPhoto|InputMediaAudio|InputMediaVideo|InputMediaDocument>} media A array describing
   *    messages to be sent, must include 2-10 items
   * @param {object|Extra} [extra]
   * @throws {TelegramError}
   * @return {Promise<Message>}
   */
  sendMediaGroup (chatId, media, extra) {
    return this.callApi('sendMediaGroup', { chat_id: chatId, media, ...extra })
  }

  /**
   * Use this method to send a native poll with type `regular`. On success, the sent {@link Message} is returned.
   * @see https://core.telegram.org/bots/api#sendpoll
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {string} question Poll question, 1-300 characters
   * @param {string[]} options List of answer options, 2-10 strings 1-100 characters each
   * @param {object|Extra} [extra]
   * @throws {TelegramError}
   * @return {Promise<Poll>}
   */
  sendPoll (chatId, question, options, extra) {
    return this.callApi('sendPoll', { chat_id: chatId, type: 'regular', question, options, ...extra })
  }

  /**
   * Use this method to send a native poll with type `quiz`. On success, the sent {@link Message} is returned.
   * @see https://core.telegram.org/bots/api#sendpoll
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {string} question Poll question, 1-300 characters
   * @param {string[]} options List of answer options, 2-10 strings 1-100 characters each
   * @param {object|Extra} [extra]
   * @throws {TelegramError}
   * @return {Promise<Poll>}
   */
  sendQuiz (chatId, question, options, extra) {
    return this.callApi('sendPoll', { chat_id: chatId, type: 'quiz', question, options, ...extra })
  }

  /**
   * Use this method to stop a poll which was sent by the bot. On success, the stopped {@link Poll} is returned.
   * @see https://core.telegram.org/bots/api#stoppoll
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param messageId Identifier of the original message with the poll
   * @param {object|Extra} [extra]
   * @throws {TelegramError}
   * @return {Promise<Poll>}
   */
  stopPoll (chatId, messageId, extra) {
    return this.callApi('stopPoll', { chat_id: chatId, message_id: messageId, ...extra })
  }

  /**
   * Use this method to get up to date information about the chat (current name of the user for one-on-one
   * conversations, current username of a user, group or channel, etc.). Returns a {@link Chat} object on success.
   * @see https://core.telegram.org/bots/api#getchat
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @throws {TelegramError}
   * @return {Promise<Chat>}
   */
  getChat (chatId) {
    return this.callApi('getChat', { chat_id: chatId })
  }

  /**
   * Use this method to get a list of administrators in a chat. On success, returns an Array of {@link ChatMember}
   * objects that contains information about all chat administrators except other bots. If the chat is a group
   * or a supergroup and no administrators were appointed, only the creator will be returned.
   * @see https://core.telegram.org/bots/api#getchatadministrators
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @throws {TelegramError}
   * @return {Promise<ChatMember[]>}
   */
  getChatAdministrators (chatId) {
    return this.callApi('getChatAdministrators', { chat_id: chatId })
  }

  /**
   * Use this method to get information about a member of a chat. Returns a {@link ChatMember} object on success.
   * @see https://core.telegram.org/bots/api#getchatmember
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param userId Unique identifier of the target user
   * @throws {TelegramError}
   * @return {Promise<ChatMember>}
   */
  getChatMember (chatId, userId) {
    return this.callApi('getChatMember', { chat_id: chatId, user_id: userId })
  }

  /**
   * Use this method to get the number of members in a chat. Returns `Int` on success.
   * @see https://core.telegram.org/bots/api#getchatmembercount
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @deprecated Use {@link getChatMemberCount}
   * @throws {TelegramError}
   * @return {Promise<number>}
   */
  getChatMembersCount (chatId) {
    return this.callApi('getChatMemberCount', { chat_id: chatId })
  }

  /**
   * Use this method to get the number of members in a chat. Returns `Int` on success.
   * @see https://core.telegram.org/bots/api#getchatmembercount
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @throws {TelegramError}
   * @return {Promise<number>}
   */
  getChatMemberCount (chatId) {
    return this.callApi('getChatMemberCount', { chat_id: chatId })
  }

  /**
   * Use this method to send answers to an inline query. On success, True is returned.
   * No more than **50** results per query are allowed.
   * @see https://core.telegram.org/bots/api#answerinlinequery
   * @param {string} inlineQueryId Unique identifier for the answered query
   * @param {InlineQueryResult[]} results A array of results for the inline query
   * @param {object|Extra} [extra]
   * @throws {TelegramError}
   * @return {Promise<boolean>}
   */
  answerInlineQuery (inlineQueryId, results, extra) {
    return this.callApi('answerInlineQuery', { inline_query_id: inlineQueryId, results, ...extra })
  }

  /**
   * Use this method to set default chat permissions for all members. The bot must be an administrator in the group
   * or a supergroup for this to work and must have the `can_restrict_members` administrator rights.
   * Returns `True` on success.
   * @see https://core.telegram.org/bots/api#setchatpermissions
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {ChatPermissions} permissions A object for new default chat permissions
   * @throws {TelegramError}
   * @return {Promise<true>}
   */
  setChatPermissions (chatId, permissions) {
    return this.callApi('setChatPermissions', { chat_id: chatId, permissions })
  }

  /**
   * Use this method to ban a user in a group, a supergroup or a channel. In the case of supergroups and channels,
   * the user will not be able to return to the chat on their own using invite links, etc.,
   * unless {@link unbanChatMember unbanned} first.
   * The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights.
   * Returns True on success.
   * @see https://core.telegram.org/bots/api#banchatmember
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param userId Unique identifier of the target user
   * @param {object|Extra} [extra]
   * @throws {TelegramError}
   * @return {Promise<boolean>}
   */
  banChatMember (chatId, userId, extra) {
    return this.callApi('banChatMember', { chat_id: chatId, user_id: userId, ...extra })
  }

  /**
   * Alias to {@link banChatMember}
   * @see https://core.telegram.org/bots/api#banchatmember
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param userId
   * @param untilDate
   * @param {object} [extra]
   * @throws {TelegramError}
   * @return {Promise}
   */
  kickChatMember (chatId, userId, untilDate, extra) {
    return this.callApi('banChatMember', { chat_id: chatId, user_id: userId, until_date: untilDate, ...extra })
  }

  /**
   * Use this method to promote or demote a user in a supergroup or a channel. The bot must be an administrator
   * in the chat for this to work and must have the appropriate administrator rights. Pass `False` for all boolean
   * parameters to demote a user. Returns `True` on success.
   * @see https://core.telegram.org/bots/api#promotechatmember
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param userId
   * @param {object} [extra]
   * @throws {TelegramError}
   * @return {Promise<boolean>}
   */
  promoteChatMember (chatId, userId, extra) {
    return this.callApi('promoteChatMember', { chat_id: chatId, user_id: userId, ...extra })
  }

  /**
   * Use this method to restrict a user in a supergroup. The bot must be an administrator in the supergroup
   * for this to work and must have the appropriate administrator rights. Pass True for all permissions to lift
   * restrictions from a user. Returns `True` on success.
   * @see https://core.telegram.org/bots/api#restrictchatmember
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param userId
   * @param {object} [extra]
   * @throws {TelegramError}
   * @return {Promise<boolean>}
   */
  restrictChatMember (chatId, userId, extra) {
    return this.callApi('restrictChatMember', { chat_id: chatId, user_id: userId, ...extra })
  }

  /**
   * Use this method to ban a channel chat in a supergroup or a channel. Until the chat is
   * {@link unbanChatMember unbanned}, the owner of the banned chat won't be able to send messages on behalf
   * of any of their channels. The bot must be an administrator in the supergroup or channel for this
   * to work and must have the appropriate administrator rights.
   * Returns `True` on success.
   * @see https://core.telegram.org/bots/api#banchatsenderchat
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param senderChatId
   * @throws {TelegramError}
   * @return {Promise<boolean>}
   */
  banChatSenderChat (chatId, senderChatId) {
    return this.callApi('banChatSenderChat', { chat_id: chatId, sender_chat_id: senderChatId })
  }

  /**
   * Use this method to unban a previously banned channel chat in a supergroup or channel.
   * The bot must be an administrator for this to work and must have the appropriate administrator rights.
   * Returns `True` on success.
   * @see https://core.telegram.org/bots/api#unbanchatsenderchat
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param senderChatId
   * @throws {TelegramError}
   * @return {Promise<boolean>}
   */
  unbanChatSenderChat (chatId, senderChatId) {
    return this.callApi('unbanChatSenderChat', { chat_id: chatId, sender_chat_id: senderChatId })
  }

  /**
   * Use this method to set a custom title for an administrator in a supergroup promoted by the bot.
   * Returns `True` on success.
   * @see https://core.telegram.org/bots/api#setchatadministratorcustomtitle
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param userId
   * @param title
   * @throws {TelegramError}
   * @return {Promise<boolean>}
   */
  setChatAdministratorCustomTitle (chatId, userId, title) {
    return this.callApi('setChatAdministratorCustomTitle', { chat_id: chatId, user_id: userId, custom_title: title })
  }

  /**
   * Use this method to generate a new primary invite link for a chat; any previously generated primary link
   * is revoked. The bot must be an administrator in the chat for this to work and must have the appropriate
   * administrator rights.
   * Returns the new invite link as `String` on success.
   * @see https://core.telegram.org/bots/api#exportchatinvitelink
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @throws {TelegramError}
   * @return {Promise}
   */
  exportChatInviteLink (chatId) {
    return this.callApi('exportChatInviteLink', { chat_id: chatId })
  }

  /**
   * Use this method to set a new profile photo for the chat. Photos can't be changed for private chats.
   * The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights.
   * Returns `True` on success.
   * @see https://core.telegram.org/bots/api#setchatphoto
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param photo
   * @throws {TelegramError}
   * @return {Promise<boolean>}
   */
  setChatPhoto (chatId, photo) {
    return this.callApi('setChatPhoto', { chat_id: chatId, photo })
  }

  /**
   * Use this method to delete a chat photo. Photos can't be changed for private chats. The bot must be an
   * administrator in the chat for this to work and must have the appropriate administrator rights.
   * Returns `True` on success.
   * @see https://core.telegram.org/bots/api#deletechatphoto
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @throws {TelegramError}
   * @return {Promise<boolean>}
   */
  deleteChatPhoto (chatId) {
    return this.callApi('deleteChatPhoto', { chat_id: chatId })
  }

  /**
   * Use this method to change the title of a chat. Titles can't be changed for private chats.
   * The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights.
   * Returns `True` on success.
   * @see https://core.telegram.org/bots/api#setchattitle
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param title
   * @throws {TelegramError}
   * @return {Promise<boolean>}
   */
  setChatTitle (chatId, title) {
    return this.callApi('setChatTitle', { chat_id: chatId, title })
  }

  /**
   * Use this method to change the description of a group, a supergroup or a channel.
   * The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights.
   * Returns `True` on success.
   * https://core.telegram.org/bots/api#setchatdescription
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param description
   * @throws {TelegramError}
   * @return {Promise<boolean>}
   */
  setChatDescription (chatId, description) {
    return this.callApi('setChatDescription', { chat_id: chatId, description })
  }

  /**
   * Use this method to add a message to the list of pinned messages in a chat. If the chat is not a private chat,
   * the bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' administrator
   * right in a supergroup or 'can_edit_messages' administrator right in a channel.
   * Returns `True` on success.
   * @see https://core.telegram.org/bots/api#pinchatmessage
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param messageId
   * @param {object} [extra]
   * @throws {TelegramError}
   * @return {Promise<boolean>}
   */
  pinChatMessage (chatId, messageId, extra) {
    return this.callApi('pinChatMessage', { chat_id: chatId, message_id: messageId, ...extra })
  }

  /**
   * Use this method to remove a message from the list of pinned messages in a chat.
   * If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have
   * the 'can_pin_messages' administrator right in a supergroup or 'can_edit_messages' administrator
   * right in a channel.
   * Returns `True` on success.
   * @see https://core.telegram.org/bots/api#unpinchatmessage
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {object} [extra]
   * @throws {TelegramError}
   * @return {Promise<boolean>}
   */
  unpinChatMessage (chatId, extra) {
    return this.callApi('unpinChatMessage', { chat_id: chatId, ...extra })
  }

  /**
   * Use this method to clear the list of pinned messages in a chat.
   * If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must
   * have the 'can_pin_messages' administrator right in a supergroup or 'can_edit_messages' administrator
   * right in a channel.
   * Returns `True` on success.
   * @see https://core.telegram.org/bots/api#unpinallchatmessages
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @throws {TelegramError}
   * @return {Promise<boolean>}
   */
  unpinAllChatMessages (chatId) {
    return this.callApi('unpinAllChatMessages', { chat_id: chatId })
  }

  /**
   * Use this method to get the current value of the bot's menu button in a private chat,
   * or the default menu button. Returns {@link MenuButton} on success.
   * @see https://core.telegram.org/bots/api#getchatmenubutton
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @throws {TelegramError}
   * @return {Promise}
   */
  getChatMenuButton (chatId) {
    return this.callApi('getChatMenuButton', { chat_id: chatId })
  }

  /**
   * Use this method to change the bot's menu button in a private chat, or the default menu button.
   * Returns `True` on success.
   * @see https://core.telegram.org/bots/api#setchatmenubutton
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param menuButton
   * @throws {TelegramError}
   * @return {Promise<boolean>}
   */
  setChatMenuButton (chatId, menuButton) {
    return this.callApi('setChatMenuButton', { chat_id: chatId, menu_button: menuButton })
  }

  /**
   * Use this method to change the default administrator rights requested by the bot when it's added as
   * an administrator to groups or channels. These rights will be suggested to users, but they are free to modify
   * the list before adding the bot.
   * Returns `True` on success.
   * https://core.telegram.org/bots/api#setmydefaultadministratorrights
   * @param rights
   * @param forChannels
   * @throws {TelegramError}
   * @return {Promise<boolean>}
   */
  setMyDefaultAdministratorRights (rights, forChannels) {
    return this.callApi('setMyDefaultAdministratorRights', { rights, for_channels: forChannels })
  }

  /**
   * Use this method to get the current default administrator rights of the bot.
   * Returns {@link ChatAdministratorRights} on success.
   * @see https://core.telegram.org/bots/api#getmydefaultadministratorrights
   * @param forChannels
   * @throws {TelegramError}
   * @return {Promise<ChatAdministratorRights>}
   */
  getMyDefaultAdministratorRights (forChannels) {
    return this.callApi('getMyDefaultAdministratorRights', { for_channels: forChannels })
  }

  /**
   * Use this method for your bot to leave a group, supergroup or channel. Returns `True` on success.
   * @see https://core.telegram.org/bots/api#leavechat
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @throws {TelegramError}
   * @return {Promise<boolean>}
   */
  leaveChat (chatId) {
    return this.callApi('leaveChat', { chat_id: chatId })
  }

  /**
   * Use this method to unban a previously banned user in a supergroup or channel. The user will **not** return
   * to the group or channel automatically, but will be able to join via link, etc. The bot must be an administrator
   * for this to work. By default, this method guarantees that after the call the user is not a member of the chat,
   * but will be able to join it. So if the user is a member of the chat they will also be **removed** from the chat.
   * If you don't want this, use the parameter `only_if_banned`.
   * Returns `True` on success.
   * @see https://core.telegram.org/bots/api#unbanchatmember
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param userId
   * @param {object} [extra]
   * @throws {TelegramError}
   * @return {Promise<boolean>}
   */
  unbanChatMember (chatId, userId, extra) {
    return this.callApi('unbanChatMember', { chat_id: chatId, user_id: userId, ...extra })
  }

  /**
   * @see https://core.telegram.org/bots/api#answercallbackquery
   * @param callbackQueryId
   * @param text
   * @param showAlert
   * @param {object} [extra]
   * @throws {TelegramError}
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
   * @see https://core.telegram.org/bots/api#answercallbackquery
   * @param callbackQueryId
   * @param url
   * @throws {TelegramError}
   * @return {Promise}
   */
  answerGameQuery (callbackQueryId, url) {
    return this.callApi('answerCallbackQuery', {
      url,
      callback_query_id: callbackQueryId
    })
  }

  /**
   * @see https://core.telegram.org/bots/api#answershippingquery
   * @param shippingQueryId
   * @param ok
   * @param shippingOptions
   * @param errorMessage
   * @throws {TelegramError}
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
   * @see https://core.telegram.org/bots/api#answerprecheckoutquery
   * @param preCheckoutQueryId
   * @param ok
   * @param errorMessage
   * @throws {TelegramError}
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
   * @see https://core.telegram.org/bots/api#editmessagetext
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param messageId
   * @param inlineMessageId
   * @param text
   * @param {object} [extra]
   * @throws {TelegramError}
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
   * @see https://core.telegram.org/bots/api#editmessagecaption
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param messageId
   * @param inlineMessageId
   * @param caption
   * @param {object} [extra]
   * @throws {TelegramError}
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
   * @see https://core.telegram.org/bots/api#editmessagemedia
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param messageId
   * @param inlineMessageId
   * @param media
   * @param {object} [extra]
   * @throws {TelegramError}
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
   * @see https://core.telegram.org/bots/api#editmessagereplymarkup
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param messageId
   * @param inlineMessageId
   * @param {object} [extra]
   * @throws {TelegramError}
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
   * @see https://core.telegram.org/bots/api#editmessagelivelocation
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param messageId
   * @param inlineMessageId
   * @param latitude
   * @param longitude
   * @param {object} [extra]
   * @throws {TelegramError}
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
   * @see https://core.telegram.org/bots/api#stopmessagelivelocation
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param messageId
   * @param inlineMessageId
   * @param {object} [extra]
   * @throws {TelegramError}
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
   * @see https://core.telegram.org/bots/api#deletemessage
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param messageId
   * @throws {TelegramError}
   * @return {Promise}
   */
  deleteMessage (chatId, messageId) {
    return this.callApi('deleteMessage', {
      chat_id: chatId,
      message_id: messageId
    })
  }

  /**
   * @see https://core.telegram.org/bots/api#setchatstickerset
   * @param chatId
   * @param setName
   * @throws {TelegramError}
   * @return {Promise<{webhook: boolean, details: string}|*>}
   */
  setChatStickerSet (chatId, setName) {
    return this.callApi('setChatStickerSet', {
      chat_id: chatId,
      sticker_set_name: setName
    })
  }

  /**
   * @see https://core.telegram.org/bots/api#deletechatstickerset
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @throws {TelegramError}
   * @return {Promise}
   */
  deleteChatStickerSet (chatId) {
    return this.callApi('deleteChatStickerSet', { chat_id: chatId })
  }

  /**
   * @see https://core.telegram.org/bots/api#getstickerset
   * @param name
   * @throws {TelegramError}
   * @return {Promise}
   */
  getStickerSet (name) {
    return this.callApi('getStickerSet', { name })
  }

  /**
   * Use this method to upload a .PNG file with a sticker for later use in
   * {@link Telegram.createNewStickerSet createNewStickerSet} and {@link Telegram.addStickerToSet addStickerToSet}
   * methods (can be used multiple times).
   * Returns the uploaded {@link File} on success.
   * @see https://core.telegram.org/bots/api#uploadstickerfile
   * @param {number} ownerId User identifier of sticker file owner
   * @param {attachmentFile} stickerFile **PNG** image with the sticker, must be up to 512 kilobytes in size,
   *    dimensions must not exceed 512px, and either width or height must be exactly 512px.
   *    [More information on Sending Files »](https://core.telegram.org/bots/api#sending-files).
   * @throws {TelegramError}
   * @return {Promise<File>}
   */
  uploadStickerFile (ownerId, stickerFile) {
    return this.callApi('uploadStickerFile', {
      user_id: ownerId,
      png_sticker: stickerFile
    })
  }

  /**
   * Use this method to create a new sticker set owned by a user. The bot will be able to edit the sticker set
   * thus created. You must use exactly one of the fields png_sticker, tgs_sticker, or webm_sticker.
   * Returns `True` on success.
   * @see https://core.telegram.org/bots/api#createnewstickerset
   * @param {number} ownerId User identifier of created sticker set owner
   * @param {string} name Short name of sticker set, to be used in `t.me/addstickers/` URLs (e.g., *animals*).
   *    Can contain only English letters, digits and underscores. Must begin with a letter,
   *    can't contain consecutive underscores and must end in `"_by_<bot_username>"`. `<bot_username>`
   *    is case insensitive. 1-64 characters.
   * @param {string} title Sticker set title, 1-64 characters
   * @param {object} stickerData
   * @throws {TelegramError}
   * @return {Promise<boolean>}
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
   * Use this method to add a new sticker to a set created by the bot.
   * You **must** use exactly one of the fields `png_sticker`, `tgs_sticker`, or `webm_sticker`.
   * Animated stickers can be added to animated sticker sets and only to them.
   * Animated sticker sets can have up to 50 stickers. Static sticker sets can have up to 120 stickers.
   * Returns `True` on success.
   * @see https://core.telegram.org/bots/api#addstickertoset
   * @param {number} ownerId User identifier of sticker set owner
   * @param {string} name Sticker set name
   * @param {object} stickerData
   * @param {boolean} isMasks ?????
   * @throws {TelegramError}
   * @return {Promise<boolean>}
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
   * Use this method to move a sticker in a set created by the bot to a specific position. Returns `True` on success.
   * @see https://core.telegram.org/bots/api#setstickerpositioninset
   * @param {string} sticker File identifier of the sticker
   * @param {number} position New sticker position in the set, zero-based
   * @throws {TelegramError}
   * @return {Promise<boolean>}
   */
  setStickerPositionInSet (sticker, position) {
    return this.callApi('setStickerPositionInSet', {
      sticker,
      position
    })
  }

  /**
   * Use this method to set the thumbnail of a sticker set. Animated thumbnails can be set for animated sticker
   * sets only. Video thumbnails can be set only for video sticker sets only. Returns `True` on success.
   * @see https://core.telegram.org/bots/api#setstickersetthumb
   * @param {string} name Sticker set name
   * @param {number} userId User identifier of the sticker set owner
   * @param {attachmentFile} thumb A **PNG** image with the thumbnail, must be up to 128 kilobytes in size and have width and height
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
    return this.callApi('setStickerSetThumb', { name, user_id: userId, thumb })
  }

  /**
   * Use this method to delete a sticker from a set created by the bot. Returns `True` on success.
   * @see https://core.telegram.org/bots/api#deletestickerfromset
   * @param {string} sticker File identifier of the sticker
   * @throws {TelegramError}
   * @return {Promise<boolean>}
   */
  deleteStickerFromSet (sticker) {
    return this.callApi('deleteStickerFromSet', { sticker })
  }

  /**
   * Use this method to get the current list of the bot's commands for the given scope and user language.
   * Returns Array of BotCommand on success. If commands aren't set, an empty list is returned.
   * @see https://core.telegram.org/bots/api#getmycommands
   * @param {object|Extra} [extra]
   * @throws {TelegramError}
   * @return {Promise<BotCommand[]>}
   */
  getMyCommands (extra) {
    return this.callApi('getMyCommands', extra)
  }

  /**
   * @see https://core.telegram.org/bots/api#setmycommands
   * @param {BotCommand[]} commands List of bot commands to be set as the list of the bot's commands.
   * At most 100 commands can be specified.
   * @param {object|Extra} [extra]
   * @throws {TelegramError}
   * @return {Promise<boolean>}
   */
  setMyCommands (commands, extra) {
    return this.callApi('setMyCommands', { commands, ...extra })
  }

  /**
   * Use this method to delete the list of the bot's commands for the given scope and user language.
   * After deletion, higher level commands will be shown to affected users.
   * Returns `True` on success.
   * @see https://core.telegram.org/bots/api#deletemycommands
   * @param {object|Extra} [extra]
   * @throws {TelegramError}
   * @return {Promise<boolean>}
   */
  deleteMyCommands (extra) {
    return this.callApi('deleteMyCommands', extra)
  }

  /**
   * Informs a user that some of the Telegram Passport elements they provided contains errors.
   * The user will not be able to re-submit their Passport to you until the errors are fixed
   * (the contents of the field for which you returned the error must change). Returns True on success.
   *
   * Use this if the data submitted by the user doesn't satisfy the standards your service requires for any reason.
   * For example, if a birthday date seems invalid, a submitted document is blurry, a scan shows evidence of tampering,
   * etc. Supply some details in the error message to make sure the user knows how to correct the issues.
   * @see https://core.telegram.org/bots/api#setpassportdataerrors
   * @param {number} userId User identifier
   * @param {PassportElementError[]} errors Array describing the errors
   * @throws {TelegramError}
   * @return {Promise<boolean>}
   */
  setPassportDataErrors (userId, errors) {
    return this.callApi('setPassportDataErrors', {
      user_id: userId,
      errors
    })
  }

  /**
   *
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param message
   * @param {object|Extra} [extra]
   * @throws {TelegramError}
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
   * Use this method to copy messages of any kind. Service messages and invoice messages can't be copied.
   * The method is analogous to the method forwardMessage, but the copied message doesn't have a link to the
   * original message.
   * Returns the MessageId of the sent message on success.
   * @see https://core.telegram.org/bots/api#copymessage
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param fromChatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param messageId Message identifier in the chat specified in `from_chat_id`
   * @param {object|Extra} [extra]
   * @throws {TelegramError}
   * @return {Promise<MessageId>}
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
   * Use this method to create an additional invite link for a chat. The bot must be an administrator in the chat for
   * this to work and must have the appropriate administrator rights. The link can be revoked using the method
   * {@link Telegram.revokeChatInviteLink revokeChatInviteLink}. Returns the new invite
   * link as {@link ChatInviteLink} object.
   * @see https://core.telegram.org/bots/api#createchatinvitelink
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {object|Extra} [extra]
   * @throws {TelegramError}
   * @return {Promise<ChatInviteLink>}
   */
  createChatInviteLink (chatId, extra) {
    return this.callApi('createChatInviteLink', {
      chat_id: chatId,
      ...extra
    })
  }

  /**
   * Use this method to edit a non-primary invite link created by the bot. The bot must be an administrator in the chat
   * for this to work and must have the appropriate administrator rights. Returns the edited invite link
   * as a {@link ChatInviteLink} object.
   * @see https://core.telegram.org/bots/api#editchatinvitelink
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {string} inviteLink The invite link to edit
   * @param {object|Extra} [extra]
   * @throws {TelegramError}
   * @return {Promise<ChatInviteLink>}
   */
  editChatInviteLink (chatId, inviteLink, extra) {
    return this.callApi('editChatInviteLink', {
      chat_id: chatId,
      invite_link: inviteLink,
      ...extra
    })
  }

  /**
   * Use this method to revoke an invite link created by the bot. If the primary link is revoked, a new link is
   * automatically generated. The bot must be an administrator in the chat for this to work and must have the
   * appropriate administrator rights. Returns the revoked invite link as {@link ChatInviteLink} object.
   * @see https://core.telegram.org/bots/api#revokechatinvitelink
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {string} inviteLink The invite link to revoke
   * @throws {TelegramError}
   * @return {Promise<ChatInviteLink>}
   */
  revokeChatInviteLink (chatId, inviteLink) {
    return this.callApi('revokeChatInviteLink', {
      chat_id: chatId,
      invite_link: inviteLink
    })
  }

  /**
   * Use this method to approve a chat join request. The bot must be an administrator in the chat for this to work
   * and must have the can_invite_users administrator right.
   * Returns `True` on success.
   * @see https://core.telegram.org/bots/api#approvechatjoinrequest
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {number} userId Unique identifier of the target user
   * @throws {TelegramError}
   * @return {Promise<boolean>}
   */
  approveChatJoinRequest (chatId, userId) {
    return this.callApi('approveChatJoinRequest', {
      chat_id: chatId,
      user_id: userId
    })
  }

  /**
   * Use this method to decline a chat join request. The bot must be an administrator in the chat for this to work
   * and must have the `can_invite_users` administrator right. Returns `True` on success.
   * @see https://core.telegram.org/bots/api#declinechatjoinrequest
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {number} userId Unique identifier of the target user
   * @throws {TelegramError}
   * @return {Promise<boolean>}
   */
  declineChatJoinRequest (chatId, userId) {
    return this.callApi('declineChatJoinRequest', {
      chat_id: chatId,
      user_id: userId
    })
  }
}

module.exports = Telegram

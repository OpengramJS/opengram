const replicators = require('./core/replicators')
const ApiClient = require('./core/network/client')
const { isAbsolute } = require('path')

/**
 * Class which implements sugar for direct Telegram Bots API calls
 *
 * @class
 * @extends ApiClient
 */
class Telegram extends ApiClient {
  /**
   * A simple method for testing your bot's authentication token. Requires no parameters.
   *
   * Returns basic information about the bot in form of a {@link User} object.
   *
   * @see https://core.telegram.org/bots/api#getme
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<User>}
   */
  getMe (signal) {
    return this.callApi('getMe', {}, { signal })
  }

  /**
   * Use this method to get basic information about a file and prepare it for downloading.
   * For the moment, bots can download files of up to 20MB in size.
   *
   * On success, a {@link File} object is returned.
   * The file can then be downloaded via the link `https://api.telegram.org/file/bot<token>/<file_path>`,
   * where `<file_path>` is taken from the response. It is guaranteed that the link will be valid for at least 1 hour.
   * When the link expires, a new one can be requested by calling {@link getFile}
   *
   * @see https://core.telegram.org/bots/api#getfile
   * @param {string} fileId File identifier to get information about.
   *    For example `AgACAgIAAx0CQjQWAgABBL1TYuJg8dI5tgABhPn_grF1nRzR-aMtAAJRvDEbb9cQSzO9zjdgGjp1AQADAgADcwADKQQ`
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<File>}
   */
  getFile (fileId, signal) {
    return this.callApi('getFile', { file_id: fileId }, { signal })
  }

  /**
   * Calls {@link getFile} method with `fileId` or file object and return result
   *
   * @see https://core.telegram.org/bots/api#getfile
   * @see https://core.telegram.org/bots/api#file
   * @param {string|File} fileId File identifier to get information about.
   *    For example `AgACAgIAAx0CQjQWAgABBL1TYuJg8dI5tgABhPn_grF1nRzR-aMtAAJRvDEbb9cQSzO9zjdgGjp1AQADAgADcwADKQQ`
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<URL>}
   */
  async getFileLink (fileId, signal) {
    if (typeof fileId === 'string') {
      fileId = await this.getFile(fileId, signal)
    } else if (fileId.file_path === undefined) {
      fileId = await this.getFile(fileId.file_id, signal)
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
   *
   * @see https://core.telegram.org/bots/api#getupdates
   * @param {number} [timeout=0] - Timeout in seconds for long polling.
   *    Defaults to 0, i.e. usual short polling. Should be positive,
   *    short polling should be used for testing purposes only.
   * @param {number} [limit=100] - Limits the number of updates to be retrieved. Values between 1-100 are accepted.
   *   Defaults to 100.
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
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<Update[]>}
   */
  getUpdates (timeout, limit, offset, allowedUpdates, signal) {
    const url = `getUpdates?offset=${offset}&limit=${limit}&timeout=${timeout}`
    return this.callApi(url, {
      allowed_updates: allowedUpdates
    }, { signal })
  }

  /**
   * Use this method to get current webhook status. Requires no parameters.
   *
   * On success, returns a {@link WebhookInfo} object.
   * If the bot is using {@link getUpdates}, will return an object with the *url* field empty.
   *
   * @see https://core.telegram.org/bots/api#getwebhookinfo
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<WebhookInfo>}
   */
  getWebhookInfo (signal) {
    return this.callApi('getWebhookInfo', {}, { signal })
  }

  /**
   * Use this method to get data for high score tables.
   * Will return the score of the specified user and several of their neighbors in a game.
   *
   * On success, returns an Array of {@link GameHighScore} objects.
   *
   * @see https://core.telegram.org/bots/api#getgamehighscores
   * @param {number} userId Target user id
   * @param {number} [inlineMessageId] Required if `inline_message_id` is not specified.
   *    Unique identifier for the target chat
   * @param {number} [chatId] Required if `inline_message_id` is not specified. Identifier of the sent message
   * @param {number} [messageId] Required if `chat_id` and `message_id` are not specified. Identifier of the inline
   *   message
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<GameHighScore[]>}
   */
  getGameHighScores (userId, inlineMessageId, chatId, messageId, signal) {
    return this.callApi('getGameHighScores', {
      user_id: userId,
      inline_message_id: inlineMessageId,
      chat_id: chatId,
      message_id: messageId
    }, { signal })
  }

  /**
   * Use this method to set the score of the specified user in a game message.
   *
   * On success, if the message is not an inline message, the {@link Message} is returned, otherwise `True` is returned.
   *
   * Returns an error, if the new score is not greater than the user's current score in the chat and `force` is False.
   *
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
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<boolean|Message>}
   */
  setGameScore (userId, score, inlineMessageId, chatId, messageId, editMessage = true, force, signal) {
    return this.callApi('setGameScore', {
      force,
      score,
      user_id: userId,
      inline_message_id: inlineMessageId,
      chat_id: chatId,
      message_id: messageId,
      disable_edit_message: !editMessage
    }, { signal })
  }

  /**
   * Use this method to specify a URL and receive incoming updates via an outgoing webhook.
   * Whenever there is an update for the bot, we will send an HTTPS POST request to the specified URL,
   * containing a JSON-serialized {@link Update}.
   * In case of an unsuccessful request, we will give up after a reasonable amount of attempts.
   *
   * Returns `True` on success or {@link WebhookResponse} when webhook response enabled.
   *
   * If you'd like to make sure that the webhook was set by you, you can specify secret data in the parameter
   * `secret_token`. If specified, the request will contain a header `X-Telegram-Bot-Api-Secret-Token` with
   * the secret token as content.
   *
   * @see https://core.telegram.org/bots/api#setwebhook
   * @param {string} url HTTPS URL to send updates to. Use an empty string to remove webhook integration
   * @param {ExtraSetWebhook} [extra] Other parameters
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<boolean|WebhookResponse>}
   */
  setWebhook (url, extra, signal) {
    return this.callApi('setWebhook', { url, ...extra }, { signal })
  }

  /**
   * Use this method to remove webhook integration if you decide to switch back to {@link Telegram#getUpdates}.
   *
   * Returns `True` on success or {@link WebhookResponse} when webhook response enabled.
   *
   * @see https://core.telegram.org/bots/api#deletewebhook
   * @param {ExtraDeleteWebhook} [extra] Other parameters
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<boolean|WebhookResponse>}
   */
  deleteWebhook (extra, signal) {
    return this.callApi('deleteWebhook', extra, { signal })
  }

  /**
   * Use this method to send text messages.
   *
   * On success, the sent {@link Message} is returned.
   *
   * @see https://core.telegram.org/bots/api#sendmessage
   * @param {string|number} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {string} text Text of the message to be sent, 1-4096 characters after entities parsing
   * @param {ExtraSendMessage|Extra} [extra] Other parameters
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<Message>}
   */
  sendMessage (chatId, text, extra, signal) {
    return this.callApi('sendMessage', { chat_id: chatId, text, ...extra }, { signal })
  }

  /**
   * Use this method to forward messages of any kind. Service messages can't be forwarded.
   *
   * On success, the sent {@link Message} is returned.
   *
   * @see https://core.telegram.org/bots/api#forwardmessage
   * @param {string|number} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {string|number} fromChatId Unique identifier for the chat where the original message was sent
   * (or channel username in the format `@channelusername`)
   * @param {number} messageId Message identifier in the chat specified in `from_chat_id`
   * @param {ExtraForwardMessage|Extra} [extra] Other parameters
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<Message>}
   */
  forwardMessage (chatId, fromChatId, messageId, extra, signal) {
    return this.callApi('forwardMessage', {
      chat_id: chatId,
      from_chat_id: fromChatId,
      message_id: messageId,
      ...extra
    }, { signal })
  }

  /**
   * @typedef {object} ExtraSendChatAction
   * @property {number} [message_thread_id] *Optional.* Unique identifier for the target message thread (topic) of the
   *   forum; for forum supergroups only
   */

  /**
   * Use this method when you need to tell the user that something is happening on the bot's side.
   * The status is set for 5 seconds or less (when a message arrives from your bot,
   * Telegram clients clear its typing status).
   *
   * Returns `True` on success or {@link WebhookResponse} when webhook response enabled.
   *
   * Example: The [ImageBot](https://t.me/imagebot) needs some time to process a request and upload the image.
   * Instead of sending a text message along the lines of “Retrieving image, please wait…”,
   * the bot may use {@link sendChatAction} with `action = upload_photo`. The user will see a “sending photo”
   * status for the bot.
   *
   * We only recommend using this method when a response from the bot will take a **noticeable** amount of time to
   * arrive.
   *
   * @see https://core.telegram.org/bots/api#sendchataction
   * @param {string|number} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {Action} action Type of action to broadcast. Choose one, depending on what the user is about to receive:
   *    `typing` for text messages,
   *    `upload_photo` for {@link sendMessage photos},
   *    `record_video` or `upload_video` for {@link sendVideo videos},
   *    `record_voice` or `upload_voice` for {@link sendVoice voice} notes,
   *    `upload_document` for general {@link sendDocument files},
   *    `choose_sticker` for {@link sendSticker stickers},
   *    `find_location` for {@link sendLocation location data},
   *    `record_video_note` or `upload_video_note` for {@link sendVideoNote video notes}.
   * @param {ExtraSendChatAction} [extra] Other parameters
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<boolean|WebhookResponse>}
   */
  sendChatAction (chatId, action, extra, signal) {
    return this.callApi('sendChatAction', { chat_id: chatId, action, ...extra }, { signal })
  }

  /**
   * Use this method to get a list of profile pictures for a user.
   *
   * Returns a {@link UserProfilePhotos} object.
   *
   * @see https://core.telegram.org/bots/api#getuserprofilephotos
   * @param {number} userId Unique identifier of the target user
   * @param {number} [offset] Sequential number of the first photo to be returned. By default, all photos are returned.
   * @param {number} [limit] Limits the number of photos to be retrieved. Values between 1-100 are accepted.
   *    Defaults to 100.
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<UserProfilePhotos>}
   */
  getUserProfilePhotos (userId, offset, limit, signal) {
    return this.callApi('getUserProfilePhotos', { user_id: userId, offset, limit }, { signal })
  }

  /**
   * Use this method to send point on the map.
   *
   * On success, the sent {@link Message} is returned.
   *
   * @see https://core.telegram.org/bots/api#sendlocation
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {number} latitude Latitude of the location
   * @param {number} longitude Longitude of the location
   * @param {ExtraLocation|Extra} [extra] Other parameters
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise}
   */
  sendLocation (chatId, latitude, longitude, extra, signal) {
    return this.callApi('sendLocation', { chat_id: chatId, latitude, longitude, ...extra }, { signal })
  }

  /**
   * Use this method to send information about a venue.
   *
   * On success, the sent {@link Message} is returned.
   *
   * @see https://core.telegram.org/bots/api#sendvenue
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {number} latitude Latitude of the venue
   * @param {number} longitude Longitude of the venue
   * @param {string} title Name of the venue
   * @param {string} address Address of the venue
   * @param {ExtraVenue|Extra} [extra] Other parameters
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<Message>}
   */
  sendVenue (chatId, latitude, longitude, title, address, extra, signal) {
    return this.callApi('sendVenue', {
      latitude,
      longitude,
      title,
      address,
      chat_id: chatId,
      ...extra
    }, { signal })
  }

  /**
   * Use this method to send invoices.
   *
   * On success, the sent {@link Message} is returned.
   *
   * @see https://core.telegram.org/bots/api#sendinvoice
   * @param {string|number} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {InvoiceParams} invoice Other invoice parameters
   * @param {ExtraInvoice|Extra} [extra] Other parameters
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<Message>}
   */
  sendInvoice (chatId, invoice, extra, signal) {
    return this.callApi('sendInvoice', { chat_id: chatId, ...invoice, ...extra }, { signal })
  }

  /**
   * Use this method to send phone contacts.
   *
   * On success, the sent {@link Message} is returned.
   *
   * @see https://core.telegram.org/bots/api#sendcontact
   * @param {string|number} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {string} phoneNumber Contact's phone number
   * @param {string} firstName Contact's first name
   * @param {ExtraContact|Extra} [extra] Other parameters
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<Message>}
   */
  sendContact (chatId, phoneNumber, firstName, extra, signal) {
    return this.callApi('sendContact', { chat_id: chatId, phone_number: phoneNumber, first_name: firstName, ...extra }, { signal })
  }

  /**
   * Use this method to send photos.
   *
   * On success, the sent {@link Message} is returned.
   *
   * @see https://core.telegram.org/bots/api#sendphoto
   * @param {string|number} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {InputFile|FileId} photo Photo to send. Pass a `file_id` as String to send a photo that exists on the
   *    Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a photo from the Internet,
   *    or upload a new photo using multipart/form-data.
   *    The photo must be at most 10 MB in size.
   *    The photo's width and height must not exceed 10000 in total.
   *    Width and height ratio must be at most 20.
   *    [More information on Sending Files »](https://core.telegram.org/bots/api#sending-files)
   * @param {ExtraPhoto|Extra} [extra] Other parameters
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<Message>}
   */
  sendPhoto (chatId, photo, extra, signal) {
    return this.callApi('sendPhoto', { chat_id: chatId, photo, ...extra }, { signal })
  }

  /**
   * Use this method to send an animated emoji that will display a random value.
   *
   * On success, the sent {@link Message} is returned.
   *
   * @see https://core.telegram.org/bots/api#sendphoto
   * @param {string|number} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {ExtraDice|Extra} [extra] Other parameters
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<Message>}
   */
  sendDice (chatId, extra, signal) {
    return this.callApi('sendDice', { chat_id: chatId, ...extra }, { signal })
  }

  /**
   * Use this method to send general files.
   *
   * On success, the sent {@link Message} is returned.
   * Bots can currently send files of any type of up to 50 MB in size, this limit may be changed in the future.
   *
   * @see https://core.telegram.org/bots/api#senddocument
   * @param {string|number} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {InputFile|FileId} document Document to send. Pass a `file_id` as String to send a document that exists
   *    on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a photo from the
   *   Internet, or upload a new photo using multipart/form-data.
   *    [More information on Sending Files »](https://core.telegram.org/bots/api#sending-files)
   * @param {ExtraDocument|Extra} [extra] Other parameters
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<Message>}
   */
  sendDocument (chatId, document, extra, signal) {
    return this.callApi('sendDocument', { chat_id: chatId, document, ...extra }, { signal })
  }

  /**
   * Use this method to send audio files, if you want Telegram clients to display them in the music player.
   * Your audio must be in the `.MP3` or `.M4A` format.
   *
   * On success, the sent {@link Message} is returned.
   * Bots can currently send audio files of up to 50 MB in size, this limit may be changed in the future.
   *
   * For sending voice messages, use the {@link Telegram#sendVoice} method instead.
   *
   * @see https://core.telegram.org/bots/api#sendaudio
   * @param {string|number} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {InputFile|FileId} audio Audio file to send. Pass a `file_id` as String to send an audio file that exists on
   *   the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get an audio file from the
   *   Internet, or upload a new one using multipart/form-data.
   *    [More information on Sending Files »](https://core.telegram.org/bots/api#sending-files)
   * @param {ExtraAudio|Extra} [extra] Other parameters
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<Message>}
   */
  sendAudio (chatId, audio, extra, signal) {
    return this.callApi('sendAudio', { chat_id: chatId, audio, ...extra }, { signal })
  }

  /**
   * Use this method to send static `.WEBP`, animated `.TGS`, or video `.WEBM` stickers.
   *
   * On success, the sent {@link Message} is returned.
   *
   * @see https://core.telegram.org/bots/api#sendsticker
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {InputFile|FileId} sticker Sticker to send. Pass a `file_id` as String to send a file that exists on
   *    the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a .WEBP file from the
   *    Internet, or upload a new one using multipart/form-data.
   *    [More information on Sending Files »](https://core.telegram.org/bots/api#sending-files)
   * @param {ExtraSticker|Extra} [extra] Other parameters
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<Message>}
   */
  sendSticker (chatId, sticker, extra, signal) {
    return this.callApi('sendSticker', { chat_id: chatId, sticker, ...extra }, { signal })
  }

  /**
   * Use this method to send video files, Telegram clients support MPEG4 videos (other formats may
   * be sent as {@link Document}).
   *
   * On success, the sent {@link Message} is returned.
   *
   * Bots can currently send video files of up to 50 MB in size, this limit may be changed in the future.
   *
   * @see https://core.telegram.org/bots/api#sendvideo
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {InputFile|FileId} video Video to send. Pass a `file_id` as String to send a video that
   *    exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get
   *    a video from the Internet, or upload a new video using multipart/form-data.
   *    [More information on Sending Files »](https://core.telegram.org/bots/api#sending-files)
   * @param {ExtraVideo|Extra} [extra] Other parameters
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<Message>}
   */
  sendVideo (chatId, video, extra, signal) {
    return this.callApi('sendVideo', { chat_id: chatId, video, ...extra }, { signal })
  }

  /**
   * Use this method to send animation files (GIF or H.264/MPEG-4 AVC video without sound).
   *
   * On success, the sent {@link Message} is returned.
   *
   * Bots can currently send animation files of up to 50 MB in size, this limit may be changed in the future.
   *
   * @see https://core.telegram.org/bots/api#sendanimation
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {InputFile|FileId} animation Animation to send. Pass a `file_id` as String to send an animation that exists
   *    on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get an animation from
   *    the Internet, or upload a new animation using multipart/form-data.
   *    [More information on Sending Files »](https://core.telegram.org/bots/api#sending-files)
   * @param {ExtraAnimation|Extra} [extra] Other parameters
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<Message>}
   */
  sendAnimation (chatId, animation, extra, signal) {
    return this.callApi('sendAnimation', { chat_id: chatId, animation, ...extra }, { signal })
  }

  /**
   * As of [v.4.0](https://telegram.org/blog/video-messages-and-telescope), Telegram clients support rounded square
   * MPEG4 videos of up to 1 minute long.
   * Use this method to send video messages.
   *
   * On success, the sent {@link Message} is returned.
   *
   * @see https://core.telegram.org/bots/api#sendvideonote
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {InputFile|FileId} videoNote Video note to send. Pass a `file_id` as String to send a video note that exists
   *   on the Telegram servers (recommended) or upload a new video using multipart/form-data.
   *    [More information on Sending Files »](https://core.telegram.org/bots/api#sending-files).
   *    Sending video notes by a URL is currently unsupported
   * @param {ExtraVideoNote|Extra} [extra] Other parameters
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<Message>}
   */
  sendVideoNote (chatId, videoNote, extra, signal) {
    return this.callApi('sendVideoNote', { chat_id: chatId, video_note: videoNote, ...extra }, { signal })
  }

  /**
   * Use this method to send audio files, if you want Telegram clients to display the file as a playable voice message.
   * For this to work, your audio must be in an .OGG file encoded
   * with OPUS (other formats may be sent as {@link Audio} or {@link Document}).
   *
   * On success, the sent {@link Message} is returned.
   * Bots can currently send voice messages of up to 50 MB in size, this limit may be changed in the future.
   *
   * @see https://core.telegram.org/bots/api#sendvoice
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {InputFile|FileId} voice Audio file to send. Pass a file_id as String to send a file that exists on the
   *    Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a file from the Internet,
   *    or upload a new one using multipart/form-data.
   * @param {ExtraVoice|Extra} [extra] Other parameters
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<Message>}
   */
  sendVoice (chatId, voice, extra, signal) {
    return this.callApi('sendVoice', { chat_id: chatId, voice, ...extra }, { signal })
  }

  /**
   * Use this method to send a game.
   *
   * On success, the sent {@link Message} is returned.
   *
   * @see https://core.telegram.org/bots/api#sendgame
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {string} gameName Short name of the game, serves as the unique identifier for the game.
   *    Set up your games via [@BotFather](https://t.me/BotFather).
   * @param {ExtraGame|Extra} [extra] Other parameters
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<Message>}
   */
  sendGame (chatId, gameName, extra, signal) {
    return this.callApi('sendGame', { chat_id: chatId, game_short_name: gameName, ...extra }, { signal })
  }

  /**
   * Use this method to send a group of photos, videos, documents or audios as an album. Documents and audio files
   * can be only grouped in an album with messages of the same type.
   *
   * On success, an array of {@link Message Messages}
   * that were sent is returned.
   *
   * @see https://core.telegram.org/bots/api#sendmediagroup
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {Array<InputMediaPhoto|InputMediaAudio|InputMediaVideo|InputMediaDocument>} media A array describing
   *    messages to be sent, must include 2-10 items
   * @param {ExtraMediaGroup|Extra} [extra] Other parameters
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<Message[]>}
   */
  sendMediaGroup (chatId, media, extra, signal) {
    return this.callApi('sendMediaGroup', { chat_id: chatId, media, ...extra }, { signal })
  }

  /**
   * Use this method to send a native poll with type `regular`.
   *
   * On success, the sent {@link Message} is returned.
   *
   * @see https://core.telegram.org/bots/api#sendpoll
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {string} question Poll question, 1-300 characters
   * @param {string[]} options List of answer options, 2-10 strings 1-100 characters each
   * @param {ExtraPoll|Extra} [extra] Other parameters
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<Message>}
   */
  sendPoll (chatId, question, options, extra, signal) {
    return this.callApi('sendPoll', { chat_id: chatId, type: 'regular', question, options, ...extra }, { signal })
  }

  /**
   * Use this method to send a native poll with type `quiz`.
   *
   * On success, the sent {@link Message} is returned.
   *
   * @see https://core.telegram.org/bots/api#sendpoll
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {string} question Poll question, 1-300 characters
   * @param {string[]} options List of answer options, 2-10 strings 1-100 characters each
   * @param {ExtraQuiz|Extra} [extra] Other parameters
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<Message>}
   */
  sendQuiz (chatId, question, options, extra, signal) {
    return this.callApi('sendPoll', { chat_id: chatId, type: 'quiz', question, options, ...extra }, { signal })
  }

  /**
   * Use this method to stop a poll which was sent by the bot.
   *
   * On success, the stopped {@link Poll} is returned.
   *
   * @see https://core.telegram.org/bots/api#stoppoll
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {number} messageId Identifier of the original message with the poll
   * @param {ExtraStopPoll|Extra} [extra] Other parameters
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<Poll>}
   */
  stopPoll (chatId, messageId, extra, signal) {
    return this.callApi('stopPoll', { chat_id: chatId, message_id: messageId, ...extra }, { signal })
  }

  /**
   * Use this method to get up-to-date information about the chat (current name of the user for one-on-one
   * conversations, current username of a user, group or channel, etc.).
   *
   * Returns a {@link Chat} object on success.
   *
   * @see https://core.telegram.org/bots/api#getchat
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<Chat>}
   */
  getChat (chatId, signal) {
    return this.callApi('getChat', { chat_id: chatId }, { signal })
  }

  /**
   * Use this method to get a list of administrators in a chat.
   *
   * On success, returns an Array of {@link ChatMember}
   * objects that contains information about all chat administrators except other bots. If the chat is a group
   * or a supergroup and no administrators were appointed, only the creator will be returned.
   *
   * @see https://core.telegram.org/bots/api#getchatadministrators
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<ChatMember[]>}
   */
  getChatAdministrators (chatId, signal) {
    return this.callApi('getChatAdministrators', { chat_id: chatId }, { signal })
  }

  /**
   * Use this method to get information about a member of a chat.
   * > Note that the method getChatMember is only guaranteed to work if the bot is an administrator in the chat.
   * (for hidden members after Bots API 6.4)
   *
   * Returns a {@link ChatMember} object on success.
   *
   * @see https://core.telegram.org/bots/api#getchatmember
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {number} userId Unique identifier of the target user
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<ChatMember>}
   */
  getChatMember (chatId, userId, signal) {
    return this.callApi('getChatMember', { chat_id: chatId, user_id: userId }, { signal })
  }

  /**
   * Use this method to get the number of members in a chat.
   *
   * Returns `Int` on success.
   *
   * @see https://core.telegram.org/bots/api#getchatmembercount
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @deprecated Use {@link getChatMemberCount}
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<number>}
   */
  getChatMembersCount (chatId, signal) {
    return this.callApi('getChatMemberCount', { chat_id: chatId }, { signal })
  }

  /**
   * Use this method to get the number of members in a chat.
   *
   * Returns `Int` on success.
   *
   * @see https://core.telegram.org/bots/api#getchatmembercount
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<number>}
   */
  getChatMemberCount (chatId, signal) {
    return this.callApi('getChatMemberCount', { chat_id: chatId }, { signal })
  }

  /**
   * Use this method to send answers to an inline query.
   *
   * Returns `True` on success or {@link WebhookResponse} when webhook response enabled.
   * No more than **50** results per query are allowed.
   *
   * @see https://core.telegram.org/bots/api#answerinlinequery
   * @param {string} inlineQueryId Unique identifier for the answered query
   * @param {InlineQueryResult[]} results A array of results for the inline query
   * @param {ExtraAnswerInlineQuery} [extra] Other parameters
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<boolean|WebhookResponse>}
   */
  answerInlineQuery (inlineQueryId, results, extra, signal) {
    return this.callApi('answerInlineQuery', { inline_query_id: inlineQueryId, results, ...extra }, { signal })
  }

  /**
   * Use this method to set default chat permissions for all members. The bot must be an administrator in the group
   * or a supergroup for this to work and must have the `can_restrict_members` administrator rights.
   *
   * Returns `True` on success or {@link WebhookResponse} when webhook response enabled.
   *
   * @see https://core.telegram.org/bots/api#setchatpermissions
   * @param {number|string} chatId Unique identifier for the target chat or username of the target supergroup
   *    (in the format `@supergroupusername`)
   * @param {ChatPermissions} permissions A object for new default chat permissions
   * @param {ExtraSetChatPermissions} [extra] Other parameters
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<boolean|WebhookResponse>}
   */
  setChatPermissions (chatId, permissions, extra, signal) {
    return this.callApi('setChatPermissions', { chat_id: chatId, permissions, ...extra }, { signal })
  }

  /**
   * Use this method to ban a user in a group, a supergroup or a channel. In the case of supergroups and channels,
   * the user will not be able to return to the chat on their own using invite links, etc.,
   * unless {@link unbanChatMember unbanned} first.
   * The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights.
   *
   * Returns `True` on success or {@link WebhookResponse} when webhook response enabled.
   *
   * @see https://core.telegram.org/bots/api#banchatmember
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {number} userId Unique identifier of the target user
   * @param {ExtraBanChatMember} [extra] Other parameters
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<boolean|WebhookResponse>}
   */
  banChatMember (chatId, userId, extra, signal) {
    return this.callApi('banChatMember', { chat_id: chatId, user_id: userId, ...extra }, { signal })
  }

  /**
   * Alias to {@link banChatMember}, but have different arguments
   *
   * Returns `True` on success or {@link WebhookResponse} when webhook response enabled.
   *
   * @deprecated Use {@link #banChatMember} instead
   * @see https://core.telegram.org/bots/api#banchatmember
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {number} userId Unique identifier of the target user
   * @param {number} [untilDate] Date when the user will be unbanned, unix time. If user is banned for more than 366
   *   days or less than 30 seconds from the current time they are considered to be banned forever. Applied for
   *   supergroups and channels only.
   * @param {ExtraKickChatMember} [extra] Other parameters
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<boolean|WebhookResponse>}
   */
  kickChatMember (chatId, userId, untilDate, extra, signal) {
    return this.callApi('banChatMember', { chat_id: chatId, user_id: userId, until_date: untilDate, ...extra }, { signal })
  }

  /**
   * Use this method to promote or demote a user in a supergroup or a channel. The bot must be an administrator
   * in the chat for this to work and must have the appropriate administrator rights. Pass `False` for all boolean
   * parameters to demote a user.
   *
   * Returns `True` on success or {@link WebhookResponse} when webhook response enabled.
   *
   * @see https://core.telegram.org/bots/api#promotechatmember
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {number} userId Unique identifier of the target user
   * @param {ExtraPromoteChatMember} [extra] Other parameters
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<boolean|WebhookResponse>}
   */
  promoteChatMember (chatId, userId, extra, signal) {
    return this.callApi('promoteChatMember', { chat_id: chatId, user_id: userId, ...extra }, { signal })
  }

  /**
   * Use this method to restrict a user in a supergroup. The bot must be an administrator in the supergroup
   * for this to work and must have the appropriate administrator rights. Pass True for all permissions to lift
   * restrictions from a user.
   *
   * Returns `True` on success or {@link WebhookResponse} when webhook response enabled.
   *
   * @see https://core.telegram.org/bots/api#restrictchatmember
   * @param {number|string} chatId Unique identifier for the target chat or username of the target supergroup
   *    (in the format `@supergroupusername`)
   * @param {number} userId Unique identifier of the target user
   * @param {ExtraRestrictChatMember} [extra] Other parameters
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<boolean|WebhookResponse>}
   */
  restrictChatMember (chatId, userId, extra, signal) {
    return this.callApi('restrictChatMember', { chat_id: chatId, user_id: userId, ...extra }, { signal })
  }

  /**
   * Use this method to ban a channel chat in a supergroup or a channel. Until the chat is
   * {@link unbanChatMember unbanned}, the owner of the banned chat won't be able to send messages on behalf
   * of **any of their channels**. The bot must be an administrator in the supergroup or channel for this
   * to work and must have the appropriate administrator rights.
   *
   * Returns `True` on success or {@link WebhookResponse} when webhook response enabled.
   *
   * @see https://core.telegram.org/bots/api#banchatsenderchat
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {number} senderChatId Unique identifier of the target sender chat
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<boolean|WebhookResponse>}
   */
  banChatSenderChat (chatId, senderChatId, signal) {
    return this.callApi('banChatSenderChat', { chat_id: chatId, sender_chat_id: senderChatId }, { signal })
  }

  /**
   * Use this method to unban a previously banned channel chat in a supergroup or channel.
   * The bot must be an administrator for this to work and must have the appropriate administrator rights.
   *
   * Returns `True` on success or {@link WebhookResponse} when webhook response enabled.
   *
   * @see https://core.telegram.org/bots/api#unbanchatsenderchat
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {number} senderChatId Unique identifier of the target sender chat
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<boolean|WebhookResponse>}
   */
  unbanChatSenderChat (chatId, senderChatId, signal) {
    return this.callApi('unbanChatSenderChat', { chat_id: chatId, sender_chat_id: senderChatId }, { signal })
  }

  /**
   * Use this method to set a custom title for an administrator in a supergroup promoted by the bot.
   *
   * Returns `True` on success or {@link WebhookResponse} when webhook response enabled.
   *
   * @see https://core.telegram.org/bots/api#setchatadministratorcustomtitle
   * @param {number|string} chatId Unique identifier for the target chat or username of the target supergroup
   *    (in the format `@supergroupusername`)
   * @param {number} userId Unique identifier of the target user
   * @param {string} title New custom title for the administrator; 0-16 characters, emoji are not allowed
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<boolean|WebhookResponse>}
   */
  setChatAdministratorCustomTitle (chatId, userId, title, signal) {
    return this.callApi('setChatAdministratorCustomTitle', { chat_id: chatId, user_id: userId, custom_title: title }, { signal })
  }

  /**
   * Use this method to generate a new primary invite link for a chat; any previously generated primary link
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
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise}
   */
  exportChatInviteLink (chatId, signal) {
    return this.callApi('exportChatInviteLink', { chat_id: chatId }, { signal })
  }

  /**
   * Use this method to set a new profile photo for the chat. Photos can't be changed for private chats.
   * The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights.
   *
   * Returns `True` on success or {@link WebhookResponse} when webhook response enabled.
   *
   * @see https://core.telegram.org/bots/api#setchatphoto
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {InputFile} photo New chat photo, uploaded using multipart/form-data
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<boolean|WebhookResponse>}
   */
  setChatPhoto (chatId, photo, signal) {
    return this.callApi('setChatPhoto', { chat_id: chatId, photo }, { signal })
  }

  /**
   * Use this method to delete a chat photo. Photos can't be changed for private chats. The bot must be an
   * administrator in the chat for this to work and must have the appropriate administrator rights.
   *
   * Returns `True` on success or {@link WebhookResponse} when webhook response enabled.
   *
   * @see https://core.telegram.org/bots/api#deletechatphoto
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<boolean|WebhookResponse>}
   */
  deleteChatPhoto (chatId, signal) {
    return this.callApi('deleteChatPhoto', { chat_id: chatId }, { signal })
  }

  /**
   * Use this method to change the title of a chat. Titles can't be changed for private chats.
   * The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights.
   *
   * Returns `True` on success or {@link WebhookResponse} when webhook response enabled.
   *
   * @see https://core.telegram.org/bots/api#setchattitle
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {string} title New chat title, 1-255 characters
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<boolean|WebhookResponse>}
   */
  setChatTitle (chatId, title, signal) {
    return this.callApi('setChatTitle', { chat_id: chatId, title }, { signal })
  }

  /**
   * Use this method to change the description of a group, a supergroup or a channel.
   * The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights.
   *
   * Returns `True` on success or {@link WebhookResponse} when webhook response enabled.
   * https://core.telegram.org/bots/api#setchatdescription
   *
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {string} [description] New chat description, 0-255 characters
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<boolean|WebhookResponse>}
   */
  setChatDescription (chatId, description, signal) {
    return this.callApi('setChatDescription', { chat_id: chatId, description }, signal)
  }

  /**
   * Use this method to add a message to the list of pinned messages in a chat. If the chat is not a private chat,
   * the bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' administrator
   * right in a supergroup or 'can_edit_messages' administrator right in a channel.
   *
   * Returns `True` on success or {@link WebhookResponse} when webhook response enabled.
   *
   * @see https://core.telegram.org/bots/api#pinchatmessage
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {number} messageId Identifier of a message to pin
   * @param {ExtraPinChatMessage} [extra] Other parameters
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<boolean|WebhookResponse>}
   */
  pinChatMessage (chatId, messageId, extra, signal) {
    return this.callApi('pinChatMessage', { chat_id: chatId, message_id: messageId, ...extra }, { signal })
  }

  /**
   * Use this method to remove a message from the list of pinned messages in a chat.
   * If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have
   * the 'can_pin_messages' administrator right in a supergroup or 'can_edit_messages' administrator
   * right in a channel.
   *
   * Returns `True` on success or {@link WebhookResponse} when webhook response enabled.
   *
   * @see https://core.telegram.org/bots/api#unpinchatmessage
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {ExtraUnPinChatMessage} [extra] Other parameters
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<boolean|WebhookResponse>}
   */
  unpinChatMessage (chatId, extra, signal) {
    return this.callApi('unpinChatMessage', { chat_id: chatId, ...extra }, { signal })
  }

  /**
   * Use this method to clear the list of pinned messages in a chat.
   * If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must
   * have the 'can_pin_messages' administrator right in a supergroup or 'can_edit_messages' administrator
   * right in a channel.
   *
   * Returns `True` on success or {@link WebhookResponse} when webhook response enabled.
   *
   * @see https://core.telegram.org/bots/api#unpinallchatmessages
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<boolean|WebhookResponse>}
   */
  unpinAllChatMessages (chatId, signal) {
    return this.callApi('unpinAllChatMessages', { chat_id: chatId }, { signal })
  }

  /**
   * Use this method to get the current value of the bot's menu button in a private chat,
   * or the default menu button.
   *
   * Returns {@link MenuButton} on success.
   *
   * @see https://core.telegram.org/bots/api#getchatmenubutton
   * @param {number|string} [chatId] Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<MenuButton>}
   */
  getChatMenuButton (chatId, signal) {
    return this.callApi('getChatMenuButton', { chat_id: chatId }, { signal })
  }

  /**
   * Use this method to change the bot's menu button in a private chat, or the default menu button.
   *
   * Returns `True` on success or {@link WebhookResponse} when webhook response enabled.
   *
   * @see https://core.telegram.org/bots/api#setchatmenubutton
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {MenuButton} [menuButton] Unique identifier for the target private chat.
   *    If not specified, default bot's menu button will be changed
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<boolean|WebhookResponse>}
   */
  setChatMenuButton (chatId, menuButton, signal) {
    return this.callApi('setChatMenuButton', { chat_id: chatId, menu_button: menuButton }, { signal })
  }

  /**
   * Use this method to change the default administrator rights requested by the bot when it's added as
   * an administrator to groups or channels. These rights will be suggested to users, but they are free to modify
   * the list before adding the bot.
   *
   * Returns `True` on success or {@link WebhookResponse} when webhook response enabled.
   * https://core.telegram.org/bots/api#setmydefaultadministratorrights
   *
   * @param {ChatAdministratorRights} [rights] Object describing new default administrator rights.
   * If not specified, the default administrator rights will be cleared.
   * @param {boolean} [forChannels] Pass True to change the default administrator rights of the bot in channels.
   *    Otherwise, the default administrator rights of the bot for groups and supergroups will be changed.
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<boolean|WebhookResponse>}
   */
  setMyDefaultAdministratorRights (rights, forChannels, signal) {
    return this.callApi('setMyDefaultAdministratorRights', { rights, for_channels: forChannels }, { signal })
  }

  /**
   * Use this method to get the current default administrator rights of the bot.
   *
   * Returns {@link ChatAdministratorRights} on success.
   *
   * @see https://core.telegram.org/bots/api#getmydefaultadministratorrights
   * @param {boolean} [forChannels] Pass True to get default administrator rights of the bot in channels.
   *    Otherwise, default administrator rights of the bot for groups and supergroups will be returned.
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<ChatAdministratorRights>}
   */
  getMyDefaultAdministratorRights (forChannels, signal) {
    return this.callApi('getMyDefaultAdministratorRights', { for_channels: forChannels }, { signal })
  }

  /**
   * Use this method for your bot to leave a group, supergroup or channel.
   *
   * Returns `True` on success or {@link WebhookResponse} when webhook response enabled.
   *
   * @see https://core.telegram.org/bots/api#leavechat
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<boolean|WebhookResponse>}
   */
  leaveChat (chatId, signal) {
    return this.callApi('leaveChat', { chat_id: chatId }, { signal })
  }

  /**
   * Use this method to unban a previously banned user in a supergroup or channel. The user will **not** return
   * to the group or channel automatically, but will be able to join via link, etc. The bot must be an administrator
   * for this to work. By default, this method guarantees that after the call the user is not a member of the chat,
   * but will be able to join it. So if the user is a member of the chat they will also be **removed** from the chat.
   * If you don't want this, use the parameter `only_if_banned`.
   *
   * Returns `True` on success or {@link WebhookResponse} when webhook response enabled.
   *
   * @see https://core.telegram.org/bots/api#unbanchatmember
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {number} userId Unique identifier of the target user
   * @param {ExtraUnbanMember} [extra] Other parameters
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<boolean|WebhookResponse>}
   */
  unbanChatMember (chatId, userId, extra, signal) {
    return this.callApi('unbanChatMember', { chat_id: chatId, user_id: userId, ...extra }, { signal })
  }

  /**
   * Use this method to send answers to callback queries sent from
   * [inline keyboards](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating).
   * The answer will be displayed to the user as a notification at the top of the chat screen or as an alert.
   *
   * Returns `True` on success or {@link WebhookResponse} when webhook response enabled.
   *
   * Alternatively, the user can be redirected to the specified Game URL. For this option to work, you must first
   * create a game for your bot via [@BotFather](https://t.me/BotFather) and accept the terms.
   * Otherwise, you may use links like `t.me/your_bot?start=XXXX` that open your bot with a parameter.
   *
   * @see https://core.telegram.org/bots/api#answercallbackquery
   * @param {string} [callbackQueryId] Unique identifier for the query to be answered
   * @param {string} [text] Text of the notification. If not specified, nothing will be shown to the user, 0-200
   *   characters
   * @param {boolean} [showAlert] If True, an alert will be shown by the client instead of a notification at the top of
   *   the chat screen. Defaults to false.
   * @param {ExtraAnswerCbQuery} [extra] Other parameters
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<boolean|WebhookResponse>}
   */
  answerCbQuery (callbackQueryId, text, showAlert, extra, signal) {
    return this.callApi('answerCallbackQuery', {
      text,
      show_alert: showAlert,
      callback_query_id: callbackQueryId,
      ...extra
    }, { signal })
  }

  /**
   * Alias to {@link answerCbQuery} for game query
   *
   * @see https://core.telegram.org/bots/api#answercallbackquery
   * @param {string} callbackQueryId Unique identifier for the query to be answered
   * @param {string} [url] URL that will be opened by the user's client. If you have created a Game and accepted the
   *   conditions via [@BotFather](https://t.me/BotFather), specify the URL that opens your game - note that this will
   *   only work if the query comes from a `callback_game` button.
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise}
   */
  answerGameQuery (callbackQueryId, url, signal) {
    return this.callApi('answerCallbackQuery', {
      url,
      callback_query_id: callbackQueryId
    }, { signal })
  }

  /**
   * If you sent an invoice requesting a shipping address and the parameter `is_flexible` was specified,
   * the Bot API will send an Update with a `shipping_query` field to the bot. Use this method to reply to shipping
   * queries.
   *
   * Returns `True` on success or {@link WebhookResponse} when webhook response enabled.
   *
   * @see https://core.telegram.org/bots/api#answershippingquery
   * @param {string} shippingQueryId Unique identifier for the query to be answered
   * @param {boolean} ok Specify True if delivery to the specified address is possible and False if there are any
   *   problems
   *    (for example, if delivery to the specified address is not possible)
   * @param {ShippingOption[]} [shippingOptions] Required if ok is True. Array of available shipping options.
   * @param {string} [errorMessage] Required if ok is False. Error message in human-readable form that explains why it
   *    is impossible to complete the order (e.g. "Sorry, delivery to your desired address is unavailable").
   *    Telegram will display this message to the user.
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<boolean|WebhookResponse>}
   */
  answerShippingQuery (shippingQueryId, ok, shippingOptions, errorMessage, signal) {
    return this.callApi('answerShippingQuery', {
      ok,
      shipping_query_id: shippingQueryId,
      shipping_options: shippingOptions,
      error_message: errorMessage
    }, { signal })
  }

  /**
   * Once the user has confirmed their payment and shipping details, the Bot API sends the final confirmation in the
   * form of an {@link Update} with the field `pre_checkout_query`.
   * Use this method to respond to such pre-checkout queries.
   *
   * Returns `True` on success or {@link WebhookResponse} when webhook response enabled.
   *
   * **Note:** The Bot API must receive an answer within 10 seconds after
   * the pre-checkout query was sent.
   *
   * @see https://core.telegram.org/bots/api#answerprecheckoutquery
   * @param {string} preCheckoutQueryId Unique identifier for the query to be answered
   * @param {boolean} ok Specify True if everything is alright (goods are available, etc.) and the bot is ready to
   *   proceed with the order. Use False if there are any problems.
   * @param {string} [errorMessage] Required if ok is False. Error message in human readable form that explains the
   *   reason for failure to proceed with the checkout (e.g. "Sorry, somebody just bought the last of our amazing black
   *   T-shirts while you were busy filling out your payment details. Please choose a different color or garment!").
   *   Telegram will display this message to the user.
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<boolean|WebhookResponse>}
   */
  answerPreCheckoutQuery (preCheckoutQueryId, ok, errorMessage, signal) {
    return this.callApi('answerPreCheckoutQuery', {
      ok,
      pre_checkout_query_id: preCheckoutQueryId,
      error_message: errorMessage
    }, { signal })
  }

  /**
   * Use this method to edit text and game messages.
   *
   * On success, if the edited message is not an inline message, the edited {@link Message} is returned,
   * otherwise `True` is returned.
   *
   * @see https://core.telegram.org/bots/api#editmessagetext
   * @param {number|string} [chatId] Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {number} [messageId] Required if `inline_message_id` is not specified. Identifier of the message to edit
   * @param {string} [inlineMessageId] Required if `chat_id` and `message_id` are not specified. Identifier of the
   *   inline message
   * @param {string} text New text of the message, 1-4096 characters after entities parsing
   * @param {ExtraEditMessageText|Extra} [extra] Other parameters
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<boolean|Message>}
   */
  editMessageText (chatId, messageId, inlineMessageId, text, extra, signal) {
    return this.callApi('editMessageText', {
      text,
      chat_id: chatId,
      message_id: messageId,
      inline_message_id: inlineMessageId,
      ...extra
    }, { signal })
  }

  /**
   * Use this method to edit captions of messages.
   *
   * On success, if the edited message is not an inline message, the edited {@link Message} is returned,
   * otherwise `True` is returned.
   *
   * @see https://core.telegram.org/bots/api#editmessagecaption
   * @param {number|string} [chatId] Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {number} [messageId] Required if `inline_message_id` is not specified. Identifier of the message to edit
   * @param {string} [inlineMessageId] Required if `chat_id` and `message_id` are not specified.
   *    Identifier of the inline message
   * @param {string} [caption] New caption of the message, 0-1024 characters after entities parsing
   * @param {ExtraEditMessageCaption|Extra} [extra] Other parameters
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<boolean|Message>}
   */
  editMessageCaption (chatId, messageId, inlineMessageId, caption, extra, signal) {
    return this.callApi('editMessageCaption', {
      caption,
      chat_id: chatId,
      message_id: messageId,
      inline_message_id: inlineMessageId,
      ...extra
    }, { signal })
  }

  /**
   * Use this method to edit animation, audio, document, photo, or video messages.
   * If a message is part of a message album, then it can be edited only to an audio for audio albums,
   * only to a document for document albums and to a photo or a video otherwise. When an inline message is edited,
   * a new file can't be uploaded; use a previously uploaded file via its `file_id` or specify a URL.
   *
   * On success, if the edited message is not an inline message, the edited {@link Message} is returned,
   * otherwise `True` is returned.
   *
   * @see https://core.telegram.org/bots/api#editmessagemedia
   * @param {number|string} [chatId] Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {number} [messageId] Required if `inline_message_id` is not specified. Identifier of the message to edit
   * @param {string} [inlineMessageId] Required if `chat_id` and `message_id` are not specified. Identifier of the
   *   inline message
   * @param {InputMedia} media Object for a new media content of the message
   * @param {ExtraEditMessageMedia|Extra} [extra] Other parameters
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<boolean|Message>}
   */
  editMessageMedia (chatId, messageId, inlineMessageId, media, extra = {}, signal) {
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
    }, { signal })
  }

  /**
   * Use this method to edit only the reply markup of messages.
   *
   * On success, if the edited message is not an inline message, the edited {@link Message} is
   * returned, otherwise `True` is returned.
   *
   * @see https://core.telegram.org/bots/api#editmessagereplymarkup
   * @param {number|string} [chatId] Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {number} [messageId] Required if `inline_message_id` is not specified. Identifier of the message to edit
   * @param {string} [inlineMessageId] Required if `chat_id` and `message_id` are not specified. Identifier of the
   *   inline message
   * @param {ExtraEditMessageReplyMarkup|Extra} [extra] Other parameters
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<boolean|Message>}
   */
  editMessageReplyMarkup (chatId, messageId, inlineMessageId, extra, signal) {
    return this.callApi('editMessageReplyMarkup', {
      chat_id: chatId,
      message_id: messageId,
      inline_message_id: inlineMessageId,
      ...extra
    }, { signal })
  }

  /**
   * Use this method to edit live location messages. A location can be edited until its `live_period` expires or editing
   * is explicitly disabled by a call to {@link stopMessageLiveLocation}.
   *
   * On success, if the edited message is not an inline message, the edited {@link Message} is returned,
   * otherwise `True` is returned.
   *
   * @see https://core.telegram.org/bots/api#editmessagelivelocation
   * @param {number|string} [chatId] Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {number} [messageId] Required if `inline_message_id` is not specified. Identifier of the message to edit
   * @param {string} [inlineMessageId] Required if `chat_id` and `message_id` are not specified.
   *    Identifier of the inline message
   * @param {number} latitude Latitude of new location
   * @param {number} longitude Longitude of new location
   * @param {ExtraEditMessageLiveLocation|Extra} [extra] Other parameters
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<boolean|Message>}
   */
  editMessageLiveLocation (chatId, messageId, inlineMessageId, latitude, longitude, extra, signal) {
    return this.callApi('editMessageLiveLocation', {
      chat_id: chatId,
      message_id: messageId,
      inline_message_id: inlineMessageId,
      latitude,
      longitude,
      ...extra
    }, { signal })
  }

  /**
   * Use this method to edit live location messages. A location can be edited until its `live_period` expires or
   * editing is explicitly disabled by a call to {@link stopMessageLiveLocation}.
   *
   * On success, if the edited message is not an inline message, the edited {@link Message} is returned,
   * otherwise `True` is returned.
   *
   * @see https://core.telegram.org/bots/api#stopmessagelivelocation
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {number} [messageId] Required if `inline_message_id` is not specified. Identifier of the message with
   *    live location to stop
   * @param {string} [inlineMessageId] Required if `chat_id` and `message_id` are not specified. Identifier of the
   *   inline message
   * @param {ExtraStopMessageLiveLocation|Extra} [extra] Other parameters
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<boolean|Message>}
   */
  stopMessageLiveLocation (chatId, messageId, inlineMessageId, extra, signal) {
    return this.callApi('stopMessageLiveLocation', {
      chat_id: chatId,
      message_id: messageId,
      inline_message_id: inlineMessageId,
      ...extra
    }, { signal })
  }

  /**
   * Use this method to delete a message, including service messages, with the following limitations:
   * - A message can only be deleted if it was sent less than 48 hours ago.
   * - A dice message in a private chat can only be deleted if it was sent more than 24 hours ago.
   * - Bots can delete outgoing messages in private chats, groups, and supergroups.
   * - Bots can delete incoming messages in private chats.
   * - Bots granted can_post_messages permissions can delete outgoing messages in channels.
   * - If the bot is an administrator of a group, it can delete any message there.
   * - If the bot has can_delete_messages permission in a supergroup or a channel, it can delete any message there.
   *
   * Returns `True` on success or {@link WebhookResponse} when webhook response enabled.
   *
   * @see https://core.telegram.org/bots/api#deletemessage
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {number} messageId Identifier of the message to delete
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<boolean|WebhookResponse>}
   */
  deleteMessage (chatId, messageId, signal) {
    return this.callApi('deleteMessage', {
      chat_id: chatId,
      message_id: messageId
    }, { signal })
  }

  /**
   * Use this method to set a new group sticker set for a supergroup. The bot must be an administrator in the chat
   * for this to work and must have the appropriate administrator rights.
   * Use the field `can_set_sticker_set` optionally returned in {@link getChat} requests to check if the
   * bot can use this method.
   *
   * Returns `True` on success or {@link WebhookResponse} when webhook response enabled.
   *
   * @see https://core.telegram.org/bots/api#setchatstickerset
   * @param {string|number} chatId Unique identifier for the target chat or username of the target supergroup
   *    (in the format `@supergroupusername`)
   * @param {string} setName Name of the sticker set to be set as the group sticker set
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<boolean|WebhookResponse>}
   */
  setChatStickerSet (chatId, setName, signal) {
    return this.callApi('setChatStickerSet', {
      chat_id: chatId,
      sticker_set_name: setName
    }, { signal })
  }

  /**
   * Use this method to delete a group sticker set from a supergroup. The bot must be an administrator in the chat for
   * this to work and must have the appropriate administrator rights. Use the field `can_set_sticker_set` optionally
   * returned in {@link getChat} requests to check if the bot can use this method.
   *
   * Returns `True` on success or {@link WebhookResponse} when webhook response enabled.
   *
   * @see https://core.telegram.org/bots/api#deletechatstickerset
   * @param {number|string} chatId Unique identifier for the target chat or username of the target supergroup
   *    (in the format `@supergroupusername`)
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<boolean|WebhookResponse>}
   */
  deleteChatStickerSet (chatId, signal) {
    return this.callApi('deleteChatStickerSet', { chat_id: chatId }, { signal })
  }

  /**
   * Use this method to get custom emoji stickers, which can be used as a forum topic icon by any user.
   * Requires no parameters.
   *
   * Returns an Array of {@link Sticker} objects.
   *
   * @see https://core.telegram.org/bots/api#getforumtopiciconstickers
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<Sticker[]>}
   */
  getForumTopicIconStickers (signal) {
    return this.callApi('getForumTopicIconStickers', {}, { signal })
  }

  /**
   * Use this method to create a topic in a forum supergroup chat. The bot must be an administrator in the chat for this
   * to work and must have the can_manage_topics administrator rights.
   *
   * Returns information about the created topic as a {@link ForumTopic} object.
   *
   * @see https://core.telegram.org/bots/api#createforumtopic
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *   (in the format `@channelusername`)
   * @param {string} name Topic name, 1-128 characters
   * @param {ExtraCreateForumTopic} [extra] Other parameters
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<ForumTopic>}
   */
  createForumTopic (chatId, name, extra, signal) {
    return this.callApi('createForumTopic', { chat_id: chatId, name, ...extra }, { signal })
  }

  /**
   * Use this method to edit name and icon of a topic in a forum supergroup chat. The bot must be an administrator in
   * the chat for this to work and must have can_manage_topics administrator rights, unless it is the creator of the
   * topic.
   *
   * Returns `True` on success or {@link WebhookResponse} when webhook response enabled.
   *
   * @see https://core.telegram.org/bots/api#editforumtopic
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *   (in the format `@channelusername`)
   * @param {number} messageThreadId Unique identifier for the target message thread of the forum topic
   * @param {ExtraEditForumTopic} [extra] Other parameters
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<boolean|WebhookResponse>}
   */
  editForumTopic (chatId, messageThreadId, extra, signal) {
    return this.callApi('editForumTopic', {
      chat_id: chatId,
      message_thread_id: messageThreadId,
      ...extra
    }, { signal })
  }

  /**
   * Use this method to edit the name of the 'General' topic in a forum supergroup chat. The bot must be an
   * administrator in the chat for this to work and must have `can_manage_topics` administrator rights.
   *
   * Returns `True` on success or {@link WebhookResponse} when webhook response enabled.
   *
   * @see https://core.telegram.org/bots/api#editgeneralforumtopic
   * @param {number|string} chatId Unique identifier for the target chat or username of the target supergroup
   *   (in the format `@supergroupusername`)
   * @param {string} name New topic name, 1-128 characters
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<boolean|WebhookResponse>}
   */
  editGeneralForumTopic (chatId, name, signal) {
    return this.callApi('editGeneralForumTopic', {
      chat_id: chatId,
      name
    }, { signal })
  }

  /**
   * Use this method to close an open 'General' topic in a forum supergroup chat. The bot must be an administrator in
   * the chat for this to work and must have the `can_manage_topics` administrator rights.
   *
   * Returns `True` on success or {@link WebhookResponse} when webhook response enabled.
   *
   * @see https://core.telegram.org/bots/api#closegeneralforumtopic
   * @param {number|string} chatId Unique identifier for the target chat or username of the target supergroup
   *   (in the format `@supergroupusername`)
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<boolean|WebhookResponse>}
   */
  closeGeneralForumTopic (chatId, signal) {
    return this.callApi('closeGeneralForumTopic', {
      chat_id: chatId
    }, { signal })
  }

  /**
   * Use this method to reopen a closed 'General' topic in a forum supergroup chat. The bot must be an administrator
   * in the chat for this to work and must have the `can_manage_topics` administrator rights.
   * The topic will be automatically unhidden if it was hidden.
   *
   * Returns `True` on success or {@link WebhookResponse} when webhook response enabled.
   *
   * @see https://core.telegram.org/bots/api#reopengeneralforumtopic
   * @param {number|string} chatId Unique identifier for the target chat or username of the target supergroup
   *   (in the format `@supergroupusername`)
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<boolean|WebhookResponse>}
   */
  reopenGeneralForumTopic (chatId, signal) {
    return this.callApi('reopenGeneralForumTopic', {
      chat_id: chatId
    }, { signal })
  }

  /**
   * Use this method to hide the 'General' topic in a forum supergroup chat. The bot must be an administrator in the
   * chat for this to work and must have the `can_manage_topics` administrator rights.
   * The topic will be automatically closed if it was open.
   *
   * Returns `True` on success or {@link WebhookResponse} when webhook response enabled.
   *
   * @see https://core.telegram.org/bots/api#hidegeneralforumtopic
   * @param {number|string} chatId Unique identifier for the target chat or username of the target supergroup
   *   (in the format `@supergroupusername`)
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<boolean|WebhookResponse>}
   */
  hideGeneralForumTopic (chatId, signal) {
    return this.callApi('hideGeneralForumTopic', {
      chat_id: chatId
    }, { signal })
  }

  /**
   * Use this method to unhide the 'General' topic in a forum supergroup chat. The bot must be an administrator
   * in the chat for this to work and must have the `can_manage_topics` administrator rights.
   *
   * Returns `True` on success or {@link WebhookResponse} when webhook response enabled.
   *
   * @see https://core.telegram.org/bots/api#unhidegeneralforumtopic
   * @param {number|string} chatId Unique identifier for the target chat or username of the target supergroup
   *   (in the format `@supergroupusername`)
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<boolean|WebhookResponse>}
   */
  unhideGeneralForumTopic (chatId, signal) {
    return this.callApi('unhideGeneralForumTopic', {
      chat_id: chatId
    }, { signal })
  }

  /**
   * Use this method to close an open topic in a forum supergroup chat. The bot must be an administrator in the chat
   * for this to work and must have the `can_manage_topics` administrator rights, unless it is the creator of the topic.
   *
   * Returns `True` on success or {@link WebhookResponse} when webhook response enabled.
   *
   * @see https://core.telegram.org/bots/api#closeforumtopic
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *   (in the format @channelusername)
   * @param {number} messageThreadId Unique identifier for the target message thread of the forum topic
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<boolean|WebhookResponse>}
   */
  closeForumTopic (chatId, messageThreadId, signal) {
    return this.callApi('closeForumTopic', {
      chat_id: chatId,
      message_thread_id: messageThreadId
    }, { signal })
  }

  /**
   * Use this method to reopen a closed topic in a forum supergroup chat. The bot must be an administrator in the chat
   * for this to work and must have the can_manage_topics administrator rights, unless it is the creator of the topic.
   *
   * Returns `True` on success or {@link WebhookResponse} when webhook response enabled.
   *
   * @see https://core.telegram.org/bots/api#reopenforumtopic
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *   (in the format @channelusername)
   * @param {number} messageThreadId Unique identifier for the target message thread of the forum topic
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<boolean|WebhookResponse>}
   */
  reopenForumTopic (chatId, messageThreadId, signal) {
    return this.callApi('reopenForumTopic', {
      chat_id: chatId,
      message_thread_id: messageThreadId
    }, { signal })
  }

  /**
   * Use this method to delete a forum topic along with all its messages in a forum supergroup chat. The bot must be an
   * administrator in the chat for this to work and must have the can_delete_messages administrator rights.
   *
   * Returns `True` on success or {@link WebhookResponse} when webhook response enabled.
   *
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *   (in the format @channelusername)
   * @param {number} messageThreadId Unique identifier for the target message thread of the forum topic
   * @see https://core.telegram.org/bots/api#deleteforumtopic
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<boolean|WebhookResponse>}
   */
  deleteForumTopic (chatId, messageThreadId, signal) {
    return this.callApi('deleteForumTopic', {
      chat_id: chatId,
      message_thread_id: messageThreadId
    }, { signal })
  }

  /**
   * Use this method to clear the list of pinned messages in a forum topic. The bot must be an administrator in the chat
   * for this to work and must have the can_pin_messages administrator right in the supergroup.
   *
   * Returns `True` on success or {@link WebhookResponse} when webhook response enabled.
   *
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *   (in the format @channelusername)
   * @param {number} messageThreadId Unique identifier for the target message thread of the forum topic
   * @see https://core.telegram.org/bots/api#unpinallforumtopicmessages
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<boolean|WebhookResponse>}
   */
  unpinAllForumTopicMessages (chatId, messageThreadId, signal) {
    return this.callApi('unpinAllForumTopicMessages', {
      chat_id: chatId,
      message_thread_id: messageThreadId
    }, { signal })
  }

  /**
   * Use this method to get a sticker set.
   *
   * On success, a {@link StickerSet} object is returned.
   *
   * @see https://core.telegram.org/bots/api#getstickerset
   * @param {string} name Name of the sticker set
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<StickerSet>}
   */
  getStickerSet (name, signal) {
    return this.callApi('getStickerSet', { name }, { signal })
  }

  /**
   * Use this method to upload a .PNG file with a sticker for later use in
   * {@link Telegram#createNewStickerSet createNewStickerSet} and {@link Telegram.addStickerToSet addStickerToSet}
   * methods (can be used multiple times).
   *
   * Returns the uploaded {@link File} on success.
   *
   * @see https://core.telegram.org/bots/api#uploadstickerfile
   * @param {number} ownerId User identifier of sticker file owner
   * @param {InputSticker} sticker **PNG** image with the sticker, must be up to 512 kilobytes in size,
   *    dimensions must not exceed 512px, and either width or height must be exactly 512px.
   *    [More information on Sending Files »](https://core.telegram.org/bots/api#sending-files).
   * @param {ExtraUploadStickerFile} extra Other parameters
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<File>}
   */
  uploadStickerFile (ownerId, sticker, extra, signal) {
    return this.callApi('uploadStickerFile', {
      user_id: ownerId,
      sticker,
      ...extra
    }, { signal })
  }

  /**
   * Use this method to set the thumbnail of a custom emoji sticker set.
   *
   * Returns `True` on success or {@link WebhookResponse} when webhook response enabled.
   *
   * @see https://core.telegram.org/bots/api#setcustomemojistickersetthumbnail
   * @param {string} name Sticker set name
   * @param {string} [customEmojiId] Custom emoji identifier of a sticker from the sticker set; pass an empty string
   *   to drop the thumbnail and use the first sticker as the thumbnail.
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<boolean|WebhookResponse>}
   */
  setCustomEmojiStickerSetThumbnail (name, customEmojiId, signal) {
    return this.callApi('setCustomEmojiStickerSetThumbnail', {
      name,
      custom_emoji_id: customEmojiId
    }, { signal })
  }

  /**
   * Use this method to set the title of a created sticker set.
   *
   * Returns `True` on success or {@link WebhookResponse} when webhook response enabled.
   *
   * @see https://core.telegram.org/bots/api#setstickersettitle
   * @param {string} name Sticker set name
   * @param {string} title Sticker set title, 1-64 characters
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<boolean|WebhookResponse>}
   */
  setStickerSetTitle (name, title, signal) {
    return this.callApi('setStickerSetTitle', { name, title }, { signal })
  }

  /**
   * Use this method to delete a sticker set that was created by the bot.
   *
   * Returns `True` on success or {@link WebhookResponse} when webhook response enabled.
   *
   * @see https://core.telegram.org/bots/api#deletestickerset
   * @param {string} name Sticker set name
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<boolean|WebhookResponse>}
   */
  deleteStickerSet (name, signal) {
    return this.callApi('deleteStickerSet', { name }, { signal })
  }

  /**
   * Use this method to change the list of emoji assigned to a regular or custom emoji sticker.
   * The sticker must belong to a sticker set created by the bot.
   *
   * Returns `True` on success or {@link WebhookResponse} when webhook response enabled.
   *
   * @see https://core.telegram.org/bots/api#setstickeremojilist
   * @param {FileId} sticker File identifier of the sticker
   * @param {string[]} emojiList A JSON-serialized list of 1-20 emoji associated with the sticker
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<boolean|WebhookResponse>}
   */
  setStickerEmojiList (sticker, emojiList, signal) {
    return this.callApi('setStickerEmojiList', { sticker, emoji_list: emojiList }, { signal })
  }

  /**
   * Use this method to change search keywords assigned to a regular or custom emoji sticker.
   * The sticker must belong to a sticker set created by the bot.
   *
   * Returns `True` on success or {@link WebhookResponse} when webhook response enabled.
   *
   * @see https://core.telegram.org/bots/api#setstickerkeywords
   * @param {FileId} sticker File identifier of the sticker
   * @param {string[]} [keywords] A JSON-serialized list of 0-20 search keywords for the sticker with total
   *   length of up to 64 characters
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<boolean|WebhookResponse>}
   */
  setStickerKeywords (sticker, keywords, signal) {
    return this.callApi('setStickerKeywords', { sticker, keywords }, { signal })
  }

  /**
   * Use this method to change the [mask position](https://core.telegram.org/bots/api#maskposition) of a mask sticker.
   * The sticker must belong to a sticker set that was created by the bot.
   *
   * Returns `True` on success or {@link WebhookResponse} when webhook response enabled.
   *
   * @see https://core.telegram.org/bots/api#setstickermaskposition
   * @param {FileId} sticker File identifier of the sticker
   * @param {MaskPosition} [maskPosition] A JSON-serialized object with the position where the mask should be
   *   placed on faces. Omit the parameter to remove the mask position.
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<boolean|WebhookResponse>}
   */
  setStickerMaskPosition (sticker, maskPosition, signal) {
    return this.callApi('setStickerMaskPosition', { sticker, mask_position: maskPosition }, { signal })
  }

  /**
   * Use this method to create a new sticker set owned by a user. The bot will be able to edit the sticker set
   * thus created. You must use exactly one of the fields `png_sticker`, `tgs_sticker`, or `webm_sticker`.
   *
   * Returns `True` on success or {@link WebhookResponse} when webhook response enabled.
   *
   * @see https://core.telegram.org/bots/api#createnewstickerset
   * @param {number} ownerId User identifier of created sticker set owner
   * @param {string} name Short name of sticker set, to be used in `t.me/addstickers/` URLs (e.g., *animals*).
   *    Can contain only English letters, digits and underscores. Must begin with a letter,
   *    can't contain consecutive underscores and must end in `"_by_<bot_username>"`. `<bot_username>`
   *    is case insensitive. 1-64 characters.
   * @param {string} title Sticker set title, 1-64 characters
   * @param {ExtraCreateNewStickerSet} extra Other parameters
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<boolean|WebhookResponse>}
   */
  createNewStickerSet (ownerId, name, title, extra, signal) {
    return this.callApi('createNewStickerSet', {
      name,
      title,
      user_id: ownerId,
      ...extra
    }, { signal })
  }

  /**
   * Use this method to add a new sticker to a set created by the bot.
   * You **must** use exactly one of the fields `png_sticker`, `tgs_sticker`, or `webm_sticker`.
   * Animated stickers can be added to animated sticker sets and only to them.
   * Animated sticker sets can have up to 50 stickers. Static sticker sets can have up to 120 stickers.
   *
   * Returns `True` on success or {@link WebhookResponse} when webhook response enabled.
   *
   * @see https://core.telegram.org/bots/api#addstickertoset
   * @param {number} ownerId User identifier of sticker set owner
   * @param {string} name Sticker set name
   * @param {ExtraAddStickerToSet} extra Other parameters
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<boolean|WebhookResponse>}
   */
  addStickerToSet (ownerId, name, extra, signal) {
    return this.callApi('addStickerToSet', {
      name,
      user_id: ownerId,
      ...extra
    }, { signal })
  }

  /**
   * Use this method to move a sticker in a set created by the bot to a specific position.
   *
   * Returns `True` on success or {@link WebhookResponse} when webhook response enabled.
   *
   * @see https://core.telegram.org/bots/api#setstickerpositioninset
   * @param {string} sticker File identifier of the sticker
   * @param {number} position New sticker position in the set, zero-based
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<boolean|WebhookResponse>}
   */
  setStickerPositionInSet (sticker, position, signal) {
    return this.callApi('setStickerPositionInSet', {
      sticker,
      position
    }, { signal })
  }

  /**
   * Use this method to set the thumbnail of a sticker set. Animated thumbnails can be set for animated sticker
   * sets only. Video thumbnails can be set only for video sticker sets only.
   *
   * Returns `True` on success or {@link WebhookResponse} when webhook response enabled.
   *
   * @see https://core.telegram.org/bots/api#setstickersetthumbnail
   * @deprecated Use {@link Telegram#setStickerSetThumbnail}. Renamed after Bots API 6.6
   * @param {string} name Sticker set name
   * @param {number} userId User identifier of the sticker set owner
   * @param {InputFile|FileId} [thumbnail] A **PNG** image with the thumbnail, must be up to 128 kilobytes in size and have
   *   width and height exactly 100px, or a **TGS** animation with the thumbnail up to 32 kilobytes in size; see
   *   https://core.telegram.org/stickers#animated-sticker-requirements for animated sticker technical requirements, or
   *   a **WEBM** video with the thumbnail up to 32 kilobytes in size; see
   *   https://core.telegram.org/stickers#video-sticker-requirements for video sticker technical requirements. Pass a
   *   file_id as a String to send a file that already exists on the Telegram servers, pass an HTTP URL as a String for
   *   Telegram to get a file from the Internet, or upload a new one using multipart/form-data.
   *    [More information on Sending Files »](https://core.telegram.org/bots/api#sending-files).
   *    Animated sticker set thumbnails can't be uploaded via HTTP URL.
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<boolean|WebhookResponse>}
   */
  setStickerSetThumb (name, userId, thumbnail, signal) {
    return this.setStickerSetThumbnail(name, userId, thumbnail, signal)
  }

  /**
   * Use this method to set the thumbnail of a sticker set. Animated thumbnails can be set for animated sticker
   * sets only. Video thumbnails can be set only for video sticker sets only.
   *
   * Returns `True` on success or {@link WebhookResponse} when webhook response enabled.
   *
   * @see https://core.telegram.org/bots/api#setstickersetthumbnail
   * @param {string} name Sticker set name
   * @param {number} userId User identifier of the sticker set owner
   * @param {InputFile|FileId} [thumbnail] A **PNG** image with the thumbnail, must be up to 128 kilobytes in size and have
   *   width and height exactly 100px, or a **TGS** animation with the thumbnail up to 32 kilobytes in size; see
   *   https://core.telegram.org/stickers#animated-sticker-requirements for animated sticker technical requirements, or
   *   a **WEBM** video with the thumbnail up to 32 kilobytes in size; see
   *   https://core.telegram.org/stickers#video-sticker-requirements for video sticker technical requirements. Pass a
   *   file_id as a String to send a file that already exists on the Telegram servers, pass an HTTP URL as a String for
   *   Telegram to get a file from the Internet, or upload a new one using multipart/form-data.
   *    [More information on Sending Files »](https://core.telegram.org/bots/api#sending-files).
   *    Animated sticker set thumbnails can't be uploaded via HTTP URL.
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<boolean|WebhookResponse>}
   */
  setStickerSetThumbnail (name, userId, thumbnail, signal) {
    return this.callApi('setStickerSetThumbnail', { name, user_id: userId, thumbnail }, { signal })
  }

  /**
   * Use this method to delete a sticker from a set created by the bot.
   *
   * Returns `True` on success or {@link WebhookResponse} when webhook response enabled.
   *
   * @see https://core.telegram.org/bots/api#deletestickerfromset
   * @param {string} sticker File identifier of the sticker
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<boolean|WebhookResponse>}
   */
  deleteStickerFromSet (sticker, signal) {
    return this.callApi('deleteStickerFromSet', { sticker }, { signal })
  }

  /**
   * Use this method to get the current list of the bot's commands for the given scope and user language.
   *
   * Returns Array of {@link BotCommand} on success. If commands aren't set, an empty list is returned.
   *
   * @see https://core.telegram.org/bots/api#getmycommands
   * @param {ExtraGetMyCommands} [extra] Other parameters
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<BotCommand[]>}
   */
  getMyCommands (extra, signal) {
    return this.callApi('getMyCommands', extra, { signal })
  }

  /**
   * Use this method to change the list of the bot's commands. See
   * [https://core.telegram.org/bots#commands](https://core.telegram.org/bots#commands) for more details
   * about bot commands.
   *
   * Returns `True` on success or {@link WebhookResponse} when webhook response enabled.
   *
   * @see https://core.telegram.org/bots/api#setmycommands
   * @param {BotCommand[]} commands List of bot commands to be set as the list of the bot's commands.
   *    At most 100 commands can be specified.
   * @param {ExtraSetMyCommands} [extra] Other parameters
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<boolean|WebhookResponse>}
   */
  setMyCommands (commands, extra, signal) {
    return this.callApi('setMyCommands', { commands, ...extra }, { signal })
  }

  /**
   * Use this method to change the bot's description, which is shown in the chat with the bot if the chat is empty.
   *
   * Returns `True` on success or {@link WebhookResponse} when webhook response enabled.
   *
   * @see https://core.telegram.org/bots/api#setmydescription
   * @param {string} [description] New bot description; 0-512 characters. Pass an empty string to remove the dedicated
   *   description for the given language.
   * @param {string} [languageCode] A two-letter ISO 639-1 language code. If empty, the description will be applied to
   *   all users for whose language there is no dedicated description.
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<boolean|WebhookResponse>}
   */
  setMyDescription (description, languageCode, signal) {
    return this.callApi('setMyDescription', { description, language_code: languageCode }, { signal })
  }

  /**
   * Use this method to get the current bot description for the given user language.
   * Returns {@link BotDescription}` on success
   *
   * @see https://core.telegram.org/bots/api#getmydescription
   * @param {string} [languageCode] A two-letter ISO 639-1 language code or an empty string
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<BotDescription>}
   */
  getMyDescription (languageCode, signal) {
    return this.callApi('getMyDescription', { language_code: languageCode }, { signal })
  }

  /**
   * Use this method to change the bot's short description, which is shown on the bot's profile page and is sent
   * together with the link when users share the bot.
   *
   * Returns `True` on success or {@link WebhookResponse} when webhook response enabled.
   *
   * @see https://core.telegram.org/bots/api#setmyshortdescription
   * @param {string} [shortDescription] New short description for the bot; 0-120 characters. Pass an empty string to
   *   remove the dedicated short description for the given language.
   * @param {string} [languageCode] A two-letter ISO 639-1 language code. If empty, the short description will be
   *   applied to all users for whose language there is no dedicated short description.
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<boolean|WebhookResponse>}
   */
  setMyShortDescription (shortDescription, languageCode, signal) {
    return this.callApi('setMyShortDescription', {
      short_description: shortDescription,
      language_code: languageCode
    }, { signal })
  }

  /**
   * Use this method to get the current bot short description for the given user language.
   * Returns {@link BotShortDescription}` on success
   *
   * @see https://core.telegram.org/bots/api#getmyshortdescription
   * @param {string} [languageCode] A two-letter ISO 639-1 language code or an empty string
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<BotShortDescription>}
   */
  getMyShortDescription (languageCode, signal) {
    return this.callApi('getMyShortDescription', { language_code: languageCode }, { signal })
  }

  /**
   * Use this method to delete the list of the bot's commands for the given scope and user language.
   * After deletion, higher level commands will be shown to affected users.
   *
   * Returns `True` on success or {@link WebhookResponse} when webhook response enabled.
   *
   * @see https://core.telegram.org/bots/api#deletemycommands
   * @param {ExtraDeleteMyCommands} [extra] Other parameters
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<boolean|WebhookResponse>}
   */
  deleteMyCommands (extra, signal) {
    return this.callApi('deleteMyCommands', extra, { signal })
  }

  /**
   * Informs a user that some of the Telegram Passport elements they provided contains errors.
   * The user will not be able to re-submit their Passport to you until the errors are fixed
   * (the contents of the field for which you returned the error must change).
   *
   * Returns `True` on success or {@link WebhookResponse} when webhook response enabled.
   *
   * Use this if the data submitted by the user doesn't satisfy the standards your service requires for any reason.
   * For example, if a birthday date seems invalid, a submitted document is blurry, a scan shows evidence of tampering,
   * etc. Supply some details in the error message to make sure the user knows how to correct the issues.
   *
   * @see https://core.telegram.org/bots/api#setpassportdataerrors
   * @param {number} userId User identifier
   * @param {PassportElementError[]} errors Array describing the errors
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<boolean|WebhookResponse>}
   */
  setPassportDataErrors (userId, errors, signal) {
    return this.callApi('setPassportDataErrors', {
      user_id: userId,
      errors
    }, { signal })
  }

  /**
   *
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {Message} message Message object
   * @param {object|Extra} [extra] Extra parameters
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise}
   */
  sendCopy (chatId, message, extra, signal) {
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
    return this.callApi(replicators.copyMethods[type], opts, { signal })
  }

  /**
   * Use this method to copy messages of any kind. Service messages and invoice messages can't be copied.
   * The method is analogous to the method {@link forwardMessage}, but the copied message doesn't have a link to the
   * original message.
   *
   * Returns the {@link MessageId} of the sent message on success.
   *
   * @see https://core.telegram.org/bots/api#copymessage
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {number|string} fromChatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {number} messageId Message identifier in the chat specified in `from_chat_id`
   * @param {ExtraCopyMessage|Extra} [extra] Other parameters
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<MessageId>}
   */
  copyMessage (chatId, fromChatId, messageId, extra, signal) {
    return this.callApi('copyMessage', {
      chat_id: chatId,
      from_chat_id: fromChatId,
      message_id: messageId,
      ...extra
    }, { signal })
  }

  /**
   * Use this method to create an additional invite link for a chat. The bot must be an administrator in the chat for
   * this to work and must have the appropriate administrator rights. The link can be revoked using the method
   * {@link Telegram.revokeChatInviteLink revokeChatInviteLink}.
   *
   * Returns the new invite link as {@link ChatInviteLink} object.
   *
   * @see https://core.telegram.org/bots/api#createchatinvitelink
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {ExtraCreateChatInviteLink} [extra] Other parameters
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<ChatInviteLink>}
   */
  createChatInviteLink (chatId, extra, signal) {
    return this.callApi('createChatInviteLink', {
      chat_id: chatId,
      ...extra
    }, { signal })
  }

  /**
   * Use this method to edit a non-primary invite link created by the bot. The bot must be an administrator in the chat
   * for this to work and must have the appropriate administrator rights.
   *
   * Returns the edited invite link as a {@link ChatInviteLink} object.
   *
   * @see https://core.telegram.org/bots/api#editchatinvitelink
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {string} inviteLink The invite link to edit
   * @param {ExtraEditChatInviteLink} [extra] Other parameters
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<ChatInviteLink>}
   */
  editChatInviteLink (chatId, inviteLink, extra, signal) {
    return this.callApi('editChatInviteLink', {
      chat_id: chatId,
      invite_link: inviteLink,
      ...extra
    }, { signal })
  }

  /**
   * Use this method to revoke an invite link created by the bot. If the primary link is revoked, a new link is
   * automatically generated. The bot must be an administrator in the chat for this to work and must have the
   * appropriate administrator rights.
   *
   * Returns the revoked invite link as {@link ChatInviteLink} object.
   *
   * @see https://core.telegram.org/bots/api#revokechatinvitelink
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {string} inviteLink The invite link to revoke
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<ChatInviteLink>}
   */
  revokeChatInviteLink (chatId, inviteLink, signal) {
    return this.callApi('revokeChatInviteLink', {
      chat_id: chatId,
      invite_link: inviteLink
    }, { signal })
  }

  /**
   * Use this method to approve a chat join request. The bot must be an administrator in the chat for this to work
   * and must have the `can_invite_users` administrator right.
   *
   * Returns `True` on success or {@link WebhookResponse} when webhook response enabled.
   *
   * @see https://core.telegram.org/bots/api#approvechatjoinrequest
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {number} userId Unique identifier of the target user
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<boolean|WebhookResponse>}
   */
  approveChatJoinRequest (chatId, userId, signal) {
    return this.callApi('approveChatJoinRequest', {
      chat_id: chatId,
      user_id: userId
    }, { signal })
  }

  /**
   * Use this method to decline a chat join request. The bot must be an administrator in the chat for this to work
   * and must have the `can_invite_users` administrator right.
   *
   * Returns `True` on success or {@link WebhookResponse} when webhook response enabled.
   *
   * @see https://core.telegram.org/bots/api#declinechatjoinrequest
   * @param {number|string} chatId Unique identifier for the target chat or username of the target channel
   *    (in the format `@channelusername`)
   * @param {number} userId Unique identifier of the target user
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<boolean|WebhookResponse>}
   */
  declineChatJoinRequest (chatId, userId, signal) {
    return this.callApi('declineChatJoinRequest', {
      chat_id: chatId,
      user_id: userId
    }, { signal })
  }

  /**
   * Use this method to set the result of an interaction with a Web App and send a corresponding message on behalf
   * of the user to the chat from which the query originated.
   *
   * On success, a {@link SentWebAppMessage} object is returned.
   *
   * @param {string} webAppQueryId Unique identifier for the query to be answered
   * @param {InlineQueryResult} result A JSON-serialized object describing the message to be sent
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<SentWebAppMessage>}
   */
  answerWebAppQuery (webAppQueryId, result, signal) {
    return this.callApi('answerWebAppQuery', {
      web_app_query_id: webAppQueryId,
      result
    }, { signal })
  }

  /**
   * Use this method to get information about custom emoji stickers by their identifiers.
   *
   * Returns an Array of {@link Sticker} objects.
   *
   * @see https://core.telegram.org/bots/api#getcustomemojistickers
   * @param {string[]} customEmojiIds List of custom emoji identifiers. At most 200 custom emoji identifiers can be
   *    specified.
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<Sticker[]>}
   */
  getCustomEmojiStickers (customEmojiIds, signal) {
    return this.callApi('getCustomEmojiStickers', {
      custom_emoji_ids: customEmojiIds
    }, { signal })
  }

  /**
   * Use this method to create a link for an invoice.
   *
   * Returns the created invoice link as `String` on success.
   *
   * @see https://core.telegram.org/bots/api#createinvoicelink
   * @param {InvoiceLinkParams} invoice Object with invoice properties
   * @param {AbortSignal} [signal] Optional `AbortSignal` to cancel the request
   * @throws {TelegramError}
   * @return {Promise<string>}
   */
  createInvoiceLink (invoice, signal) {
    return this.callApi('createInvoiceLink', {
      ...invoice
    }, { signal })
  }
}

module.exports = Telegram

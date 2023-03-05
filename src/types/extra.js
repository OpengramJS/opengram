/**
 * @typedef {object} ExtraAnswerCbQuery
 * @see https://core.telegram.org/bots/api#answercallbackquery
 * @property {string} [url] *Optional*. URL that will be opened by the user's client. If you have created a
 *   [Game](https://core.telegram.org/bots/api#game) and accepted the conditions via
 *   [@BotFather](https://t.me/botfather), specify the URL that opens your game - note that this will only work if
 *   the query comes from a [callback_game](https://core.telegram.org/bots/api#inlinekeyboardbutton) button.
 *   Otherwise, you may use links like `t.me/your_bot?start=XXXX` that open your bot with a parameter.
 * @property {number} [cache_time] *Optional*. The maximum amount of time in seconds that the result of the callback
 *   query may be cached client-side. Telegram apps will support caching starting in version `3.14`. Defaults to `0`.
 */

/**
 * @typedef {object} ExtraBanChatMember
 * @see https://core.telegram.org/bots/api#banchatmember
 * @property {number} [until_date] *Optional*. Date when the user will be unbanned, unix time. If user is banned for
 *   more than 366 days or less than 30 seconds from the current time they are considered to be banned forever. Applied
 *   for supergroups and channels only.
 * @property {boolean} [revoke_messages] *Optional*. Pass `True` to delete all messages from the chat for the user that
 *   is being removed. If False, the user will be able to see messages in the group that were sent before the user was
 *   removed. Always True for supergroups and channels.
 */

/**
 * @typedef {object} ExtraKickChatMember
 * @see https://core.telegram.org/bots/api#banchatmember
 * @property {boolean} [revoke_messages] *Optional*. Pass `True` to delete all messages from the chat for the user that
 *   is being removed. If False, the user will be able to see messages in the group that were sent before the user was
 *   removed. Always True for supergroups and channels.
 */

/**
 * @typedef {object} ExtraCopyMessage
 * @see https://core.telegram.org/bots/api#copymessage
 * @property {number} [message_thread_id] *Optional*. Unique identifier of a message thread to which the message
 *   belongs; for supergroups only
 * @property {string} [caption] *Optional*. New caption for media, 0-1024 characters after entities parsing. If not
 *   specified, the original caption is kept
 * @property {string} [parse_mode] *Optional*. Mode for parsing entities in the new caption. See
 *   [formatting options](https://core.telegram.org/bots/api#formatting-options) for more details.
 * @property {Array<MessageEntity>} [caption_entities] A JSON-serialized list of special entities that appear in the
 *   new caption, which can be specified instead of *parse_mode*
 * @property {boolean} [disable_notification] Sends the message
 *   [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive
 *   a notification with no sound.
 * @property {boolean} [protect_content] *Optional*. Protects the contents of the forwarded message from forwarding and
 *   saving
 * @property {number} [reply_to_message_id] *Optional*. If the message is a reply, ID of the original message
 * @property {boolean} [allow_sending_without_reply] *Optional*. Pass `True`, if the message should be sent even if the
 *   specified replied-to message is not found
 * @property {ForceReply|ReplyKeyboardRemove|ReplyKeyboardMarkup|InlineKeyboardMarkup} [reply_markup] *Optional*.
 *   Additional interface options. A JSON-serialized object for an
 *   [inline keyboard](https://core.telegram.org/bots/features#inline-keyboards),
 *   [custom reply keyboard](https://core.telegram.org/bots/features#keyboards), instructions to remove reply keyboard
 *   or to force a reply from the user.
 */

/**
 * @typedef {object} ExtraCreateNewStickerSet
 * @see https://core.telegram.org/bots/api#createnewstickerset
 * @see https://core.telegram.org/stickers#animated-sticker-requirements
 * @property {InputFile|string} [png_sticker] *Optional*. **PNG** image with the sticker, must be up to 512 kilobytes
 *   in size, dimensions must not exceed 512px, and either width or height must be exactly 512px. Pass a *file_id* as a
 *   String to send a file that already exists on the Telegram servers, pass an HTTP URL as a String for Telegram to get
 *   a file from the Internet, or upload a new one using multipart/form-data.
 *   [More information on Sending Files »](https://core.telegram.org/bots/api#sending-files)
 * @property {InputFile} [tgs_sticker] *Optional*. **TGS** animation with the sticker, uploaded using
 *   multipart/form-data. See https://core.telegram.org/stickers#animated-sticker-requirements for technical
 *   requirements
 * @property {InputFile} [webm_sticker] *Optional*. **WEBM** video with the sticker, uploaded using multipart/form-data.
 *   See https://core.telegram.org/stickers#video-sticker-requirements for technical requirements
 * @property {string} [sticker_type] *Optional*. Type of stickers in the set, pass "regular" or "mask". Custom emoji
 *   sticker sets can't be created via the Bot API at the moment. By default, a regular sticker set is created.
 * @property {string} emojis One or more emoji corresponding to the sticker
 * @property {MaskPosition} [mask_position] *Optional*. A JSON-serialized object for position where the mask should be
 *   placed on faces
 */

/**
 * @typedef {object} ExtraEditChatInviteLink
 * @see https://core.telegram.org/bots/api#editchatinvitelink
 * @property {string} [name] *Optional* Invite link name 0-32 characters
 * @property {number} [expire_date] number *Optional*. Point in time (Unix timestamp) when the link will expire
 * @property {number} [member_limit] *Optional*. The maximum number of users that can be members of the chat
 *   simultaneously after joining the chat via this invite link 1-99999
 * @property {boolean} [creates_join_request] *Optional* .True, if users joining the chat via the link need to be
 *   approved by chat administrators. If True, member_limit can't be specified
 */

/**
 * @typedef {object} ExtraEditMessageLiveLocation
 * @see https://core.telegram.org/bots/api#editmessagelivelocation
 * @property {number} [horizontal_accuracy] *Optional* The radius of uncertainty for the location, measured in meters;
 *   0-1500
 * @property {number} [heading] *Optional* Direction in which the user is moving, in degrees. Must be between 1 and
 *   360 if specified.
 * @property {number} [proximity_alert_radius] *Optional*The maximum distance for proximity alerts about approaching
 *   another chat member, in meters. Must be between 1 and 100000 if specified.
 * @property {InlineKeyboardMarkup} [reply_markup] *Optional* A JSON-serialized object for a new
 *   [inline keyboard](https://core.telegram.org/bots/features#inline-keyboards).
 */

/**
 * @typedef {object} ExtraForwardMessage
 * @see https://core.telegram.org/bots/api#forwardmessage
 * @property {number} [message_thread_id] *Optional*. Unique identifier of a message thread to which the message
 *   belongs; for supergroups only
 * @property {boolean} [protect_content] *Optional*. Protects the contents of the forwarded message from forwarding and
 *   saving
 * @property {boolean} [disable_notification] *Optional*. Sends the message
 *   [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive
 *   a notification with no sound.
 */

/**
 * @typedef {object} ExtraPhoto
 * @see https://core.telegram.org/bots/api#sendphoto
 * @property {number} [message_thread_id] *Optional*. Unique identifier of a message thread to which the message
 *   belongs; for supergroups only
 * @property {string} [caption] *Optional*. Photo caption (may also be used when resending photos by *file_id*),
 *   0-1024 characters after entities parsing
 * @property {string} [parse_mode] *Optional*. Mode for parsing entities in the photo caption. See [formatting
 *   options](https://core.telegram.org/bots/api/#formatting-options) for more
 *   details.
 * @property {Array<MessageEntity>} [caption_entities] *Optional*. A JSON-serialized list of special entities that appear in the new
 *   caption, which can be specified instead of `parse_mode`
 * @property {boolean} [has_spoiler] *Optional*. Pass `True` if the animation needs to be covered with a spoiler
 *   animation
 * @property {boolean} [disable_notification] *Optional*. Sends the message
 *   [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive
 *   a notification with no sound.
 * @property {boolean} [protect_content] *Optional*. Protects the contents of the forwarded message from forwarding and
 *   saving
 * @property {number} [reply_to_message_id] *Optional*. If the message is a reply, ID of the original message
 * @property {boolean} [allow_sending_without_reply] *Optional*. Pass `True`, if the message should be sent even if the
 *   specified replied-to message is not found
 * @property {ForceReply|ReplyKeyboardRemove|ReplyKeyboardMarkup|InlineKeyboardMarkup} [reply_markup] *Optional*.
 *   Additional interface options. A JSON-serialized object for an
 *   [inline keyboard](https://core.telegram.org/bots/features#inline-keyboards),
 *   [custom reply keyboard](https://core.telegram.org/bots/features#keyboards), instructions to remove reply keyboard
 *   or to force a reply from the user.
 */

/**
 * @typedef {object} ExtraSendMessage
 * @see https://core.telegram.org/bots/api#sendmessage
 * @property {number} [message_thread_id] *Optional*. Unique identifier of a message thread to which the message
 *   belongs; for supergroups only
 * @property {string} [parse_mode] *Optional*. Mode for parsing entities in the photo caption. See [formatting
 *   options](https://core.telegram.org/bots/api/#formatting-options) for more
 *   details.
 * @property {Array<MessageEntity>} [entities] *Optional*. A JSON-serialized list of special entities that appear in the
 *   new caption, which can be specified instead of `parse_mode`
 * @property {boolean} [disable_web_page_preview] *Optional*. Disables link previews for links in this message
 * @property {boolean} [disable_notification] *Optional*. Sends the message
 *   [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive
 *   a notification with no sound.
 * @property {boolean} [protect_content] *Optional*. Protects the contents of the forwarded message from forwarding and
 *   saving
 * @property {number} [reply_to_message_id] *Optional*. If the message is a reply, ID of the original message
 * @property {boolean} [allow_sending_without_reply] *Optional*. Pass `True`, if the message should be sent even if the
 *   specified replied-to message is not found
 * @property {ForceReply|ReplyKeyboardRemove|ReplyKeyboardMarkup|InlineKeyboardMarkup} [reply_markup] *Optional*.
 *   Additional interface options. A JSON-serialized object for an
 *   [inline keyboard](https://core.telegram.org/bots/features#inline-keyboards),
 *   [custom reply keyboard](https://core.telegram.org/bots/features#keyboards), instructions to remove reply keyboard
 *   or to force a reply from the user.
 */

/**
 * @typedef {object} ExtraSetWebhook
 * @see https://core.telegram.org/bots/api#setwebhook
 * @property {InputFile} [certificate] *Optional*. Upload your public key certificate so that the root certificate
 *   in use can be checked. See our self-signed guide for details.
 * @property {string} [ip_address] *Optional*. The fixed IP address which will be used to send webhook requests instead
 *   of the IP address resolved through DNS
 * @property {number} [max_connections=40] *Optional*. The maximum allowed number of simultaneous HTTPS connections to
 *   the webhook for update delivery, 1-100. Defaults to 40. Use lower values to limit the load on your bot's server,
 *   and higher values to increase your bot's throughput.
 * @param {updateType[]} [allowedUpdates] *Optional*. Array of allowed updates or update name
 *     For example, specify `["message", "edited_channel_post", "callback_query"]` to only receive
 *     updates of these types. See [Update](https://core.telegram.org/bots/api#update) for a complete list of
 *     available update types.
 *     Specify an empty list to receive all update types except `chat_member` (default).
 *     If not specified, the previous setting will be used.
 * @property {boolean} [drop_pending_updates] *Optional*. Pass `True` to drop all pending updates
 * @property {string} [secret_token] *Optional*. A secret token to be sent in a header `X-Telegram-Bot-Api-Secret-Token`
 *    in every webhook request, 1-256 characters. Only characters `A-Z`, `a-z`, `0-9`, `_` and `-` are allowed.
 *    The header is useful to ensure that the request comes from a webhook set by you.
 */

/**
 * @typedef {object} ExtraDeleteWebhook
 * @see https://core.telegram.org/bots/api#deletewebhook
 * @property {boolean} [drop_pending_updates] Pass True to drop all pending updates
 */

/**
 * @typedef {object} ExtraVenue
 * @see https://core.telegram.org/bots/api#sendvenue
 * @property {number} [message_thread_id] *Optional*. Unique identifier of a message thread to which the message
 *   belongs; for supergroups only
 * @property {string} [foursquare_id] *Optional*. Foursquare identifier of the venue
 * @property {string} [foursquare_type] *Optional*. Foursquare type of the venue, if known.
 *   (For example, “arts_entertainment/default”, “arts_entertainment/aquarium” or “food/icecream”.)
 * @property {string} [google_place_id] *Optional*. Google Places identifier of the venue
 * @property {string} [google_place_type] *Optional*. Google Places type of the venue.
 *   (See [supported types](https://developers.google.com/places/web-service/supported_types).)
 * @property {boolean} [disable_notification] *Optional*. Sends the message
 *   [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive
 *   a notification with no sound.
 * @property {boolean} [protect_content] *Optional*. Protects the contents of the forwarded message from forwarding and
 *   saving
 * @property {number} [reply_to_message_id] *Optional*. If the message is a reply, ID of the original message
 * @property {boolean} [allow_sending_without_reply] *Optional*. Pass `True`, if the message should be sent even if the
 *   specified replied-to message is not found
 * @property {ForceReply|ReplyKeyboardRemove|ReplyKeyboardMarkup|InlineKeyboardMarkup} [reply_markup] *Optional*.
 *   Additional interface options. A JSON-serialized object for an
 *   [inline keyboard](https://core.telegram.org/bots/features#inline-keyboards),
 *   [custom reply keyboard](https://core.telegram.org/bots/features#keyboards), instructions to remove reply keyboard
 *   or to force a reply from the user.
 */

/**
 * @typedef {object} ExtraVoice
 * @see https://core.telegram.org/bots/api#sendvoice
 * @property {number} [message_thread_id] *Optional*. Unique identifier of a message thread to which the message
 *   belongs; for supergroups only
 * @property {string} [caption] Voice message caption, 0-1024 characters after entities parsing
 * @property {string} [parse_mode] *Optional*. Mode for parsing entities in the photo caption. See [formatting
 *   options](https://core.telegram.org/bots/api/#formatting-options) for more
 *   details.
 * @property {Array<MessageEntity>} [caption_entities] A JSON-serialized list of special entities that appear in the
 *   new
 *   caption, which can be specified instead of `parse_mode`
 * @property {number} [duration] *Optional*. Duration of the voice message in seconds
 *   (See [supported types](https://developers.google.com/places/web-service/supported_types).)
 * @property {boolean} [disable_notification] *Optional*. Sends the message
 *   [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive
 *   a notification with no sound.
 * @property {boolean} [protect_content] *Optional*. Protects the contents of the forwarded message from forwarding and
 *   saving
 * @property {number} [reply_to_message_id] *Optional*. If the message is a reply, ID of the original message
 * @property {boolean} [allow_sending_without_reply] *Optional*. Pass `True`, if the message should be sent even if the
 *   specified replied-to message is not found
 * @property {ForceReply|ReplyKeyboardRemove|ReplyKeyboardMarkup|InlineKeyboardMarkup} [reply_markup] *Optional*.
 *   Additional interface options. A JSON-serialized object for an
 *   [inline keyboard](https://core.telegram.org/bots/features#inline-keyboards),
 *   [custom reply keyboard](https://core.telegram.org/bots/features#keyboards), instructions to remove reply keyboard
 *   or to force a reply from the user.
 */

/**
 * @typedef {object} ExtraAddStickerToSet
 * @see https://core.telegram.org/bots/api#addstickertoset
 * @see https://core.telegram.org/stickers#animated-sticker-requirements
 * @property {InputFile|string} [png_sticker] *Optional*. **PNG** image with the sticker, must be up to 512 kilobytes
 *   in size, dimensions must not exceed 512px, and either width or height must be exactly 512px. Pass a *file_id* as a
 *   String to send a file that already exists on the Telegram servers, pass an HTTP URL as a String for Telegram to get
 *   a file from the Internet, or upload a new one using multipart/form-data.
 *   [More information on Sending Files »](https://core.telegram.org/bots/api#sending-files)
 * @property {InputFile} [tgs_sticker] *Optional*. **TGS** animation with the sticker, uploaded using
 *   multipart/form-data. See https://core.telegram.org/stickers#animated-sticker-requirements for technical
 *   requirements
 * @property {InputFile} [webm_sticker] *Optional*. **WEBM** video with the sticker, uploaded using multipart/form-data.
 *   See https://core.telegram.org/stickers#video-sticker-requirements for technical requirements
 * @property {string} emojis One or more emoji corresponding to the sticker
 * @property {MaskPosition} [mask_position] *Optional*. A JSON-serialized object for position where the mask should be
 *   placed on faces
 */

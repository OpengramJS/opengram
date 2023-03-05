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
 * @property {ParseMode} [parse_mode] *Optional*. Mode for parsing entities in the new caption. See
 *   [formatting options](https://core.telegram.org/bots/api#formatting-options) for more details.
 * @property {MessageEntity[]} [caption_entities] A JSON-serialized list of special entities that appear in the
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
 * @property {InputFile|FileId} [png_sticker] *Optional*. **PNG** image with the sticker, must be up to 512 kilobytes
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
 * @property {ParseMode} [parse_mode] *Optional*. Mode for parsing entities in the photo caption. See [formatting
 *   options](https://core.telegram.org/bots/api/#formatting-options) for more
 *   details.
 * @property {MessageEntity[]} [caption_entities] *Optional*. A JSON-serialized list of special entities that appear in the new
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
 * @property {ParseMode} [parse_mode] *Optional*. Mode for parsing entities in the photo caption. See [formatting
 *   options](https://core.telegram.org/bots/api/#formatting-options) for more
 *   details.
 * @property {MessageEntity[]} [entities] *Optional*. A JSON-serialized list of special entities that appear in the
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
 * @property {ParseMode} [parse_mode] *Optional*. Mode for parsing entities in the photo caption. See [formatting
 *   options](https://core.telegram.org/bots/api/#formatting-options) for more
 *   details.
 * @property {MessageEntity[]} [caption_entities] A JSON-serialized list of special entities that appear in the
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

/**
 * @typedef {object} ExtraAnswerInlineQuery
 * @see https://core.telegram.org/bots/api#answerinlinequery
 * @property {number} [cache_time] *Optional*. The maximum amount of time in seconds that the result of the inline
 *   query may be cached on the server. Defaults to 300.
 * @property {boolean} [is_personal] *Optional*. Pass *True* if results may be cached on the server side only for the
 *   user that sent the query. By default, results may be returned to any user who sends the same query
 * @property {string} [next_offset] *Optional*. Pass the offset that a client should send in the next query with the
 *   same text to receive more results. Pass an empty string if there are no more results or if you don't support
 *   pagination. Offset length can't exceed 64 bytes.
 * @property {string} [switch_pm_text] *Optional*. If passed, clients will display a button with specified text that
 *   switches the user to a private chat with the bot and sends the bot a start message with the parameter
 *   *switch_pm_parameter*
 * @property {string} [switch_pm_parameter] *Optional*.
 *   [Deep-linking](https://core.telegram.org/bots/features#deep-linking) parameter for the `/start` message sent to the
 *   bot when user presses the switch button. 1-64 characters, only `A-Z`, `a-z`, `0-9`, `_` and `-` are allowed.
 *   *Example:* An inline bot that sends YouTube videos can ask the user to connect the bot to their YouTube account
 *   to adapt search results accordingly. To do this, it displays a 'Connect your YouTube account' button above the
 *   results, or even before showing any. The user presses the button, switches to a private chat with the bot and,
 *   in doing so, passes a start parameter that instructs the bot to return an OAuth link. Once done, the bot can offer
 *   a [*switch_inline*](https://core.telegram.org/bots/api#inlinekeyboardmarkup) button so that the user can easily
 *   return to the chat where they wanted to use the bot's inline capabilities.
 */

/**
 * @typedef {object} ExtraCreateChatInviteLink
 * @see https://core.telegram.org/bots/api#createchatinvitelink
 * @property {string} [name] *Optional*. Invite link name; 0-32 characters
 * @property {number} [expire_date] *Optional*. Point in time (Unix timestamp) when the link will expire |
 * @property {number} [member_limit] *Optional*. The maximum number of users that can be members of the
 *   chat simultaneously after joining the chat via this invite link; 1-99999 |
 * @property {boolean} [creates_join_request] *Optional*. *True*, if users joining the chat via the link
 *   need to be approved by chat administrators. If *True*, *member_limit* can't be specified |
 */

/**
 * @typedef {object} ExtraDice
 * @see https://core.telegram.org/bots/api#senddice
 * @property {number} [message_thread_id] *Optional*. Unique identifier for the target message thread (topic)
 *   of the forum; for forum supergroups only
 * @property {string} [emoji="🎲"] *Optional*. Emoji on which the dice throw animation is based. Currently, must be one
 *   of "🎲", "🎯", "🏀", "⚽", "🎳", or "🎰". Dice can have values 1-6 for "🎲", "🎯" and "🎳", values 1-5 for "🏀"
 *   and "⚽", and values 1-64 for "🎰". Defaults to "🎲"
 * @property {boolean} [disable_notification] *Optional*. Sends the message
 *   [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no
 *   sound.
 * @property {boolean} [protect_content] *Optional*. Protects the contents of the sent message from forwarding
 * @property {number} [reply_to_message_id] *Optional*. If the message is a reply, ID of the original message
 * @property {boolean} [allow_sending_without_reply] *Optional*. Pass *True* if the message should be sent even if the
 *   specified replied-to message is not found
 * @property {InlineKeyboardMarkup|ReplyKeyboardMarkup|ReplyKeyboardRemove|ForceReply} [reply_markup] *Optional*.
 *   [InlineKeyboardMarkup](https://core.telegram.org/bots/api#inlinekeyboardmarkup) or
 *   [ReplyKeyboardMarkup](https://core.telegram.org/bots/api#replykeyboardmarkup) or
 *   [ReplyKeyboardRemove](https://core.telegram.org/bots/api#replykeyboardremove) or
 *   [ForceReply](https://core.telegram.org/bots/api#forcereply) Additional interface options.
 *   A JSON-serialized object for an [inline keyboard](https://core.telegram.org/bots/features#inline-keyboards),
 *   [custom reply keyboard](https://core.telegram.org/bots/features#keyboards), instructions to remove reply keyboard
 *   or to force a reply from the user.
 */

/**
 * @typedef {object} ExtraEditForumTopic
 * @see https://core.telegram.org/bots/api#editforumtopic
 * @property {string} [name] *Optional*. New topic name, 0-128 characters. If not specified or empty, the current name
 *   of the topic will be kept
 * @property {string} [icon_custom_emoji_id] *Optional*. New unique identifier of the custom emoji shown as the topic
 *   icon. Use [getForumTopicIconStickers](https://core.telegram.org/bots/api#getforumtopiciconstickers) to get all
 *   allowed custom emoji identifiers. Pass an empty string to remove the icon. If not specified, the current icon will
 *   be kept
 */

/**
 * @typedef {object} ExtraEditMessageMedia
 * @see https://core.telegram.org/bots/api#editmessagemedia
 * @property {string} [caption] *Optional*. Caption of the media to be sent, 0-1024 characters after entities
 *   parsing
 * @property {ParseMode} [parse_mode] *Optional*. Mode for parsing entities in the media caption. See [formatting
 *   options](https://core.telegram.org/bots/api/#formatting-options) for more
 *   details.
 * @property {MessageEntity[]} [caption_entities] *Optional*. List of special entities that appear in the caption,
 *   which can be specified instead of *parse\_mode*
 * @property {boolean} [has_spoiler] *Optional*. Pass `True` if the video needs to be covered with a spoiler animation
 * @property {InlineKeyboardMarkup} [reply_markup]
 *   [InlineKeyboardMarkup](https://core.telegram.org/bots/api#inlinekeyboardmarkup) A JSON-serialized object for a new
 *   [inline keyboard](https://core.telegram.org/bots/features#inline-keyboards).
 */

/**
 * @typedef {object} ExtraGame
 * @see https://core.telegram.org/bots/api#sendgame
 * @property {number} [message_thread_id] *Optional*. Unique identifier for the target message thread (topic)
 *   of the forum; for forum supergroups only
 * @property {boolean} [disable_notification] *Optional*. Sends the message
 *   [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no
 *   sound.
 * @property {boolean} [protect_content] *Optional*. Protects the contents of the sent message from forwarding
 * @property {number} [reply_to_message_id] *Optional*. If the message is a reply, ID of the original message
 * @property {boolean} [allow_sending_without_reply] *Optional*. Pass *True* if the message should be sent even if the
 *   specified replied-to message is not found
 * @property {InlineKeyboardMarkup} [reply_markup]
 *   [InlineKeyboardMarkup](https://core.telegram.org/bots/api#inlinekeyboardmarkup) A JSON-serialized object for a new
 *   [inline keyboard](https://core.telegram.org/bots/features#inline-keyboards).
*/

/**
 * @typedef {object} ExtraLocation
 * @see https://core.telegram.org/bots/api#sendlocation
 * @see https://telegram.org/blog/live-locations
 * @property {number} [message_thread_id] *Optional*. Unique identifier for the target message thread (topic)
 *   of the forum; for forum supergroups only
 * @property {number} [horizontal_accuracy] *Optional* The radius of uncertainty for the location, measured in meters;
 *   0-1500
 * @property {number} [heading] *Optional* Direction in which the user is moving, in degrees. Must be between 1 and
 *   360 if specified.
 * @property {number} [proximity_alert_radius] *Optional* The radius of uncertainty for the location, measured in
 *   meters;
 *   0-1500
 * @property {number} [live_period] *Optional*. Period in seconds for which the location will be updated, see
 *   [Live Locations](https://telegram.org/blog/live-locations), should be between `60` and `86400`.
 * @property {boolean} [disable_notification] *Optional*. Sends the message
 *   [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no
 *   sound.
 * @property {boolean} [protect_content] *Optional*. Protects the contents of the sent message from forwarding
 * @property {number} [reply_to_message_id] *Optional*. If the message is a reply, ID of the original message
 * @property {boolean} [allow_sending_without_reply] *Optional*. Pass *True* if the message should be sent even if the
 *   specified replied-to message is not found
 * @property {InlineKeyboardMarkup|ReplyKeyboardMarkup|ReplyKeyboardRemove|ForceReply} [reply_markup] *Optional*.
 *   [InlineKeyboardMarkup](https://core.telegram.org/bots/api#inlinekeyboardmarkup) or
 *   [ReplyKeyboardMarkup](https://core.telegram.org/bots/api#replykeyboardmarkup) or
 *   [ReplyKeyboardRemove](https://core.telegram.org/bots/api#replykeyboardremove) or
 *   [ForceReply](https://core.telegram.org/bots/api#forcereply) Additional interface options.
 *   A JSON-serialized object for an [inline keyboard](https://core.telegram.org/bots/features#inline-keyboards),
 *   [custom reply keyboard](https://core.telegram.org/bots/features#keyboards), instructions to remove reply keyboard
 *   or to force a reply from the user.
 */

/**
 * @typedef {object} ExtraPoll
 * @see https://core.telegram.org/bots/api#sendpoll
 * @property {number} [message_thread_id] *Optional*. Unique identifier for the target message thread (topic)
 *   of the forum; for forum supergroups only
 * @property {boolean} [is_anonymous] *Optional*. *True*, if the poll needs to be anonymous, defaults to *True*
 * @property {boolean} [allows_multiple_answers] *Optional*. *True*, if the poll allows multiple answers, ignored for
 *   polls in quiz mode, defaults to *False*
 * @property {number} [correct_option_id] *Optional*. 0-based identifier of the correct answer option, required for
 *   polls in quiz mode
 * @property {string} [explanation] *Optional*. Text that is shown when a user chooses an incorrect answer or taps on
 *   the lamp icon in a quiz-style poll, 0-200 characters with at most 2 line feeds after entities parsing
 * @property {string} [explanation_parse_mode] *Optional*. Mode for parsing entities in the explanation. See
 *   [formatting options](https://core.telegram.org/bots/api#formatting-options) for more details.
 * @property {MessageEntity[]} [explanation_entities] *Optional*. A JSON-serialized list of special entities that
 *   appear in the poll explanation, which can be specified instead of *parse_mode*
 * @property {number} [open_period] *Optional*. Amount of time in seconds the poll will be active after creation,
 *   5-600. Can't be used together with *close_date*.
 * @property {number} [close_date] *Optional*. Point in time (Unix timestamp) when the poll will be automatically
 *   closed. Must be at least 5 and no more than 600 seconds in the future. Can't be used together with *open_period*.
 * @property {boolean} [is_closed] *Optional*. Pass *True* if the poll needs to be immediately closed. This can be
 *   useful for poll preview.
 * @property {boolean} [disable_notification] *Optional*. Sends the message
 *   [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no
 *   sound.
 * @property {boolean} [protect_content] *Optional*. Protects the contents of the sent message from forwarding
 * @property {number} [reply_to_message_id] *Optional*. If the message is a reply, ID of the original message
 * @property {boolean} [allow_sending_without_reply] *Optional*. Pass *True* if the message should be sent even if the
 *   specified replied-to message is not found
 * @property {InlineKeyboardMarkup|ReplyKeyboardMarkup|ReplyKeyboardRemove|ForceReply} [reply_markup] *Optional*.
 *   [InlineKeyboardMarkup](https://core.telegram.org/bots/api#inlinekeyboardmarkup) or
 *   [ReplyKeyboardMarkup](https://core.telegram.org/bots/api#replykeyboardmarkup) or
 *   [ReplyKeyboardRemove](https://core.telegram.org/bots/api#replykeyboardremove) or
 *   [ForceReply](https://core.telegram.org/bots/api#forcereply) Additional interface options.
 *   A JSON-serialized object for an [inline keyboard](https://core.telegram.org/bots/features#inline-keyboards),
 *   [custom reply keyboard](https://core.telegram.org/bots/features#keyboards), instructions to remove reply keyboard
 *   or to force a reply from the user.
 */

/**
 * @typedef {object} ExtraQuiz
 * @see https://core.telegram.org/bots/api#sendpoll
 * @property {number} [message_thread_id] *Optional*. Unique identifier for the target message thread (topic)
 *   of the forum; for forum supergroups only
 * @property {boolean} [is_anonymous] *Optional*. *True*, if the poll needs to be anonymous, defaults to *True*
 * @property {boolean} [allows_multiple_answers] *Optional*. *True*, if the poll allows multiple answers, ignored for
 *   polls in quiz mode, defaults to *False*
 * @property {number} [correct_option_id] *Optional*. 0-based identifier of the correct answer option, required for
 *   polls in quiz mode
 * @property {string} [explanation] *Optional*. Text that is shown when a user chooses an incorrect answer or taps on
 *   the lamp icon in a quiz-style poll, 0-200 characters with at most 2 line feeds after entities parsing
 * @property {string} [explanation_parse_mode] *Optional*. Mode for parsing entities in the explanation. See
 *   [formatting options](https://core.telegram.org/bots/api#formatting-options) for more details.
 * @property {MessageEntity[]} [explanation_entities] *Optional*. A JSON-serialized list of special entities that
 *   appear in the poll explanation, which can be specified instead of *parse_mode*
 * @property {number} [open_period] *Optional*. Amount of time in seconds the poll will be active after creation,
 *   5-600. Can't be used together with *close_date*.
 * @property {number} [close_date] *Optional*. Point in time (Unix timestamp) when the poll will be automatically
 *   closed. Must be at least 5 and no more than 600 seconds in the future. Can't be used together with *open_period*.
 * @property {boolean} [is_closed] *Optional*. Pass *True* if the poll needs to be immediately closed. This can be
 *   useful for poll preview.
 * @property {boolean} [disable_notification] *Optional*. Sends the message
 *   [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no
 *   sound.
 * @property {boolean} [protect_content] *Optional*. Protects the contents of the sent message from forwarding
 * @property {number} [reply_to_message_id] *Optional*. If the message is a reply, ID of the original message
 * @property {boolean} [allow_sending_without_reply] *Optional*. Pass *True* if the message should be sent even if the
 *   specified replied-to message is not found
 * @property {InlineKeyboardMarkup|ReplyKeyboardMarkup|ReplyKeyboardRemove|ForceReply} [reply_markup] *Optional*.
 *   [InlineKeyboardMarkup](https://core.telegram.org/bots/api#inlinekeyboardmarkup) or
 *   [ReplyKeyboardMarkup](https://core.telegram.org/bots/api#replykeyboardmarkup) or
 *   [ReplyKeyboardRemove](https://core.telegram.org/bots/api#replykeyboardremove) or
 *   [ForceReply](https://core.telegram.org/bots/api#forcereply) Additional interface options.
 *   A JSON-serialized object for an [inline keyboard](https://core.telegram.org/bots/features#inline-keyboards),
 *   [custom reply keyboard](https://core.telegram.org/bots/features#keyboards), instructions to remove reply keyboard
 *   or to force a reply from the user.
 */

/**
 * @typedef {object} ExtraRestrictChatMember
 * @see https://core.telegram.org/bots/api#restrictchatmember
 * @property {ChatPermissions} permissions A JSON-serialized object for new user permissions
 * @property {boolean} [use_independent_chat_permissions] *Optional*.Pass *True* if chat permissions are set
 *   independently. Otherwise, the *can_send_other_messages* and *can_add_web_page_previews* permissions will imply the
 *   *can_send_messages*, *can_send_audios*, *can_send_documents*, *can_send_photos*, *can_send_videos*,
 *   *can_send_video_notes*, and *can_send_voice_notes* permissions; the *can_send_polls* permission will
 *   imply the *can_send_messages* permission.
 * @property {number} [until_date] *Optional*. Date when restrictions will be lifted for the user, unix time. If user is
 *   restricted for more than 366 days or less than 30 seconds from the current time, they are considered to be
 *   restricted forever
 */

/**
 * @typedef {object} ExtraSticker
 * @see https://core.telegram.org/bots/api#sendsticker
 * @property {number} [message_thread_id] *Optional*. Unique identifier for the target message thread (topic)
 *   of the forum; for forum supergroups only
 * @property {InputFile|FileId} sticker Sticker to send. Pass a file_id as String to send a file that exists on the
 *   Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a .WEBP file from the Internet,
 *   or upload a new one using multipart/form-data.
 *   [More information on Sending Files »](https://core.telegram.org/bots/api#sending-files)
 * @property {boolean} [disable_notification] *Optional*. Sends the message
 *   [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no
 *   sound.
 * @property {boolean} [protect_content] *Optional*. Protects the contents of the sent message from forwarding
 * @property {number} [reply_to_message_id] *Optional*. If the message is a reply, ID of the original message
 * @property {boolean} [allow_sending_without_reply] *Optional*. Pass *True* if the message should be sent even if the
 *   specified replied-to message is not found
 * @property {InlineKeyboardMarkup|ReplyKeyboardMarkup|ReplyKeyboardRemove|ForceReply} [reply_markup] *Optional*.
 *   [InlineKeyboardMarkup](https://core.telegram.org/bots/api#inlinekeyboardmarkup) or
 *   [ReplyKeyboardMarkup](https://core.telegram.org/bots/api#replykeyboardmarkup) or
 *   [ReplyKeyboardRemove](https://core.telegram.org/bots/api#replykeyboardremove) or
 *   [ForceReply](https://core.telegram.org/bots/api#forcereply) Additional interface options.
 *   A JSON-serialized object for an [inline keyboard](https://core.telegram.org/bots/features#inline-keyboards),
 *   [custom reply keyboard](https://core.telegram.org/bots/features#keyboards), instructions to remove reply keyboard
 *   or to force a reply from the user.
 */

/**
 * @typedef {object} ExtraVideo
 * @see https://core.telegram.org/bots/api#sendvideo
 * @property {number} [message_thread_id] *Optional*. Unique identifier for the target message thread (topic)
 *   of the forum; for forum supergroups only
 * @property {number} [duration] *Optional*. Duration of sent video in seconds
 * @property {number} [width] *Optional*. Video width
 * @property {number} [height] *Optional*. Video height
 * @property {InputFile|FileId} [thumb] Thumbnail of the file sent; can be ignored if thumbnail generation for the file
 *   is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width
 *   and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't
 *   be reused and can be only uploaded as a new file, so you can pass "attach://<file_attach_name>" if the thumbnail
 *   was uploaded using multipart/form-data under <file_attach_name>.
 *   [More information on Sending Files »](https://core.telegram.org/bots/api#sending-files)
 * @property {string} [caption] *Optional*. Video caption (may also be used when resending videos by *file_id*),
 *   0-1024 characters after entities parsing
 * @property {ParseMode} [parse_mode] *Optional*. Mode for parsing entities in the audio caption. See [formatting
 *   options](https://core.telegram.org/bots/api/#formatting-options) for more
 *   details.
 * @property {MessageEntity[]} [caption_entities] *Optional*. List of special entities that appear in the caption,
 *   which can be specified instead of *parse\_mode*
 * @property {boolean} [has_spoiler] *Optional*. Pass `True` if the video needs to be covered with a spoiler animation
 * @property {boolean} [supports_streaming] *Optional*. Pass *True* if the uploaded video is suitable for streaming
 * @property {boolean} [disable_notification] *Optional*. Sends the message
 *   [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no
 *   sound.
 * @property {boolean} [protect_content] *Optional*. Protects the contents of the sent message from forwarding
 * @property {number} [reply_to_message_id] *Optional*. If the message is a reply, ID of the original message
 * @property {boolean} [allow_sending_without_reply] *Optional*. Pass *True* if the message should be sent even if the
 *   specified replied-to message is not found
 * @property {InlineKeyboardMarkup|ReplyKeyboardMarkup|ReplyKeyboardRemove|ForceReply} [reply_markup] *Optional*.
 *   [InlineKeyboardMarkup](https://core.telegram.org/bots/api#inlinekeyboardmarkup) or
 *   [ReplyKeyboardMarkup](https://core.telegram.org/bots/api#replykeyboardmarkup) or
 *   [ReplyKeyboardRemove](https://core.telegram.org/bots/api#replykeyboardremove) or
 *   [ForceReply](https://core.telegram.org/bots/api#forcereply) Additional interface options.
 *   A JSON-serialized object for an [inline keyboard](https://core.telegram.org/bots/features#inline-keyboards),
 *   [custom reply keyboard](https://core.telegram.org/bots/features#keyboards), instructions to remove reply keyboard
 *   or to force a reply from the user.
 */

/**
 * @typedef {object} ExtraMediaGroup
 * @see https://core.telegram.org/bots/api#sendmediagroup
 * @property {number} [message_thread_id] *Optional*. Unique identifier for the target message thread (topic)
 *   of the forum; for forum supergroups only
 * @property {boolean} [disable_notification] *Optional*. Sends the message
 *   [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no
 *   sound.
 * @property {boolean} [protect_content] *Optional*. Protects the contents of the sent message from forwarding
 * @property {number} [reply_to_message_id] *Optional*. If the message is a reply, ID of the original message
 * @property {boolean} [allow_sending_without_reply] *Optional*. Pass *True* if the message should be sent even if the
 *   specified replied-to message is not found
 */

/**
 * @typedef {object} ExtraInvoice
 * @see https://core.telegram.org/bots/api#sendinvoice
 * @property {number} [message_thread_id] *Optional*. Unique identifier for the target message thread (topic)
 *   of the forum; for forum supergroups only
 * @property {string} [start_parameter] *Optional*. Unique deep-linking parameter. If left empty, **forwarded copies**
 *   of the sent message will have a *Pay* button, allowing multiple users to pay directly from the forwarded message,
 *   using the same invoice. If non-empty, forwarded copies of the sent message will have a *URL* button with a deep
 *   link to the bot (instead of a *Pay* button), with the value used as the start parameter
 * @property {boolean} [is_flexible] *Optional*. Pass *True* if the final price depends on the shipping method
 * @property {number} [max_tip_amount] *Optional*. The maximum accepted amount for tips in the *smallest units*
 *   of the currency (integer, **not** float/double). For example, for a maximum tip of `US$ 1.45` pass
 *   `max_tip_amount = 145`. See the *exp* parameter in
 *   [currencies.json](https://core.telegram.org/bots/payments/currencies.json), it shows the number of digits past
 *   the decimal point for each currency (`2` for the majority of currencies). Defaults to `0`
 * @property {number[]} [suggested_tip_amounts] *Optional*. A JSON-serialized array of suggested amounts of tips in the
 *   *smallest units* of the currency (integer, **not** float/double). At most 4 suggested tip amounts can be
 *   specified.
 *   The suggested tip amounts must be positive, passed in a strictly increased order and must not exceed
 *   *max_tip_amount*.
 * @property {object} [provider_data] *Optional*. JSON-serialized data about the invoice, which will be shared with the
 *   payment provider. A detailed description of required fields should be provided by the payment provider.
 * @property {string} [photo_url] *Optional*. URL of the product photo for the invoice. Can be a photo of the goods or
 *   a marketing image for a service. People like it better when they see what they are paying for.
 * @property {number} [photo_size] *Optional*. Photo size in bytes
 * @property {number} [photo_width] *Optional*. Photo width
 * @property {number} [photo_height] *Optional*. Photo height
 * @property {boolean} [need_name] *Optional*. Pass *True* if you require the user's full name to complete the order
 * @property {boolean} [need_phone_number] *Optional*. Pass *True* if you require the user's phone number to complete
 *   the order
 * @property {boolean} need_email *Optional*. Pass *True* if you require the user's email address to complete the order
 * @property {boolean} [need_shipping_address] *Optional*. Pass *True* if you require the user's shipping address to
 *   complete the order
 * @property {boolean} [send_phone_number_to_provider] *Optional*. Pass *True* if the user's phone number should be
 *   sent to provider
 * @property {boolean} [send_email_to_provider] *Optional*. Pass *True* if the user's email address should be sent to
 *   provider
 * @property {boolean} [disable_notification] *Optional*. Sends the message
 *   [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no
 *   sound.
 * @property {boolean} [protect_content] *Optional*. Protects the contents of the sent message from forwarding
 * @property {number} [reply_to_message_id] *Optional*. If the message is a reply, ID of the original message
 * @property {boolean} [allow_sending_without_reply] *Optional*. Pass *True* if the message should be sent even if the
 *   specified replied-to message is not found
 * @property {InlineKeyboardMarkup} [reply_markup] *Optional* A JSON-serialized object for an
 *   [inline keyboard](https://core.telegram.org/bots/features#inline-keyboards). If empty, one 'Pay `total price`'
 *   button will be shown. If not empty, the first button must be a Pay button.
 */

/**
 * @typedef {object} InvoiceLinkParams
 * @see https://core.telegram.org/bots/api#createinvoicelink
 * @property {string} title Product name, 1-32 characters
 * @property {string} description Product description, 1-255 characters
 * @property {string} payload Bot-defined invoice payload, 1-128 bytes. This will not be displayed to the user,
 *   use for your internal processes.
 * @property {string} provider_token Payment provider token, obtained via [@BotFather](https://t.me/botfather)
 * @property {string} currency Three-letter ISO 4217 currency code, see
 *   [more on currencies](https://core.telegram.org/bots/payments#supported-currencies)
 * @property {LabeledPrice[]} prices Price breakdown, a JSON-serialized list of components (e.g. product price, tax,
 *   discount, delivery cost, delivery tax, bonus, etc.)
 * @property {boolean} [is_flexible] *Optional*. Pass *True* if the final price depends on the shipping method
 * @property {number} [max_tip_amount] *Optional*. The maximum accepted amount for tips in the *smallest units*
 *   of the currency (integer, **not** float/double). For example, for a maximum tip of `US$ 1.45` pass
 *   `max_tip_amount = 145`. See the *exp* parameter in
 *   [currencies.json](https://core.telegram.org/bots/payments/currencies.json), it shows the number of digits past
 *   the decimal point for each currency (`2` for the majority of currencies). Defaults to `0`
 * @property {number[]} [suggested_tip_amounts] *Optional*. A JSON-serialized array of suggested amounts of tips in the
 *   *smallest units* of the currency (integer, **not** float/double). At most 4 suggested tip amounts can be specified.
 *   The suggested tip amounts must be positive, passed in a strictly increased order and must not exceed
 *   *max_tip_amount*.
 * @property {object} [provider_data] *Optional*. JSON-serialized data about the invoice, which will be shared with the
 *   payment provider. A detailed description of required fields should be provided by the payment provider.
 * @property {string} [photo_url] *Optional*. URL of the product photo for the invoice. Can be a photo of the goods or
 *   a marketing image for a service. People like it better when they see what they are paying for.
 * @property {number} [photo_size] *Optional*. Photo size in bytes
 * @property {number} [photo_width] *Optional*. Photo width
 * @property {number} [photo_height] *Optional*. Photo height
 * @property {boolean} [need_name] *Optional*. Pass *True* if you require the user's full name to complete the order
 * @property {boolean} [need_phone_number] *Optional*. Pass *True* if you require the user's phone number to complete
 *   the order
 * @property {boolean} [need_email] *Optional*. Pass *True* if you require the user's email address to complete the order
 * @property {boolean} [need_shipping_address] *Optional*. Pass *True* if you require the user's shipping address to
 *   complete the order
 * @property {boolean} [send_phone_number_to_provider] *Optional*. Pass *True* if the user's phone number should be
 *   sent to provider
 * @property {boolean} [send_email_to_provider] *Optional*. Pass *True* if the user's email address should be sent to
 *   provider
 */

/**
 * @typedef {object} ExtraAnimation
 * @see https://core.telegram.org/bots/api#sendanimation
 * @property {number} [message_thread_id] *Optional*. Unique identifier for the target message thread (topic)
 *   of the forum; for forum supergroups only
 * @property {number} [duration] *Optional*. Duration of sent animation in seconds
 * @property {number} [width] *Optional*. Animation width
 * @property {number} [height] *Optional*. Animation height
 * @property {InputFile|FileId} [thumb] Thumbnail of the file sent; can be ignored if thumbnail generation for the file
 *   is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width
 *   and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't
 *   be reused and can be only uploaded as a new file, so you can pass "attach://<file_attach_name>" if the thumbnail
 *   was uploaded using multipart/form-data under <file_attach_name>.
 *   [More information on Sending Files »](https://core.telegram.org/bots/api#sending-files)
 * @property {string} [caption] *Optional*. Animation caption (may also be used when resending animation by file_id),
 *   0-1024 characters after entities parsing
 * @property {ParseMode} [parse_mode] *Optional*. Mode for parsing entities in the animation caption. See [formatting
 *   options](https://core.telegram.org/bots/api/#formatting-options) for more
 *   details.
 * @property {MessageEntity[]} [caption_entities] *Optional*. List of special entities that appear in the caption,
 *   which can be specified instead of *parse\_mode*
 * @property {boolean} [has_spoiler] *Optional*. Pass `True` if the video needs to be covered with a spoiler animation
 * @property {boolean} [disable_notification] *Optional*. Sends the message
 *   [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no
 *   sound.
 * @property {boolean} [protect_content] *Optional*. Protects the contents of the sent message from forwarding
 * @property {number} [reply_to_message_id] *Optional*. If the message is a reply, ID of the original message
 * @property {boolean} [allow_sending_without_reply] *Optional*. Pass *True* if the message should be sent even if the
 *   specified replied-to message is not found
 * @property {InlineKeyboardMarkup|ReplyKeyboardMarkup|ReplyKeyboardRemove|ForceReply} [reply_markup] *Optional*.
 *   [InlineKeyboardMarkup](https://core.telegram.org/bots/api#inlinekeyboardmarkup) or
 *   [ReplyKeyboardMarkup](https://core.telegram.org/bots/api#replykeyboardmarkup) or
 *   [ReplyKeyboardRemove](https://core.telegram.org/bots/api#replykeyboardremove) or
 *   [ForceReply](https://core.telegram.org/bots/api#forcereply) Additional interface options.
 *   A JSON-serialized object for an [inline keyboard](https://core.telegram.org/bots/features#inline-keyboards),
 *   [custom reply keyboard](https://core.telegram.org/bots/features#keyboards), instructions to remove reply keyboard
 *   or to force a reply from the user.
 */

/**
 * @typedef {object} ExtraAudio
 * @see https://core.telegram.org/bots/api#sendaudio
 * @property {number} [message_thread_id] *Optional*. Unique identifier for the target message thread (topic)
 *   of the forum; for forum supergroups only
 * @property {string} [performer] Performer
 * @property {string} [title] Track name
 * @property {number} [duration] *Optional*. Duration of sent audio in seconds
 * @property {InputFile|FileId} [thumb] Thumbnail of the file sent; can be ignored if thumbnail generation for the file
 *   is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width
 *   and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't
 *   be reused and can be only uploaded as a new file, so you can pass "attach://<file_attach_name>" if the thumbnail
 *   was uploaded using multipart/form-data under <file_attach_name>.
 *   [More information on Sending Files »](https://core.telegram.org/bots/api#sending-files)
 * @property {string} [caption] *Optional*. Audio caption, 0-1024 characters after entities parsing
 * @property {ParseMode} [parse_mode] *Optional*. Mode for parsing entities in the audio caption. See [formatting
 *   options](https://core.telegram.org/bots/api/#formatting-options) for more
 *   details.
 * @property {MessageEntity[]} [caption_entities] *Optional*. List of special entities that appear in the caption,
 *   which can be specified instead of *parse\_mode*
 * @property {boolean} [has_spoiler] *Optional*. Pass `True` if the video needs to be covered with a spoiler animation
 * @property {boolean} [disable_notification] *Optional*. Sends the message
 *   [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no
 *   sound.
 * @property {boolean} [protect_content] *Optional*. Protects the contents of the sent message from forwarding
 * @property {number} [reply_to_message_id] *Optional*. If the message is a reply, ID of the original message
 * @property {boolean} [allow_sending_without_reply] *Optional*. Pass *True* if the message should be sent even if the
 *   specified replied-to message is not found
 * @property {InlineKeyboardMarkup|ReplyKeyboardMarkup|ReplyKeyboardRemove|ForceReply} [reply_markup] *Optional*.
 *   [InlineKeyboardMarkup](https://core.telegram.org/bots/api#inlinekeyboardmarkup) or
 *   [ReplyKeyboardMarkup](https://core.telegram.org/bots/api#replykeyboardmarkup) or
 *   [ReplyKeyboardRemove](https://core.telegram.org/bots/api#replykeyboardremove) or
 *   [ForceReply](https://core.telegram.org/bots/api#forcereply) Additional interface options.
 *   A JSON-serialized object for an [inline keyboard](https://core.telegram.org/bots/features#inline-keyboards),
 *   [custom reply keyboard](https://core.telegram.org/bots/features#keyboards), instructions to remove reply keyboard
 *   or to force a reply from the user.
 */

/**
 * @typedef {object} ExtraContact
 * @see https://core.telegram.org/bots/api#sendcontact
 * @property {number} [message_thread_id] *Optional*. Unique identifier for the target message thread (topic)
 *   of the forum; for forum supergroups only
 * @property {string} [last_name] *Optional*. Contact's last name
 * @property {string} [vcard] *Optional*. Additional data about the contact in the form of a
 *   [vCard](https://en.wikipedia.org/wiki/VCard), 0-2048 bytes
 * @property {boolean} [disable_notification] *Optional*. Sends the message
 *   [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no
 *   sound.
 * @property {boolean} [protect_content] *Optional*. Protects the contents of the sent message from forwarding
 * @property {number} [reply_to_message_id] *Optional*. If the message is a reply, ID of the original message
 * @property {boolean} [allow_sending_without_reply] *Optional*. Pass *True* if the message should be sent even if the
 *   specified replied-to message is not found
 * @property {InlineKeyboardMarkup|ReplyKeyboardMarkup|ReplyKeyboardRemove|ForceReply} [reply_markup] *Optional*.
 *   [InlineKeyboardMarkup](https://core.telegram.org/bots/api#inlinekeyboardmarkup) or
 *   [ReplyKeyboardMarkup](https://core.telegram.org/bots/api#replykeyboardmarkup) or
 *   [ReplyKeyboardRemove](https://core.telegram.org/bots/api#replykeyboardremove) or
 *   [ForceReply](https://core.telegram.org/bots/api#forcereply) Additional interface options.
 *   A JSON-serialized object for an [inline keyboard](https://core.telegram.org/bots/features#inline-keyboards),
 *   [custom reply keyboard](https://core.telegram.org/bots/features#keyboards), instructions to remove reply keyboard
 *   or to force a reply from the user.
 */

/**
 * @typedef {object} ExtraCreateForumTopic
 * @see https://core.telegram.org/bots/api#createforumtopic
 * @property {number} [icon_color] *Optional*. Color of the topic icon in RGB format. Currently, must be one of
 * `7322096` (`0x6FB9F0`), `16766590` (`0xFFD67E`), `13338331` (`0xCB86DB`), `9367192` (`0x8EEE98`), `16749490`
 *   (`0xFF93B2`), or
 * `16478047` (`0xFB6F5F`)
 * @property {string} [icon_custom_emoji_id] *Optional*. New unique identifier of the custom emoji shown as the topic
 *   icon. Use [getForumTopicIconStickers](https://core.telegram.org/bots/api#getforumtopiciconstickers) to get all
 *   allowed custom emoji identifiers. Pass an empty string to remove the icon. If not specified, the current icon will
 *   be kept
 */

/**
 * @typedef {object} ExtraDocument
 * @see https://core.telegram.org/bots/api#senddocument
 * @property {number} [message_thread_id] *Optional*. Unique identifier for the target message thread (topic)
 *   of the forum; for forum supergroups only
 * @property {InputFile|FileId} [thumb] *Optional*. Thumbnail of the file sent; can be ignored if thumbnail generation
 *   for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size.
 *   A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data.
 *   Thumbnails can't be reused and can be only uploaded as a new file, so you can pass "attach://<file_attach_name>"
 *   if the thumbnail was uploaded using multipart/form-data under <file_attach_name>.
 *   [More information on Sending Files »](https://core.telegram.org/bots/api#sending-files)
 * @property {string} [caption] *Optional*. Document caption (may also be used when resending documents by file_id),
 *   0-1024 characters after entities parsing
 * @property {ParseMode} [parse_mode] *Optional*. Mode for parsing entities in the document caption. See [formatting
 *   options](https://core.telegram.org/bots/api/#formatting-options) for more
 *   details.
 * @property {MessageEntity[]} [caption_entities] *Optional*. List of special entities that appear in the caption,
 *   which can be specified instead of *parse\_mode*
 * @property {boolean} [disable_content_type_detection] *Optional*. Disables automatic server-side content type
 *   detection for files uploaded using multipart/form-data
 * @property {boolean} [disable_notification] *Optional*. Sends the message
 *   [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no
 *   sound.
 * @property {boolean} [protect_content] *Optional*. Protects the contents of the sent message from forwarding
 * @property {number} [reply_to_message_id] *Optional*. If the message is a reply, ID of the original message
 * @property {boolean} [allow_sending_without_reply] *Optional*. Pass *True* if the message should be sent even if the
 *   specified replied-to message is not found
 * @property {InlineKeyboardMarkup|ReplyKeyboardMarkup|ReplyKeyboardRemove|ForceReply} [reply_markup] *Optional*.
 *   [InlineKeyboardMarkup](https://core.telegram.org/bots/api#inlinekeyboardmarkup) or
 *   [ReplyKeyboardMarkup](https://core.telegram.org/bots/api#replykeyboardmarkup) or
 *   [ReplyKeyboardRemove](https://core.telegram.org/bots/api#replykeyboardremove) or
 *   [ForceReply](https://core.telegram.org/bots/api#forcereply) Additional interface options.
 *   A JSON-serialized object for an [inline keyboard](https://core.telegram.org/bots/features#inline-keyboards),
 *   [custom reply keyboard](https://core.telegram.org/bots/features#keyboards), instructions to remove reply keyboard
 *   or to force a reply from the user.
 */

/**
 * @typedef {object} ExtraEditMessageCaption
 * @see https://core.telegram.org/bots/api#editmessagecaption
 * @property {ParseMode} [parse_mode] *Optional*. Mode for parsing entities in the message caption. See [formatting
 *   options](https://core.telegram.org/bots/api/#formatting-options) for more
 *   details.
 * @property {MessageEntity[]} [caption_entities] *Optional*. List of special entities that appear in the caption,
 *   which can be specified instead of *parse\_mode*
 * @property {InlineKeyboardMarkup} [reply_markup] *Optional* A JSON-serialized object for an
 *   [inline keyboard](https://core.telegram.org/bots/features#inline-keyboards). If empty, one 'Pay `total price`'
 *   button will be shown. If not empty, the first button must be a Pay button.
*/

/**
 * @typedef {object} ExtraEditMessageText
 * @see https://core.telegram.org/bots/api#editmessagetext
 * @property {boolean} [disable_web_page_preview] *Optional*. Disables link previews for links in the sent message
 * @property {ParseMode} [parse_mode] *Optional*. Mode for parsing entities in the text. See [formatting
 *   options](https://core.telegram.org/bots/api/#formatting-options) for more
 *   details.
 * @property {MessageEntity[]} [entities] *Optional*. List of special entities that appear in the caption,
 *   which can be specified instead of *parse\_mode*
 * @property {InlineKeyboardMarkup} [reply_markup] *Optional* A JSON-serialized object for an
 *   [inline keyboard](https://core.telegram.org/bots/features#inline-keyboards). If empty, one 'Pay `total price`'
 *   button will be shown. If not empty, the first button must be a Pay button.
 */

/**
 * @typedef {object} ExtraStopPoll
 * @see https://core.telegram.org/bots/api#stoppoll
 * @property {InlineKeyboardMarkup} [reply_markup] *Optional* A JSON-serialized object for an
 *   [inline keyboard](https://core.telegram.org/bots/features#inline-keyboards). If empty, one 'Pay `total price`'
 *   button will be shown. If not empty, the first button must be a Pay button.
 */

/**
 * @typedef {object} ExtraUnbanMember
 * @see https://core.telegram.org/bots/api#unbanchatmember
 * @property {boolean} [only_if_banned] *Optional*. Do nothing if the user is not banned
 */

/**
 * @typedef {object} ExtraEditMessageReplyMarkup
 * @see https://core.telegram.org/bots/api#editmessagereplymarkup
 * @property {InlineKeyboardMarkup} [reply_markup] *Optional* A JSON-serialized object for an
 *   [inline keyboard](https://core.telegram.org/bots/features#inline-keyboards). If empty, one 'Pay `total price`'
 *   button will be shown. If not empty, the first button must be a Pay button.
 */

/**
 * @typedef {object} ExtraStopMessageLiveLocation
 * @see https://core.telegram.org/bots/api#stopmessagelivelocation
 * @property {InlineKeyboardMarkup} [reply_markup] *Optional* A JSON-serialized object for an
 *   [inline keyboard](https://core.telegram.org/bots/features#inline-keyboards). If empty, one 'Pay `total price`'
 *   button will be shown. If not empty, the first button must be a Pay button.
 */

/**
 * @typedef {object} ExtraGetMyCommands
 * @see https://core.telegram.org/bots/api#getmycommands
 * @property {string} [language_code] *Optional*. A two-letter ISO 639-1 language code or an empty string
 */

/**
 * @typedef {object} ExtraDeleteMyCommands
 * @see https://core.telegram.org/bots/api#deletemycommands
 * @property {string} [language_code] *Optional*. A two-letter ISO 639-1 language code or an empty string
 */

/**
 * @typedef {object} ExtraSetMyCommands
 * @see https://core.telegram.org/bots/api#setmycommands
 * @property {string} [language_code] *Optional*. A two-letter ISO 639-1 language code or an empty string
 * @property {BotCommandScope} [scope] *Optional*. A JSON-serialized object, describing scope of users for which the commands are
 *   relevant. Defaults to [BotCommandScopeDefault](https://core.telegram.org/bots/api#botcommandscopedefault).
 */

/**
 * @typedef {object} ExtraPromoteChatMember
 * @see https://core.telegram.org/bots/api#promotechatmember
 * @property {boolean} [is_anonymous] *Optional*. *True*, if the poll needs to be anonymous, defaults to *True*
 * @property {boolean} [can_manage_chat] *Optional*.  *True*, if the administrator can access the chat event log, chat
 *   statistics, message statistics in channels, see channel members, see anonymous
 *   administrators in supergroups and ignore slow mode. Implied by any other
 *   administrator privilege
 * @property {boolean} [can_post_messages] *Optional*. *True*, if the administrator can post in the channel; channels
 *   only
 * @property {boolean} [can_edit_messages] *Optional*. *True*, if the administrator can edit messages of other users
 *   and can pin messages; channels only
 * @property {boolean} [can_delete_messages] *Optional*. *True*, if the administrator can delete messages of other users
 * @property {boolean} [can_manage_video_chats] *Optional*. *True*, if the administrator can manage video chats
 * @property {boolean} [can_restrict_members] *Optional*. *True*, if the administrator can restrict, ban or unban chat
 *   members
 * @property {boolean} [can_promote_members] *Optional*. *True*, if the administrator can add new administrators with
 *   a subset of
 *   their own privileges or demote administrators that they have promoted, directly or indirectly (promoted by
 *   administrators that were appointed by the user)
 * @property {boolean} [can_invite_users] *Optional*. *True*, if the user is allowed to invite new users to the chat
 * @property {boolean} [can_change_info] *Optional*. *True*, if the user is allowed to change the chat title, photo
 *   and other settings
 * @property {boolean} [can_pin_messages] *Optional*. *True*, if the user is allowed to pin messages; groups and
 *   supergroups only
 * @property {boolean} [can_manage_topics] *Optional*. *True*, if the user is allowed to create, rename, close, and
 *   reopen forum topics; supergroups only
 */

/**
 * @typedef {object} ExtraPinChatMessage
 * @see https://core.telegram.org/bots/api#pinchatmessage
 * @property {boolean} [disable_notification] Sends the message
 *   [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive
 *   a notification with no sound.
 */

/**
 * @typedef {object} ExtraUnPinChatMessage
 * @see https://core.telegram.org/bots/api#unpinchatmessage
 * @property {number} [message_id] Identifier of a message to unpin. If not specified, the most recent pinned message
 *   (by sending date) will be unpinned.
 */

/**
 * @typedef {object} ExtraSetChatPermissions
 * @see https://core.telegram.org/bots/api#setchatpermissions
 * @property {boolean} [use_independent_chat_permissions] *Optional*. Pass *True* if chat permissions are set
 *   independently. Otherwise, the *can_send_other_messages* and *can_add_web_page_previews* permissions will imply the
 *   *can_send_messages*, *can_send_audios*, *can_send_documents*, *can_send_photos*, *can_send_videos*,
 *   *can_send_video_notes*, and *can_send_voice_notes* permissions; the *can_send_polls* permission will
 *   imply the *can_send_messages* permission.
 */

/**
 * @typedef {object} ExtraVideoNote
 * @see https://core.telegram.org/bots/api#sendvideonote
 * @property {number} [message_thread_id] *Optional*. Unique identifier for the target message thread (topic)
 *   of the forum; for forum supergroups only
 * @property {number} [duration] *Optional*. Duration of sent video in seconds
 * @property {number} [length] *Optional*. Video width and height, i.e. diameter of the video message
 * @property {InputFile|FileId} [thumb] *Optional*. Thumbnail of the file sent; can be ignored if thumbnail generation
 *   for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A
 *   thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data.
 *   Thumbnails can't be reused and can be only uploaded as a new file, so you can pass "attach://<file_attach_name>"
 *   if the thumbnail was uploaded using multipart/form-data under <file_attach_name>.
 *   [More information on Sending Files »](https://core.telegram.org/bots/api#sending-files)
 * @property {boolean} [disable_notification] *Optional*. Sends the message
 *   [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no
 *   sound.
 * @property {boolean} [protect_content] *Optional*. Protects the contents of the sent message from forwarding
 * @property {number} [reply_to_message_id] *Optional*. If the message is a reply, ID of the original message
 * @property {boolean} [allow_sending_without_reply] *Optional*. Pass *True* if the message should be sent even if the
 *   specified replied-to message is not found
 * @property {InlineKeyboardMarkup|ReplyKeyboardMarkup|ReplyKeyboardRemove|ForceReply} [reply_markup] *Optional*.
 *   [InlineKeyboardMarkup](https://core.telegram.org/bots/api#inlinekeyboardmarkup) or
 *   [ReplyKeyboardMarkup](https://core.telegram.org/bots/api#replykeyboardmarkup) or
 *   [ReplyKeyboardRemove](https://core.telegram.org/bots/api#replykeyboardremove) or
 *   [ForceReply](https://core.telegram.org/bots/api#forcereply) Additional interface options.
 *   A JSON-serialized object for an [inline keyboard](https://core.telegram.org/bots/features#inline-keyboards),
 *   [custom reply keyboard](https://core.telegram.org/bots/features#keyboards), instructions to remove reply keyboard
 *   or to force a reply from the user.
 */

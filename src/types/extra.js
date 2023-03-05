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

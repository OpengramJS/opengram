/**
 * @typedef {object} TelegramOptions
 * @property {string} [username] Bot username, used if you don't call `bot.launch()`
 * @property {http.Agent} [attachmentAgent] HTTP Agent used for attachments
 * @property {http.Agent} [agent] HTTP agent used for API calls. By default, it have this configuration:
 *     `new https.Agent({ keepAlive: true, keepAliveMsecs: 10000 })`
 * @property {string} [apiRoot] API root URL
 * @property {boolean} [channelMode=false] If `true`, channel posts can be matched as `text` update type
 * @property {string} [apiPrefix=bot] API prefix before bot token, by default `bot`, but if you use
 *    [TDLight](https://github.com/tdlight-team/tdlight) you maybe should change `apiPrefix` to `user`
 * @property {boolean} [testEnv=false] Enable / disable test environment for WebApps,
 *    see more [here](https://core.telegram.org/bots/webapps#testing-web-apps)
 * @property {boolean} [webhookReply=true] Enable / disable webhook reply
 */

/**
 * @typedef {object} User
 * @description This object represents a Telegram user or bot.
 * @see https://core.telegram.org/bots/api#user
 * @property {number} id Unique identifier for this user or bot. This number may have more than 32 significant bits
 *    and some programming languages may have difficulty/silent defects in interpreting it.
 *    But it has at most 52 significant bits, so a 64-bit integer or double-precision float type are safe
 *    for storing this identifier.
 * @property {boolean} is_bot *True*, if this user is a bot
 * @property {string} first_name User's or bot's first name
 * @property {string} [last_name] **Optional.** User's or bot's last name
 * @property {string} [username] **Optional.** User's or bot's username
 * @property {string} [language_code] **Optional.**
 *    [IETF language tag](https://en.wikipedia.org/wiki/IETF_language_tag) of the user's language
 * @property {boolean} [is_premium] **Optional.** *True*, if this user is a Telegram Premium user
 * @property {boolean} [added_to_attachment_menu] **Optional.** *True*, if this user added the bot
 *    to the attachment menu
 * @property {boolean} [can_join_groups] **Optional.** *True*, if the bot can be invited to groups.
 *    Returned only in {@link Telegram.getMe getMe}.
 * @property {boolean} [can_read_all_group_messages] **Optional.** *True*, if
 *    [privacy mode](https://core.telegram.org/bots#privacy-mode) is disabled for the bot.
 *    Returned only in {@link Telegram.getMe getMe}.
 * @property {boolean} [supports_inline_queries] **Optional.** *True*, if the bot supports inline queries.
 *    Returned only in {@link Telegram.getMe getMe}.
 */

/**
 * @typedef {object} File
 * This object represents a file ready to be downloaded.
 * The file can be downloaded via the link `https://api.telegram.org/file/bot<token>/<file_path>`.
 * It is guaranteed that the link will be valid for at least 1 hour. When the link expires,
 * a new one can be requested by calling {@link Telegram.getFile getFile}.
 *
 * The maximum file size to download is 20 MB
 * @property {string} file_id Identifier for this file, which can be used to download or reuse the file
 * @property {string} file_unique_id Unique identifier for this file, which is supposed to be the same over time
 *    and for different bots. Can't be used to download or reuse the file.
 * @property {number} [file_size] **Optional.** File size in bytes. It can be bigger than `2^31` and some programming
 *    languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits,
 *    so a signed 64-bit integer or double-precision float type are safe for storing this value.
 * @property {string} [file_path] **Optional.** File path. Use `https://api.telegram.org/file/bot<token>/<file_path>`
 *    to get the file.
 */

/**
 * @typedef {object} GameHighScore
 * @description This object represents one row of the high scores table for a game.
 * @property {number} position Position in high score table for the game
 * @property {User} user User Object
 * @property {number} score Score
 */

/**
 * @typedef {object} setWebhookExtra
 * @description Extra params for {@link Telegram.setWebhook setWebhook}
 * @see https://core.telegram.org/bots/api#setwebhook
 * @property {Buffer|stream} [certificate] Upload your public key certificate so that the root certificate in use
 *    can be checked. See our self-signed guide for details.
 * @property {string} [ip_address] The fixed IP address which will be used to send webhook requests instead of
 *    the IP address resolved through DNS
 * @property {number} [max_connections=40] The maximum allowed number of simultaneous HTTPS connections to the webhook
 *    for update delivery, 1-100. Defaults to 40. Use lower values to limit the load on your bot's server,
 *    and higher values to increase your bot's throughput.
 * @param {string[]} [allowedUpdates] - Array of allowed updates or update name
 *     For example, specify `["message", "edited_channel_post", "callback_query"]` to only receive
 *     updates of these types. See [Update](https://core.telegram.org/bots/api#update) for a complete list of
 *     available update types.
 *     Specify an empty list to receive all update types except `chat_member` (default).
 *     If not specified, the previous setting will be used.
 * @property {boolean} [drop_pending_updates] Pass True to drop all pending updates
 * @property {string} [secret_token] A secret token to be sent in a header `X-Telegram-Bot-Api-Secret-Token`
 *    in every webhook request, 1-256 characters. Only characters `A-Z`, `a-z`, `0-9`, `_` and `-` are allowed.
 *    The header is useful to ensure that the request comes from a webhook set by you.
 */

/**
 * @typedef {object} deleteWebhookExtra
 * @description Extra params for {@link Telegram.deleteWebhook deleteWebhook}
 * @see https://core.telegram.org/bots/api#deletewebhook
 * @property {boolean} [drop_pending_updates] Pass True to drop all pending updates
 */

/**
 * @typedef {object} WebhookInfo
 * @property {string} url Webhook URL, may be empty if webhook is not set up
 * @property {boolean} has_custom_certificate *True*, if a custom certificate was provided for webhook
 *    certificate checks
 * @property {number} pending_update_count Number of updates awaiting delivery
 * @property {string} [ip_address] *Optional.* Currently used webhook IP address
 * @property {number} [last_error_date] *Optional.* Unix time of the most recent error that happened when trying to
 *    synchronize available updates with Telegram datacenters
 * @property {string} [last_error_message] *Optional.* The maximum allowed number of simultaneous HTTPS connections
 *    to the webhook for update delivery
 * @property {number} [last_synchronization_error_date] *Optional.* Unix time of the most recent error that happened
 *    when trying to synchronize available updates with Telegram datacenters
 * @property {number} [max_connections] *Optional.* The maximum allowed number of simultaneous HTTPS connections to the
 *    webhook for update delivery
 * @property {string[]} [allowed_updates] *Optional.* A list of update types the bot is subscribed to.
 *    Defaults to all update types except `chat_member`
 */

/** @typedef {'Markdown'|'MarkdownV2'|'HTML'} parseMode */
/** @typedef {
   'mention'|'hashtag'|'cashtag'|'bot_command'|'url'|'email'|'phone_number'|'bold'|'italic'|'underline'|'strikethrough'
   |'spoiler'|'code'|'pre'|'text_link'|'text_mention'|'custom_emoji'
  } entityType */

/**
 * @typedef {object} MessageEntity
 * @description This object represents one special entity in a text message. For example,
 *    hashtags, usernames, URLs, etc.
 * @see https://core.telegram.org/bots/api#messageentity
 * @property {entityType} type Type of the entity. Currently, can be “mention” (`@username`), “hashtag” (`#hashtag`),
 *    “cashtag” (`$USD`), “bot_command” (`/start@jobs_bot`), “url” (`https://telegram.org`),
 *    “email” (`do-not-reply@telegram.org`), “phone_number” (`+1-212-555-0123`),
 *    “bold” (**bold text**), “italic” (_italic text_), “underline” (underlined text),
 *    “strikethrough” (~~strikethrough text~~), “spoiler” (spoiler message),
 *    “code” (`monowidth string`), “pre” (`monowidth block`),
 *    “text_link” (for clickable text URLs), “text_mention”
 *    (for users [without usernames](https://telegram.org/blog/edit#new-mentions)),
 *    “custom_emoji” (for inline custom emoji stickers)
 * @property {number} offset Offset in UTF-16 code units to the start of the entity
 * @property {number} length Length of the entity in UTF-16 code units
 * @property {string} [url] *Optional.* For “text_link” only, URL that will be opened after user taps on the text
 * @property {User} [user] *Optional.* For “text_mention” only, the mentioned user
 * @property {string} [language] *Optional.* For “pre” only, the programming language of the entity text
 * @property {string} [custom_emoji_id] *Optional.* For “custom_emoji” only, unique identifier of the custom emoji.
 *    Use getCustomEmojiStickers to get full information about the sticker
 */

/**
 * @typedef {object} MessageExtraParams
 * @property {parseMode} [parse_mode] Mode for parsing entities in the message text. See formatting
 *    options for more details.
 * @property {MessageEntity} [entities] List of special entities that appear in message text,
 *    which can be specified instead of `parse_mode`
 * @property {boolean} [disable_web_page_preview] Disables link previews for links in this message
 * @property {boolean} [disable_notification] Sends the message
 *    [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive
 *    a notification with no sound.
 * @property {boolean} [protect_content] Protects the contents of the sent message from forwarding and saving
 * @property {number} [reply_to_message_id] If the message is a reply, ID of the original message
 * @property {boolean} [allow_sending_without_reply] Pass `True`, if the message should be sent even if the specified
 *    replied-to message is not found
 * @property {object} [reply_markup] Additional interface options. A object for an inline keyboard,
 *    custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user.
 */

/**
 * @typedef {object} forwardExtraParams
 * @property {boolean} [disable_notification] Sends the message
 *    [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive
 *    a notification with no sound.
 * @property {boolean} [protect_content] Protects the contents of the forwarded message from forwarding and saving
 */

/**
 * @typedef {object} PhotoSize
 * @property {string} file_id Identifier for this file, which can be used to download or reuse the file
 * @property {string} file_unique_id Unique identifier for this file, which is supposed to be the same over time and
 *    for different bots. Can't be used to download or reuse the file.
 * @property {number} width Photo width
 * @property {number} height Photo height
 * @property {number} file_size *Optional.* File size in bytes
 */

/**
 * @typedef {object} UserProfilePhotos
 * @description This object represent a user's profile pictures.
 * @see https://core.telegram.org/bots/api#userprofilephotos
 * @property {number} total_count Total number of profile pictures the target user has
 * @property {Array<PhotoSize[]>} photos Requested profile pictures (in up to 4 sizes each)
 */

/** @typedef {Buffer|stream|string} attachmentFile **/

/**
 * @typedef {object} Document
 * @description This object represents a general file (as opposed to photos, voice messages and audio files).
 * @see https://core.telegram.org/bots/api#document
 * @property {string} file_id Identifier for this file, which can be used to download or reuse the file
 * @property {string} file_unique_id Unique identifier for this file, which is supposed to be the same over time
 *    and for different bots. Can't be used to download or reuse the file.
 * @property {string} [thumb] *Optional.* Document thumbnail as defined by sender
 * @property {string} [file_name] *Optional.* Original filename as defined by sender
 * @property {string} [mime_type] *Optional.* MIME type of the file as defined by sender
 * @property {number} [file_size] *Optional.* File size in bytes.
 *    It can be bigger than 2^31 and some programming languages may have difficulty/silent defects in
 *    interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision
 *    float type are safe for storing this value.
 */

/**
 * @typedef {object} stickerExtraParams
 * @property {boolean} [disable_notification] Sends the message
 *    [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive
 *    a notification with no sound.
 * @property {boolean} [protect_content] Protects the contents of the forwarded message from forwarding and saving
 */

/**
 * @typedef InputMediaPhoto
 * @property {string} type Type of the result, must be _photo_
 * @property {attachmentFile} media File to send. Pass a file_id to send a file that exists on the Telegram servers
 *    (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass
 *    “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name.
 *    [More information on Sending Files »](https://core.telegram.org/bots/api#sending-files)
 * @property {string} [caption] *Optional.* Caption of the video to be sent, 0-1024 characters after entities parsing
 * @property {parseMode} [parse_mode] *Optional.* Mode for parsing entities in the photo caption.
 *    See [formatting](https://core.telegram.org/bots/api#formatting-options) options for more details.
 * @property {MessageEntity[]} [caption_entities] *Optional.* List of special entities that appear in the caption,
 *    which can be specified instead of `parse_mode`
 */

/**
 * @typedef InputMediaDocument
 * @property {string} type Type of the result, must be _document_
 * @property {attachmentFile} media File to send. Pass a file_id to send a file that exists on the
 *    Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet,
 *    or pass “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name.
 *    [More information on Sending Files »](https://core.telegram.org/bots/api#sending-files)
 * @property {attachmentFile} [thumb] *Optional.* Thumbnail of the file sent; can be ignored if thumbnail generation for
 *    the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size.
 *    A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using
 *    multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file,
 *    so you can pass “attach://<file_attach_name>” if the thumbnail was uploaded using
 *    multipart/form-data under <file_attach_name>.
 *    [More information on Sending Files »](https://core.telegram.org/bots/api#sending-files)
 * @property {string} [caption] *Optional.* Caption of the document to be sent, 0-1024 characters after entities parsing
 * @property {parseMode} [parse_mode] *Optional.* Mode for parsing entities in the document caption.
 *    See [formatting](https://core.telegram.org/bots/api#formatting-options) options for more details.
 * @property {MessageEntity[]} [caption_entities] *Optional.* List of special entities that appear in the caption,
 *    which can be specified instead of `parse_mode`
 * @property {boolean} [disable_content_type_detection] *Optional.* Disables automatic server-side content type detection
 *    for files uploaded using multipart/form-data. Always True, if the document is sent as part of an album.
 */

/**
 * @typedef InputMediaAudio
 * @property {string} type Type of the result, must be _audio_
 * @property {attachmentFile} media File to send. Pass a file_id to send a file that exists on the Telegram servers
 *    (recommended), pass an HTTP URL for Telegram to get a file from the Internet,
 *    or pass “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name>name.
 *    [More information on Sending Files »](https://core.telegram.org/bots/api#sending-files)
 * @property {attachmentFile} [thumb] *Optional.* Thumbnail of the file sent; can be ignored if thumbnail generation for
 *    the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size.
 *    A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded
 *    using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file,
 *    so you can pass “attach://<file_attach_name>” if the thumbnail was uploaded using multipart/form-data
 *    under <file_attach_name>.
 *    [More information on Sending Files »](https://core.telegram.org/bots/api#sending-files)
 * @property {string} [caption] *Optional.* Caption of the video to be sent, 0-1024 characters after entities parsing
 * @property {parseMode} [parse_mode] *Optional.* Mode for parsing entities in the audio caption.
 *    See [formatting](https://core.telegram.org/bots/api#formatting-options) options for more details.
 * @property {MessageEntity[]} [caption_entities] *Optional.* List of special entities that appear in the caption,
 *    which can be specified instead of `parse_mode`
 * @property {number} [duration] *Optional.* Duration of the audio in seconds
 * @property {string} [performer] *Optional.* Performer of the audio
 * @property {string} [title] *Optional.* Title of the audio
 */

/**
 * @typedef InputMediaVideo
 * @property {string} type Type of the result, must be _video_
 * @property {attachmentFile} media File to send. Pass a file_id to send a file that exists on the Telegram
 *    servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass
 *    “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name.
 *    [More information on Sending Files »](https://core.telegram.org/bots/api#sending-files)
 * @property {attachmentFile} [thumb] *Optional.* Optional. Thumbnail of the file sent; can be ignored if thumbnail
 *    generation for the file is supported server-side. The thumbnail should be in JPEG format and
 *    less than 200 kB in size.
 *    A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using
 *    multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass
 *    “attach://<file_attach_name>” if the thumbnail was uploaded using multipart/form-data under <file_attach_name>.
 *    [More information on Sending Files »](https://core.telegram.org/bots/api#sending-files)
 * @property {string} [caption] *Optional.* Caption of the video to be sent, 0-1024 characters after entities parsing
 * @property {parseMode} [parse_mode] *Optional.* Mode for parsing entities in the video caption.
 *    See [formatting](https://core.telegram.org/bots/api#formatting-options) options for more details.
 * @property {MessageEntity[]} [caption_entities] *Optional.* Optional. List of special entities that appear in the
 *    caption, which can be specified instead of `parse_mode`
 * @property {number} [width] *Optional.* Video width
 * @property {number} [height] *Optional.* Video height
 * @property {number} [duration] *Optional.* Video duration in seconds
 * @property {string} [supports_streaming] *Optional.* Pass True, if the uploaded video is suitable for streaming
 */

/**
 * @typedef {object} PollOption
 * @property {string} text Option text, 1-100 characters
 * @property {string} voter_count Number of users that voted for this option
 */

/**
 * @typedef {object} Poll
 * @description This object contains information about a poll.
 * @see https://core.telegram.org/bots/api#poll
 * @property {string} id Unique poll identifier
 * @property {string} question Poll question, 1-300 characters
 * @property {PollOption} options List of poll options
 * @property {number} total_voter_count Total number of users that voted in the poll
 * @property {boolean} is_closed True, if the poll is closed
 * @property {boolean} is_anonymous True, if the poll is anonymous
 * @property {'regular'|'quiz'} type Poll Poll type, currently can be `regular` or `quiz`
 * @property {boolean} allows_multiple_answers True, if the poll allows multiple answers
 * @property {number} [correct_option_id] *Optional.* 0-based identifier of the correct answer option.
 *    Available only for polls in the quiz mode, which are closed,
 *    or was sent (not forwarded) by the bot or to the private chat with the bot.
 * @property {string} [explanation] *Optional.* Text that is shown when a user chooses an incorrect answer or taps on the
 *    lamp icon in a quiz-style poll, 0-200 characters
 * @property {MessageEntity} [explanation_entities] Optional. Special entities like usernames, URLs, bot commands, etc.
 *    that appear in the explanation
 * @property {number} [open_period] *Optional.* Amount of time in seconds the poll will be active after creation
 * @property {number} [close_date] *Optional.* Point in time (Unix timestamp) when the poll will be automatically closed
 */

/** @typedef {'private'|'group'|'supergroup'|'channel'} chatType **/

/**
 * @typedef {object} ChatPhoto
 * @description This object represents a chat photo.
 * @property {string} small_file_id File identifier of small (160x160) chat photo. This file_id can be used only
 *    for photo download and only for as long as the photo is not changed.
 * @property {string} small_file_unique_id Unique file identifier of small (160x160) chat photo, which is supposed
 *    to be the same over time and for different bots. Can't be used to download or reuse the file.
 * @property {string} big_file_id File identifier of big (640x640) chat photo. This file_id can be used
 *    only for photo download and only for as long as the photo is not changed.
 * @property {string} big_file_unique_id Unique file identifier of big (640x640) chat photo, which is supposed
 *    to be the same over time and for different bots. Can't be used to download or reuse the file.
 */

/**
 * @typedef {object} Chat
 * @property {number} id Unique identifier for this chat. This number may have more than 32 significant bits and
 *    some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52
 *    significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this identifier.
 * @property {chatType} type Type of chat, can be either `private`, `group`, `supergroup` or `channel`
 * @property {string} [title] *Optional.* Title, for supergroups, channels and group chats
 * @property {string} [username] *Optional.* Username, for private chats, supergroups and channels if available
 * @property {string} [first_name] *Optional.* First name of the other party in a private chat
 * @property {string} [last_name] *Optional.* Last name of the other party in a private chat
 * @property {boolean} [is_forum] *Optional.* True, if the supergroup chat is a forum (has topics enabled)
 * @property {ChatPhoto} [photo] *Optional.* Chat photo. Returned only in getChat.
 * @property {string[]} [active_usernames] *Optional.* If non-empty, the list of
 *   [all active chat usernames](https://telegram.org/blog/topics-in-groups-collectible-usernames#collectible-usernames);
 *   for private chats, supergroups and channels. Returned only in {@link Telegram.getChat getChat}
 * @property {string} bio *Optional.* Bio of the other party in a private chat. Returned only in
 *   {@link Telegram.getChat getChat}.
 * @property {string} [emoji_status_custom_emoji_id] *Optional.* Custom emoji identifier of emoji status of the other
 *   party in a private chat. Returned only in {@link Telegram.getChat getChat}.
 */

/**
 * @typedef {ChatMemberOwner|ChatMemberAdministrator|ChatMemberMember|ChatMemberRestricted} ChatMember
 */

/**
 * @typedef {object} ChatMemberOwner
 * @description Represents a chat member that owns the chat and has all administrator privileges.
 * @property {'creator'} status The member's status in the chat, always “creator”
 * @property {User} user Information about the user
 * @property {boolean} is_anonymous `True`, if the user's presence in the chat is hidden
 * @property {string} [custom_title] *Optional.* Custom title for this user
 */

/**
 * @typedef {object} ChatMemberAdministrator
 * @description Represents a chat member that has some additional privileges.
 * @property {'administrator'} status The member's status in the chat, always “administrator”
 * @property {User} user Information about the user
 * @property {boolean} can_be_edited `True`, if the bot is allowed to edit administrator privileges of that user
 * @property {boolean} is_anonymous `True`, if the user's presence in the chat is hidden
 * @property {boolean} can_manage_chat `True`, if the administrator can access the chat event log, chat statistics,
 *    message statistics in channels, see channel members, see anonymous administrators in supergroups and ignore slow
 *    mode. Implied by any other administrator privilege
 * @property {boolean} can_delete_messages `True`, if the administrator can delete messages of other users
 * @property {boolean} can_manage_video_chats `True`, if the administrator can manage video chats
 * @property {boolean} can_restrict_members `True`, if the administrator can restrict, ban or unban chat members
 * @property {boolean} can_promote_members `True`, if the administrator can add new administrators with a subset of their
 *    own privileges or demote administrators that he has promoted, directly or indirectly (promoted by administrators
 *    that were appointed by the user)
 * @property {boolean} can_change_info `True`, if the user is allowed to change the chat title, photo and other settings
 * @property {boolean} can_invite_users `True`, if the user is allowed to invite new users to the chat
 * @property {boolean} [can_post_messages] *Optional.* `True`, if the administrator can post in the channel; channels only
 * @property {boolean} [can_edit_messages] *Optional.* `True`, if the administrator can edit messages of other
 *    users and can pin messages; channels only
 * @property {boolean} [can_pin_messages] *Optional.* `True`, if the user is allowed to pin messages; groups and supergroups only
 * @property {boolean} [can_manage_topics] *Optional.* `True`, if the user is allowed to create, rename, close, and reopen forum topics; supergroups only
 * @property {boolean} [custom_title] *Optional.* Custom title for this user
 */

/**
 * @typedef {object} ChatMemberMember
 * @description Represents a chat member that has no additional privileges or restrictions.
 * @property {'member'} status The member's status in the chat, always “member”
 * @property {User} user Information about the user
 */

/**
 * @typedef {object} ChatMemberRestricted
 * @description Represents a chat member that is under certain restrictions in the chat. Supergroups only.
 * @property {'restricted'} status The member's status in the chat, always “restricted”
 * @property {User} user Information about the user
 * @property {boolean} is_member `True`, if the user is a member of the chat at the moment of the request
 * @property {boolean} can_change_info `True`, if the user is allowed to change the chat title, photo and other settings
 * @property {boolean} can_invite_users `True`, if the user is allowed to invite new users to the chat
 * @property {boolean} can_pin_messages `True`, if the user is allowed to pin messages
 * @property {boolean} can_send_messages `True`, if the user is allowed to send text messages, contacts, locations
 *    and venues
 * @property {boolean} can_send_media_messages `True`, if the user is allowed to send audios, documents,
 *    photos, videos, video notes and voice notes
 * @property {boolean} can_send_polls `True`, if the user is allowed to send polls
 * @property {boolean} can_send_other_messages `True`, if the user is allowed to send animations, games,
 *    stickers and use inline bots
 * @property {boolean} can_add_web_page_previews `True`, if the user is allowed to add web page previews to their messages
 * @property {boolean} can_manage_topics `True`, if the user is allowed to create forum topics
 * @property {number} until_date Date when restrictions will be lifted for this user; unix time. If 0, then the
 *    user is restricted forever
 */

/**
 * @typedef {InlineQueryResultCachedAudio|InlineQueryResultCachedDocument|InlineQueryResultCachedGif} InlineQueryResult
 */

/**
 * @typedef {object} InlineQueryResultCachedAudio
 * @description Represents a link to an MP3 audio file stored on the Telegram servers. By default, this audio file will
 *    be sent by the user. Alternatively, you can use input_message_content to send a message with the
 *    specified content instead of the audio.
 * @property {'audio'} type Type of the result, must be audio
 * @property {string} id Unique identifier for this result, 1-64 bytes
 * @property {string} audio_file_id A valid file identifier for the audio file
 * @property {string} caption Optional. Caption, 0-1024 characters after entities parsing
 * @property {parseMode} parse_mode *Optional.* Mode for parsing entities in the audio caption.
 *    See [formatting options](https://core.telegram.org/bots/api#formatting-options) for more details.
 * @property {MessageEntity[]} caption_entities *Optional.* List of special entities that appear in the caption, which
 *    can be specified instead of parse_mode
 * @property {object} reply_markup *Optional.*
 *    [Inline keyboard](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating) attached to the message
 * @property {InputTextMessageContent} input_message_content *Optional.* Content of the message to be sent instead of the audio
 */

/**
 * @typedef {object} InlineQueryResultCachedDocument
 * @description Represents a link to a file stored on the Telegram servers. By default, this file will be sent
 *    by the user with an optional caption. Alternatively, you can use `input_message_content` to send a message with
 *    the specified content instead of the file.
 * @property {'document'} type Type of the result, must be `document`
 * @property {string} id Unique identifier for this result, 1-64 bytes
 * @property {string} title Title for the result
 * @property {string} document_file_id A valid file identifier for the file
 * @property {string} [description] *Optional.* Short description of the result
 * @property {string} [caption] Optional. Caption, 0-1024 characters after entities parsing
 * @property {parseMode} [parse_mode] *Optional.* Mode for parsing entities in the audio caption.
 *    See [formatting options](https://core.telegram.org/bots/api#formatting-options) for more details.
 * @property {MessageEntity[]} [caption_entities] *Optional.* List of special entities that appear in the caption, which
 *    can be specified instead of parse_mode
 * @property {object} [reply_markup] *Optional.*
 *    [Inline keyboard](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating) attached to the message
 * @property {InputTextMessageContent} [input_message_content] *Optional.* Content of the message to be sent instead of the audio
 */

/**
 * @typedef {object} InlineQueryResultCachedGif
 * @description Represents a link to an animated GIF file stored on the Telegram servers. By default,
 *    this animated GIF file will be sent by the user with an optional caption. Alternatively, you can use
 *    `input_message_content` to send a message with specified content instead of the animation.
 * @property {'gif'} type Type of the result, must be `gif`
 * @property {string} id Unique identifier for this result, 1-64 bytes
 * @property {string} gif_file_id A valid file identifier for the GIF file
 * @property {string} title *Optional.* Title for the result
 * @property {string} caption Optional. Caption of the GIF file to be sent, 0-1024 characters after entities parsing
 * @property {parseMode} parse_mode *Optional.* Mode for parsing entities in the caption. See formatting
 *    options for more details.
 * @property {MessageEntity[]} caption_entities Optional. List of special entities that appear in the caption,
 *    which can be specified instead of `parse_mode`
 * @property {object} reply_markup Optional. Inline keyboard attached to the message
 * @property {InputTextMessageContent} input_message_content Content of the message to be sent
 */

/**
 * @typedef {object} ChatPermissions
 * @description Describes actions that a non-administrator user is allowed to take in a chat.
 * @property {boolean} can_send_messages Optional. `True`, if the user is allowed to send text messages, contacts,
 *    locations and venues
 * @property {boolean} can_send_media_messages *Optional.* `True`, if the user is allowed to send audios, documents,
 *    photos, videos, video notes and voice notes, implies can_send_messages
 * @property {boolean} can_send_polls *Optional.* `True`, if the user is allowed to send polls,
 *    implies can_send_messages
 * @property {boolean} can_send_other_messages *Optional.* `True`, if the user is allowed to send animations, games,
 *    stickers and use inline bots, implies can_send_media_messages
 * @property {boolean} can_add_web_page_previews *Optional.* `True`, if the user is allowed to add web page previews
 *    to their messages, implies can_send_media_messages
 * @property {boolean} can_change_info *Optional.* `True`, if the user is allowed to change the chat title, photo
 *    and other settings. Ignored in public supergroups
 * @property {boolean} can_invite_users *Optional.* `True`, if the user is allowed to invite new users to the chat
 * @property {boolean} can_pin_messages *Optional.* `True`, if the user is allowed to pin messages.
 *    Ignored in public supergroups
 * @property {boolean} can_manage_topics *Optional.* `True`, if the user is allowed to create forum topics.
 *   If omitted defaults to the value of can_pin_messages
 */

/**
 * @typedef {object} ChatInviteLink
 * @description Represents an invite link for a chat.
 * @see https://core.telegram.org/bots/api#chatinvitelink
 * @property {string} invite_link The invite link. If the link was created by another chat administrator,
 *    then the second part of the link will be replaced with “…”.
 * @property {User} creator Creator of the link
 * @property {boolean} creates_join_request `True`, if users joining the chat via the link need to be approved
 *    by chat administrators
 * @property {boolean} is_primary `True`, if the link is primary
 * @property {boolean} is_revoked `True`, if the link is revoked
 * @property {string} name *Optional.* Invite link name
 * @property {number} expire_date *Optional.* Point in time (Unix timestamp) when the link will expire or has been expired
 * @property {number} member_limit *Optional.* The maximum number of users that can be members of the chat simultaneously
 *    after joining the chat via this invite link; 1-99999
 * @property {number} pending_join_request_count *Optional.* Number of pending join requests created using this link
 */

/**
 * @typedef {object} MessageId
 * @property {number} message_id Unique message identifier
 */

/**
 * @typedef {object} BotCommand
 * @description This object represents a bot command.
 * @property {string} command Text of the command; 1-32 characters. Can contain only lowercase English letters,
 *    digits and underscores.
 * @property {string} description Description of the command; 1-256 characters.
 */

/**
 * @typedef {object} InputTextMessageContent
 */

/**
 * @typedef {object} PassportElementError
 */

/**
 * @typedef {object} Message
 * @description This object represents a message.
 */

/**
 * @typedef {object} StickerSet
 */

/**
 * @typedef {object} Sticker
 */

/**
 * @typedef {object} Update
 */

/**
 * @typedef {object} ShippingOption
 */

/**
 * @typedef ChatAdministratorRights
 */

/**
 * @typedef MenuButton
 */

/**
 * @typedef {
    'typing'|'upload_photo'|'record_video'|'upload_video'|'record_voice'|'upload_voice'|'upload_document'|
    'choose_sticker'|'find_location'|'record_video_note'|'upload_video_note'
   } Action
 */

/**
 * @typedef {object} InputMedia
 */

/**
 * @typedef {object} Invoice
 */

/**
 * @typedef {object} SentWebAppMessage
 */

/**
 * @typedef {object} InlineQueryResult
 */

/**
 * @typedef {object} ForumTopic
 * @property {number|string} message_thread_id Unique identifier of the forum topic
 * @property {string} name Name of the topic
 * @property {number|string} icon_color Color of the topic icon in RGB format
 * @property {string} [icon_custom_emoji_id] *Optional.* Unique identifier of the custom emoji shown as the topic icon
 */

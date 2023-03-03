/**
  * This [object](https://core.telegram.org/bots/api/#available-types)
  * represents an incoming update.
  * At most **one** of the optional parameters can be present in any given update.
  *
  * @typedef {object} Update
  * @property {number} update_id The update's unique identifier. Update identifiers start from a certain positive
  *   number and increase sequentially. This ID becomes especially handy if you're
  *   using [webhooks](https://core.telegram.org/bots/api/#setwebhook), since it
  *   allows you to ignore repeated updates or to restore the correct update sequence,
  *   should they get out of order. If there are no new updates for at least a week,
  *   then identifier of the next update will be chosen randomly instead of
  *   sequentially.
  * @property {Message} [message] *Optional*. New incoming message of any kind - text, photo, sticker, etc.
  * @property {Message} [edited_message] *Optional*. New version of a message that is known to the bot and was edited
  * @property {Message} [channel_post] *Optional*. New incoming channel post of any kind - text, photo, sticker, etc.
  * @property {Message} [edited_channel_post] *Optional*. New version of a channel post that is known to the bot and was
  *   edited
  * @property {InlineQuery} [inline_query] *Optional*. New incoming
  *   [inline](https://core.telegram.org/bots/api/#inline-mode) query
  * @property {ChosenInlineResult} [chosen_inline_result] *Optional*. The result of an
  *   [inline](https://core.telegram.org/bots/api/#inline-mode) query that was chosen
  *   by a user and sent to their chat partner. Please see our documentation on the
  *   [feedback collecting](https://core.telegram.org/bots/inline#collecting-feedback)
  *   for details on how to enable these updates for your bot.
  * @property {CallbackQuery} [callback_query] *Optional*. New incoming callback query
  * @property {ShippingQuery} [shipping_query] *Optional*. New incoming shipping query. Only for invoices with flexible price
  * @property {PreCheckoutQuery} [pre_checkout_query] *Optional*. New incoming pre-checkout query. Contains full information about
  *   checkout
  * @property {Poll} [poll] *Optional*. New poll state. Bots receive only updates about stopped polls and
  *   polls, which are sent by the bot
  * @property {PollAnswer} [poll_answer] *Optional*. A user changed their answer in a non-anonymous poll. Bots receive
  *   new votes only in polls that were sent by the bot itself.
  * @property {ChatMemberUpdated} [my_chat_member] *Optional*. The bot's chat member status was updated in a chat. For private
  *   chats, this update is received only when the bot is blocked or unblocked by the
  *   user.
  * @property {ChatMemberUpdated} [chat_member] *Optional*. A chat member's status was updated in a chat. The bot must be an
  *   administrator in the chat and must explicitly specify “chat\_member” in the list
  *   of *allowed\_updates* to receive these updates.
  * @property {ChatJoinRequest} [chat_join_request] *Optional*. A request to join the chat has been sent. The bot must have the
  *   *can\_invite\_users* administrator right in the chat to receive these updates.
  * @see https://core.telegram.org/bots/api/#update
*/

/**
  * Describes the current status of a webhook.
  *
  * @typedef {object} WebhookInfo
  * @property {string} url Webhook URL, may be empty if webhook is not set up
  * @property {boolean} has_custom_certificate *True*, if a custom certificate was provided for webhook certificate checks
  * @property {number} pending_update_count Number of updates awaiting delivery
  * @property {string} [ip_address] *Optional*. Currently used webhook IP address
  * @property {number} [last_error_date] *Optional*. Unix time for the most recent error that happened when trying to
  *   deliver an update via webhook
  * @property {string} [last_error_message] *Optional*. Error message in human-readable format for the most recent error
  *   that happened when trying to deliver an update via webhook
  * @property {number} [last_synchronization_error_date] *Optional*. Unix time of the most recent error that happened when trying to
  *   synchronize available updates with Telegram datacenters
  * @property {number} [max_connections] *Optional*. The maximum allowed number of simultaneous HTTPS connections to the
  *   webhook for update delivery
  * @property {string[]} [allowed_updates] *Optional*. A list of update types the bot is subscribed to. Defaults to all
  *   update types except *chat\_member*
  * @see https://core.telegram.org/bots/api/#webhookinfo
*/

/**
  * This object represents a Telegram user or bot.
  *
  * @typedef {object} User
  * @property {number} id Unique identifier for this user or bot. This number may have more than 32
  *   significant bits and some programming languages may have difficulty/silent
  *   defects in interpreting it. But it has at most 52 significant bits, so a 64-bit
  *   integer or double-precision float type are safe for storing this identifier.
  * @property {boolean} is_bot *True*, if this user is a bot
  * @property {string} first_name User's or bot's first name
  * @property {string} [last_name] *Optional*. User's or bot's last name
  * @property {string} [username] *Optional*. User's or bot's username
  * @property {string} [language_code] *Optional*. [IETF language tag](https://en.wikipedia.org/wiki/IETF_language_tag)
  *   of the user's language
  * @property {boolean} [is_premium] *Optional*. *True*, if this user is a Telegram Premium user
  * @property {boolean} [added_to_attachment_menu] *Optional*. *True*, if this user added the bot to the attachment menu
  * @property {boolean} [can_join_groups] *Optional*. *True*, if the bot can be invited to groups. Returned only in
  *   [getMe](https://core.telegram.org/bots/api/#getme).
  * @property {boolean} [can_read_all_group_messages] *Optional*. *True*, if [privacy
  *   mode](https://core.telegram.org/bots/features#privacy-mode) is disabled for the
  *   bot. Returned only in [getMe](https://core.telegram.org/bots/api/#getme).
  * @property {boolean} [supports_inline_queries] *Optional*. *True*, if the bot supports inline queries. Returned only in
  *   [getMe](https://core.telegram.org/bots/api/#getme).
  * @see https://core.telegram.org/bots/api/#user
*/

/**
  * This object represents a chat.
  *
  * @typedef {object} Chat
  * @property {number} id Unique identifier for this chat. This number may have more than 32 significant
  *   bits and some programming languages may have difficulty/silent defects in
  *   interpreting it. But it has at most 52 significant bits, so a signed 64-bit
  *   integer or double-precision float type are safe for storing this identifier.
  * @property {'private'|'group'|'supergroup'|'channel'} type Type of chat, can be either “private”, “group”, “supergroup” or “channel”
  * @property {string} [title] *Optional*. Title, for supergroups, channels and group chats
  * @property {string} [username] *Optional*. Username, for private chats, supergroups and channels if available
  * @property {string} [first_name] *Optional*. First name of the other party in a private chat
  * @property {string} [last_name] *Optional*. Last name of the other party in a private chat
  * @property {boolean} [is_forum] *Optional*. *True*, if the supergroup chat is a forum (has
  *   [topics](https://telegram.org/blog/topics-in-groups-collectible-usernames#topics-in-groups)
  *   enabled)
  * @property {ChatPhoto} [photo] *Optional*. Chat photo. Returned only in
  *   [getChat](https://core.telegram.org/bots/api/#getchat).
  * @property {string[]} [active_usernames] *Optional*. If non-empty, the list of all [active chat
  *   usernames](https://telegram.org/blog/topics-in-groups-collectible-usernames#collectible-usernames);
  *   for private chats, supergroups and channels. Returned only in
  *   [getChat](https://core.telegram.org/bots/api/#getchat).
  * @property {string} [emoji_status_custom_emoji_id] *Optional*. Custom emoji identifier of emoji status of the other party in a
  *   private chat. Returned only in
  *   [getChat](https://core.telegram.org/bots/api/#getchat).
  * @property {string} [bio] *Optional*. Bio of the other party in a private chat. Returned only in
  *   [getChat](https://core.telegram.org/bots/api/#getchat).
  * @property {boolean} [has_private_forwards] *Optional*. *True*, if privacy settings of the other party in the private chat
  *   allows to use `tg://user?id=<user_id>` links only in chats with the user.
  *   Returned only in [getChat](https://core.telegram.org/bots/api/#getchat).
  * @property {boolean} [has_restricted_voice_and_video_messages] *Optional*. *True*, if the privacy settings of the other party restrict sending
  *   voice and video note messages in the private chat. Returned only in
  *   [getChat](https://core.telegram.org/bots/api/#getchat).
  * @property {boolean} [join_to_send_messages] *Optional*. *True*, if users need to join the supergroup before they can send
  *   messages. Returned only in
  *   [getChat](https://core.telegram.org/bots/api/#getchat).
  * @property {boolean} [join_by_request] *Optional*. *True*, if all users directly joining the supergroup need to be
  *   approved by supergroup administrators. Returned only in
  *   [getChat](https://core.telegram.org/bots/api/#getchat).
  * @property {string} [description] *Optional*. Description, for groups, supergroups and channel chats. Returned
  *   only in [getChat](https://core.telegram.org/bots/api/#getchat).
  * @property {string} [invite_link] *Optional*. Primary invite link, for groups, supergroups and channel chats.
  *   Returned only in [getChat](https://core.telegram.org/bots/api/#getchat).
  * @property {Message} [pinned_message] *Optional*. The most recent pinned message (by sending date). Returned only in
  *   [getChat](https://core.telegram.org/bots/api/#getchat).
  * @property {ChatPermissions} [permissions] *Optional*. Default chat member permissions, for groups and supergroups.
  *   Returned only in [getChat](https://core.telegram.org/bots/api/#getchat).
  * @property {number} [slow_mode_delay] *Optional*. For supergroups, the minimum allowed delay between consecutive
  *   messages sent by each unpriviledged user; in seconds. Returned only in
  *   [getChat](https://core.telegram.org/bots/api/#getchat).
  * @property {number} [message_auto_delete_time] *Optional*. The time after which all messages sent to the chat will be
  *   automatically deleted; in seconds. Returned only in
  *   [getChat](https://core.telegram.org/bots/api/#getchat).
  * @property {boolean} [has_aggressive_anti_spam_enabled] *Optional*. *True*, if aggressive anti-spam checks are
 *     enabled in the supergroup. The field is only available to chat administrators.
 *     Returned only in [getChat](https://core.telegram.org/bots/api/#getchat).
  * @property {boolean} [has_hidden_members] *Optional*. *True*, if non-administrators can only get the list of bots
  *    and administrators in the chat. Returned only in [getChat](https://core.telegram.org/bots/api/#getchat).
  * @property {boolean} [has_protected_content] *Optional*. *True*, if messages from the chat can't be forwarded to other chats.
  *   Returned only in [getChat](https://core.telegram.org/bots/api/#getchat).
  * @property {string} [sticker_set_name] *Optional*. For supergroups, name of group sticker set. Returned only in
  *   [getChat](https://core.telegram.org/bots/api/#getchat).
  * @property {boolean} [can_set_sticker_set] *Optional*. *True*, if the bot can change the group sticker set. Returned only
  *   in [getChat](https://core.telegram.org/bots/api/#getchat).
  * @property {number} [linked_chat_id] *Optional*. Unique identifier for the linked chat, i.e. the discussion group
  *   identifier for a channel and vice versa; for supergroups and channel chats. This
  *   identifier may be greater than 32 bits and some programming languages may have
  *   difficulty/silent defects in interpreting it. But it is smaller than 52 bits, so
  *   a signed 64 bit integer or double-precision float type are safe for storing this
  *   identifier. Returned only in
  *   [getChat](https://core.telegram.org/bots/api/#getchat).
  * @property {ChatLocation} [location] *Optional*. For supergroups, the location to which the supergroup is connected.
  *   Returned only in [getChat](https://core.telegram.org/bots/api/#getchat).
  * @see https://core.telegram.org/bots/api/#chat
*/

/**
  * This object represents a message.
  *
  * @typedef {object} Message
  * @property {number} message_id Unique message identifier inside this chat
  * @property {number} [message_thread_id] *Optional*. Unique identifier of a message thread to which the message belongs;
  *   for supergroups only
  * @property {User} [from] *Optional*. Sender of the message; empty for messages sent to channels. For
  *   backward compatibility, the field contains a fake sender user in non-channel
  *   chats, if the message was sent on behalf of a chat.
  * @property {Chat} [sender_chat] *Optional*. Sender of the message, sent on behalf of a chat. For example, the
  *   channel itself for channel posts, the supergroup itself for messages from
  *   anonymous group administrators, the linked channel for messages automatically
  *   forwarded to the discussion group. For backward compatibility, the field *from*
  *   contains a fake sender user in non-channel chats, if the message was sent on
  *   behalf of a chat.
  * @property {number} date Date the message was sent in Unix time
  * @property {Chat} chat Conversation the message belongs to
  * @property {User} [forward_from] *Optional*. For forwarded messages, sender of the original message
  * @property {Chat} [forward_from_chat] *Optional*. For messages forwarded from channels or from anonymous
  *   administrators, information about the original sender chat
  * @property {number} [forward_from_message_id] *Optional*. For messages forwarded from channels, identifier of the original
  *   message in the channel
  * @property {string} [forward_signature] *Optional*. For forwarded messages that were originally sent in channels or by
  *   an anonymous chat administrator, signature of the message sender if present
  * @property {string} [forward_sender_name] *Optional*. Sender's name for messages forwarded from users who disallow adding
  *   a link to their account in forwarded messages
  * @property {number} [forward_date] *Optional*. For forwarded messages, date the original message was sent in Unix
  *   time
  * @property {boolean} [is_topic_message] *Optional*. *True*, if the message is sent to a forum topic
  * @property {boolean} [is_automatic_forward] *Optional*. *True*, if the message is a channel post that was automatically
  *   forwarded to the connected discussion group
  * @property {Message} [reply_to_message] *Optional*. For replies, the original message. Note that the Message object in
  *   this field will not contain further *reply\_to\_message* fields even if it
  *   itself is a reply.
  * @property {User} [via_bot] *Optional*. Bot through which the message was sent
  * @property {number} [edit_date] *Optional*. Date the message was last edited in Unix time
  * @property {boolean} [has_protected_content] *Optional*. *True*, if the message can't be forwarded
  * @property {string} [media_group_id] *Optional*. The unique identifier of a media message group this message belongs
  *   to
  * @property {string} [author_signature] *Optional*. Signature of the post author for messages in channels, or the custom
  *   title of an anonymous group administrator
  * @property {string} [text] *Optional*. For text messages, the actual UTF-8 text of the message
  * @property {MessageEntity[]} [entities] *Optional*. For text messages, special entities like usernames, URLs, bot
  *   commands, etc. that appear in the text
  * @property {Animation} [animation] *Optional*. Message is an animation, information about the animation. For
  *   backward compatibility, when this field is set, the *document* field will also
  *   be set
  * @property {Audio} [audio] *Optional*. Message is an audio file, information about the file
  * @property {Document} [document] *Optional*. Message is a general file, information about the file
  * @property {PhotoSize[]} [photo] *Optional*. Message is a photo, available sizes of the photo
  * @property {Sticker} [sticker] *Optional*. Message is a sticker, information about the sticker
  * @property {Video} [video] *Optional*. Message is a video, information about the video
  * @property {VideoNote} [video_note] *Optional*. Message is a [video
  *   note](https://telegram.org/blog/video-messages-and-telescope), information about
  *   the video message
  * @property {Voice} [voice] *Optional*. Message is a voice message, information about the file
  * @property {string} [caption] *Optional*. Caption for the animation, audio, document, photo, video or voice
  * @property {MessageEntity[]} [caption_entities] *Optional*. For messages with a caption, special entities like usernames, URLs,
  *   bot commands, etc. that appear in the caption
  * @property {boolean} [has_media_spoiler] *Optional*. `True`, if the message media is covered by a spoiler animation
  * @property {Contact} [contact] *Optional*. Message is a shared contact, information about the contact
  * @property {Dice} [dice] *Optional*. Message is a dice with random value
  * @property {Game} [game] *Optional*. Message is a game, information about the game. [More about games
  *   »](https://core.telegram.org/bots/api/#games)
  * @property {Poll} [poll] *Optional*. Message is a native poll, information about the poll
  * @property {Venue} [venue] *Optional*. Message is a venue, information about the venue. For backward
  *   compatibility, when this field is set, the *location* field will also be set
  * @property {Location} [location] *Optional*. Message is a shared location, information about the location
  * @property {User[]} [new_chat_members] *Optional*. New members that were added to the group or supergroup and
  *   information about them (the bot itself may be one of these members)
  * @property {User} [left_chat_member] *Optional*. A member was removed from the group, information about them (this
  *   member may be the bot itself)
  * @property {string} [new_chat_title] *Optional*. A chat title was changed to this value
  * @property {PhotoSize[]} [new_chat_photo] *Optional*. A chat photo was change to this value
  * @property {boolean} [delete_chat_photo] *Optional*. Service message: the chat photo was deleted
  * @property {boolean} [group_chat_created] *Optional*. Service message: the group has been created
  * @property {boolean} [supergroup_chat_created] *Optional*. Service message: the supergroup has been created. This field can't
  *   be received in a message coming through updates, because bot can't be a member
  *   of a supergroup when it is created. It can only be found in reply\_to\_message
  *   if someone replies to a very first message in a directly created supergroup.
  * @property {boolean} [channel_chat_created] *Optional*. Service message: the channel has been created. This field can't be
  *   received in a message coming through updates, because bot can't be a member of a
  *   channel when it is created. It can only be found in reply\_to\_message if
  *   someone replies to a very first message in a channel.
  * @property {MessageAutoDeleteTimerChanged} [message_auto_delete_timer_changed] *Optional*. Service message: auto-delete timer settings changed in the chat
  * @property {number} [migrate_to_chat_id] *Optional*. The group has been migrated to a supergroup with the specified
  *   identifier. This number may have more than 32 significant bits and some
  *   programming languages may have difficulty/silent defects in interpreting it. But
  *   it has at most 52 significant bits, so a signed 64-bit integer or
  *   double-precision float type are safe for storing this identifier.
  * @property {number} [migrate_from_chat_id] *Optional*. The supergroup has been migrated from a group with the specified
  *   identifier. This number may have more than 32 significant bits and some
  *   programming languages may have difficulty/silent defects in interpreting it. But
  *   it has at most 52 significant bits, so a signed 64-bit integer or
  *   double-precision float type are safe for storing this identifier.
  * @property {Message} [pinned_message] *Optional*. Specified message was pinned. Note that the Message object in this
  *   field will not contain further *reply\_to\_message* fields even if it is itself
  *   a reply.
  * @property {Invoice} [invoice] *Optional*. Message is an invoice for a
  *   [payment](https://core.telegram.org/bots/api/#payments), information about the
  *   invoice. [More about payments »](https://core.telegram.org/bots/api/#payments)
  * @property {SuccessfulPayment} [successful_payment] *Optional*. Message is a service message about a successful payment, information
  *   about the payment. [More about payments
  *   »](https://core.telegram.org/bots/api/#payments)
  * @property {UserShared} [user_shared] *Optional*. Service message: a user was shared with the bot
  * @property {ChatShared} [chat_shared] *Optional*. Service message: a chat was shared with the bot
  * @property {string} [connected_website] *Optional*. The domain name of the website on which the user has logged in.
  *   [More about Telegram Login »](https://core.telegram.org/widgets/login)
  * @property {PassportData} [passport_data] *Optional*. Telegram Passport data
  * @property {ProximityAlertTriggered} [proximity_alert_triggered] *Optional*. Service message. A user in the chat triggered another user's
  *   proximity alert while sharing Live Location.
  * @property {ForumTopicCreated} [forum_topic_created] *Optional*. Service message: forum topic created
  * @property {ForumTopicClosed} [forum_topic_closed] *Optional*. Service message: forum topic closed
  * @property {ForumTopicReopened} [forum_topic_reopened] *Optional*. Service message: forum topic reopened
  * @property {WriteAccessAllowed} [write_access_allowed] *Optional*. Service message: the user allowed the bot added to the attachment
  *   menu to write messages
  * @property {GeneralForumTopicUnhidden} [general_forum_topic_unhidden] *Optional*. Service message: the 'General' forum topic unhidden
  * @property {GeneralForumTopicHidden} [general_forum_topic_hidden] *Optional*. Service message: the 'General' forum topic hidden
  * @property {ForumTopicEdited} [forum_topic_edited] *Optional*. Service message: forum topic edited
  * @property {VideoChatScheduled} [video_chat_scheduled] *Optional*. Service message: video chat scheduled
  * @property {VideoChatStarted} [video_chat_started] *Optional*. Service message: video chat started
  * @property {VideoChatEnded} [video_chat_ended] *Optional*. Service message: video chat ended
  * @property {VideoChatParticipantsInvited} [video_chat_participants_invited] *Optional*. Service message: new participants invited to a video chat
  * @property {WebAppData} [web_app_data] *Optional*. Service message: data sent by a Web App
  * @property {InlineKeyboardMarkup} [reply_markup] *Optional*. Inline keyboard attached to the message. `login_url` buttons are
  *   represented as ordinary `url` buttons.
  * @see https://core.telegram.org/bots/api/#message
*/

/**
  * This object represents a unique message identifier.
  *
  * @typedef {object} MessageId
  * @property {number} message_id Unique message identifier
  * @see https://core.telegram.org/bots/api/#messageid
*/

/**
  * This object represents one special entity in a text message. For example, hashtags, usernames, URLs,
  * etc.
  *
  * @typedef {object} MessageEntity
  * @property {'mention'|'hashtag'|'cashtag'|'bot_command'|'url'|'email'|'phone_number'|'bold'|'italic'|'underline'|'strikethrough'|'spoiler'|'code'|'pre'|'text_link'|'text_mention'|'custom_emoji'} type Type of the entity. Currently, can be “mention” (`@username`), “hashtag”
  *   (`#hashtag`), “cashtag” (`$USD`), “bot\_command” (`/start@jobs_bot`), “url”
  *   (`https://telegram.org`), “email” (`do-not-reply@telegram.org`), “phone\_number”
  *   (`+1-212-555-0123`), “bold” (**bold text**), “italic” (*italic text*),
  *   “underline” (underlined text), “strikethrough” (strikethrough text), “spoiler”
  *   (spoiler message), “code” (monowidth string), “pre” (monowidth block),
  *   “text\_link” (for clickable text URLs), “text\_mention” (for users [without
  *   usernames](https://telegram.org/blog/edit#new-mentions)), “custom\_emoji” (for
  *   inline custom emoji stickers)
  * @property {number} offset Offset in [UTF-16 code
  *   units](https://core.telegram.org/api/entities#entity-length) to the start of the
  *   entity
  * @property {number} length Length of the entity in [UTF-16 code
  *   units](https://core.telegram.org/api/entities#entity-length)
  * @property {string} [url] *Optional*. For “text\_link” only, URL that will be opened after user taps on
  *   the text
  * @property {User} [user] *Optional*. For “text\_mention” only, the mentioned user
  * @property {string} [language] *Optional*. For “pre” only, the programming language of the entity text
  * @property {string} [custom_emoji_id] *Optional*. For “custom\_emoji” only, unique identifier of the custom emoji. Use
  *   [getCustomEmojiStickers](https://core.telegram.org/bots/api/#getcustomemojistickers)
  *   to get full information about the sticker
  * @see https://core.telegram.org/bots/api/#messageentity
*/

/**
  * This object represents one size of a photo or a [file](https://core.telegram.org/bots/api/#document)
  *
  * / [sticker](https://core.telegram.org/bots/api/#sticker)
  * thumbnail.
  *
  * @typedef {object} PhotoSize
  * @property {string} file_id Identifier for this file, which can be used to download or reuse the file
  * @property {string} file_unique_id Unique identifier for this file, which is supposed to be the same over time and
  *   for different bots. Can't be used to download or reuse the file.
  * @property {number} width Photo width
  * @property {number} height Photo height
  * @property {number} [file_size] *Optional*. File size in bytes
  * @see https://core.telegram.org/bots/api/#photosize
*/

/**
  * This object represents an animation file (GIF or H.264/MPEG-4 AVC video without sound).
  *
  * @typedef {object} Animation
  * @property {string} file_id Identifier for this file, which can be used to download or reuse the file
  * @property {string} file_unique_id Unique identifier for this file, which is supposed to be the same over time and
  *   for different bots. Can't be used to download or reuse the file.
  * @property {number} width Video width as defined by sender
  * @property {number} height Video height as defined by sender
  * @property {number} duration Duration of the video in seconds as defined by sender
  * @property {PhotoSize} [thumb] *Optional*. Animation thumbnail as defined by sender
  * @property {string} [file_name] *Optional*. Original animation filename as defined by sender
  * @property {string} [mime_type] *Optional*. MIME type of the file as defined by sender
  * @property {number} [file_size] *Optional*. File size in bytes. It can be bigger than 2^31 and some programming
  *   languages may have difficulty/silent defects in interpreting it. But it has at
  *   most 52 significant bits, so a signed 64-bit integer or double-precision float
  *   type are safe for storing this value.
  * @see https://core.telegram.org/bots/api/#animation
*/

/**
  * This object represents an audio file to be treated as music by the Telegram clients.
  *
  * @typedef {object} Audio
  * @property {string} file_id Identifier for this file, which can be used to download or reuse the file
  * @property {string} file_unique_id Unique identifier for this file, which is supposed to be the same over time and
  *   for different bots. Can't be used to download or reuse the file.
  * @property {number} duration Duration of the audio in seconds as defined by sender
  * @property {string} [performer] *Optional*. Performer of the audio as defined by sender or by audio tags
  * @property {string} [title] *Optional*. Title of the audio as defined by sender or by audio tags
  * @property {string} [file_name] *Optional*. Original filename as defined by sender
  * @property {string} [mime_type] *Optional*. MIME type of the file as defined by sender
  * @property {number} [file_size] *Optional*. File size in bytes. It can be bigger than 2^31 and some programming
  *   languages may have difficulty/silent defects in interpreting it. But it has at
  *   most 52 significant bits, so a signed 64-bit integer or double-precision float
  *   type are safe for storing this value.
  * @property {PhotoSize} [thumb] *Optional*. Thumbnail of the album cover to which the music file belongs
  * @see https://core.telegram.org/bots/api/#audio
*/

/**
  * This object represents a general file (as opposed to
  * [photos](https://core.telegram.org/bots/api/#photosize)
  *, [voice
  * messages](https://core.telegram.org/bots/api/#voice) and [audio
  * files](https://core.telegram.org/bots/api/#audio)).
  *
  * @typedef {object} Document
  * @property {string} file_id Identifier for this file, which can be used to download or reuse the file
  * @property {string} file_unique_id Unique identifier for this file, which is supposed to be the same over time and
  *   for different bots. Can't be used to download or reuse the file.
  * @property {PhotoSize} [thumb] *Optional*. Document thumbnail as defined by sender
  * @property {string} [file_name] *Optional*. Original filename as defined by sender
  * @property {string} [mime_type] *Optional*. MIME type of the file as defined by sender
  * @property {number} [file_size] *Optional*. File size in bytes. It can be bigger than 2^31 and some programming
  *   languages may have difficulty/silent defects in interpreting it. But it has at
  *   most 52 significant bits, so a signed 64-bit integer or double-precision float
  *   type are safe for storing this value.
  * @see https://core.telegram.org/bots/api/#document
*/

/**
  * This object represents a video file.
  *
  * @typedef {object} Video
  * @property {string} file_id Identifier for this file, which can be used to download or reuse the file
  * @property {string} file_unique_id Unique identifier for this file, which is supposed to be the same over time and
  *   for different bots. Can't be used to download or reuse the file.
  * @property {number} width Video width as defined by sender
  * @property {number} height Video height as defined by sender
  * @property {number} duration Duration of the video in seconds as defined by sender
  * @property {PhotoSize} [thumb] *Optional*. Video thumbnail
  * @property {string} [file_name] *Optional*. Original filename as defined by sender
  * @property {string} [mime_type] *Optional*. MIME type of the file as defined by sender
  * @property {number} [file_size] *Optional*. File size in bytes. It can be bigger than 2^31 and some programming
  *   languages may have difficulty/silent defects in interpreting it. But it has at
  *   most 52 significant bits, so a signed 64-bit integer or double-precision float
  *   type are safe for storing this value.
  * @see https://core.telegram.org/bots/api/#video
*/

/**
  * This object represents a [video message](https://telegram.org/blog/video-messages-and-telescope)
  *
  * (available in Telegram apps as of [v.4.0](https://telegram.org/blog/video-messages-and-telescope))
  *.
  *
  * @typedef {object} VideoNote
  * @property {string} file_id Identifier for this file, which can be used to download or reuse the file
  * @property {string} file_unique_id Unique identifier for this file, which is supposed to be the same over time and
  *   for different bots. Can't be used to download or reuse the file.
  * @property {number} length Video width and height (diameter of the video message) as defined by sender
  * @property {number} duration Duration of the video in seconds as defined by sender
  * @property {PhotoSize} [thumb] *Optional*. Video thumbnail
  * @property {number} [file_size] *Optional*. File size in bytes
  * @see https://core.telegram.org/bots/api/#videonote
*/

/**
  * This object represents a voice note.
  *
  * @typedef {object} Voice
  * @property {string} file_id Identifier for this file, which can be used to download or reuse the file
  * @property {string} file_unique_id Unique identifier for this file, which is supposed to be the same over time and
  *   for different bots. Can't be used to download or reuse the file.
  * @property {number} duration Duration of the audio in seconds as defined by sender
  * @property {string} [mime_type] *Optional*. MIME type of the file as defined by sender
  * @property {number} [file_size] *Optional*. File size in bytes. It can be bigger than 2^31 and some programming
  *   languages may have difficulty/silent defects in interpreting it. But it has at
  *   most 52 significant bits, so a signed 64-bit integer or double-precision float
  *   type are safe for storing this value.
  * @see https://core.telegram.org/bots/api/#voice
*/

/**
  * This object represents a phone contact.
  *
  * @typedef {object} Contact
  * @property {string} phone_number Contact's phone number
  * @property {string} first_name Contact's first name
  * @property {string} [last_name] *Optional*. Contact's last name
  * @property {number} [user_id] *Optional*. Contact's user identifier in Telegram. This number may have more
  *   than 32 significant bits and some programming languages may have
  *   difficulty/silent defects in interpreting it. But it has at most 52 significant
  *   bits, so a 64-bit integer or double-precision float type are safe for storing
  *   this identifier.
  * @property {string} [vcard] *Optional*. Additional data about the contact in the form of a
  *   [vCard](https://en.wikipedia.org/wiki/VCard)
  * @see https://core.telegram.org/bots/api/#contact
*/

/**
  * This object represents an animated emoji that displays a random value.
  *
  * @typedef {object} Dice
  * @property {string} emoji Emoji on which the dice throw animation is based
  * @property {number} value Value of the dice, 1-6 for “🎲”, “🎯” and “🎳” base emoji, 1-5 for “🏀” and “⚽”
  *   base emoji, 1-64 for “🎰” base emoji
  * @see https://core.telegram.org/bots/api/#dice
*/

/**
  * This object contains information about one answer option in a poll.
  *
  * @typedef {object} PollOption
  * @property {string} text Option text, 1-100 characters
  * @property {number} voter_count Number of users that voted for this option
  * @see https://core.telegram.org/bots/api/#polloption
*/

/**
  * This object represents an answer of a user in a non-anonymous poll.
  *
  * @typedef {object} PollAnswer
  * @property {string} poll_id Unique poll identifier
  * @property {User} user The user, who changed the answer to the poll
  * @property {number[]} option_ids 0-based identifiers of answer options, chosen by the user. May be empty if the
  *   user retracted their vote.
  * @see https://core.telegram.org/bots/api/#pollanswer
*/

/**
  * This object contains information about a poll.
  *
  * @typedef {object} Poll
  * @property {string} id Unique poll identifier
  * @property {string} question Poll question, 1-300 characters
  * @property {PollOption[]} options List of poll options
  * @property {number} total_voter_count Total number of users that voted in the poll
  * @property {boolean} is_closed *True*, if the poll is closed
  * @property {boolean} is_anonymous *True*, if the poll is anonymous
  * @property {'regular'|'quiz'} type Poll type, currently can be “regular” or “quiz”
  * @property {boolean} allows_multiple_answers *True*, if the poll allows multiple answers
  * @property {number} [correct_option_id] *Optional*. 0-based identifier of the correct answer option. Available only for
  *   polls in the quiz mode, which are closed, or was sent (not forwarded) by the bot
  *   or to the private chat with the bot.
  * @property {string} [explanation] *Optional*. Text that is shown when a user chooses an incorrect answer or taps
  *   on the lamp icon in a quiz-style poll, 0-200 characters
  * @property {MessageEntity[]} [explanation_entities] *Optional*. Special entities like usernames, URLs, bot commands, etc. that
  *   appear in the *explanation*
  * @property {number} [open_period] *Optional*. Amount of time in seconds the poll will be active after creation
  * @property {number} [close_date] *Optional*. Point in time (Unix timestamp) when the poll will be automatically
  *   closed
  * @see https://core.telegram.org/bots/api/#poll
*/

/**
  * This object represents a point on the map.
  *
  * @typedef {object} Location
  * @property {number} longitude Longitude as defined by sender
  * @property {number} latitude Latitude as defined by sender
  * @property {number} [horizontal_accuracy] *Optional*. The radius of uncertainty for the location, measured in meters;
  *   0-1500
  * @property {number} [live_period] *Optional*. Time relative to the message sending date, during which the location
  *   can be updated; in seconds. For active live locations only.
  * @property {number} [heading] *Optional*. The direction in which user is moving, in degrees; 1-360. For active
  *   live locations only.
  * @property {number} [proximity_alert_radius] *Optional*. The maximum distance for proximity alerts about approaching another
  *   chat member, in meters. For sent live locations only.
  * @see https://core.telegram.org/bots/api/#location
*/

/**
  * This object represents a venue.
  *
  * @typedef {object} Venue
  * @property {Location} location Venue location. Can't be a live location
  * @property {string} title Name of the venue
  * @property {string} address Address of the venue
  * @property {string} [foursquare_id] *Optional*. Foursquare identifier of the venue
  * @property {string} [foursquare_type] *Optional*. Foursquare type of the venue. (For example,
  *   “arts\_entertainment/default”, “arts\_entertainment/aquarium” or
  *   “food/icecream”.)
  * @property {string} [google_place_id] *Optional*. Google Places identifier of the venue
  * @property {string} [google_place_type] *Optional*. Google Places type of the venue. (See [supported
  *   types](https://developers.google.com/places/web-service/supported_types).)
  * @see https://core.telegram.org/bots/api/#venue
*/

/**
  * Describes data sent from a [Web App](https://core.telegram.org/bots/webapps)
  * to the bot.
  *
  * @typedef {object} WebAppData
  * @property {string} data The data. Be aware that a bad client can send arbitrary data in this field.
  * @property {string} button_text Text of the *web\_app* keyboard button from which the Web App was opened. Be
  *   aware that a bad client can send arbitrary data in this field.
  * @see https://core.telegram.org/bots/api/#webappdata
*/

/**
  * This object represents the content of a service message, sent whenever a user in the chat triggers a
  * proximity alert set by another user.
  *
  * @typedef {object} ProximityAlertTriggered
  * @property {User} traveler User that triggered the alert
  * @property {User} watcher User that set the alert
  * @property {number} distance The distance between the users
  * @see https://core.telegram.org/bots/api/#proximityalerttriggered
*/

/**
  * This object represents a service message about a change in auto-delete timer settings.
  *
  * @typedef {object} MessageAutoDeleteTimerChanged
  * @property {number} message_auto_delete_time New auto-delete time for messages in the chat; in seconds
  * @see https://core.telegram.org/bots/api/#messageautodeletetimerchanged
*/

/**
  * This object represents a service message about a new forum topic created in the chat.
  *
  * @typedef {object} ForumTopicCreated
  * @property {string} name Name of the topic
  * @property {number} icon_color Color of the topic icon in RGB format
  * @property {string} [icon_custom_emoji_id] *Optional*. Unique identifier of the custom emoji shown as the topic icon
  * @see https://core.telegram.org/bots/api/#forumtopiccreated
*/

/**
  * This object represents a service message about a forum topic closed in the chat. Currently holds no
  * information.
  *
  * @typedef {*} ForumTopicClosed
  * @see https://core.telegram.org/bots/api/#forumtopicclosed
*/

/**
 * This object represents a service message about an edited forum topic.
 *
 * @typedef {object} ForumTopicEdited
 * @property {string} [name] *Optional*. New name of the topic, if it was edited
 * @property {string} [icon_custom_emoji_id] *Optional*. New identifier of the custom emoji shown as the topic icon, if it
 *   was edited; an empty string if the icon was removed
 * @see https://core.telegram.org/bots/api/#forumtopicedited
 */

/**
  * This object represents a service message about a forum topic reopened in the chat. Currently holds
  * no information.
  *
  * @typedef {*} ForumTopicReopened
  * @see https://core.telegram.org/bots/api/#forumtopicreopened
*/

/**
 * This object represents a service message about General forum topic hidden in the chat. Currently
 * holds no information.
 *
 * @typedef {*} GeneralForumTopicHidden
 * @see https://core.telegram.org/bots/api/#generalforumtopichidden
 */

/**
 * This object represents a service message about General forum topic unhidden in the chat. Currently
 * holds no information.
 *
 * @typedef {*} GeneralForumTopicUnhidden
 * @see https://core.telegram.org/bots/api/#generalforumtopicunhidden
 */

/**
 * This object contains information about the user whose identifier was shared with the bot using a
 * [KeyboardButtonRequestUser](https://core.telegram.org/bots/api/#keyboardbuttonrequestuser)
 * button.
 *
 * @typedef {object} UserShared
 * @property {number} request_id Identifier of the request
 * @property {number} user_id Identifier of the shared user. This number may have more than 32 significant
 *   bits and some programming languages may have difficulty/silent defects in
 *   interpreting it. But it has at most 52 significant bits, so a 64-bit integer or
 *   double-precision float type are safe for storing this identifier. The bot may
 *   not have access to the user and could be unable to use this identifier, unless
 *   the user is already known to the bot by some other means.
 * @see https://core.telegram.org/bots/api/#usershared
 */

/**
 * This object contains information about the chat whose identifier was shared with the bot using a
 * [KeyboardButtonRequestChat](https://core.telegram.org/bots/api/#keyboardbuttonrequestchat)
 * button.
 *
 * @typedef {object} ChatShared
 * @property {number} request_id Identifier of the request
 * @property {number} chat_id Identifier of the shared chat. This number may have more than 32 significant
 *   bits and some programming languages may have difficulty/silent defects in
 *   interpreting it. But it has at most 52 significant bits, so a 64-bit integer or
 *   double-precision float type are safe for storing this identifier. The bot may
 *   not have access to the chat and could be unable to use this identifier, unless
 *   the chat is already known to the bot by some other means.
 * @see https://core.telegram.org/bots/api/#chatshared
 */

/**
 * This object represents a service message about a user allowing a bot added to the attachment menu to
 * write messages. Currently holds no information.
 *
 * @typedef {*} WriteAccessAllowed
 * @see https://core.telegram.org/bots/api/#writeaccessallowed
 */

/**
  * This object represents a service message about a video chat scheduled in the chat.
  *
  * @typedef {object} VideoChatScheduled
  * @property {number} start_date Point in time (Unix timestamp) when the video chat is supposed to be started by
  *   a chat administrator
  * @see https://core.telegram.org/bots/api/#videochatscheduled
*/

/**
  * This object represents a service message about a video chat started in the chat. Currently holds no
  * information.
  *
  * @typedef {*} VideoChatStarted
  * @see https://core.telegram.org/bots/api/#videochatstarted
*/

/**
  * This object represents a service message about a video chat ended in the chat.
  *
  * @typedef {object} VideoChatEnded
  * @property {number} duration Video chat duration in seconds
  * @see https://core.telegram.org/bots/api/#videochatended
*/

/**
  * This object represents a service message about new members invited to a video chat.
  *
  * @typedef {object} VideoChatParticipantsInvited
  * @property {User[]} users New members that were invited to the video chat
  * @see https://core.telegram.org/bots/api/#videochatparticipantsinvited
*/

/**
  * This object represent a user's profile pictures.
  *
  * @typedef {object} UserProfilePhotos
  * @property {number} total_count Total number of profile pictures the target user has
  * @property {PhotoSize[][]} photos Requested profile pictures (in up to 4 sizes each)
  * @see https://core.telegram.org/bots/api/#userprofilephotos
*/

/**
  * This object represents a file ready to be downloaded. The file can be downloaded via the link
  * `https://api.telegram.org/file/bot<token>/<file_path>`. It is guaranteed that the link will be valid
  * for at least 1 hour. When the link expires, a new one can be requested by calling
  * [getFile](https://core.telegram.org/bots/api/#getfile)
  *.
  *
  * The maximum file size to download is 20 MB
  *
  * @typedef {object} File
  * @property {string} file_id Identifier for this file, which can be used to download or reuse the file
  * @property {string} file_unique_id Unique identifier for this file, which is supposed to be the same over time and
  *   for different bots. Can't be used to download or reuse the file.
  * @property {number} [file_size] *Optional*. File size in bytes. It can be bigger than 2^31 and some programming
  *   languages may have difficulty/silent defects in interpreting it. But it has at
  *   most 52 significant bits, so a signed 64-bit integer or double-precision float
  *   type are safe for storing this value.
  * @property {string} [file_path] *Optional*. File path. Use
  *   `https://api.telegram.org/file/bot<token>/<file_path>` to get the file.
  * @see https://core.telegram.org/bots/api/#file
*/

/**
  * Describes a [Web App](https://core.telegram.org/bots/webapps)
  *.
  *
  * @typedef {object} WebAppInfo
  * @property {string} url An HTTPS URL of a Web App to be opened with additional data as specified in
  *   [Initializing Web
  *   Apps](https://core.telegram.org/bots/webapps#initializing-web-apps)
  * @see https://core.telegram.org/bots/api/#webappinfo
*/

/**
  * This object represents a [custom keyboard](https://core.telegram.org/bots/features#keyboards)
  * with
  * reply options (see [Introduction to bots](https://core.telegram.org/bots/features#keyboards)
  * for
  * details and examples).
  *
  * @typedef {object} ReplyKeyboardMarkup
  * @property {KeyboardButton[][]} keyboard Array of button rows, each represented by an Array of
  *   [KeyboardButton](https://core.telegram.org/bots/api/#keyboardbutton) objects
  * @property {boolean} [resize_keyboard] *Optional*. Requests clients to resize the keyboard vertically for optimal fit
  *   (e.g., make the keyboard smaller if there are just two rows of buttons).
  *   Defaults to *false*, in which case the custom keyboard is always of the same
  *   height as the app's standard keyboard.
  * @property {boolean} [is_persistent] *Optional*. Requests clients to always show the keyboard when the regular
  *   keyboard is hidden. Defaults to *false*, in which case the custom keyboard can be hidden and opened with a keyboard icon.
  * @property {boolean} [one_time_keyboard] *Optional*. Requests clients to hide the keyboard as soon as it's been used. The
  *   keyboard will still be available, but clients will automatically display the
  *   usual letter-keyboard in the chat - the user can press a special button in the
  *   input field to see the custom keyboard again. Defaults to *false*.
  * @property {string} [input_field_placeholder] *Optional*. The placeholder to be shown in the input field when the keyboard is
  *   active; 1-64 characters
  * @property {boolean} [selective] *Optional*. Use this parameter if you want to show the keyboard to specific
  *   users only. Targets: 1) users that are @mentioned in the *text* of the
  *   [Message](https://core.telegram.org/bots/api/#message) object; 2) if the bot's
  *   message is a reply (has *reply\_to\_message\_id*), sender of the original
  *   message.
  *
  *   *Example:* A user requests to change the bot's language, bot replies to the
  *   request with a keyboard to select the new language. Other users in the group
  *   don't see the keyboard.
  * @see https://core.telegram.org/bots/api/#replykeyboardmarkup
*/

/**
  * This object represents one button of the reply keyboard. For simple text buttons, *String* can be
  * used instead of this object to specify the button text. The optional fields *web\_app*,
  * *request\_user*, *request\_chat*, *request\_contact*, *request\_location*, and *request\_poll* are
  * mutually exclusive.
  *
  * @typedef {object} KeyboardButton
  * @property {string} text Text of the button. If none of the optional fields are used, it will be sent as
  *   a message when the button is pressed
  * @property {KeyboardButtonRequestUser} [request_user] *Optional.* If specified, pressing the button will open a list of suitable
  *   users. Tapping on any user will send their identifier to the bot in a
  *   “user\_shared” service message. Available in private chats only.
  * @property {KeyboardButtonRequestChat} [request_chat] *Optional.* If specified, pressing the button will open a list of suitable
  *   chats. Tapping on a chat will send its identifier to the bot in a “chat\_shared”
  *   service message. Available in private chats only.
  * @property {boolean} [request_contact] *Optional*. If *True*, the user's phone number will be sent as a contact when
  *   the button is pressed. Available in private chats only.
  * @property {boolean} [request_location] *Optional*. If *True*, the user's current location will be sent when the button
  *   is pressed. Available in private chats only.
  * @property {KeyboardButtonPollType} [request_poll] *Optional*. If specified, the user will be asked to create a poll and send it to
  *   the bot when the button is pressed. Available in private chats only.
  * @property {WebAppInfo} [web_app] *Optional*. If specified, the described [Web
  *   App](https://core.telegram.org/bots/webapps) will be launched when the button is
  *   pressed. The Web App will be able to send a “web\_app\_data” service message.
  *   Available in private chats only.
  * @see https://core.telegram.org/bots/api/#keyboardbutton
*/

/**
 * This object defines the criteria used to request a suitable user. The identifier of the selected
 * user will be shared with the bot when the corresponding button is pressed.
 *
 * @typedef {object} KeyboardButtonRequestUser
 * @property {number} request_id Signed 32-bit identifier of the request, which will be received back in the
 *   [UserShared](https://core.telegram.org/bots/api/#usershared) object. Must be
 *   unique within the message
 * @property {boolean} [user_is_bot] *Optional*. Pass *True* to request a bot, pass *False* to request a regular
 *   user. If not specified, no additional restrictions are applied.
 * @property {boolean} [user_is_premium] *Optional*. Pass *True* to request a premium user, pass *False* to request a
 *   non-premium user. If not specified, no additional restrictions are applied.
 * @see https://core.telegram.org/bots/api/#keyboardbuttonrequestuser
 */

/**
 * This object defines the criteria used to request a suitable chat. The identifier of the selected
 * chat will be shared with the bot when the corresponding button is pressed.
 *
 * @typedef {object} KeyboardButtonRequestChat
 * @property {number} request_id Signed 32-bit identifier of the request, which will be received back in the
 *   [ChatShared](https://core.telegram.org/bots/api/#chatshared) object. Must be
 *   unique within the message
 * @property {boolean} chat_is_channel Pass *True* to request a channel chat, pass *False* to request a group or a
 *   supergroup chat.
 * @property {boolean} [chat_is_forum] *Optional*. Pass *True* to request a forum supergroup, pass *False* to request a
 *   non-forum chat. If not specified, no additional restrictions are applied.
 * @property {boolean} [chat_has_username] *Optional*. Pass *True* to request a supergroup or a channel with a username,
 *   pass *False* to request a chat without a username. If not specified, no
 *   additional restrictions are applied.
 * @property {boolean} [chat_is_created] *Optional*. Pass *True* to request a chat owned by the user. Otherwise, no
 *   additional restrictions are applied.
 * @property {ChatAdministratorRights} [user_administrator_rights] *Optional*. A JSON-serialized object listing the required administrator rights
 *   of the user in the chat. The rights must be a superset of
 *   *bot\_administrator\_rights*. If not specified, no additional restrictions are
 *   applied.
 * @property {ChatAdministratorRights} [bot_administrator_rights] *Optional*. A JSON-serialized object listing the required administrator rights
 *   of the bot in the chat. The rights must be a subset of
 *   *user\_administrator\_rights*. If not specified, no additional restrictions are
 *   applied.
 * @property {boolean} [bot_is_member] *Optional*. Pass *True* to request a chat with the bot as a member. Otherwise,
 *   no additional restrictions are applied.
 * @see https://core.telegram.org/bots/api/#keyboardbuttonrequestchat
 */

/**
  * This object represents type of a poll, which is allowed to be created and sent when the
  * corresponding button is pressed.
  *
  * @typedef {object} KeyboardButtonPollType
  * @property {string} [type] *Optional*. If *quiz* is passed, the user will be allowed to create only polls
  *   in the quiz mode. If *regular* is passed, only regular polls will be allowed.
  *   Otherwise, the user will be allowed to create a poll of any type.
  * @see https://core.telegram.org/bots/api/#keyboardbuttonpolltype
*/

/**
  * Upon receiving a message with this object, Telegram clients will remove the current custom keyboard
  * and display the default letter-keyboard. By default, custom keyboards are displayed until a new
  * keyboard is sent by a bot. An exception is made for one-time keyboards that are hidden immediately
  * after the user presses a button (see
  * [ReplyKeyboardMarkup](https://core.telegram.org/bots/api/#replykeyboardmarkup))
  *.
  *
  * @typedef {object} ReplyKeyboardRemove
  * @property {boolean} remove_keyboard Requests clients to remove the custom keyboard (user will not be able to summon
  *   this keyboard; if you want to hide the keyboard from sight but keep it
  *   accessible, use *one\_time\_keyboard* in
  *   [ReplyKeyboardMarkup](https://core.telegram.org/bots/api/#replykeyboardmarkup))
  * @property {boolean} [selective] *Optional*. Use this parameter if you want to remove the keyboard for specific
  *   users only. Targets: 1) users that are @mentioned in the *text* of the
  *   [Message](https://core.telegram.org/bots/api/#message) object; 2) if the bot's
  *   message is a reply (has *reply\_to\_message\_id*), sender of the original
  *   message.
  *
  *   *Example:* A user votes in a poll, bot returns confirmation message in reply to
  *   the vote and removes the keyboard for that user, while still showing the
  *   keyboard with poll options to users who haven't voted yet.
  * @see https://core.telegram.org/bots/api/#replykeyboardremove
*/

/**
  * This object represents an [inline
  * keyboard](https://core.telegram.org/bots/features#inline-keyboards) that appears right next to the
  * message it belongs to.
  *
  * @typedef {object} InlineKeyboardMarkup
  * @property {InlineKeyboardButton[][]} inline_keyboard Array of button rows, each represented by an Array of
  *   [InlineKeyboardButton](https://core.telegram.org/bots/api/#inlinekeyboardbutton)
  *   objects
  * @see https://core.telegram.org/bots/api/#inlinekeyboardmarkup
*/

/**
  * This object represents one button of an inline keyboard. You **must** use exactly one of the
  * optional fields.
  *
  * @typedef {object} InlineKeyboardButton
  * @property {string} text Label text on the button
  * @property {string} [url] *Optional*. HTTP or tg:// URL to be opened when the button is pressed. Links
  *   `tg://user?id=<user_id>` can be used to mention a user by their ID without using
  *   a username, if this is allowed by their privacy settings.
  * @property {string} [callback_data] *Optional*. Data to be sent in a [callback
  *   query](https://core.telegram.org/bots/api/#callbackquery) to the bot when button
  *   is pressed, 1-64 bytes
  * @property {WebAppInfo} [web_app] *Optional*. Description of the [Web App](https://core.telegram.org/bots/webapps)
  *   that will be launched when the user presses the button. The Web App will be able
  *   to send an arbitrary message on behalf of the user using the method
  *   [answerWebAppQuery](https://core.telegram.org/bots/api/#answerwebappquery).
  *   Available only in private chats between a user and the bot.
  * @property {LoginUrl} [login_url] *Optional*. An HTTPS URL used to automatically authorize the user. Can be used
  *   as a replacement for the [Telegram Login
  *   Widget](https://core.telegram.org/widgets/login).
  * @property {string} [switch_inline_query] *Optional*. If set, pressing the button will prompt the user to select one of
  *   their chats, open that chat and insert the bot's username and the specified
  *   inline query in the input field. May be empty, in which case just the bot's
  *   username will be inserted.
  *
  *   **Note:** This offers an easy way for users to start using your bot in [inline
  *   mode](https://core.telegram.org/bots/inline) when they are currently in a
  *   private chat with it. Especially useful when combined with
  *   [*switch\_pm…*](https://core.telegram.org/bots/api/#answerinlinequery) actions -
  *   in this case the user will be automatically returned to the chat they switched
  *   from, skipping the chat selection screen.
  * @property {string} [switch_inline_query_current_chat] *Optional*. If set, pressing the button will insert the bot's username and the
  *   specified inline query in the current chat's input field. May be empty, in which
  *   case only the bot's username will be inserted.
  *
  *   This offers a quick way for the user to open your bot in inline mode in the same
  *   chat - good for selecting something from multiple options.
  * @property {CallbackGame} [callback_game] *Optional*. Description of the game that will be launched when the user presses
  *   the button.
  *
  *   **NOTE:** This type of button **must** always be the first button in the first
  *   row.
  * @property {boolean} [pay] *Optional*. Specify *True*, to send a [Pay
  *   button](https://core.telegram.org/bots/api/#payments).
  *
  *   **NOTE:** This type of button **must** always be the first button in the first
  *   row and can only be used in invoice messages.
  * @see https://core.telegram.org/bots/api/#inlinekeyboardbutton
*/

/**
  * This object represents a parameter of the inline keyboard button used to automatically authorize a
  * user. Serves as a great replacement for the [Telegram Login
  * Widget](https://core.telegram.org/widgets/login) when the user is coming from Telegram. All the user
  * needs to do is tap/click a button and confirm that they want to log in:
  *
  * Telegram apps support these buttons as of [version
  * 5.7](https://telegram.org/blog/privacy-discussions-web-bots#meet-seamless-web-bots).

  * Sample bot: [@discussbot](https://t.me/discussbot)
  *
  *
  * @typedef {object} LoginUrl
  * @property {string} url An HTTPS URL to be opened with user authorization data added to the query string
  *   when the button is pressed. If the user refuses to provide authorization data,
  *   the original URL without information about the user will be opened. The data
  *   added is the same as described in [Receiving authorization
  *   data](https://core.telegram.org/widgets/login#receiving-authorization-data).
  *
  *   **NOTE:** You **must** always check the hash of the received data to verify the
  *   authentication and the integrity of the data as described in [Checking
  *   authorization](https://core.telegram.org/widgets/login#checking-authorization).
  * @property {string} [forward_text] *Optional*. New text of the button in forwarded messages.
  * @property {string} [bot_username] *Optional*. Username of a bot, which will be used for user authorization. See
  *   [Setting up a bot](https://core.telegram.org/widgets/login#setting-up-a-bot) for
  *   more details. If not specified, the current bot's username will be assumed. The
  *   *url*'s domain must be the same as the domain linked with the bot. See [Linking
  *   your domain to the
  *   bot](https://core.telegram.org/widgets/login#linking-your-domain-to-the-bot) for
  *   more details.
  * @property {boolean} [request_write_access] *Optional*. Pass *True* to request the permission for your bot to send messages
  *   to the user.
  * @see https://core.telegram.org/bots/api/#loginurl
*/

/**
  * This object represents an incoming callback query from a callback button in an [inline
  * keyboard](https://core.telegram.org/bots/features#inline-keyboards). If the button that originated
  * the query was attached to a message sent by the bot, the field *message* will be present. If the
  * button was attached to a message sent via the bot (in [inline
  * mode](https://core.telegram.org/bots/api/#inline-mode)), the field *inline\_message\_id* will be
  * present. Exactly one of the fields *data* or *game\_short\_name* will be present.
  *
  * @typedef {object} CallbackQuery
  * @property {string} id Unique identifier for this query
  * @property {User} from Sender
  * @property {Message} [message] *Optional*. Message with the callback button that originated the query. Note
  *   that message content and message date will not be available if the message is
  *   too old
  * @property {string} [inline_message_id] *Optional*. Identifier of the message sent via the bot in inline mode, that
  *   originated the query.
  * @property {string} chat_instance Global identifier, uniquely corresponding to the chat to which the message with
  *   the callback button was sent. Useful for high scores in
  *   [games](https://core.telegram.org/bots/api/#games).
  * @property {string} [data] *Optional*. Data associated with the callback button. Be aware that the message
  *   originated the query can contain no callback buttons with this data.
  * @property {string} [game_short_name] *Optional*. Short name of a [Game](https://core.telegram.org/bots/api/#games) to
  *   be returned, serves as the unique identifier for the game
  * @see https://core.telegram.org/bots/api/#callbackquery
*/

/**
  * Upon receiving a message with this object, Telegram clients will display a reply interface to the
  * user (act as if the user has selected the bot's message and tapped 'Reply'). This can be extremely
  * useful if you want to create user-friendly step-by-step interfaces without having to sacrifice
  * [privacy mode](https://core.telegram.org/bots/features#privacy-mode)
  *.
  *
  * @typedef {object} ForceReply
  * @property {boolean} force_reply Shows reply interface to the user, as if they manually selected the bot's
  *   message and tapped 'Reply'
  * @property {string} [input_field_placeholder] *Optional*. The placeholder to be shown in the input field when the reply is
  *   active; 1-64 characters
  * @property {boolean} [selective] *Optional*. Use this parameter if you want to force reply from specific users
  *   only. Targets: 1) users that are @mentioned in the *text* of the
  *   [Message](https://core.telegram.org/bots/api/#message) object; 2) if the bot's
  *   message is a reply (has *reply\_to\_message\_id*), sender of the original
  *   message.
  * @see https://core.telegram.org/bots/api/#forcereply
*/

/**
  * This object represents a chat photo.
  *
  * @typedef {object} ChatPhoto
  * @property {string} small_file_id File identifier of small (160x160) chat photo. This file\_id can be used only
  *   for photo download and only for as long as the photo is not changed.
  * @property {string} small_file_unique_id Unique file identifier of small (160x160) chat photo, which is supposed to be
  *   the same over time and for different bots. Can't be used to download or reuse
  *   the file.
  * @property {string} big_file_id File identifier of big (640x640) chat photo. This file\_id can be used only for
  *   photo download and only for as long as the photo is not changed.
  * @property {string} big_file_unique_id Unique file identifier of big (640x640) chat photo, which is supposed to be the
  *   same over time and for different bots. Can't be used to download or reuse the
  *   file.
  * @see https://core.telegram.org/bots/api/#chatphoto
*/

/**
  * Represents an invite link for a chat.
  *
  * @typedef {object} ChatInviteLink
  * @property {string} invite_link The invite link. If the link was created by another chat administrator, then the
  *   second part of the link will be replaced with “…”.
  * @property {User} creator Creator of the link
  * @property {boolean} creates_join_request *True*, if users joining the chat via the link need to be approved by chat
  *   administrators
  * @property {boolean} is_primary *True*, if the link is primary
  * @property {boolean} is_revoked *True*, if the link is revoked
  * @property {string} [name] *Optional*. Invite link name
  * @property {number} [expire_date] *Optional*. Point in time (Unix timestamp) when the link will expire or has been
  *   expired
  * @property {number} [member_limit] *Optional*. The maximum number of users that can be members of the chat
  *   simultaneously after joining the chat via this invite link; 1-99999
  * @property {number} [pending_join_request_count] *Optional*. Number of pending join requests created using this link
  * @see https://core.telegram.org/bots/api/#chatinvitelink
*/

/**
  * Represents the rights of an administrator in a chat.
  *
  * @typedef {object} ChatAdministratorRights
  * @property {boolean} is_anonymous *True*, if the user's presence in the chat is hidden
  * @property {boolean} can_manage_chat *True*, if the administrator can access the chat event log, chat statistics,
  *   message statistics in channels, see channel members, see anonymous
  *   administrators in supergroups and ignore slow mode. Implied by any other
  *   administrator privilege
  * @property {boolean} can_delete_messages *True*, if the administrator can delete messages of other users
  * @property {boolean} can_manage_video_chats *True*, if the administrator can manage video chats
  * @property {boolean} can_restrict_members *True*, if the administrator can restrict, ban or unban chat members
  * @property {boolean} can_promote_members *True*, if the administrator can add new administrators with a subset of their
  *   own privileges or demote administrators that they have promoted, directly or
  *   indirectly (promoted by administrators that were appointed by the user)
  * @property {boolean} can_change_info *True*, if the user is allowed to change the chat title, photo and other
  *   settings
  * @property {boolean} can_invite_users *True*, if the user is allowed to invite new users to the chat
  * @property {boolean} [can_post_messages] *Optional*. *True*, if the administrator can post in the channel; channels only
  * @property {boolean} [can_edit_messages] *Optional*. *True*, if the administrator can edit messages of other users and
  *   can pin messages; channels only
  * @property {boolean} [can_pin_messages] *Optional*. *True*, if the user is allowed to pin messages; groups and
  *   supergroups only
  * @property {boolean} [can_manage_topics] *Optional*. *True*, if the user is allowed to create, rename, close, and reopen
  *   forum topics; supergroups only
  * @see https://core.telegram.org/bots/api/#chatadministratorrights
*/

/**
  * This object contains information about one member of a chat. Currently, the following 6 types of
  * chat members are supported:
  *
  * [ChatMemberOwner](https://core.telegram.org/bots/api/#chatmemberowner)
  *
  * [ChatMemberAdministrator](https://core.telegram.org/bots/api/#chatmemberadministrator)
  *
  * [ChatMemberMember](https://core.telegram.org/bots/api/#chatmembermember)
  *
  * [ChatMemberRestricted](https://core.telegram.org/bots/api/#chatmemberrestricted)
  *
  * [ChatMemberLeft](https://core.telegram.org/bots/api/#chatmemberleft)
  *
  * [ChatMemberBanned](https://core.telegram.org/bots/api/#chatmemberbanned)
  *
  *
  * @typedef {ChatMemberOwner|ChatMemberAdministrator|ChatMemberMember|ChatMemberRestricted|ChatMemberLeft|ChatMemberBanned} ChatMember
  * @see https://core.telegram.org/bots/api/#chatmember
*/

/**
  * Represents a [chat member](https://core.telegram.org/bots/api/#chatmember)
  * that owns the chat and
  * has all administrator privileges.
  *
  * @typedef {object} ChatMemberOwner
  * @property {'creator'} status The member's status in the chat, always “creator”
  * @property {User} user Information about the user
  * @property {boolean} is_anonymous *True*, if the user's presence in the chat is hidden
  * @property {string} [custom_title] *Optional*. Custom title for this user
  * @see https://core.telegram.org/bots/api/#chatmemberowner
*/

/**
  * Represents a [chat member](https://core.telegram.org/bots/api/#chatmember)
  * that has some additional
  * privileges.
  *
  * @typedef {object} ChatMemberAdministrator
  * @property {'administrator'} status The member's status in the chat, always “administrator”
  * @property {User} user Information about the user
  * @property {boolean} can_be_edited *True*, if the bot is allowed to edit administrator privileges of that user
  * @property {boolean} is_anonymous *True*, if the user's presence in the chat is hidden
  * @property {boolean} can_manage_chat *True*, if the administrator can access the chat event log, chat statistics,
  *   message statistics in channels, see channel members, see anonymous
  *   administrators in supergroups and ignore slow mode. Implied by any other
  *   administrator privilege
  * @property {boolean} can_delete_messages *True*, if the administrator can delete messages of other users
  * @property {boolean} can_manage_video_chats *True*, if the administrator can manage video chats
  * @property {boolean} can_restrict_members *True*, if the administrator can restrict, ban or unban chat members
  * @property {boolean} can_promote_members *True*, if the administrator can add new administrators with a subset of their
  *   own privileges or demote administrators that they have promoted, directly or
  *   indirectly (promoted by administrators that were appointed by the user)
  * @property {boolean} can_change_info *True*, if the user is allowed to change the chat title, photo and other
  *   settings
  * @property {boolean} can_invite_users *True*, if the user is allowed to invite new users to the chat
  * @property {boolean} [can_post_messages] *Optional*. *True*, if the administrator can post in the channel; channels only
  * @property {boolean} [can_edit_messages] *Optional*. *True*, if the administrator can edit messages of other users and
  *   can pin messages; channels only
  * @property {boolean} [can_pin_messages] *Optional*. *True*, if the user is allowed to pin messages; groups and
  *   supergroups only
  * @property {boolean} [can_manage_topics] *Optional*. *True*, if the user is allowed to create, rename, close, and reopen
  *   forum topics; supergroups only
  * @property {string} [custom_title] *Optional*. Custom title for this user
  * @see https://core.telegram.org/bots/api/#chatmemberadministrator
*/

/**
  * Represents a [chat member](https://core.telegram.org/bots/api/#chatmember)
  * that has no additional
  * privileges or restrictions.
  *
  * @typedef {object} ChatMemberMember
  * @property {'member'} status The member's status in the chat, always “member”
  * @property {User} user Information about the user
  * @see https://core.telegram.org/bots/api/#chatmembermember
*/

/**
  * Represents a [chat member](https://core.telegram.org/bots/api/#chatmember)
  * that is under certain
  * restrictions in the chat. Supergroups only.
  *
  * @typedef {object} ChatMemberRestricted
  * @property {'restricted'} status The member's status in the chat, always “restricted”
  * @property {User} user Information about the user
  * @property {boolean} is_member *True*, if the user is a member of the chat at the moment of the request
  * @property {boolean} can_send_messages *True*, if the user is allowed to send text messages, contacts, invoices,
  *   locations and venues
  * @property {boolean} can_send_audios *True*, if the user is allowed to send audios
  * @property {boolean} can_send_documents *True*, if the user is allowed to send documents
  * @property {boolean} can_send_photos *True*, if the user is allowed to send photos
  * @property {boolean} can_send_videos *True*, if the user is allowed to send videos
  * @property {boolean} can_send_video_notes *True*, if the user is allowed to send video notes
  * @property {boolean} can_send_voice_notes *True*, if the user is allowed to send voice notes
  * @property {boolean} can_send_polls *True*, if the user is allowed to send polls
  * @property {boolean} can_send_other_messages *True*, if the user is allowed to send animations, games, stickers and use
  *   inline bots
  * @property {boolean} can_add_web_page_previews *True*, if the user is allowed to add web page previews to their messages
  * @property {boolean} can_change_info *True*, if the user is allowed to change the chat title, photo and other
  *   settings
  * @property {boolean} can_invite_users *True*, if the user is allowed to invite new users to the chat
  * @property {boolean} can_pin_messages *True*, if the user is allowed to pin messages
  * @property {boolean} can_manage_topics *True*, if the user is allowed to create forum topics
  * @property {boolean} can_send_media_messages *True*, if the user is allowed to send audios, documents, photos, videos, video
  *   notes and voice notes
  * @property {boolean} can_send_polls *True*, if the user is allowed to send polls
  * @property {boolean} can_send_other_messages *True*, if the user is allowed to send animations, games, stickers and use
  *   inline bots
  * @property {boolean} can_add_web_page_previews *True*, if the user is allowed to add web page previews to their messages
  * @property {number} until_date Date when restrictions will be lifted for this user; unix time. If 0, then the
  *   user is restricted forever
  * @see https://core.telegram.org/bots/api/#chatmemberrestricted
*/

/**
  * Represents a [chat member](https://core.telegram.org/bots/api/#chatmember)
  * that isn't currently a
  * member of the chat, but may join it themselves.
  *
  * @typedef {object} ChatMemberLeft
  * @property {'left'} status The member's status in the chat, always “left”
  * @property {User} user Information about the user
  * @see https://core.telegram.org/bots/api/#chatmemberleft
*/

/**
  * Represents a [chat member](https://core.telegram.org/bots/api/#chatmember)
  * that was banned in the
  * chat and can't return to the chat or view chat messages.
  *
  * @typedef {object} ChatMemberBanned
  * @property {'kicked'} status The member's status in the chat, always “kicked”
  * @property {User} user Information about the user
  * @property {number} until_date Date when restrictions will be lifted for this user; unix time. If 0, then the
  *   user is banned forever
  * @see https://core.telegram.org/bots/api/#chatmemberbanned
*/

/**
  * This object represents changes in the status of a chat member.
  *
  * @typedef {object} ChatMemberUpdated
  * @property {Chat} chat Chat the user belongs to
  * @property {User} from Performer of the action, which resulted in the change
  * @property {number} date Date the change was done in Unix time
  * @property {ChatMember} old_chat_member Previous information about the chat member
  * @property {ChatMember} new_chat_member New information about the chat member
  * @property {ChatInviteLink} [invite_link] *Optional*. Chat invite link, which was used by the user to join the chat; for
  *   joining by invite link events only.
  * @see https://core.telegram.org/bots/api/#chatmemberupdated
*/

/**
  * Represents a join request sent to a chat.
  *
  * @typedef {object} ChatJoinRequest
  * @property {Chat} chat Chat to which the request was sent
  * @property {User} from User that sent the join request
  * @property {number} user_chat_id Identifier of a private chat with the user who sent the join request.
  *   This number may have more than 32 significant bits and some programming languages may have difficulty/silent
  *   defects in interpreting it. But it has at most 52 significant bits, so a 64-bit integer or double-precision
  *   float type are safe for storing this identifier. The bot can use this identifier for 24 hours to send messages
  *   until the join request is processed, assuming no other administrator contacted the user.
  * @property {number} date Date the request was sent in Unix time
  * @property {string} [bio] *Optional*. Bio of the user.
  * @property {ChatInviteLink} [invite_link] *Optional*. Chat invite link that was used by the user to send the join request
  * @see https://core.telegram.org/bots/api/#chatjoinrequest
*/

/**
  * Describes actions that a non-administrator user is allowed to take in a chat.
  *
  * @typedef {object} ChatPermissions
  * @property {boolean} [can_send_messages] *Optional*. *True*, if the user is allowed to send text messages, contacts,
  *   invoices, locations and venues
  * @property {boolean} [can_send_media_messages] *Optional*. *True*, if the user is allowed to send audios, documents, photos,
  *   videos, video notes and voice notes, implies can\_send\_messages
  * @property {boolean} [can_send_audios] *Optional*. *True*, if the user is allowed to send audios
  * @property {boolean} [can_send_documents] *Optional*. *True*, if the user is allowed to send documents
  * @property {boolean} [can_send_photos] *Optional*. *True*, if the user is allowed to send photos
  * @property {boolean} [can_send_videos] *Optional*. *True*, if the user is allowed to send videos
  * @property {boolean} [can_send_video_notes] *Optional*. *True*, if the user is allowed to send video notes
  * @property {boolean} [can_send_voice_notes] *Optional*. *True*, if the user is allowed to send voice notes
  * @property {boolean} [can_send_polls] *Optional*. *True*, if the user is allowed to send polls
  * @property {boolean} [can_send_other_messages] *Optional*. *True*, if the user is allowed to send animations,
  *   games, stickers and use inline bots
  * @property {boolean} [can_add_web_page_previews] *Optional*. *True*, if the user is allowed to add web page previews to their
  *   messages
  * @property {boolean} [can_change_info] *Optional*. *True*, if the user is allowed to change the chat title, photo and
  *   other settings. Ignored in public supergroups
  * @property {boolean} [can_invite_users] *Optional*. *True*, if the user is allowed to invite new users to the chat
  * @property {boolean} [can_pin_messages] *Optional*. *True*, if the user is allowed to pin messages. Ignored in public
  *   supergroups
  * @property {boolean} [can_manage_topics] *Optional*. *True*, if the user is allowed to create forum topics. If omitted
  *   defaults to the value of can\_pin\_messages
  * @see https://core.telegram.org/bots/api/#chatpermissions
*/

/**
  * Represents a location to which a chat is connected.
  *
  * @typedef {object} ChatLocation
  * @property {Location} location The location to which the supergroup is connected. Can't be a live location.
  * @property {string} address Location address; 1-64 characters, as defined by the chat owner
  * @see https://core.telegram.org/bots/api/#chatlocation
*/

/**
  * This object represents a forum topic.
  *
  * @typedef {object} ForumTopic
  * @property {number} message_thread_id Unique identifier of the forum topic
  * @property {string} name Name of the topic
  * @property {number} icon_color Color of the topic icon in RGB format
  * @property {string} [icon_custom_emoji_id] *Optional*. Unique identifier of the custom emoji shown as the topic icon
  * @see https://core.telegram.org/bots/api/#forumtopic
*/

/**
  * This object represents a bot command.
  *
  * @typedef {object} BotCommand
  * @property {string} command Text of the command; 1-32 characters. Can contain only lowercase English
  *   letters, digits and underscores.
  * @property {string} description Description of the command; 1-256 characters.
  * @see https://core.telegram.org/bots/api/#botcommand
*/

/**
  * This object represents the scope to which bot commands are applied. Currently, the following 7
  * scopes are supported:
  *
  * [BotCommandScopeDefault](https://core.telegram.org/bots/api/#botcommandscopedefault)
  *
  * [BotCommandScopeAllPrivateChats](https://core.telegram.org/bots/api/#botcommandscopeallprivatechats)
  *
  * [BotCommandScopeAllGroupChats](https://core.telegram.org/bots/api/#botcommandscopeallgroupchats)
  *
  * [BotCommandScopeAllChatAdministrators](https://core.telegram.org/bots/api/#botcommandscopeallchatadministrators)
  *
  * [BotCommandScopeChat](https://core.telegram.org/bots/api/#botcommandscopechat)
  *
  * [BotCommandScopeChatAdministrators](https://core.telegram.org/bots/api/#botcommandscopechatadministrators)
  *
  * [BotCommandScopeChatMember](https://core.telegram.org/bots/api/#botcommandscopechatmember)
  *
  *
  * @typedef {BotCommandScopeDefault|BotCommandScopeAllPrivateChats|BotCommandScopeAllGroupChats|BotCommandScopeAllChatAdministrators|BotCommandScopeChat|BotCommandScopeChatAdministrators|BotCommandScopeChatMember} BotCommandScope
  * @see https://core.telegram.org/bots/api/#botcommandscope
*/

/**
  * Represents the default [scope](https://core.telegram.org/bots/api/#botcommandscope)
  * of bot commands.
  * Default commands are used if no commands with a [narrower
  * scope](https://core.telegram.org/bots/api/#determining-list-of-commands) are specified for the user.
  *
  * @typedef {object} BotCommandScopeDefault
  * @property {'default'} type Scope type, must be *default*
  * @see https://core.telegram.org/bots/api/#botcommandscopedefault
*/

/**
  * Represents the [scope](https://core.telegram.org/bots/api/#botcommandscope)
  * of bot commands,
  * covering all private chats.
  *
  * @typedef {object} BotCommandScopeAllPrivateChats
  * @property {'all_private_chats'} type Scope type, must be *all\_private\_chats*
  * @see https://core.telegram.org/bots/api/#botcommandscopeallprivatechats
*/

/**
  * Represents the [scope](https://core.telegram.org/bots/api/#botcommandscope)
  * of bot commands,
  * covering all group and supergroup chats.
  *
  * @typedef {object} BotCommandScopeAllGroupChats
  * @property {'all_group_chats'} type Scope type, must be *all\_group\_chats*
  * @see https://core.telegram.org/bots/api/#botcommandscopeallgroupchats
*/

/**
  * Represents the [scope](https://core.telegram.org/bots/api/#botcommandscope)
  * of bot commands,
  * covering all group and supergroup chat administrators.
  *
  * @typedef {object} BotCommandScopeAllChatAdministrators
  * @property {'all_chat_administrators'} type Scope type, must be *all\_chat\_administrators*
  * @see https://core.telegram.org/bots/api/#botcommandscopeallchatadministrators
*/

/**
  * Represents the [scope](https://core.telegram.org/bots/api/#botcommandscope)
  * of bot commands,
  * covering a specific chat.
  *
  * @typedef {object} BotCommandScopeChat
  * @property {'chat'} type Scope type, must be *chat*
  * @property {number|string} chat_id Unique identifier for the target chat or username of the target supergroup (in
  *   the format `@supergroupusername`)
  * @see https://core.telegram.org/bots/api/#botcommandscopechat
*/

/**
  * Represents the [scope](https://core.telegram.org/bots/api/#botcommandscope)
  * of bot commands,
  * covering all administrators of a specific group or supergroup chat.
  *
  * @typedef {object} BotCommandScopeChatAdministrators
  * @property {'chat_administrators'} type Scope type, must be *chat\_administrators*
  * @property {number|string} chat_id Unique identifier for the target chat or username of the target supergroup (in
  *   the format `@supergroupusername`)
  * @see https://core.telegram.org/bots/api/#botcommandscopechatadministrators
*/

/**
  * Represents the [scope](https://core.telegram.org/bots/api/#botcommandscope)
  * of bot commands,
  * covering a specific member of a group or supergroup chat.
  *
  * @typedef {object} BotCommandScopeChatMember
  * @property {'chat_member'} type Scope type, must be *chat\_member*
  * @property {number|string} chat_id Unique identifier for the target chat or username of the target supergroup (in
  *   the format `@supergroupusername`)
  * @property {number} user_id Unique identifier of the target user
  * @see https://core.telegram.org/bots/api/#botcommandscopechatmember
*/

/**
  * This object describes the bot's menu button in a private chat. It should be one of
  *
  * [MenuButtonCommands](https://core.telegram.org/bots/api/#menubuttoncommands)
  *
  * [MenuButtonWebApp](https://core.telegram.org/bots/api/#menubuttonwebapp)
  *
  * [MenuButtonDefault](https://core.telegram.org/bots/api/#menubuttondefault)
  *
  *
  * @typedef {MenuButtonCommands|MenuButtonWebApp|MenuButtonDefault} MenuButton
  * @see https://core.telegram.org/bots/api/#menubutton
*/

/**
  * Represents a menu button, which opens the bot's list of commands.
  *
  * @typedef {object} MenuButtonCommands
  * @property {'commands'} type Type of the button, must be *commands*
  * @see https://core.telegram.org/bots/api/#menubuttoncommands
*/

/**
  * Represents a menu button, which launches a [Web App](https://core.telegram.org/bots/webapps)
  *.
  *
  * @typedef {object} MenuButtonWebApp
  * @property {'web_app'} type Type of the button, must be *web\_app*
  * @property {string} text Text on the button
  * @property {WebAppInfo} web_app Description of the Web App that will be launched when the user presses the
  *   button. The Web App will be able to send an arbitrary message on behalf of the
  *   user using the method
  *   [answerWebAppQuery](https://core.telegram.org/bots/api/#answerwebappquery).
  * @see https://core.telegram.org/bots/api/#menubuttonwebapp
*/

/**
  * Describes that no specific value for the menu button was set.
  *
  * @typedef {object} MenuButtonDefault
  * @property {'default'} type Type of the button, must be *default*
  * @see https://core.telegram.org/bots/api/#menubuttondefault
*/

/**
  * Describes why a request was unsuccessful.
  *
  * @typedef {object} ResponseParameters
  * @property {number} [migrate_to_chat_id] *Optional*. The group has been migrated to a supergroup with the specified
  *   identifier. This number may have more than 32 significant bits and some
  *   programming languages may have difficulty/silent defects in interpreting it. But
  *   it has at most 52 significant bits, so a signed 64-bit integer or
  *   double-precision float type are safe for storing this identifier.
  * @property {number} [retry_after] *Optional*. In case of exceeding flood control, the number of seconds left to
  *   wait before the request can be repeated
  * @see https://core.telegram.org/bots/api/#responseparameters
*/

/**
  * This object represents the content of a media message to be sent. It should be one of
  *
  * [InputMediaAnimation](https://core.telegram.org/bots/api/#inputmediaanimation)
  *
  * [InputMediaDocument](https://core.telegram.org/bots/api/#inputmediadocument)
  *
  * [InputMediaAudio](https://core.telegram.org/bots/api/#inputmediaaudio)
  *
  * [InputMediaPhoto](https://core.telegram.org/bots/api/#inputmediaphoto)
  *
  * [InputMediaVideo](https://core.telegram.org/bots/api/#inputmediavideo)
  *
  *
  * @typedef {InputMediaAnimation|InputMediaDocument|InputMediaAudio|InputMediaPhoto|InputMediaVideo} InputMedia
  * @see https://core.telegram.org/bots/api/#inputmedia
*/

/**
  * Represents a photo to be sent.
  *
  * @typedef {object} InputMediaPhoto
  * @property {'photo'} type Type of the result, must be *photo*
  * @property {string} media File to send. Pass a file\_id to send a file that exists on the Telegram servers
  *   (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or
  *   pass “attach://\<file\_attach\_name\>” to upload a new one using
  *   multipart/form-data under \<file\_attach\_name\> name. [More information on
  *   Sending Files »](https://core.telegram.org/bots/api/#sending-files)
  * @property {string} [caption] *Optional*. Caption of the photo to be sent, 0-1024 characters after entities
  *   parsing
  * @property {string} [parse_mode] *Optional*. Mode for parsing entities in the photo caption. See [formatting
  *   options](https://core.telegram.org/bots/api/#formatting-options) for more
  *   details.
  * @property {MessageEntity[]} [caption_entities] *Optional*. List of special entities that appear in the caption, which can be
  *   specified instead of *parse\_mode*
  * @property {boolean} [has_spoiler] *Optional*. Pass `True` if the photo needs to be covered with a spoiler animation
  * @see https://core.telegram.org/bots/api/#inputmediaphoto
*/

/**
  * Represents a video to be sent.
  *
  * @typedef {object} InputMediaVideo
  * @property {'video'} type Type of the result, must be *video*
  * @property {string} media File to send. Pass a file\_id to send a file that exists on the Telegram servers
  *   (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or
  *   pass “attach://\<file\_attach\_name\>” to upload a new one using
  *   multipart/form-data under \<file\_attach\_name\> name. [More information on
  *   Sending Files »](https://core.telegram.org/bots/api/#sending-files)
  * @property {InputFile|string} [thumb] *Optional*. Thumbnail of the file sent; can be ignored if thumbnail generation
  *   for the file is supported server-side. The thumbnail should be in JPEG format
  *   and less than 200 kB in size. A thumbnail's width and height should not exceed
  *   320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails
  *   can't be reused and can be only uploaded as a new file, so you can pass
  *   “attach://\<file\_attach\_name\>” if the thumbnail was uploaded using
  *   multipart/form-data under \<file\_attach\_name\>. [More information on Sending
  *   Files »](https://core.telegram.org/bots/api/#sending-files)
  * @property {string} [caption] *Optional*. Caption of the video to be sent, 0-1024 characters after entities
  *   parsing
  * @property {string} [parse_mode] *Optional*. Mode for parsing entities in the video caption. See [formatting
  *   options](https://core.telegram.org/bots/api/#formatting-options) for more
  *   details.
  * @property {MessageEntity[]} [caption_entities] *Optional*. List of special entities that appear in the caption, which can be
  *   specified instead of *parse\_mode*
  * @property {number} [width] *Optional*. Video width
  * @property {number} [height] *Optional*. Video height
  * @property {number} [duration] *Optional*. Video duration in seconds
  * @property {boolean} [supports_streaming] *Optional*. Pass *True* if the uploaded video is suitable for streaming
  * @property {boolean} [has_spoiler] *Optional*. Pass `True` if the video needs to be covered with a spoiler animation
  * @see https://core.telegram.org/bots/api/#inputmediavideo
*/

/**
  * Represents an animation file (GIF or H.264/MPEG-4 AVC video without sound) to be sent.
  *
  * @typedef {object} InputMediaAnimation
  * @property {'animation'} type Type of the result, must be *animation*
  * @property {string} media File to send. Pass a file\_id to send a file that exists on the Telegram servers
  *   (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or
  *   pass “attach://\<file\_attach\_name\>” to upload a new one using
  *   multipart/form-data under \<file\_attach\_name\> name. [More information on
  *   Sending Files »](https://core.telegram.org/bots/api/#sending-files)
  * @property {InputFile|string} [thumb] *Optional*. Thumbnail of the file sent; can be ignored if thumbnail generation
  *   for the file is supported server-side. The thumbnail should be in JPEG format
  *   and less than 200 kB in size. A thumbnail's width and height should not exceed
  *   320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails
  *   can't be reused and can be only uploaded as a new file, so you can pass
  *   “attach://\<file\_attach\_name\>” if the thumbnail was uploaded using
  *   multipart/form-data under \<file\_attach\_name\>. [More information on Sending
  *   Files »](https://core.telegram.org/bots/api/#sending-files)
  * @property {string} [caption] *Optional*. Caption of the animation to be sent, 0-1024 characters after
  *   entities parsing
  * @property {string} [parse_mode] *Optional*. Mode for parsing entities in the animation caption. See [formatting
  *   options](https://core.telegram.org/bots/api/#formatting-options) for more
  *   details.
  * @property {MessageEntity[]} [caption_entities] *Optional*. List of special entities that appear in the caption, which can be
  *   specified instead of *parse\_mode*
  * @property {number} [width] *Optional*. Animation width
  * @property {number} [height] *Optional*. Animation height
  * @property {number} [duration] *Optional*. Animation duration in seconds
  * @property {boolean} [has_spoiler] *Optional*. Pass `True` if the animation needs to be covered with a spoiler animation
  * @see https://core.telegram.org/bots/api/#inputmediaanimation
*/

/**
  * Represents an audio file to be treated as music to be sent.
  *
  * @typedef {object} InputMediaAudio
  * @property {'audio'} type Type of the result, must be *audio*
  * @property {string} media File to send. Pass a file\_id to send a file that exists on the Telegram servers
  *   (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or
  *   pass “attach://\<file\_attach\_name\>” to upload a new one using
  *   multipart/form-data under \<file\_attach\_name\> name. [More information on
  *   Sending Files »](https://core.telegram.org/bots/api/#sending-files)
  * @property {InputFile|string} [thumb] *Optional*. Thumbnail of the file sent; can be ignored if thumbnail generation
  *   for the file is supported server-side. The thumbnail should be in JPEG format
  *   and less than 200 kB in size. A thumbnail's width and height should not exceed
  *   320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails
  *   can't be reused and can be only uploaded as a new file, so you can pass
  *   “attach://\<file\_attach\_name\>” if the thumbnail was uploaded using
  *   multipart/form-data under \<file\_attach\_name\>. [More information on Sending
  *   Files »](https://core.telegram.org/bots/api/#sending-files)
  * @property {string} [caption] *Optional*. Caption of the audio to be sent, 0-1024 characters after entities
  *   parsing
  * @property {string} [parse_mode] *Optional*. Mode for parsing entities in the audio caption. See [formatting
  *   options](https://core.telegram.org/bots/api/#formatting-options) for more
  *   details.
  * @property {MessageEntity[]} [caption_entities] *Optional*. List of special entities that appear in the caption, which can be
  *   specified instead of *parse\_mode*
  * @property {number} [duration] *Optional*. Duration of the audio in seconds
  * @property {string} [performer] *Optional*. Performer of the audio
  * @property {string} [title] *Optional*. Title of the audio
  * @see https://core.telegram.org/bots/api/#inputmediaaudio
*/

/**
  * Represents a general file to be sent.
  *
  * @typedef {object} InputMediaDocument
  * @property {'document'} type Type of the result, must be *document*
  * @property {string} media File to send. Pass a file\_id to send a file that exists on the Telegram servers
  *   (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or
  *   pass “attach://\<file\_attach\_name\>” to upload a new one using
  *   multipart/form-data under \<file\_attach\_name\> name. [More information on
  *   Sending Files »](https://core.telegram.org/bots/api/#sending-files)
  * @property {InputFile|string} [thumb] *Optional*. Thumbnail of the file sent; can be ignored if thumbnail generation
  *   for the file is supported server-side. The thumbnail should be in JPEG format
  *   and less than 200 kB in size. A thumbnail's width and height should not exceed
  *   320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails
  *   can't be reused and can be only uploaded as a new file, so you can pass
  *   “attach://\<file\_attach\_name\>” if the thumbnail was uploaded using
  *   multipart/form-data under \<file\_attach\_name\>. [More information on Sending
  *   Files »](https://core.telegram.org/bots/api/#sending-files)
  * @property {string} [caption] *Optional*. Caption of the document to be sent, 0-1024 characters after entities
  *   parsing
  * @property {string} [parse_mode] *Optional*. Mode for parsing entities in the document caption. See [formatting
  *   options](https://core.telegram.org/bots/api/#formatting-options) for more
  *   details.
  * @property {MessageEntity[]} [caption_entities] *Optional*. List of special entities that appear in the caption, which can be
  *   specified instead of *parse\_mode*
  * @property {boolean} [disable_content_type_detection] *Optional*. Disables automatic server-side content type detection for files
  *   uploaded using multipart/form-data. Always *True*, if the document is sent as
  *   part of an album.
  * @see https://core.telegram.org/bots/api/#inputmediadocument
*/

/**
  * This object represents the contents of a file to be uploaded. Must be posted using
  * multipart/form-data in the usual way that files are uploaded via the browser.
  *
  * @typedef {*} InputFile
  * @see https://core.telegram.org/bots/api/#inputfile
*/

/**
  * This object represents a sticker.
  *
  * @typedef {object} Sticker
  * @property {string} file_id Identifier for this file, which can be used to download or reuse the file
  * @property {string} file_unique_id Unique identifier for this file, which is supposed to be the same over time and
  *   for different bots. Can't be used to download or reuse the file.
  * @property {'regular'|'mask'|'custom_emoji'} type Type of the sticker, currently one of “regular”, “mask”, “custom\_emoji”. The
  *   type of the sticker is independent from its format, which is determined by the
  *   fields *is\_animated* and *is\_video*.
  * @property {number} width Sticker width
  * @property {number} height Sticker height
  * @property {boolean} is_animated *True*, if the sticker is
  *   [animated](https://telegram.org/blog/animated-stickers)
  * @property {boolean} is_video *True*, if the sticker is a [video
  *   sticker](https://telegram.org/blog/video-stickers-better-reactions)
  * @property {PhotoSize} [thumb] *Optional*. Sticker thumbnail in the .WEBP or .JPG format
  * @property {string} [emoji] *Optional*. Emoji associated with the sticker
  * @property {string} [set_name] *Optional*. Name of the sticker set to which the sticker belongs
  * @property {File} [premium_animation] *Optional*. For premium regular stickers, premium animation for the sticker
  * @property {MaskPosition} [mask_position] *Optional*. For mask stickers, the position where the mask should be placed
  * @property {string} [custom_emoji_id] *Optional*. For custom emoji stickers, unique identifier of the custom emoji
  * @property {number} [file_size] *Optional*. File size in bytes
  * @see https://core.telegram.org/bots/api/#sticker
*/

/**
  * This object represents a sticker set.
  *
  * @typedef {object} StickerSet
  * @property {string} name Sticker set name
  * @property {string} title Sticker set title
  * @property {'regular'|'mask'|'custom_emoji'} sticker_type Type of stickers in the set, currently one of “regular”, “mask”, “custom\_emoji”
  * @property {boolean} is_animated *True*, if the sticker set contains [animated
  *   stickers](https://telegram.org/blog/animated-stickers)
  * @property {boolean} is_video *True*, if the sticker set contains [video
  *   stickers](https://telegram.org/blog/video-stickers-better-reactions)
  * @property {Sticker[]} stickers List of all set stickers
  * @property {PhotoSize} [thumb] *Optional*. Sticker set thumbnail in the .WEBP, .TGS, or .WEBM format
  * @see https://core.telegram.org/bots/api/#stickerset
*/

/**
  * This object describes the position on faces where a mask should be placed by default.
  *
  * @typedef {object} MaskPosition
  * @property {'forehead'|'eyes'|'mouth'|'chin'} point The part of the face relative to which the mask should be placed. One of
  *   “forehead”, “eyes”, “mouth”, or “chin”.
  * @property {number} x_shift Shift by X-axis measured in widths of the mask scaled to the face size, from
  *   left to right. For example, choosing -1.0 will place mask just to the left of
  *   the default mask position.
  * @property {number} y_shift Shift by Y-axis measured in heights of the mask scaled to the face size, from
  *   top to bottom. For example, 1.0 will place the mask just below the default mask
  *   position.
  * @property {number} scale Mask scaling coefficient. For example, 2.0 means double size.
  * @see https://core.telegram.org/bots/api/#maskposition
*/

/**
  * This object represents an incoming inline query. When the user sends an empty query, your bot could
  * return some default or trending results.
  *
  * @typedef {object} InlineQuery
  * @property {string} id Unique identifier for this query
  * @property {User} from Sender
  * @property {string} query Text of the query (up to 256 characters)
  * @property {string} offset Offset of the results to be returned, can be controlled by the bot
  * @property {'sender'|'private'|'group'|'supergroup'|'channel'} [chat_type] *Optional*. Type of the chat from which the inline query was sent. Can be either
  *   “sender” for a private chat with the inline query sender, “private”, “group”,
  *   “supergroup”, or “channel”. The chat type should be always known for requests
  *   sent from official clients and most third-party clients, unless the request was
  *   sent from a secret chat
  * @property {Location} [location] *Optional*. Sender location, only for bots that request user location
  * @see https://core.telegram.org/bots/api/#inlinequery
*/

/**
  * This object represents one result of an inline query. Telegram clients currently support results of
  * the following 20 types:
  *
  * [InlineQueryResultCachedAudio](https://core.telegram.org/bots/api/#inlinequeryresultcachedaudio)
  *
  * [InlineQueryResultCachedDocument](https://core.telegram.org/bots/api/#inlinequeryresultcacheddocument)
  *
  * [InlineQueryResultCachedGif](https://core.telegram.org/bots/api/#inlinequeryresultcachedgif)
  *
  * [InlineQueryResultCachedMpeg4Gif](https://core.telegram.org/bots/api/#inlinequeryresultcachedmpeg4gif)
  *
  * [InlineQueryResultCachedPhoto](https://core.telegram.org/bots/api/#inlinequeryresultcachedphoto)
  *
  * [InlineQueryResultCachedSticker](https://core.telegram.org/bots/api/#inlinequeryresultcachedsticker)
  *
  * [InlineQueryResultCachedVideo](https://core.telegram.org/bots/api/#inlinequeryresultcachedvideo)
  *
  * [InlineQueryResultCachedVoice](https://core.telegram.org/bots/api/#inlinequeryresultcachedvoice)
  *
  * [InlineQueryResultArticle](https://core.telegram.org/bots/api/#inlinequeryresultarticle)
  *
  * [InlineQueryResultAudio](https://core.telegram.org/bots/api/#inlinequeryresultaudio)
  *
  * [InlineQueryResultContact](https://core.telegram.org/bots/api/#inlinequeryresultcontact)
  *
  * [InlineQueryResultGame](https://core.telegram.org/bots/api/#inlinequeryresultgame)
  *
  * [InlineQueryResultDocument](https://core.telegram.org/bots/api/#inlinequeryresultdocument)
  *
  * [InlineQueryResultGif](https://core.telegram.org/bots/api/#inlinequeryresultgif)
  *
  * [InlineQueryResultLocation](https://core.telegram.org/bots/api/#inlinequeryresultlocation)
  *
  * [InlineQueryResultMpeg4Gif](https://core.telegram.org/bots/api/#inlinequeryresultmpeg4gif)
  *
  * [InlineQueryResultPhoto](https://core.telegram.org/bots/api/#inlinequeryresultphoto)
  *
  * [InlineQueryResultVenue](https://core.telegram.org/bots/api/#inlinequeryresultvenue)
  *
  * [InlineQueryResultVideo](https://core.telegram.org/bots/api/#inlinequeryresultvideo)
  *
  * [InlineQueryResultVoice](https://core.telegram.org/bots/api/#inlinequeryresultvoice)
  *
  *
  * @typedef {InlineQueryResultCachedAudio|InlineQueryResultCachedDocument|InlineQueryResultCachedGif|InlineQueryResultCachedMpeg4Gif|InlineQueryResultCachedPhoto|InlineQueryResultCachedSticker|InlineQueryResultCachedVideo|InlineQueryResultCachedVoice|InlineQueryResultArticle|InlineQueryResultAudio|InlineQueryResultContact|InlineQueryResultGame|InlineQueryResultDocument|InlineQueryResultGif|InlineQueryResultLocation|InlineQueryResultMpeg4Gif|InlineQueryResultPhoto|InlineQueryResultVenue|InlineQueryResultVideo|InlineQueryResultVoice} InlineQueryResult
  * @see https://core.telegram.org/bots/api/#inlinequeryresult
*/

/**
  * Represents a link to an article or web page.
  *
  * @typedef {object} InlineQueryResultArticle
  * @property {'article'} type Type of the result, must be *article*
  * @property {string} id Unique identifier for this result, 1-64 Bytes
  * @property {string} title Title of the result
  * @property {InputMessageContent} input_message_content Content of the message to be sent
  * @property {InlineKeyboardMarkup} [reply_markup] *Optional*. [Inline
  *   keyboard](https://core.telegram.org/bots/features#inline-keyboards) attached to
  *   the message
  * @property {string} [url] *Optional*. URL of the result
  * @property {boolean} [hide_url] *Optional*. Pass *True* if you don't want the URL to be shown in the message
  * @property {string} [description] *Optional*. Short description of the result
  * @property {string} [thumb_url] *Optional*. Url of the thumbnail for the result
  * @property {number} [thumb_width] *Optional*. Thumbnail width
  * @property {number} [thumb_height] *Optional*. Thumbnail height
  * @see https://core.telegram.org/bots/api/#inlinequeryresultarticle
*/

/**
  * Represents a link to a photo. By default, this photo will be sent by the user with optional caption.
  * Alternatively, you can use *input\_message\_content* to send a message with the specified content
  * instead of the photo.
  *
  * @typedef {object} InlineQueryResultPhoto
  * @property {'photo'} type Type of the result, must be *photo*
  * @property {string} id Unique identifier for this result, 1-64 bytes
  * @property {string} photo_url A valid URL of the photo. Photo must be in **JPEG** format. Photo size must not
  *   exceed 5MB
  * @property {string} thumb_url URL of the thumbnail for the photo
  * @property {number} [photo_width] *Optional*. Width of the photo
  * @property {number} [photo_height] *Optional*. Height of the photo
  * @property {string} [title] *Optional*. Title for the result
  * @property {string} [description] *Optional*. Short description of the result
  * @property {string} [caption] *Optional*. Caption of the photo to be sent, 0-1024 characters after entities
  *   parsing
  * @property {string} [parse_mode] *Optional*. Mode for parsing entities in the photo caption. See [formatting
  *   options](https://core.telegram.org/bots/api/#formatting-options) for more
  *   details.
  * @property {MessageEntity[]} [caption_entities] *Optional*. List of special entities that appear in the caption, which can be
  *   specified instead of *parse\_mode*
  * @property {InlineKeyboardMarkup} [reply_markup] *Optional*. [Inline
  *   keyboard](https://core.telegram.org/bots/features#inline-keyboards) attached to
  *   the message
  * @property {InputMessageContent} [input_message_content] *Optional*. Content of the message to be sent instead of the photo
  * @see https://core.telegram.org/bots/api/#inlinequeryresultphoto
*/

/**
  * Represents a link to an animated GIF file. By default, this animated GIF file will be sent by the
  * user with optional caption. Alternatively, you can use *input\_message\_content* to send a message
  * with the specified content instead of the animation.
  *
  * @typedef {object} InlineQueryResultGif
  * @property {'gif'} type Type of the result, must be *gif*
  * @property {string} id Unique identifier for this result, 1-64 bytes
  * @property {string} gif_url A valid URL for the GIF file. File size must not exceed 1MB
  * @property {number} [gif_width] *Optional*. Width of the GIF
  * @property {number} [gif_height] *Optional*. Height of the GIF
  * @property {number} [gif_duration] *Optional*. Duration of the GIF in seconds
  * @property {string} thumb_url URL of the static (JPEG or GIF) or animated (MPEG4) thumbnail for the result
  * @property {'image/jpeg'|'image/gif'|'video/mp4'} [thumb_mime_type=image/jpeg] *Optional*. MIME type of the thumbnail, must be one of “image/jpeg”,
  *   “image/gif”, or “video/mp4”. Defaults to “image/jpeg”
  * @property {string} [title] *Optional*. Title for the result
  * @property {string} [caption] *Optional*. Caption of the GIF file to be sent, 0-1024 characters after entities
  *   parsing
  * @property {string} [parse_mode] *Optional*. Mode for parsing entities in the caption. See [formatting
  *   options](https://core.telegram.org/bots/api/#formatting-options) for more
  *   details.
  * @property {MessageEntity[]} [caption_entities] *Optional*. List of special entities that appear in the caption, which can be
  *   specified instead of *parse\_mode*
  * @property {InlineKeyboardMarkup} [reply_markup] *Optional*. [Inline
  *   keyboard](https://core.telegram.org/bots/features#inline-keyboards) attached to
  *   the message
  * @property {InputMessageContent} [input_message_content] *Optional*. Content of the message to be sent instead of the GIF animation
  * @see https://core.telegram.org/bots/api/#inlinequeryresultgif
*/

/**
  * Represents a link to a video animation (H.264/MPEG-4 AVC video without sound). By default, this
  * animated MPEG-4 file will be sent by the user with optional caption. Alternatively, you can use
  * *input\_message\_content* to send a message with the specified content instead of the animation.
  *
  * @typedef {object} InlineQueryResultMpeg4Gif
  * @property {'mpeg4_gif'} type Type of the result, must be *mpeg4\_gif*
  * @property {string} id Unique identifier for this result, 1-64 bytes
  * @property {string} mpeg4_url A valid URL for the MPEG4 file. File size must not exceed 1MB
  * @property {number} [mpeg4_width] *Optional*. Video width
  * @property {number} [mpeg4_height] *Optional*. Video height
  * @property {number} [mpeg4_duration] *Optional*. Video duration in seconds
  * @property {string} thumb_url URL of the static (JPEG or GIF) or animated (MPEG4) thumbnail for the result
  * @property {'image/jpeg'|'image/gif'|'video/mp4'} [thumb_mime_type=image/jpeg] *Optional*. MIME type of the thumbnail, must be one of “image/jpeg”,
  *   “image/gif”, or “video/mp4”. Defaults to “image/jpeg”
  * @property {string} [title] *Optional*. Title for the result
  * @property {string} [caption] *Optional*. Caption of the MPEG-4 file to be sent, 0-1024 characters after
  *   entities parsing
  * @property {string} [parse_mode] *Optional*. Mode for parsing entities in the caption. See [formatting
  *   options](https://core.telegram.org/bots/api/#formatting-options) for more
  *   details.
  * @property {MessageEntity[]} [caption_entities] *Optional*. List of special entities that appear in the caption, which can be
  *   specified instead of *parse\_mode*
  * @property {InlineKeyboardMarkup} [reply_markup] *Optional*. [Inline
  *   keyboard](https://core.telegram.org/bots/features#inline-keyboards) attached to
  *   the message
  * @property {InputMessageContent} [input_message_content] *Optional*. Content of the message to be sent instead of the video animation
  * @see https://core.telegram.org/bots/api/#inlinequeryresultmpeg4gif
*/

/**
  * Represents a link to a page containing an embedded video player or a video file. By default, this
  * video file will be sent by the user with an optional caption. Alternatively, you can use
  * *input\_message\_content* to send a message with the specified content instead of the video.
  *
  * If an InlineQueryResultVideo message contains an embedded video (e.g., YouTube), you **must**
  * replace its content using *input\_message\_content*.
  *
  * @typedef {object} InlineQueryResultVideo
  * @property {'video'} type Type of the result, must be *video*
  * @property {string} id Unique identifier for this result, 1-64 bytes
  * @property {string} video_url A valid URL for the embedded video player or video file
  * @property {'text/html'|'video/mp4'} mime_type MIME type of the content of the video URL, “text/html” or “video/mp4”
  * @property {string} thumb_url URL of the thumbnail (JPEG only) for the video
  * @property {string} title Title for the result
  * @property {string} [caption] *Optional*. Caption of the video to be sent, 0-1024 characters after entities
  *   parsing
  * @property {string} [parse_mode] *Optional*. Mode for parsing entities in the video caption. See [formatting
  *   options](https://core.telegram.org/bots/api/#formatting-options) for more
  *   details.
  * @property {MessageEntity[]} [caption_entities] *Optional*. List of special entities that appear in the caption, which can be
  *   specified instead of *parse\_mode*
  * @property {number} [video_width] *Optional*. Video width
  * @property {number} [video_height] *Optional*. Video height
  * @property {number} [video_duration] *Optional*. Video duration in seconds
  * @property {string} [description] *Optional*. Short description of the result
  * @property {InlineKeyboardMarkup} [reply_markup] *Optional*. [Inline
  *   keyboard](https://core.telegram.org/bots/features#inline-keyboards) attached to
  *   the message
  * @property {InputMessageContent} [input_message_content] *Optional*. Content of the message to be sent instead of the video. This field
  *   is **required** if InlineQueryResultVideo is used to send an HTML-page as a
  *   result (e.g., a YouTube video).
  * @see https://core.telegram.org/bots/api/#inlinequeryresultvideo
*/

/**
  * Represents a link to an MP3 audio file. By default, this audio file will be sent by the user.
  * Alternatively, you can use *input\_message\_content* to send a message with the specified content
  * instead of the audio.
  *
  * @typedef {object} InlineQueryResultAudio
  * @property {'audio'} type Type of the result, must be *audio*
  * @property {string} id Unique identifier for this result, 1-64 bytes
  * @property {string} audio_url A valid URL for the audio file
  * @property {string} title Title
  * @property {string} [caption] *Optional*. Caption, 0-1024 characters after entities parsing
  * @property {string} [parse_mode] *Optional*. Mode for parsing entities in the audio caption. See [formatting
  *   options](https://core.telegram.org/bots/api/#formatting-options) for more
  *   details.
  * @property {MessageEntity[]} [caption_entities] *Optional*. List of special entities that appear in the caption, which can be
  *   specified instead of *parse\_mode*
  * @property {string} [performer] *Optional*. Performer
  * @property {number} [audio_duration] *Optional*. Audio duration in seconds
  * @property {InlineKeyboardMarkup} [reply_markup] *Optional*. [Inline
  *   keyboard](https://core.telegram.org/bots/features#inline-keyboards) attached to
  *   the message
  * @property {InputMessageContent} [input_message_content] *Optional*. Content of the message to be sent instead of the audio
  * @see https://core.telegram.org/bots/api/#inlinequeryresultaudio
*/

/**
  * Represents a link to a voice recording in an .OGG container encoded with OPUS. By default, this
  * voice recording will be sent by the user. Alternatively, you can use *input\_message\_content* to
  * send a message with the specified content instead of the the voice message.
  *
  * @typedef {object} InlineQueryResultVoice
  * @property {'voice'} type Type of the result, must be *voice*
  * @property {string} id Unique identifier for this result, 1-64 bytes
  * @property {string} voice_url A valid URL for the voice recording
  * @property {string} title Recording title
  * @property {string} [caption] *Optional*. Caption, 0-1024 characters after entities parsing
  * @property {string} [parse_mode] *Optional*. Mode for parsing entities in the voice message caption. See
  *   [formatting options](https://core.telegram.org/bots/api/#formatting-options) for
  *   more details.
  * @property {MessageEntity[]} [caption_entities] *Optional*. List of special entities that appear in the caption, which can be
  *   specified instead of *parse\_mode*
  * @property {number} [voice_duration] *Optional*. Recording duration in seconds
  * @property {InlineKeyboardMarkup} [reply_markup] *Optional*. [Inline
  *   keyboard](https://core.telegram.org/bots/features#inline-keyboards) attached to
  *   the message
  * @property {InputMessageContent} [input_message_content] *Optional*. Content of the message to be sent instead of the voice recording
  * @see https://core.telegram.org/bots/api/#inlinequeryresultvoice
*/

/**
  * Represents a link to a file. By default, this file will be sent by the user with an optional
  * caption. Alternatively, you can use *input\_message\_content* to send a message with the specified
  * content instead of the file. Currently, only **.PDF** and **.ZIP** files can be sent using this
  * method.
  *
  * @typedef {object} InlineQueryResultDocument
  * @property {'document'} type Type of the result, must be *document*
  * @property {string} id Unique identifier for this result, 1-64 bytes
  * @property {string} title Title for the result
  * @property {string} [caption] *Optional*. Caption of the document to be sent, 0-1024 characters after entities
  *   parsing
  * @property {string} [parse_mode] *Optional*. Mode for parsing entities in the document caption. See [formatting
  *   options](https://core.telegram.org/bots/api/#formatting-options) for more
  *   details.
  * @property {MessageEntity[]} [caption_entities] *Optional*. List of special entities that appear in the caption, which can be
  *   specified instead of *parse\_mode*
  * @property {string} document_url A valid URL for the file
  * @property {'application/pdf'|'application/zip'} mime_type MIME type of the content of the file, either “application/pdf” or
  *   “application/zip”
  * @property {string} [description] *Optional*. Short description of the result
  * @property {InlineKeyboardMarkup} [reply_markup] *Optional*. Inline keyboard attached to the message
  * @property {InputMessageContent} [input_message_content] *Optional*. Content of the message to be sent instead of the file
  * @property {string} [thumb_url] *Optional*. URL of the thumbnail (JPEG only) for the file
  * @property {number} [thumb_width] *Optional*. Thumbnail width
  * @property {number} [thumb_height] *Optional*. Thumbnail height
  * @see https://core.telegram.org/bots/api/#inlinequeryresultdocument
*/

/**
  * Represents a location on a map. By default, the location will be sent by the user. Alternatively,
  * you can use *input\_message\_content* to send a message with the specified content instead of the
  * location.
  *
  * @typedef {object} InlineQueryResultLocation
  * @property {'location'} type Type of the result, must be *location*
  * @property {string} id Unique identifier for this result, 1-64 Bytes
  * @property {number} latitude Location latitude in degrees
  * @property {number} longitude Location longitude in degrees
  * @property {string} title Location title
  * @property {number} [horizontal_accuracy] *Optional*. The radius of uncertainty for the location, measured in meters;
  *   0-1500
  * @property {number} [live_period] *Optional*. Period in seconds for which the location can be updated, should be
  *   between 60 and 86400.
  * @property {number} [heading] *Optional*. For live locations, a direction in which the user is moving, in
  *   degrees. Must be between 1 and 360 if specified.
  * @property {number} [proximity_alert_radius] *Optional*. For live locations, a maximum distance for proximity alerts about
  *   approaching another chat member, in meters. Must be between 1 and 100000 if
  *   specified.
  * @property {InlineKeyboardMarkup} [reply_markup] *Optional*. [Inline
  *   keyboard](https://core.telegram.org/bots/features#inline-keyboards) attached to
  *   the message
  * @property {InputMessageContent} [input_message_content] *Optional*. Content of the message to be sent instead of the location
  * @property {string} [thumb_url] *Optional*. Url of the thumbnail for the result
  * @property {number} [thumb_width] *Optional*. Thumbnail width
  * @property {number} [thumb_height] *Optional*. Thumbnail height
  * @see https://core.telegram.org/bots/api/#inlinequeryresultlocation
*/

/**
  * Represents a venue. By default, the venue will be sent by the user. Alternatively, you can use
  * *input\_message\_content* to send a message with the specified content instead of the venue.
  *
  * @typedef {object} InlineQueryResultVenue
  * @property {'venue'} type Type of the result, must be *venue*
  * @property {string} id Unique identifier for this result, 1-64 Bytes
  * @property {number} latitude Latitude of the venue location in degrees
  * @property {number} longitude Longitude of the venue location in degrees
  * @property {string} title Title of the venue
  * @property {string} address Address of the venue
  * @property {string} [foursquare_id] *Optional*. Foursquare identifier of the venue if known
  * @property {string} [foursquare_type] *Optional*. Foursquare type of the venue, if known. (For example,
  *   “arts\_entertainment/default”, “arts\_entertainment/aquarium” or
  *   “food/icecream”.)
  * @property {string} [google_place_id] *Optional*. Google Places identifier of the venue
  * @property {string} [google_place_type] *Optional*. Google Places type of the venue. (See [supported
  *   types](https://developers.google.com/places/web-service/supported_types).)
  * @property {InlineKeyboardMarkup} [reply_markup] *Optional*. [Inline
  *   keyboard](https://core.telegram.org/bots/features#inline-keyboards) attached to
  *   the message
  * @property {InputMessageContent} [input_message_content] *Optional*. Content of the message to be sent instead of the venue
  * @property {string} [thumb_url] *Optional*. Url of the thumbnail for the result
  * @property {number} [thumb_width] *Optional*. Thumbnail width
  * @property {number} [thumb_height] *Optional*. Thumbnail height
  * @see https://core.telegram.org/bots/api/#inlinequeryresultvenue
*/

/**
  * Represents a contact with a phone number. By default, this contact will be sent by the user.
  * Alternatively, you can use *input\_message\_content* to send a message with the specified content
  * instead of the contact.
  *
  * @typedef {object} InlineQueryResultContact
  * @property {'contact'} type Type of the result, must be *contact*
  * @property {string} id Unique identifier for this result, 1-64 Bytes
  * @property {string} phone_number Contact's phone number
  * @property {string} first_name Contact's first name
  * @property {string} [last_name] *Optional*. Contact's last name
  * @property {string} [vcard] *Optional*. Additional data about the contact in the form of a
  *   [vCard](https://en.wikipedia.org/wiki/VCard), 0-2048 bytes
  * @property {InlineKeyboardMarkup} [reply_markup] *Optional*. [Inline
  *   keyboard](https://core.telegram.org/bots/features#inline-keyboards) attached to
  *   the message
  * @property {InputMessageContent} [input_message_content] *Optional*. Content of the message to be sent instead of the contact
  * @property {string} [thumb_url] *Optional*. Url of the thumbnail for the result
  * @property {number} [thumb_width] *Optional*. Thumbnail width
  * @property {number} [thumb_height] *Optional*. Thumbnail height
  * @see https://core.telegram.org/bots/api/#inlinequeryresultcontact
*/

/**
  * Represents a [Game](https://core.telegram.org/bots/api/#games)
  *.
  *
  * @typedef {object} InlineQueryResultGame
  * @property {'game'} type Type of the result, must be *game*
  * @property {string} id Unique identifier for this result, 1-64 bytes
  * @property {string} game_short_name Short name of the game
  * @property {InlineKeyboardMarkup} [reply_markup] *Optional*. [Inline
  *   keyboard](https://core.telegram.org/bots/features#inline-keyboards) attached to
  *   the message
  * @see https://core.telegram.org/bots/api/#inlinequeryresultgame
*/

/**
  * Represents a link to a photo stored on the Telegram servers. By default, this photo will be sent by
  * the user with an optional caption. Alternatively, you can use *input\_message\_content* to send a
  * message with the specified content instead of the photo.
  *
  * @typedef {object} InlineQueryResultCachedPhoto
  * @property {'photo'} type Type of the result, must be *photo*
  * @property {string} id Unique identifier for this result, 1-64 bytes
  * @property {string} photo_file_id A valid file identifier of the photo
  * @property {string} [title] *Optional*. Title for the result
  * @property {string} [description] *Optional*. Short description of the result
  * @property {string} [caption] *Optional*. Caption of the photo to be sent, 0-1024 characters after entities
  *   parsing
  * @property {string} [parse_mode] *Optional*. Mode for parsing entities in the photo caption. See [formatting
  *   options](https://core.telegram.org/bots/api/#formatting-options) for more
  *   details.
  * @property {MessageEntity[]} [caption_entities] *Optional*. List of special entities that appear in the caption, which can be
  *   specified instead of *parse\_mode*
  * @property {InlineKeyboardMarkup} [reply_markup] *Optional*. [Inline
  *   keyboard](https://core.telegram.org/bots/features#inline-keyboards) attached to
  *   the message
  * @property {InputMessageContent} [input_message_content] *Optional*. Content of the message to be sent instead of the photo
  * @see https://core.telegram.org/bots/api/#inlinequeryresultcachedphoto
*/

/**
  * Represents a link to an animated GIF file stored on the Telegram servers. By default, this animated
  * GIF file will be sent by the user with an optional caption. Alternatively, you can use
  * *input\_message\_content* to send a message with specified content instead of the animation.
  *
  * @typedef {object} InlineQueryResultCachedGif
  * @property {'gif'} type Type of the result, must be *gif*
  * @property {string} id Unique identifier for this result, 1-64 bytes
  * @property {string} gif_file_id A valid file identifier for the GIF file
  * @property {string} [title] *Optional*. Title for the result
  * @property {string} [caption] *Optional*. Caption of the GIF file to be sent, 0-1024 characters after entities
  *   parsing
  * @property {string} [parse_mode] *Optional*. Mode for parsing entities in the caption. See [formatting
  *   options](https://core.telegram.org/bots/api/#formatting-options) for more
  *   details.
  * @property {MessageEntity[]} [caption_entities] *Optional*. List of special entities that appear in the caption, which can be
  *   specified instead of *parse\_mode*
  * @property {InlineKeyboardMarkup} [reply_markup] *Optional*. [Inline
  *   keyboard](https://core.telegram.org/bots/features#inline-keyboards) attached to
  *   the message
  * @property {InputMessageContent} [input_message_content] *Optional*. Content of the message to be sent instead of the GIF animation
  * @see https://core.telegram.org/bots/api/#inlinequeryresultcachedgif
*/

/**
  * Represents a link to a video animation (H.264/MPEG-4 AVC video without sound) stored on the Telegram
  * servers. By default, this animated MPEG-4 file will be sent by the user with an optional caption.
  * Alternatively, you can use *input\_message\_content* to send a message with the specified content
  * instead of the animation.
  *
  * @typedef {object} InlineQueryResultCachedMpeg4Gif
  * @property {'mpeg4_gif'} type Type of the result, must be *mpeg4\_gif*
  * @property {string} id Unique identifier for this result, 1-64 bytes
  * @property {string} mpeg4_file_id A valid file identifier for the MPEG4 file
  * @property {string} [title] *Optional*. Title for the result
  * @property {string} [caption] *Optional*. Caption of the MPEG-4 file to be sent, 0-1024 characters after
  *   entities parsing
  * @property {string} [parse_mode] *Optional*. Mode for parsing entities in the caption. See [formatting
  *   options](https://core.telegram.org/bots/api/#formatting-options) for more
  *   details.
  * @property {MessageEntity[]} [caption_entities] *Optional*. List of special entities that appear in the caption, which can be
  *   specified instead of *parse\_mode*
  * @property {InlineKeyboardMarkup} [reply_markup] *Optional*. [Inline
  *   keyboard](https://core.telegram.org/bots/features#inline-keyboards) attached to
  *   the message
  * @property {InputMessageContent} [input_message_content] *Optional*. Content of the message to be sent instead of the video animation
  * @see https://core.telegram.org/bots/api/#inlinequeryresultcachedmpeg4gif
*/

/**
  * Represents a link to a sticker stored on the Telegram servers. By default, this sticker will be sent
  * by the user. Alternatively, you can use *input\_message\_content* to send a message with the
  * specified content instead of the sticker.
  *
  * @typedef {object} InlineQueryResultCachedSticker
  * @property {'sticker'} type Type of the result, must be *sticker*
  * @property {string} id Unique identifier for this result, 1-64 bytes
  * @property {string} sticker_file_id A valid file identifier of the sticker
  * @property {InlineKeyboardMarkup} [reply_markup] *Optional*. [Inline
  *   keyboard](https://core.telegram.org/bots/features#inline-keyboards) attached to
  *   the message
  * @property {InputMessageContent} [input_message_content] *Optional*. Content of the message to be sent instead of the sticker
  * @see https://core.telegram.org/bots/api/#inlinequeryresultcachedsticker
*/

/**
  * Represents a link to a file stored on the Telegram servers. By default, this file will be sent by
  * the user with an optional caption. Alternatively, you can use *input\_message\_content* to send a
  * message with the specified content instead of the file.
  *
  * @typedef {object} InlineQueryResultCachedDocument
  * @property {'document'} type Type of the result, must be *document*
  * @property {string} id Unique identifier for this result, 1-64 bytes
  * @property {string} title Title for the result
  * @property {string} document_file_id A valid file identifier for the file
  * @property {string} [description] *Optional*. Short description of the result
  * @property {string} [caption] *Optional*. Caption of the document to be sent, 0-1024 characters after entities
  *   parsing
  * @property {string} [parse_mode] *Optional*. Mode for parsing entities in the document caption. See [formatting
  *   options](https://core.telegram.org/bots/api/#formatting-options) for more
  *   details.
  * @property {MessageEntity[]} [caption_entities] *Optional*. List of special entities that appear in the caption, which can be
  *   specified instead of *parse\_mode*
  * @property {InlineKeyboardMarkup} [reply_markup] *Optional*. [Inline
  *   keyboard](https://core.telegram.org/bots/features#inline-keyboards) attached to
  *   the message
  * @property {InputMessageContent} [input_message_content] *Optional*. Content of the message to be sent instead of the file
  * @see https://core.telegram.org/bots/api/#inlinequeryresultcacheddocument
*/

/**
  * Represents a link to a video file stored on the Telegram servers. By default, this video file will
  * be sent by the user with an optional caption. Alternatively, you can use *input\_message\_content*
  * to send a message with the specified content instead of the video.
  *
  * @typedef {object} InlineQueryResultCachedVideo
  * @property {'video'} type Type of the result, must be *video*
  * @property {string} id Unique identifier for this result, 1-64 bytes
  * @property {string} video_file_id A valid file identifier for the video file
  * @property {string} title Title for the result
  * @property {string} [description] *Optional*. Short description of the result
  * @property {string} [caption] *Optional*. Caption of the video to be sent, 0-1024 characters after entities
  *   parsing
  * @property {string} [parse_mode] *Optional*. Mode for parsing entities in the video caption. See [formatting
  *   options](https://core.telegram.org/bots/api/#formatting-options) for more
  *   details.
  * @property {MessageEntity[]} [caption_entities] *Optional*. List of special entities that appear in the caption, which can be
  *   specified instead of *parse\_mode*
  * @property {InlineKeyboardMarkup} [reply_markup] *Optional*. [Inline
  *   keyboard](https://core.telegram.org/bots/features#inline-keyboards) attached to
  *   the message
  * @property {InputMessageContent} [input_message_content] *Optional*. Content of the message to be sent instead of the video
  * @see https://core.telegram.org/bots/api/#inlinequeryresultcachedvideo
*/

/**
  * Represents a link to a voice message stored on the Telegram servers. By default, this voice message
  * will be sent by the user. Alternatively, you can use *input\_message\_content* to send a message
  * with the specified content instead of the voice message.
  *
  * @typedef {object} InlineQueryResultCachedVoice
  * @property {'voice'} type Type of the result, must be *voice*
  * @property {string} id Unique identifier for this result, 1-64 bytes
  * @property {string} voice_file_id A valid file identifier for the voice message
  * @property {string} title Voice message title
  * @property {string} [caption] *Optional*. Caption, 0-1024 characters after entities parsing
  * @property {string} [parse_mode] *Optional*. Mode for parsing entities in the voice message caption. See
  *   [formatting options](https://core.telegram.org/bots/api/#formatting-options) for
  *   more details.
  * @property {MessageEntity[]} [caption_entities] *Optional*. List of special entities that appear in the caption, which can be
  *   specified instead of *parse\_mode*
  * @property {InlineKeyboardMarkup} [reply_markup] *Optional*. [Inline
  *   keyboard](https://core.telegram.org/bots/features#inline-keyboards) attached to
  *   the message
  * @property {InputMessageContent} [input_message_content] *Optional*. Content of the message to be sent instead of the voice message
  * @see https://core.telegram.org/bots/api/#inlinequeryresultcachedvoice
*/

/**
  * Represents a link to an MP3 audio file stored on the Telegram servers. By default, this audio file
  * will be sent by the user. Alternatively, you can use *input\_message\_content* to send a message
  * with the specified content instead of the audio.
  *
  * @typedef {object} InlineQueryResultCachedAudio
  * @property {'audio'} type Type of the result, must be *audio*
  * @property {string} id Unique identifier for this result, 1-64 bytes
  * @property {string} audio_file_id A valid file identifier for the audio file
  * @property {string} [caption] *Optional*. Caption, 0-1024 characters after entities parsing
  * @property {string} [parse_mode] *Optional*. Mode for parsing entities in the audio caption. See [formatting
  *   options](https://core.telegram.org/bots/api/#formatting-options) for more
  *   details.
  * @property {MessageEntity[]} [caption_entities] *Optional*. List of special entities that appear in the caption, which can be
  *   specified instead of *parse\_mode*
  * @property {InlineKeyboardMarkup} [reply_markup] *Optional*. [Inline
  *   keyboard](https://core.telegram.org/bots/features#inline-keyboards) attached to
  *   the message
  * @property {InputMessageContent} [input_message_content] *Optional*. Content of the message to be sent instead of the audio
  * @see https://core.telegram.org/bots/api/#inlinequeryresultcachedaudio
*/

/**
  * This object represents the content of a message to be sent as a result of an inline query. Telegram
  * clients currently support the following 5 types:
  *
  * [InputTextMessageContent](https://core.telegram.org/bots/api/#inputtextmessagecontent)
  *
  * [InputLocationMessageContent](https://core.telegram.org/bots/api/#inputlocationmessagecontent)
  *
  * [InputVenueMessageContent](https://core.telegram.org/bots/api/#inputvenuemessagecontent)
  *
  * [InputContactMessageContent](https://core.telegram.org/bots/api/#inputcontactmessagecontent)
  *
  * [InputInvoiceMessageContent](https://core.telegram.org/bots/api/#inputinvoicemessagecontent)
  *
  *
  * @typedef {InputTextMessageContent|InputLocationMessageContent|InputVenueMessageContent|InputContactMessageContent|InputInvoiceMessageContent} InputMessageContent
  * @see https://core.telegram.org/bots/api/#inputmessagecontent
*/

/**
  * Represents the [content](https://core.telegram.org/bots/api/#inputmessagecontent)
  * of a text message
  * to be sent as the result of an inline query.
  *
  * @typedef {object} InputTextMessageContent
  * @property {string} message_text Text of the message to be sent, 1-4096 characters
  * @property {string} [parse_mode] *Optional*. Mode for parsing entities in the message text. See [formatting
  *   options](https://core.telegram.org/bots/api/#formatting-options) for more
  *   details.
  * @property {MessageEntity[]} [entities] *Optional*. List of special entities that appear in message text, which can be
  *   specified instead of *parse\_mode*
  * @property {boolean} [disable_web_page_preview] *Optional*. Disables link previews for links in the sent message
  * @see https://core.telegram.org/bots/api/#inputtextmessagecontent
*/

/**
  * Represents the [content](https://core.telegram.org/bots/api/#inputmessagecontent)
  * of a location
  * message to be sent as the result of an inline query.
  *
  * @typedef {object} InputLocationMessageContent
  * @property {number} latitude Latitude of the location in degrees
  * @property {number} longitude Longitude of the location in degrees
  * @property {number} [horizontal_accuracy] *Optional*. The radius of uncertainty for the location, measured in meters;
  *   0-1500
  * @property {number} [live_period] *Optional*. Period in seconds for which the location can be updated, should be
  *   between 60 and 86400.
  * @property {number} [heading] *Optional*. For live locations, a direction in which the user is moving, in
  *   degrees. Must be between 1 and 360 if specified.
  * @property {number} [proximity_alert_radius] *Optional*. For live locations, a maximum distance for proximity alerts about
  *   approaching another chat member, in meters. Must be between 1 and 100000 if
  *   specified.
  * @see https://core.telegram.org/bots/api/#inputlocationmessagecontent
*/

/**
  * Represents the [content](https://core.telegram.org/bots/api/#inputmessagecontent)
  * of a venue message
  * to be sent as the result of an inline query.
  *
  * @typedef {object} InputVenueMessageContent
  * @property {number} latitude Latitude of the venue in degrees
  * @property {number} longitude Longitude of the venue in degrees
  * @property {string} title Name of the venue
  * @property {string} address Address of the venue
  * @property {string} [foursquare_id] *Optional*. Foursquare identifier of the venue, if known
  * @property {string} [foursquare_type] *Optional*. Foursquare type of the venue, if known. (For example,
  *   “arts\_entertainment/default”, “arts\_entertainment/aquarium” or
  *   “food/icecream”.)
  * @property {string} [google_place_id] *Optional*. Google Places identifier of the venue
  * @property {string} [google_place_type] *Optional*. Google Places type of the venue. (See [supported
  *   types](https://developers.google.com/places/web-service/supported_types).)
  * @see https://core.telegram.org/bots/api/#inputvenuemessagecontent
*/

/**
  * Represents the [content](https://core.telegram.org/bots/api/#inputmessagecontent)
  * of a contact
  * message to be sent as the result of an inline query.
  *
  * @typedef {object} InputContactMessageContent
  * @property {string} phone_number Contact's phone number
  * @property {string} first_name Contact's first name
  * @property {string} [last_name] *Optional*. Contact's last name
  * @property {string} [vcard] *Optional*. Additional data about the contact in the form of a
  *   [vCard](https://en.wikipedia.org/wiki/VCard), 0-2048 bytes
  * @see https://core.telegram.org/bots/api/#inputcontactmessagecontent
*/

/**
  * Represents the [content](https://core.telegram.org/bots/api/#inputmessagecontent)
  * of an invoice
  * message to be sent as the result of an inline query.
  *
  * @typedef {object} InputInvoiceMessageContent
  * @property {string} title Product name, 1-32 characters
  * @property {string} description Product description, 1-255 characters
  * @property {string} payload Bot-defined invoice payload, 1-128 bytes. This will not be displayed to the
  *   user, use for your internal processes.
  * @property {string} provider_token Payment provider token, obtained via [@BotFather](https://t.me/botfather)
  * @property {string} currency Three-letter ISO 4217 currency code, see [more on
  *   currencies](https://core.telegram.org/bots/payments#supported-currencies)
  * @property {LabeledPrice[]} prices Price breakdown, a JSON-serialized list of components (e.g. product price, tax,
  *   discount, delivery cost, delivery tax, bonus, etc.)
  * @property {number} [max_tip_amount] *Optional*. The maximum accepted amount for tips in the *smallest units* of the
  *   currency (integer, **not** float/double). For example, for a maximum tip of `US$
  *   1.45` pass `max_tip_amount = 145`. See the *exp* parameter in
  *   [currencies.json](https://core.telegram.org/bots/payments/currencies.json), it
  *   shows the number of digits past the decimal point for each currency (2 for the
  *   majority of currencies). Defaults to 0
  * @property {number[]} [suggested_tip_amounts] *Optional*. A JSON-serialized array of suggested amounts of tip in the *smallest
  *   units* of the currency (integer, **not** float/double). At most 4 suggested tip
  *   amounts can be specified. The suggested tip amounts must be positive, passed in
  *   a strictly increased order and must not exceed *max\_tip\_amount*.
  * @property {string} [provider_data] *Optional*. A JSON-serialized object for data about the invoice, which will be
  *   shared with the payment provider. A detailed description of the required fields
  *   should be provided by the payment provider.
  * @property {string} [photo_url] *Optional*. URL of the product photo for the invoice. Can be a photo of the
  *   goods or a marketing image for a service.
  * @property {number} [photo_size] *Optional*. Photo size in bytes
  * @property {number} [photo_width] *Optional*. Photo width
  * @property {number} [photo_height] *Optional*. Photo height
  * @property {boolean} [need_name] *Optional*. Pass *True* if you require the user's full name to complete the
  *   order
  * @property {boolean} [need_phone_number] *Optional*. Pass *True* if you require the user's phone number to complete the
  *   order
  * @property {boolean} [need_email] *Optional*. Pass *True* if you require the user's email address to complete the
  *   order
  * @property {boolean} [need_shipping_address] *Optional*. Pass *True* if you require the user's shipping address to complete
  *   the order
  * @property {boolean} [send_phone_number_to_provider] *Optional*. Pass *True* if the user's phone number should be sent to provider
  * @property {boolean} [send_email_to_provider] *Optional*. Pass *True* if the user's email address should be sent to provider
  * @property {boolean} [is_flexible] *Optional*. Pass *True* if the final price depends on the shipping method
  * @see https://core.telegram.org/bots/api/#inputinvoicemessagecontent
*/

/**
  * Represents a [result](https://core.telegram.org/bots/api/#inlinequeryresult)
  * of an inline query that
  * was chosen by the user and sent to their chat partner.
  *
  * @typedef {object} ChosenInlineResult
  * @property {string} result_id The unique identifier for the result that was chosen
  * @property {User} from The user that chose the result
  * @property {Location} [location] *Optional*. Sender location, only for bots that require user location
  * @property {string} [inline_message_id] *Optional*. Identifier of the sent inline message. Available only if there is an
  *   [inline keyboard](https://core.telegram.org/bots/api/#inlinekeyboardmarkup)
  *   attached to the message. Will be also received in [callback
  *   queries](https://core.telegram.org/bots/api/#callbackquery) and can be used to
  *   [edit](https://core.telegram.org/bots/api/#updating-messages) the message.
  * @property {string} query The query that was used to obtain the result
  * @see https://core.telegram.org/bots/api/#choseninlineresult
*/

/**
  * Describes an inline message sent by a [Web App](https://core.telegram.org/bots/webapps)
  * on behalf of
  * a user.
  *
  * @typedef {object} SentWebAppMessage
  * @property {string} [inline_message_id] *Optional*. Identifier of the sent inline message. Available only if there is an
  *   [inline keyboard](https://core.telegram.org/bots/api/#inlinekeyboardmarkup)
  *   attached to the message.
  * @see https://core.telegram.org/bots/api/#sentwebappmessage
*/

/**
  * This object represents a portion of the price for goods or services.
  *
  * @typedef {object} LabeledPrice
  * @property {string} label Portion label
  * @property {number} amount Price of the product in the *smallest units* of the
  *   [currency](https://core.telegram.org/bots/payments#supported-currencies)
  *   (integer, **not** float/double). For example, for a price of `US$ 1.45` pass
  *   `amount = 145`. See the *exp* parameter in
  *   [currencies.json](https://core.telegram.org/bots/payments/currencies.json), it
  *   shows the number of digits past the decimal point for each currency (2 for the
  *   majority of currencies).
  * @see https://core.telegram.org/bots/api/#labeledprice
*/

/**
  * This object contains basic information about an invoice.
  *
  * @typedef {object} Invoice
  * @property {string} title Product name
  * @property {string} description Product description
  * @property {string} start_parameter Unique bot deep-linking parameter that can be used to generate this invoice
  * @property {string} currency Three-letter ISO 4217
  *   [currency](https://core.telegram.org/bots/payments#supported-currencies) code
  * @property {number} total_amount Total price in the *smallest units* of the currency (integer, **not**
  *   float/double). For example, for a price of `US$ 1.45` pass `amount = 145`. See
  *   the *exp* parameter in
  *   [currencies.json](https://core.telegram.org/bots/payments/currencies.json), it
  *   shows the number of digits past the decimal point for each currency (2 for the
  *   majority of currencies).
  * @see https://core.telegram.org/bots/api/#invoice
*/

/**
  * This object represents a shipping address.
  *
  * @typedef {object} ShippingAddress
  * @property {string} country_code Two-letter ISO 3166-1 alpha-2 country code
  * @property {string} state State, if applicable
  * @property {string} city City
  * @property {string} street_line1 First line for the address
  * @property {string} street_line2 Second line for the address
  * @property {string} post_code Address post code
  * @see https://core.telegram.org/bots/api/#shippingaddress
*/

/**
  * This object represents information about an order.
  *
  * @typedef {object} OrderInfo
  * @property {string} [name] *Optional*. User name
  * @property {string} [phone_number] *Optional*. User's phone number
  * @property {string} [email] *Optional*. User email
  * @property {ShippingAddress} [shipping_address] *Optional*. User shipping address
  * @see https://core.telegram.org/bots/api/#orderinfo
*/

/**
  * This object represents one shipping option.
  *
  * @typedef {object} ShippingOption
  * @property {string} id Shipping option identifier
  * @property {string} title Option title
  * @property {LabeledPrice[]} prices List of price portions
  * @see https://core.telegram.org/bots/api/#shippingoption
*/

/**
  * This object contains basic information about a successful payment.
  *
  * @typedef {object} SuccessfulPayment
  * @property {string} currency Three-letter ISO 4217
  *   [currency](https://core.telegram.org/bots/payments#supported-currencies) code
  * @property {number} total_amount Total price in the *smallest units* of the currency (integer, **not**
  *   float/double). For example, for a price of `US$ 1.45` pass `amount = 145`. See
  *   the *exp* parameter in
  *   [currencies.json](https://core.telegram.org/bots/payments/currencies.json), it
  *   shows the number of digits past the decimal point for each currency (2 for the
  *   majority of currencies).
  * @property {string} invoice_payload Bot specified invoice payload
  * @property {string} [shipping_option_id] *Optional*. Identifier of the shipping option chosen by the user
  * @property {OrderInfo} [order_info] *Optional*. Order information provided by the user
  * @property {string} telegram_payment_charge_id Telegram payment identifier
  * @property {string} provider_payment_charge_id Provider payment identifier
  * @see https://core.telegram.org/bots/api/#successfulpayment
*/

/**
  * This object contains information about an incoming shipping query.
  *
  * @typedef {object} ShippingQuery
  * @property {string} id Unique query identifier
  * @property {User} from User who sent the query
  * @property {string} invoice_payload Bot specified invoice payload
  * @property {ShippingAddress} shipping_address User specified shipping address
  * @see https://core.telegram.org/bots/api/#shippingquery
*/

/**
  * This object contains information about an incoming pre-checkout query.
  *
  * @typedef {object} PreCheckoutQuery
  * @property {string} id Unique query identifier
  * @property {User} from User who sent the query
  * @property {string} currency Three-letter ISO 4217
  *   [currency](https://core.telegram.org/bots/payments#supported-currencies) code
  * @property {number} total_amount Total price in the *smallest units* of the currency (integer, **not**
  *   float/double). For example, for a price of `US$ 1.45` pass `amount = 145`. See
  *   the *exp* parameter in
  *   [currencies.json](https://core.telegram.org/bots/payments/currencies.json), it
  *   shows the number of digits past the decimal point for each currency (2 for the
  *   majority of currencies).
  * @property {string} invoice_payload Bot specified invoice payload
  * @property {string} [shipping_option_id] *Optional*. Identifier of the shipping option chosen by the user
  * @property {OrderInfo} [order_info] *Optional*. Order information provided by the user
  * @see https://core.telegram.org/bots/api/#precheckoutquery
*/

/**
  * Describes Telegram Passport data shared with the bot by the user.
  *
  * @typedef {object} PassportData
  * @property {EncryptedPassportElement[]} data Array with information about documents and other Telegram Passport elements that
  *   was shared with the bot
  * @property {EncryptedCredentials} credentials Encrypted credentials required to decrypt the data
  * @see https://core.telegram.org/bots/api/#passportdata
*/

/**
  * This object represents a file uploaded to Telegram Passport. Currently all Telegram Passport files
  * are in JPEG format when decrypted and don't exceed 10MB.
  *
  * @typedef {object} PassportFile
  * @property {string} file_id Identifier for this file, which can be used to download or reuse the file
  * @property {string} file_unique_id Unique identifier for this file, which is supposed to be the same over time and
  *   for different bots. Can't be used to download or reuse the file.
  * @property {number} file_size File size in bytes
  * @property {number} file_date Unix time when the file was uploaded
  * @see https://core.telegram.org/bots/api/#passportfile
*/

/**
  * Describes documents or other Telegram Passport elements shared with the bot by the user.
  *
  * @typedef {object} EncryptedPassportElement
  * @property {'personal_details'|'passport'|'driver_license'|'identity_card'|'internal_passport'|'address'|'utility_bill'|'bank_statement'|'rental_agreement'|'passport_registration'|'temporary_registration'|'phone_number'|'email'} type Element type. One of “personal\_details”, “passport”, “driver\_license”,
  *   “identity\_card”, “internal\_passport”, “address”, “utility\_bill”,
  *   “bank\_statement”, “rental\_agreement”, “passport\_registration”,
  *   “temporary\_registration”, “phone\_number”, “email”.
  * @property {string} [data] *Optional*. Base64-encoded encrypted Telegram Passport element data provided by
  *   the user, available for “personal\_details”, “passport”, “driver\_license”,
  *   “identity\_card”, “internal\_passport” and “address” types. Can be decrypted and
  *   verified using the accompanying
  *   [EncryptedCredentials](https://core.telegram.org/bots/api/#encryptedcredentials).
  * @property {string} [phone_number] *Optional*. User's verified phone number, available only for “phone\_number”
  *   type
  * @property {string} [email] *Optional*. User's verified email address, available only for “email” type
  * @property {PassportFile[]} [files] *Optional*. Array of encrypted files with documents provided by the user,
  *   available for “utility\_bill”, “bank\_statement”, “rental\_agreement”,
  *   “passport\_registration” and “temporary\_registration” types. Files can be
  *   decrypted and verified using the accompanying
  *   [EncryptedCredentials](https://core.telegram.org/bots/api/#encryptedcredentials).
  * @property {PassportFile} [front_side] *Optional*. Encrypted file with the front side of the document, provided by the
  *   user. Available for “passport”, “driver\_license”, “identity\_card” and
  *   “internal\_passport”. The file can be decrypted and verified using the
  *   accompanying
  *   [EncryptedCredentials](https://core.telegram.org/bots/api/#encryptedcredentials).
  * @property {PassportFile} [reverse_side] *Optional*. Encrypted file with the reverse side of the document, provided by
  *   the user. Available for “driver\_license” and “identity\_card”. The file can be
  *   decrypted and verified using the accompanying
  *   [EncryptedCredentials](https://core.telegram.org/bots/api/#encryptedcredentials).
  * @property {PassportFile} [selfie] *Optional*. Encrypted file with the selfie of the user holding a document,
  *   provided by the user; available for “passport”, “driver\_license”,
  *   “identity\_card” and “internal\_passport”. The file can be decrypted and
  *   verified using the accompanying
  *   [EncryptedCredentials](https://core.telegram.org/bots/api/#encryptedcredentials).
  * @property {PassportFile[]} [translation] *Optional*. Array of encrypted files with translated versions of documents
  *   provided by the user. Available if requested for “passport”, “driver\_license”,
  *   “identity\_card”, “internal\_passport”, “utility\_bill”, “bank\_statement”,
  *   “rental\_agreement”, “passport\_registration” and “temporary\_registration”
  *   types. Files can be decrypted and verified using the accompanying
  *   [EncryptedCredentials](https://core.telegram.org/bots/api/#encryptedcredentials).
  * @property {string} hash Base64-encoded element hash for using in
  *   [PassportElementErrorUnspecified](https://core.telegram.org/bots/api/#passportelementerrorunspecified)
  * @see https://core.telegram.org/bots/api/#encryptedpassportelement
*/

/**
  * Describes data required for decrypting and authenticating
  * [EncryptedPassportElement](https://core.telegram.org/bots/api/#encryptedpassportelement)
  *. See the
  * [Telegram Passport Documentation](https://core.telegram.org/passport#receiving-information)
  * for a
  * complete description of the data decryption and authentication processes.
  *
  * @typedef {object} EncryptedCredentials
  * @property {string} data Base64-encoded encrypted JSON-serialized data with unique user's payload, data
  *   hashes and secrets required for
  *   [EncryptedPassportElement](https://core.telegram.org/bots/api/#encryptedpassportelement)
  *   decryption and authentication
  * @property {string} hash Base64-encoded data hash for data authentication
  * @property {string} secret Base64-encoded secret, encrypted with the bot's public RSA key, required for
  *   data decryption
  * @see https://core.telegram.org/bots/api/#encryptedcredentials
*/

/**
  * This object represents an error in the Telegram Passport element which was submitted that should be
  * resolved by the user. It should be one of:
  *
  * [PassportElementErrorDataField](https://core.telegram.org/bots/api/#passportelementerrordatafield)
  *
  * [PassportElementErrorFrontSide](https://core.telegram.org/bots/api/#passportelementerrorfrontside)
  *
  * [PassportElementErrorReverseSide](https://core.telegram.org/bots/api/#passportelementerrorreverseside)
  *
  * [PassportElementErrorSelfie](https://core.telegram.org/bots/api/#passportelementerrorselfie)
  *
  * [PassportElementErrorFile](https://core.telegram.org/bots/api/#passportelementerrorfile)
  *
  * [PassportElementErrorFiles](https://core.telegram.org/bots/api/#passportelementerrorfiles)
  *
  * [PassportElementErrorTranslationFile](https://core.telegram.org/bots/api/#passportelementerrortranslationfile)
  *
  * [PassportElementErrorTranslationFiles](https://core.telegram.org/bots/api/#passportelementerrortranslationfiles)
  *
  * [PassportElementErrorUnspecified](https://core.telegram.org/bots/api/#passportelementerrorunspecified)
  *
  *
  * @typedef {PassportElementErrorDataField|PassportElementErrorFrontSide|PassportElementErrorReverseSide|PassportElementErrorSelfie|PassportElementErrorFile|PassportElementErrorFiles|PassportElementErrorTranslationFile|PassportElementErrorTranslationFiles|PassportElementErrorUnspecified} PassportElementError
  * @see https://core.telegram.org/bots/api/#passportelementerror
*/

/**
  * Represents an issue in one of the data fields that was provided by the user. The error is considered
  * resolved when the field's value changes.
  *
  * @typedef {object} PassportElementErrorDataField
  * @property {'data'} source Error source, must be *data*
  * @property {'personal_details'|'passport'|'driver_license'|'identity_card'|'internal_passport'|'address'} type The section of the user's Telegram Passport which has the error, one of
  *   “personal\_details”, “passport”, “driver\_license”, “identity\_card”,
  *   “internal\_passport”, “address”
  * @property {string} field_name Name of the data field which has the error
  * @property {string} data_hash Base64-encoded data hash
  * @property {string} message Error message
  * @see https://core.telegram.org/bots/api/#passportelementerrordatafield
*/

/**
  * Represents an issue with the front side of a document. The error is considered resolved when the
  * file with the front side of the document changes.
  *
  * @typedef {object} PassportElementErrorFrontSide
  * @property {'front_side'} source Error source, must be *front\_side*
  * @property {'passport'|'driver_license'|'identity_card'|'internal_passport'} type The section of the user's Telegram Passport which has the issue, one of
  *   “passport”, “driver\_license”, “identity\_card”, “internal\_passport”
  * @property {string} file_hash Base64-encoded hash of the file with the front side of the document
  * @property {string} message Error message
  * @see https://core.telegram.org/bots/api/#passportelementerrorfrontside
*/

/**
  * Represents an issue with the reverse side of a document. The error is considered resolved when the
  * file with reverse side of the document changes.
  *
  * @typedef {object} PassportElementErrorReverseSide
  * @property {'reverse_side'} source Error source, must be *reverse\_side*
  * @property {'driver_license'|'identity_card'} type The section of the user's Telegram Passport which has the issue, one of
  *   “driver\_license”, “identity\_card”
  * @property {string} file_hash Base64-encoded hash of the file with the reverse side of the document
  * @property {string} message Error message
  * @see https://core.telegram.org/bots/api/#passportelementerrorreverseside
*/

/**
  * Represents an issue with the selfie with a document. The error is considered resolved when the file
  * with the selfie changes.
  *
  * @typedef {object} PassportElementErrorSelfie
  * @property {'selfie'} source Error source, must be *selfie*
  * @property {'passport'|'driver_license'|'identity_card'|'internal_passport'} type The section of the user's Telegram Passport which has the issue, one of
  *   “passport”, “driver\_license”, “identity\_card”, “internal\_passport”
  * @property {string} file_hash Base64-encoded hash of the file with the selfie
  * @property {string} message Error message
  * @see https://core.telegram.org/bots/api/#passportelementerrorselfie
*/

/**
  * Represents an issue with a document scan. The error is considered resolved when the file with the
  * document scan changes.
  *
  * @typedef {object} PassportElementErrorFile
  * @property {'file'} source Error source, must be *file*
  * @property {'utility_bill'|'bank_statement'|'rental_agreement'|'passport_registration'|'temporary_registration'} type The section of the user's Telegram Passport which has the issue, one of
  *   “utility\_bill”, “bank\_statement”, “rental\_agreement”,
  *   “passport\_registration”, “temporary\_registration”
  * @property {string} file_hash Base64-encoded file hash
  * @property {string} message Error message
  * @see https://core.telegram.org/bots/api/#passportelementerrorfile
*/

/**
  * Represents an issue with a list of scans. The error is considered resolved when the list of files
  * containing the scans changes.
  *
  * @typedef {object} PassportElementErrorFiles
  * @property {'files'} source Error source, must be *files*
  * @property {'utility_bill'|'bank_statement'|'rental_agreement'|'passport_registration'|'temporary_registration'} type The section of the user's Telegram Passport which has the issue, one of
  *   “utility\_bill”, “bank\_statement”, “rental\_agreement”,
  *   “passport\_registration”, “temporary\_registration”
  * @property {string[]} file_hashes List of base64-encoded file hashes
  * @property {string} message Error message
  * @see https://core.telegram.org/bots/api/#passportelementerrorfiles
*/

/**
  * Represents an issue with one of the files that constitute the translation of a document. The error
  * is considered resolved when the file changes.
  *
  * @typedef {object} PassportElementErrorTranslationFile
  * @property {'translation_file'} source Error source, must be *translation\_file*
  * @property {'passport'|'driver_license'|'identity_card'|'internal_passport'|'utility_bill'|'bank_statement'|'rental_agreement'|'passport_registration'|'temporary_registration'} type Type of element of the user's Telegram Passport which has the issue, one of
  *   “passport”, “driver\_license”, “identity\_card”, “internal\_passport”,
  *   “utility\_bill”, “bank\_statement”, “rental\_agreement”,
  *   “passport\_registration”, “temporary\_registration”
  * @property {string} file_hash Base64-encoded file hash
  * @property {string} message Error message
  * @see https://core.telegram.org/bots/api/#passportelementerrortranslationfile
*/

/**
  * Represents an issue with the translated version of a document. The error is considered resolved when
  * a file with the document translation change.
  *
  * @typedef {object} PassportElementErrorTranslationFiles
  * @property {'translation_files'} source Error source, must be *translation\_files*
  * @property {'passport'|'driver_license'|'identity_card'|'internal_passport'|'utility_bill'|'bank_statement'|'rental_agreement'|'passport_registration'|'temporary_registration'} type Type of element of the user's Telegram Passport which has the issue, one of
  *   “passport”, “driver\_license”, “identity\_card”, “internal\_passport”,
  *   “utility\_bill”, “bank\_statement”, “rental\_agreement”,
  *   “passport\_registration”, “temporary\_registration”
  * @property {string[]} file_hashes List of base64-encoded file hashes
  * @property {string} message Error message
  * @see https://core.telegram.org/bots/api/#passportelementerrortranslationfiles
*/

/**
  * Represents an issue in an unspecified place. The error is considered resolved when new data is
  * added.
  *
  * @typedef {object} PassportElementErrorUnspecified
  * @property {'unspecified'} source Error source, must be *unspecified*
  * @property {string} type Type of element of the user's Telegram Passport which has the issue
  * @property {string} element_hash Base64-encoded element hash
  * @property {string} message Error message
  * @see https://core.telegram.org/bots/api/#passportelementerrorunspecified
*/

/**
  * This object represents a game. Use BotFather to create and edit games, their short names will act as
  * unique identifiers.
  *
  * @typedef {object} Game
  * @property {string} title Title of the game
  * @property {string} description Description of the game
  * @property {PhotoSize[]} photo Photo that will be displayed in the game message in chats.
  * @property {string} [text] *Optional*. Brief description of the game or high scores included in the game
  *   message. Can be automatically edited to include current high scores for the game
  *   when the bot calls
  *   [setGameScore](https://core.telegram.org/bots/api/#setgamescore), or manually
  *   edited using
  *   [editMessageText](https://core.telegram.org/bots/api/#editmessagetext). 0-4096
  *   characters.
  * @property {MessageEntity[]} [text_entities] *Optional*. Special entities that appear in *text*, such as usernames, URLs, bot
  *   commands, etc.
  * @property {Animation} [animation] *Optional*. Animation that will be displayed in the game message in chats.
  *   Upload via [BotFather](https://t.me/botfather)
  * @see https://core.telegram.org/bots/api/#game
*/

/**
  * A placeholder, currently holds no information. Use [BotFather](https://t.me/botfather)
  * to set up
  * your game.
  *
  * @typedef {*} CallbackGame
  * @see https://core.telegram.org/bots/api/#callbackgame
*/

/**
  * This object represents one row of the high scores table for a game.
  *
  * @typedef {object} GameHighScore
  * @property {number} position Position in high score table for the game
  * @property {User} user User
  * @property {number} score Score
  * @see https://core.telegram.org/bots/api/#gamehighscore
*/

/* other */

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
 * @typedef {'mention'|'hashtag'|'cashtag'|'bot_command'|'url'|'email'|'phone_number'|'bold'|'italic'|'underline'|'strikethrough'|'spoiler'|'code'|'pre'|'text_link'|'text_mention'|'custom_emoji'} MessageEntityType
 */

/**
 * @typedef {
 *   'private'|'group'|'supergroup'|'channel'
 * } ChatType
 */

/**
 * @typedef {
 *   'creator'|'administrator'|'member'|'restricted'|'left'|'kicked'
 * } ChatMemberStatus
 */

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

/**
 * @typedef {object} ContextOptions
 * @property {boolean} channelMode Enable / Disable channel mode, you can find more information about this
 *    in Opengram constructor options type
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
 * @property {number} [message_thread_id] Unique identifier of a message thread to which the message belongs; for supergroups only
 * @property {object} [reply_markup] Additional interface options. A object for an inline keyboard,
 *    custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user.
 */

/** @typedef {Buffer|stream|string} attachmentFile **/

/**
 * @typedef {object} stickerExtraParams
 * @property {boolean} [disable_notification] Sends the message
 *    [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive
 *    a notification with no sound.
 * @property {number} [message_thread_id] Unique identifier of a message thread to which the message belongs; for supergroups only
 * @property {boolean} [protect_content] Protects the contents of the forwarded message from forwarding and saving
 */


/**
 * @typedef {object} forwardExtraParams
 * @property {boolean} [disable_notification] Sends the message
 *    [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive
 *    a notification with no sound.
 * @property {number} [message_thread_id] Unique identifier of a message thread to which the message belongs; for supergroups only
 * @property {boolean} [protect_content] Protects the contents of the forwarded message from forwarding and saving
 */

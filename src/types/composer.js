/**
 * @typedef {Function} MiddlewareFn
 */

/**
 * @typedef {MiddlewareFn|object} Middleware
 */

/**
 * @typedef {
    "callback_query" | "channel_post" | "chosen_inline_result" | "edited_channel_post" | "edited_message" |
    "inline_query" | "shipping_query" | "pre_checkout_query" | "message" | "poll" | "poll_answer" |
    "my_chat_member" | "chat_member" | "chat_join_request"
 } UpdateType
 */

/**
 * @typedef {
     "voice" | "video_note" | "video" | "animation" | "venue" | "text" | "supergroup_chat_created" |
     "successful_payment" | "sticker" | "pinned_message" | "photo" | "new_chat_title" | "new_chat_photo" |
     "new_chat_members" | "migrate_to_chat_id" | "migrate_from_chat_id" | "location" | "left_chat_member" | "invoice" |
     "group_chat_created" | "game" | "dice" | "document" | "delete_chat_photo" | "contact" | "channel_chat_created" |
     "audio" | "connected_website" | "passport_data" | "poll" | "forward_date" | "message_auto_delete_timer_changed" |
     "video_chat_started" | "video_chat_ended" | "video_chat_participants_invited" | "video_chat_scheduled" |
     "web_app_data" | "forum_topic_created" | "forum_topic_closed" | "forum_topic_reopened"
 } UpdateSubtype
 */

/**
 * @typedef {Function} PredicateFn
 * @param {OpengramContext} context Update context
 * @return {boolean|Promise<boolean>}
 */

/**
 * @callback TriggerPredicateFn
 * @param {string} value Received value
 * @param {OpengramContext} context Update context
 * @return {*}
 */

/**
 * @callback EntityPredicateFn
 * @param {MessageEntity} entityObject Entity object
 * @param {string} entityText Entity text
 * @param {OpengramContext} context Update context
 * @return {boolean}
 */

/**
 * @typedef {EntityPredicateFn|MessageEntityType} EntityPredicate
 */

/**
 * @typedef {RegExp|string|TriggerPredicateFn} Trigger
 */

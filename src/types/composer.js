/**
 * @typedef {function|object} MiddlewareFn
 */

/**
 * @typedef {
    "text" | "callback_query" | "message" | "channel_post" | "chat_member" | "chosen_inline_result" |
    "edited_channel_post" | "edited_message" | "inline_query" | "my_chat_member" | "pre_checkout_query" |
    "poll_answer" | "poll" | "shipping_query" | "chat_join_request" | "channel_chat_created" |
    "connected_website" | "delete_chat_photo" | "group_chat_created" | "invoice" | "left_chat_member" |
    "message_auto_delete_timer_changed" | "migrate_from_chat_id" | "migrate_to_chat_id" | "new_chat_members" |
    "new_chat_photo" | "new_chat_title" | "passport_data" | "proximity_alert_triggered" | "pinned_message" |
    "successful_payment" | "supergroup_chat_created" | "video_chat_scheduled" | "video_chat_started" |
    "video_chat_ended" | "video_chat_participants_invited" | "web_app_data" | "forward_date" |
    "animation" | "document" | "audio" | "contact" | "dice" | "game" | "location" | "photo" | "sticker" |
    "venue" | "video" | "video_note" | "voice" | "voice_chat_started" | "voice_chat_ended" |
    "voice_chat_participants_invited" | "voice_chat_scheduled" | video_chat_scheduled | "video_chat_started" |
    "video_chat_ended" | "web_app_data"
 } updateType
 */

/**
 * @typedef {function} PredicateFn
 * @param {OpengramContext} context Update context
 * @return {boolean|Promise<boolean>}
 */

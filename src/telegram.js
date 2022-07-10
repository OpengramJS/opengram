const replicators = require('./core/replicators')
const ApiClient = require('./core/network/client')
const { isAbsolute } = require('path')

class Telegram extends ApiClient {
  getMe () {
    return this.callApi('getMe')
  }

  getFile (fileId) {
    return this.callApi('getFile', { file_id: fileId })
  }

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

  getUpdates (timeout, limit, offset, allowedUpdates) {
    const url = `getUpdates?offset=${offset}&limit=${limit}&timeout=${timeout}`
    return this.callApi(url, {
      allowed_updates: allowedUpdates
    })
  }

  getWebhookInfo () {
    return this.callApi('getWebhookInfo')
  }

  getGameHighScores (userId, inlineMessageId, chatId, messageId) {
    return this.callApi('getGameHighScores', {
      user_id: userId,
      inline_message_id: inlineMessageId,
      chat_id: chatId,
      message_id: messageId
    })
  }

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

  setWebhook (url, extra) {
    return this.callApi('setWebhook', { url, ...extra })
  }

  deleteWebhook (extra) {
    return this.callApi('deleteWebhook', extra)
  }

  sendMessage (chatId, text, extra) {
    return this.callApi('sendMessage', { chat_id: chatId, text, ...extra })
  }

  forwardMessage (chatId, fromChatId, messageId, extra) {
    return this.callApi('forwardMessage', {
      chat_id: chatId,
      from_chat_id: fromChatId,
      message_id: messageId,
      ...extra
    })
  }

  sendChatAction (chatId, action) {
    return this.callApi('sendChatAction', { chat_id: chatId, action })
  }

  getUserProfilePhotos (userId, offset, limit) {
    return this.callApi('getUserProfilePhotos', { user_id: userId, offset, limit })
  }

  sendLocation (chatId, latitude, longitude, extra) {
    return this.callApi('sendLocation', { chat_id: chatId, latitude, longitude, ...extra })
  }

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

  sendInvoice (chatId, invoice, extra) {
    return this.callApi('sendInvoice', { chat_id: chatId, ...invoice, ...extra })
  }

  sendContact (chatId, phoneNumber, firstName, extra) {
    return this.callApi('sendContact', { chat_id: chatId, phone_number: phoneNumber, first_name: firstName, ...extra })
  }

  sendPhoto (chatId, photo, extra) {
    return this.callApi('sendPhoto', { chat_id: chatId, photo, ...extra })
  }

  sendDice (chatId, extra) {
    return this.callApi('sendDice', { chat_id: chatId, ...extra })
  }

  sendDocument (chatId, document, extra) {
    return this.callApi('sendDocument', { chat_id: chatId, document, ...extra })
  }

  sendAudio (chatId, audio, extra) {
    return this.callApi('sendAudio', { chat_id: chatId, audio, ...extra })
  }

  sendSticker (chatId, sticker, extra) {
    return this.callApi('sendSticker', { chat_id: chatId, sticker, ...extra })
  }

  sendVideo (chatId, video, extra) {
    return this.callApi('sendVideo', { chat_id: chatId, video, ...extra })
  }

  sendAnimation (chatId, animation, extra) {
    return this.callApi('sendAnimation', { chat_id: chatId, animation, ...extra })
  }

  sendVideoNote (chatId, videoNote, extra) {
    return this.callApi('sendVideoNote', { chat_id: chatId, video_note: videoNote, ...extra })
  }

  sendVoice (chatId, voice, extra) {
    return this.callApi('sendVoice', { chat_id: chatId, voice, ...extra })
  }

  sendGame (chatId, gameName, extra) {
    return this.callApi('sendGame', { chat_id: chatId, game_short_name: gameName, ...extra })
  }

  sendMediaGroup (chatId, media, extra) {
    return this.callApi('sendMediaGroup', { chat_id: chatId, media, ...extra })
  }

  sendPoll (chatId, question, options, extra) {
    return this.callApi('sendPoll', { chat_id: chatId, type: 'regular', question, options, ...extra })
  }

  sendQuiz (chatId, question, options, extra) {
    return this.callApi('sendPoll', { chat_id: chatId, type: 'quiz', question, options, ...extra })
  }

  stopPoll (chatId, messageId, extra) {
    return this.callApi('stopPoll', { chat_id: chatId, message_id: messageId, ...extra })
  }

  getChat (chatId) {
    return this.callApi('getChat', { chat_id: chatId })
  }

  getChatAdministrators (chatId) {
    return this.callApi('getChatAdministrators', { chat_id: chatId })
  }

  getChatMember (chatId, userId) {
    return this.callApi('getChatMember', { chat_id: chatId, user_id: userId })
  }

  getChatMembersCount (chatId) {
    return this.callApi('getChatMemberCount', { chat_id: chatId })
  }

  getChatMemberCount (chatId) {
    return this.callApi('getChatMemberCount', { chat_id: chatId })
  }

  answerInlineQuery (inlineQueryId, results, extra) {
    return this.callApi('answerInlineQuery', { inline_query_id: inlineQueryId, results, ...extra })
  }

  setChatPermissions (chatId, permissions) {
    return this.callApi('setChatPermissions', { chat_id: chatId, permissions })
  }

  banChatMember (chatId, userId, extra) {
    return this.callApi('banChatMember', { chat_id: chatId, user_id: userId, ...extra })
  }

  kickChatMember (chatId, userId, untilDate, extra) {
    return this.callApi('banChatMember', { chat_id: chatId, user_id: userId, until_date: untilDate, ...extra })
  }

  promoteChatMember (chatId, userId, extra) {
    return this.callApi('promoteChatMember', { chat_id: chatId, user_id: userId, ...extra })
  }

  restrictChatMember (chatId, userId, extra) {
    return this.callApi('restrictChatMember', { chat_id: chatId, user_id: userId, ...extra })
  }

  banChatSenderChat (chatId, senderChatId) {
    return this.callApi('banChatSenderChat', { chat_id: chatId, sender_chat_id: senderChatId })
  }

  unbanChatSenderChat (chatId, senderChatId) {
    return this.callApi('unbanChatSenderChat', { chat_id: chatId, sender_chat_id: senderChatId })
  }

  setChatAdministratorCustomTitle (chatId, userId, title) {
    return this.callApi('setChatAdministratorCustomTitle', { chat_id: chatId, user_id: userId, custom_title: title })
  }

  exportChatInviteLink (chatId) {
    return this.callApi('exportChatInviteLink', { chat_id: chatId })
  }

  setChatPhoto (chatId, photo) {
    return this.callApi('setChatPhoto', { chat_id: chatId, photo })
  }

  deleteChatPhoto (chatId) {
    return this.callApi('deleteChatPhoto', { chat_id: chatId })
  }

  setChatTitle (chatId, title) {
    return this.callApi('setChatTitle', { chat_id: chatId, title })
  }

  setChatDescription (chatId, description) {
    return this.callApi('setChatDescription', { chat_id: chatId, description })
  }

  pinChatMessage (chatId, messageId, extra) {
    return this.callApi('pinChatMessage', { chat_id: chatId, message_id: messageId, ...extra })
  }

  unpinChatMessage (chatId, extra) {
    return this.callApi('unpinChatMessage', { chat_id: chatId, ...extra })
  }

  unpinAllChatMessages (chatId) {
    return this.callApi('unpinAllChatMessages', { chat_id: chatId })
  }

  leaveChat (chatId) {
    return this.callApi('leaveChat', { chat_id: chatId })
  }

  unbanChatMember (chatId, userId, extra) {
    return this.callApi('unbanChatMember', { chat_id: chatId, user_id: userId, ...extra })
  }

  answerCbQuery (callbackQueryId, text, showAlert, extra) {
    return this.callApi('answerCallbackQuery', {
      text,
      show_alert: showAlert,
      callback_query_id: callbackQueryId,
      ...extra
    })
  }

  answerGameQuery (callbackQueryId, url) {
    return this.callApi('answerCallbackQuery', {
      url,
      callback_query_id: callbackQueryId
    })
  }

  answerShippingQuery (shippingQueryId, ok, shippingOptions, errorMessage) {
    return this.callApi('answerShippingQuery', {
      ok,
      shipping_query_id: shippingQueryId,
      shipping_options: shippingOptions,
      error_message: errorMessage
    })
  }

  answerPreCheckoutQuery (preCheckoutQueryId, ok, errorMessage) {
    return this.callApi('answerPreCheckoutQuery', {
      ok,
      pre_checkout_query_id: preCheckoutQueryId,
      error_message: errorMessage
    })
  }

  editMessageText (chatId, messageId, inlineMessageId, text, extra) {
    return this.callApi('editMessageText', {
      text,
      chat_id: chatId,
      message_id: messageId,
      inline_message_id: inlineMessageId,
      ...extra
    })
  }

  editMessageCaption (chatId, messageId, inlineMessageId, caption, extra) {
    return this.callApi('editMessageCaption', {
      caption,
      chat_id: chatId,
      message_id: messageId,
      inline_message_id: inlineMessageId,
      ...extra
    })
  }

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

  editMessageReplyMarkup (chatId, messageId, inlineMessageId, extra) {
    return this.callApi('editMessageReplyMarkup', {
      chat_id: chatId,
      message_id: messageId,
      inline_message_id: inlineMessageId,
      ...extra
    })
  }

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

  stopMessageLiveLocation (chatId, messageId, inlineMessageId, extra) {
    return this.callApi('stopMessageLiveLocation', {
      chat_id: chatId,
      message_id: messageId,
      inline_message_id: inlineMessageId,
      ...extra
    })
  }

  deleteMessage (chatId, messageId) {
    return this.callApi('deleteMessage', {
      chat_id: chatId,
      message_id: messageId
    })
  }

  setChatStickerSet (chatId, setName) {
    return this.callApi('setChatStickerSet', {
      chat_id: chatId,
      sticker_set_name: setName
    })
  }

  deleteChatStickerSet (chatId) {
    return this.callApi('deleteChatStickerSet', { chat_id: chatId })
  }

  getStickerSet (name) {
    return this.callApi('getStickerSet', { name })
  }

  uploadStickerFile (ownerId, stickerFile) {
    return this.callApi('uploadStickerFile', {
      user_id: ownerId,
      png_sticker: stickerFile
    })
  }

  createNewStickerSet (ownerId, name, title, stickerData) {
    return this.callApi('createNewStickerSet', {
      name,
      title,
      user_id: ownerId,
      ...stickerData
    })
  }

  addStickerToSet (ownerId, name, stickerData, isMasks) {
    return this.callApi('addStickerToSet', {
      name,
      user_id: ownerId,
      is_masks: isMasks,
      ...stickerData
    })
  }

  setStickerPositionInSet (sticker, position) {
    return this.callApi('setStickerPositionInSet', {
      sticker,
      position
    })
  }

  setStickerSetThumb (name, userId, thumb) {
    return this.callApi('setStickerSetThumb', { name, user_id: userId, thumb })
  }

  deleteStickerFromSet (sticker) {
    return this.callApi('deleteStickerFromSet', { sticker })
  }

  getMyCommands (extra) {
    return this.callApi('getMyCommands', extra)
  }

  setMyCommands (commands, extra) {
    return this.callApi('setMyCommands', { commands, ...extra })
  }

  deleteMyCommands (extra) {
    return this.callApi('deleteMyCommands', extra)
  }

  setPassportDataErrors (userId, errors) {
    return this.callApi('setPassportDataErrors', {
      user_id: userId,
      errors
    })
  }

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

  copyMessage (chatId, fromChatId, messageId, extra) {
    return this.callApi('copyMessage', {
      chat_id: chatId,
      from_chat_id: fromChatId,
      message_id: messageId,
      ...extra
    })
  }

  createChatInviteLink (chatId, extra) {
    return this.callApi('createChatInviteLink', {
      chat_id: chatId,
      ...extra
    })
  }

  editChatInviteLink (chatId, inviteLink, extra) {
    return this.callApi('editChatInviteLink', {
      chat_id: chatId,
      invite_link: inviteLink,
      ...extra
    })
  }

  revokeChatInviteLink (chatId, inviteLink) {
    return this.callApi('revokeChatInviteLink', {
      chat_id: chatId,
      invite_link: inviteLink
    })
  }

  approveChatJoinRequest (chatId, userId) {
    return this.callApi('approveChatJoinRequest', {
      chat_id: chatId,
      user_id: userId
    })
  }

  declineChatJoinRequest (chatId, userId) {
    return this.callApi('declineChatJoinRequest', {
      chat_id: chatId,
      user_id: userId
    })
  }
}

module.exports = Telegram

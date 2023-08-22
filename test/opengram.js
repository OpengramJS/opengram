const test = require('ava')
const { session } = require('../')
const { createBot } = require('./utils')

class MockResponse {
  constructor () {
    this.writableEnded = false
    this.statusCode = 200
  }

  setHeader () {}
  end (body, encoding, cb) {
    this.writableEnded = true
    this.body = body
    cb && cb()
  }
}

class MockRequest {
  constructor (path, method, headers, data) {
    this._path = path
    this._method = method
    this._headers = headers
    this._data = data
  }

  get url () {
    return this._path
  }

  get headers () {
    return this._headers
  }

  get body () {
    return this._data
  }

  get method () {
    return this._method
  }
}

const BaseTextMessage = {
  chat: { id: 1 },
  text: 'foo'
}

const UpdateTypes = [
  { type: 'shipping_query', prop: 'shippingQuery', update: { shipping_query: {} } },
  { type: 'message', prop: 'message', update: { message: BaseTextMessage } },
  { type: 'edited_message', prop: 'editedMessage', update: { edited_message: BaseTextMessage } },
  { type: 'callback_query', prop: 'callbackQuery', update: { callback_query: { message: BaseTextMessage } } },
  { type: 'inline_query', prop: 'inlineQuery', update: { inline_query: {} } },
  { type: 'channel_post', prop: 'channelPost', update: { channel_post: BaseTextMessage } },
  { type: 'pre_checkout_query', prop: 'preCheckoutQuery', update: { pre_checkout_query: {} } },
  { type: 'edited_channel_post', prop: 'editedChannelPost', update: { edited_channel_post: {} } },
  { type: 'chosen_inline_result', prop: 'chosenInlineResult', update: { chosen_inline_result: {} } },
  { type: 'poll', prop: 'poll', update: { poll: {} } },
  { type: 'poll_answer', prop: 'pollAnswer', update: { poll_answer: {} } },
  { type: 'my_chat_member', prop: 'myChatMember', update: { my_chat_member: {} } },
  { type: 'chat_member', prop: 'chatMember', update: { chat_member: {} } },
  { type: 'chat_join_request', prop: 'chatJoinRequest', update: { chat_join_request: {} } }
]

UpdateTypes.forEach((update) => {
  test('should provide update payload for ' + update.type, async t => {
    const bot = createBot()
    bot.on(update.type, (ctx) => {
      t.true(update.prop in ctx)
      t.true('telegram' in ctx)
      t.true('updateType' in ctx)
      t.true('chat' in ctx)
      t.true('from' in ctx)
      t.true('state' in ctx)
      t.is(ctx.updateType, update.type)
    })
    await bot.handleUpdate(update.update)
  })
})

test('should provide update payload for text', async t => {
  const bot = createBot()
  bot.on('text', (ctx) => {
    t.true('telegram' in ctx)
    t.true('updateType' in ctx)
    t.true('updateSubTypes' in ctx)
    t.true('chat' in ctx)
    t.true('from' in ctx)
    t.true('state' in ctx)
    t.is(ctx.updateType, 'message')
  })
  await bot.handleUpdate({ message: BaseTextMessage })
})

test('should provide shortcuts for `message` update', async t => {
  const bot = createBot()
  bot.on('message', (ctx) => {
    t.true('anyMessage' in ctx)
    t.true('anyText' in ctx)
    t.true('anyEntities' in ctx)
    t.true('reply' in ctx)
    t.true('setPassportDataErrors' in ctx)
    t.true('replyWithPhoto' in ctx)
    t.true('replyWithMarkdown' in ctx)
    t.true('replyWithMarkdownV2' in ctx)
    t.true('replyWithHTML' in ctx)
    t.true('replyWithAudio' in ctx)
    t.true('replyWithDice' in ctx)
    t.true('replyWithDocument' in ctx)
    t.true('replyWithInvoice' in ctx)
    t.true('replyWithSticker' in ctx)
    t.true('replyWithVideo' in ctx)
    t.true('replyWithAnimation' in ctx)
    t.true('replyWithVideoNote' in ctx)
    t.true('replyWithVoice' in ctx)
    t.true('replyWithPoll' in ctx)
    t.true('replyWithQuiz' in ctx)
    t.true('stopPoll' in ctx)
    t.true('replyWithChatAction' in ctx)
    t.true('replyWithLocation' in ctx)
    t.true('replyWithVenue' in ctx)
    t.true('replyWithContact' in ctx)
    t.true('replyWithGame' in ctx)
    t.true('replyWithMediaGroup' in ctx)
    t.true('setChatPermissions' in ctx)
    t.true('banChatMember' in ctx)
    t.true('kickChatMember' in ctx)
    t.true('unbanChatMember' in ctx)
    t.true('promoteChatMember' in ctx)
    t.true('restrictChatMember' in ctx)
    t.true('getChat' in ctx)
    t.true('exportChatInviteLink' in ctx)
    t.true('banChatSenderChat' in ctx)
    t.true('unbanChatSenderChat' in ctx)
    t.true('setChatAdministratorCustomTitle' in ctx)
    t.true('setChatPhoto' in ctx)
    t.true('deleteChatPhoto' in ctx)
    t.true('setChatTitle' in ctx)
    t.true('setChatDescription' in ctx)
    t.true('pinChatMessage' in ctx)
    t.true('unpinChatMessage' in ctx)
    t.true('unpinAllChatMessages' in ctx)
    t.true('unpinAllGeneralForumTopicMessages' in ctx)
    t.true('leaveChat' in ctx)
    t.true('getChatAdministrators' in ctx)
    t.true('getChatMember' in ctx)
    t.true('getChatMembersCount' in ctx)
    t.true('getChatMemberCount' in ctx)
    t.true('setChatStickerSet' in ctx)
    t.true('deleteChatStickerSet' in ctx)
    t.true('getStickerSet' in ctx)
    t.true('uploadStickerFile' in ctx)
    t.true('createNewStickerSet' in ctx)
    t.true('addStickerToSet' in ctx)
    t.true('getMyCommands' in ctx)
    t.true('setMyCommands' in ctx)
    t.true('deleteMyCommands' in ctx)
    t.true('setStickerPositionInSet' in ctx)
    t.true('deleteStickerFromSet' in ctx)
    t.true('setStickerSetThumb' in ctx)
    t.true('editMessageText' in ctx)
    t.true('editMessageCaption' in ctx)
    t.true('editMessageMedia' in ctx)
    t.true('editMessageReplyMarkup' in ctx)
    t.true('editMessageLiveLocation' in ctx)
    t.true('stopMessageLiveLocation' in ctx)
    t.true('forwardMessage' in ctx)
    t.true('copyMessage' in ctx)
    t.true('createChatInviteLink' in ctx)
    t.true('editChatInviteLink' in ctx)
    t.true('revokeChatInviteLink' in ctx)
    t.true('approveChatJoinRequest' in ctx)
    t.true('declineChatJoinRequest' in ctx)
    t.true('getCustomEmojiStickers' in ctx)
    t.true('createInvoiceLink' in ctx)
    t.true('editGeneralForumTopic' in ctx)
    t.true('closeGeneralForumTopic' in ctx)
    t.true('createInvoiceLink' in ctx)
    t.true('hideGeneralForumTopic' in ctx)
    t.true('unhideGeneralForumTopic' in ctx)
  })
  await bot.handleUpdate({ message: BaseTextMessage })
})

test('should provide shortcuts for `callback_query` update', async t => {
  const bot = createBot()
  bot.on('callback_query', (ctx) => {
    t.true('anyMessage' in ctx)
    t.true('anyText' in ctx)
    t.true('anyEntities' in ctx)
    t.true('answerCbQuery' in ctx)
    t.true('answerGameQuery' in ctx)
    t.true('reply' in ctx)
    t.true('replyWithMarkdown' in ctx)
    t.true('replyWithHTML' in ctx)
    t.true('setPassportDataErrors' in ctx)
    t.true('replyWithPhoto' in ctx)
    t.true('replyWithAudio' in ctx)
    t.true('replyWithMediaGroup' in ctx)
    t.true('replyWithDice' in ctx)
    t.true('replyWithDocument' in ctx)
    t.true('replyWithInvoice' in ctx)
    t.true('replyWithSticker' in ctx)
    t.true('replyWithVideo' in ctx)
    t.true('replyWithAnimation' in ctx)
    t.true('replyWithVideoNote' in ctx)
    t.true('replyWithVoice' in ctx)
    t.true('replyWithPoll' in ctx)
    t.true('replyWithQuiz' in ctx)
    t.true('stopPoll' in ctx)
    t.true('replyWithChatAction' in ctx)
    t.true('replyWithLocation' in ctx)
    t.true('replyWithVenue' in ctx)
    t.true('replyWithContact' in ctx)
    t.true('banChatMember' in ctx)
    t.true('kickChatMember' in ctx)
    t.true('unbanChatMember' in ctx)
    t.true('promoteChatMember' in ctx)
    t.true('restrictChatMember' in ctx)
    t.true('getChat' in ctx)
    t.true('exportChatInviteLink' in ctx)
    t.true('banChatSenderChat' in ctx)
    t.true('unbanChatSenderChat' in ctx)
    t.true('setChatAdministratorCustomTitle' in ctx)
    t.true('setChatPhoto' in ctx)
    t.true('deleteChatPhoto' in ctx)
    t.true('setChatTitle' in ctx)
    t.true('setChatDescription' in ctx)
    t.true('pinChatMessage' in ctx)
    t.true('unpinChatMessage' in ctx)
    t.true('unpinAllChatMessages' in ctx)
    t.true('unpinAllGeneralForumTopicMessages' in ctx)
    t.true('leaveChat' in ctx)
    t.true('getChatAdministrators' in ctx)
    t.true('getChatMember' in ctx)
    t.true('getChatMembersCount' in ctx)
    t.true('getChatMemberCount' in ctx)
    t.true('setChatStickerSet' in ctx)
    t.true('setChatMenuButton' in ctx)
    t.true('getChatMenuButton' in ctx)
    t.true('setMyDefaultAdministratorRights' in ctx)
    t.true('getMyDefaultAdministratorRights' in ctx)
    t.true('deleteChatStickerSet' in ctx)
    t.true('deleteMessage' in ctx)
    t.true('uploadStickerFile' in ctx)
    t.true('createNewStickerSet' in ctx)
    t.true('addStickerToSet' in ctx)
    t.true('getMyCommands' in ctx)
    t.true('setMyCommands' in ctx)
    t.true('deleteMyCommands' in ctx)
    t.true('setStickerPositionInSet' in ctx)
    t.true('deleteStickerFromSet' in ctx)
    t.true('editMessageText' in ctx)
    t.true('editMessageCaption' in ctx)
    t.true('editMessageMedia' in ctx)
    t.true('editMessageReplyMarkup' in ctx)
    t.true('editMessageLiveLocation' in ctx)
    t.true('stopMessageLiveLocation' in ctx)
    t.true('forwardMessage' in ctx)
    t.true('copyMessage' in ctx)
    t.true('createChatInviteLink' in ctx)
    t.true('editChatInviteLink' in ctx)
    t.true('revokeChatInviteLink' in ctx)
    t.true('approveChatJoinRequest' in ctx)
    t.true('declineChatJoinRequest' in ctx)
    t.true('getCustomEmojiStickers' in ctx)
    t.true('createInvoiceLink' in ctx)
    t.true('createForumTopic' in ctx)
    t.true('editForumTopic' in ctx)
    t.true('closeForumTopic' in ctx)
    t.true('reopenForumTopic' in ctx)
    t.true('deleteForumTopic' in ctx)
    t.true('unpinAllForumTopicMessages' in ctx)
    t.true('editGeneralForumTopic' in ctx)
    t.true('closeGeneralForumTopic' in ctx)
    t.true('createInvoiceLink' in ctx)
    t.true('hideGeneralForumTopic' in ctx)
    t.true('unhideGeneralForumTopic' in ctx)
  })
  await bot.handleUpdate({ callback_query: BaseTextMessage })
})

test('should provide shortcuts for `shipping_query` update', async t => {
  const bot = createBot()
  bot.on('shipping_query', (ctx) => {
    t.true('answerShippingQuery' in ctx)
  })
  await bot.handleUpdate({ shipping_query: BaseTextMessage })
})

test('should provide shortcuts for `pre_checkout_query` update', async t => {
  const bot = createBot()
  bot.on('pre_checkout_query', (ctx) => {
    t.true('answerPreCheckoutQuery' in ctx)
  })
  await bot.handleUpdate({ pre_checkout_query: BaseTextMessage })
})

test('should provide chat and sender info', async t => {
  const bot = createBot()
  bot.on(['text', 'message'], ctx => {
    t.is(ctx.from.id, 42)
    t.is(ctx.chat.id, 1)
  })
  await bot.handleUpdate({ message: { ...BaseTextMessage, from: { id: 42 } } })
})

test('should provide shortcuts for `inline_query` update', async t => {
  const bot = createBot()
  bot.on('inline_query', ctx => {
    t.true('answerInlineQuery' in ctx)
  })
  await bot.handleUpdate({ inline_query: BaseTextMessage })
})

test('should provide subtype for `channel_post` update', async t => {
  const bot = createBot(undefined, { channelMode: true })
  bot.on('text', ctx => {
    t.is(ctx.channelPost.text, 'foo')
  })
  await bot.handleUpdate({ channel_post: BaseTextMessage })
})

test('should share state', async t => {
  const bot = createBot()
  bot.on('message', (ctx, next) => {
    ctx.state.answer = 41
    return next()
  }, (ctx, next) => {
    ctx.state.answer++
    return next()
  }, ctx => {
    t.is(ctx.state.answer, 42)
  })
  await bot.handleUpdate({ message: BaseTextMessage })
})

test('should store session state', t => {
  const bot = createBot()
  bot.use(session())
  bot.hears('calc', ctx => {
    t.true('session' in ctx)
    t.true('counter' in ctx.session)
    t.is(ctx.session.counter, 2)
  })
  bot.on('message', ctx => {
    t.true('session' in ctx)
    ctx.session.counter = ctx.session.counter || 0
    ctx.session.counter++
  })
  return bot.handleUpdate({ message: { ...BaseTextMessage, from: { id: 42 }, chat: { id: 42 } } })
    .then(() => bot.handleUpdate({ message: { ...BaseTextMessage, from: { id: 42 }, chat: { id: 42 } } }))
    .then(() => bot.handleUpdate({ message: { ...BaseTextMessage, from: { id: 100500 }, chat: { id: 42 } } }))
    .then(() => bot.handleUpdate({ message: { ...BaseTextMessage, from: { id: 42 }, chat: { id: 42 }, text: 'calc' } }))
})

test('should store session state with custom store', t => {
  const bot = createBot()
  const dummyStore = {}
  bot.use(session({
    store: {
      get: (key) => new Promise((resolve) => setTimeout(resolve, 100, dummyStore[key])),
      set: (key, value) => {
        return new Promise((resolve) => setTimeout(resolve, 100)).then(() => {
          dummyStore[key] = value
        })
      }
    }
  }))
  bot.hears('calc', ctx => {
    t.true('session' in ctx)
    t.true('counter' in ctx.session)
    t.is(dummyStore['42:42'].session.counter, 2)
  })
  bot.on('message', ctx => {
    t.true('session' in ctx)
    ctx.session.counter = ctx.session.counter || 0
    ctx.session.counter++
  })
  return bot.handleUpdate({ message: { ...BaseTextMessage, from: { id: 42 }, chat: { id: 42 } } })
    .then(() => bot.handleUpdate({ message: { ...BaseTextMessage, from: { id: 42 }, chat: { id: 42 } } }))
    .then(() => bot.handleUpdate({ message: { ...BaseTextMessage, from: { id: 100500 }, chat: { id: 42 } } }))
    .then(() => bot.handleUpdate({ message: { ...BaseTextMessage, from: { id: 42 }, chat: { id: 42 }, text: 'calc' } }))
})

test('should throw error on read / write session when key not defined', async t => {
  await t.throwsAsync(
    new Promise((resolve, reject) => {
      const bot = createBot()
      bot.use(session())
      bot.on('inline_query', ctx => {
        try {
          ctx.session.abc = 1
        } catch (err) {
          reject(err)
        }
      })

      bot.handleUpdate({
        update_id: 10000,
        inline_query: {
          id: 134567890097,
          from: { last_name: 'a', type: 'private', id: 1111111, first_name: 'b', username: 'roxy migurdia' },
          query: 'Code Geass characters',
          offset: ''
        }
      })
    })
  )
})

test('should work with context extensions', async t => {
  await t.notThrowsAsync(
    new Promise(resolve => {
      const bot = createBot()
      bot.context.db = {
        getUser: () => undefined
      }
      bot.on('message', ctx => {
        t.true('db' in ctx)
        t.true('getUser' in ctx.db)
        resolve()
      })
      bot.handleUpdate({ message: BaseTextMessage })
    })
  )
})

test('should handle webhook response', async t => {
  const bot = createBot(undefined, {
    telegram: {
      webhookReply: true
    }
  })
  bot.use(async ctx => {
    const result = await ctx.replyWithChatAction('typing')
    t.is(result.webhook, true)
  })
  const res = new MockResponse()
  await bot.handleUpdate({ message: BaseTextMessage }, res)
  t.true(res.writableEnded)
  t.deepEqual(JSON.parse(res.body), {
    method: 'sendChatAction',
    chat_id: 1,
    action: 'typing'
  })
})

test('should respect webhookReply option', async t => {
  const bot = createBot(undefined, { telegram: { webhookReply: false } })
  bot.catch(err => { throw err }) // Disable log
  bot.on('message', async ctx => ctx.replyWithChatAction('typing'))
  const res = new MockResponse()
  await t.throwsAsync(bot.handleUpdate({ message: BaseTextMessage }, res))
  t.true(res.writableEnded)
  t.is(res.body, undefined)
})

test('should respect webhookReply runtime change', async t => {
  const bot = createBot(undefined, { telegram: { webhookReply: true } })
  bot.webhookReply = false
  bot.catch((err) => { throw err }) // Disable log
  bot.on('message', async ctx => ctx.replyWithChatAction('typing'))
  const res = new MockResponse()
  // Throws cause Bot Token is required for http call
  await t.throwsAsync(bot.handleUpdate({ message: BaseTextMessage }, res))

  t.true(res.writableEnded)
  t.is(res.body, undefined)
})

test('should respect webhookReply runtime change (per request)', async t => {
  const bot = createBot()
  bot.catch((err) => { throw err }) // Disable log
  bot.on('message', async (ctx) => {
    ctx.webhookReply = false
    return ctx.reply(':)')
  })
  const res = new MockResponse()
  await t.throwsAsync(bot.handleUpdate({ message: BaseTextMessage }, res))
  t.true(res.writableEnded)
  t.is(res.body, undefined)
})

test('should deterministically generate `secretPathComponent`', (t) => {
  const foo = createBot('123:foo')
  const bar = createBot('123:bar')
  t.deepEqual(foo.secretPathComponent(), foo.secretPathComponent())
  t.deepEqual(bar.secretPathComponent(), bar.secretPathComponent())
  t.notDeepEqual(foo.secretPathComponent(), bar.secretPathComponent())
})

test('should redact secret part of token when throw api calling error', async t => {
  const token = '123456789:SOMETOKEN1SOMETOKEN2SOMETOKEN'
  const bot = createBot(token, {
    telegram: {
      apiRoot: 'http://notexists'
    }
  })
  const error = await t.throwsAsync(bot.telegram.callApi('test'))
  t.regex(error.message, /http:\/\/notexists\/bot\/123456789:\[REDACTED]\/test/)
  t.notRegex(error.message, new RegExp(token))
})

test('should redact secret part of token when throw api calling error when using apiPrefix', async t => {
  const token = '123456789:SOMETOKEN1SOMETOKEN2SOMETOKEN'
  const bot = createBot(token, {
    telegram: {
      apiRoot: 'http://notexists',
      apiPrefix: 'someprefix'
    }
  })
  const error = await t.throwsAsync(bot.telegram.callApi('test'))
  t.regex(error.message, /http:\/\/notexists\/someprefix\/123456789:\[REDACTED]\/test/)
  t.notRegex(error.message, new RegExp(token))
})

test('should restrict access with wrong path', async t => {
  const bot = createBot()
  return new Promise((resolve, reject) => {
    bot.start(reject)
    const callback = bot.webhookCallback({ path: '/anime' })
    const res = new MockResponse()
    const req = new MockRequest('/anime1', 'POST', {}, {
      message: {
        text: '/start payload',
        entities: [{ type: 'bot_command', offset: 0, length: 6 }]
      }
    })

    callback(req, res)
      .then(() => t.is(res.statusCode, 403) && resolve())
  })
})

test('should restrict access with wrong secret', async t => {
  const bot = createBot()
  return new Promise((resolve, reject) => {
    bot.start(reject)
    const callback = bot.webhookCallback({ path: '/anime', secret: 'wrong' })
    const res = new MockResponse()
    const req = new MockRequest('/anime', 'POST', { 'x-telegram-bot-api-secret-token': '1234567890' }, {
      message: {
        text: '/start payload',
        entities: [{ type: 'bot_command', offset: 0, length: 6 }]
      }
    })

    callback(req, res)
      .then(() => t.is(res.statusCode, 403) && resolve())
  })
})

test('should handle webhook update with secret', async t => {
  const bot = createBot()
  t.plan(2)
  return new Promise((resolve) => {
    bot.on('message', ctx => t.is(ctx.message.text, '/start'))
    const callback = bot.webhookCallback({ path: '/anime', secret: '1234567890' })
    const res = new MockResponse()
    const req = new MockRequest('/anime', 'POST', { 'x-telegram-bot-api-secret-token': '1234567890' }, {
      message: {
        text: '/start',
        entities: [{ type: 'bot_command', offset: 0, length: 6 }]
      }
    })

    callback(req, res)
      .then(() => t.is(res.statusCode, 200) && resolve())
  })
})

test('should handle webhook update with path', async t => {
  const bot = createBot()
  t.plan(2)
  return new Promise((resolve) => {
    bot.on('message', ctx => t.is(ctx.message.text, '/start'))
    const callback = bot.webhookCallback({ path: '/anime' })
    const res = new MockResponse()
    const req = new MockRequest('/anime', 'POST', {}, {
      message: {
        text: '/start',
        entities: [{ type: 'bot_command', offset: 0, length: 6 }]
      }
    })

    callback(req, res)
      .then(() => t.is(res.statusCode, 200) && resolve())
  })
})

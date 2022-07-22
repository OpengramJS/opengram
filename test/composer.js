const test = require('ava')
const Opengram = require('../')
const { createBot } = require('./utils')
const { Composer } = Opengram

const baseMessage = { chat: { id: 1 }, from: { id: 42, username: 'opengram' } }
const baseGroupMessage = { chat: { id: 1, type: 'group' } }

const topLevelUpdates = [
  { type: 'message', update: { message: baseMessage } },
  { type: 'edited_message', update: { edited_message: baseMessage } },
  { type: 'callback_query', update: { callback_query: { message: baseMessage } } },
  { type: 'inline_query', update: { inline_query: {} } },
  { type: 'channel_post', update: { channel_post: {} } },
  { type: 'edited_channel_post', update: { edited_channel_post: {} } },
  { type: 'chosen_inline_result', update: { chosen_inline_result: {} } },
  { type: 'poll', update: { poll: {} } },
  { type: 'poll_answer', update: { poll_answer: {} } },
  { type: 'my_chat_member', update: { my_chat_member: {} } },
  { type: 'chat_member', update: { chat_member: {} } },
  { type: 'chat_join_request', update: { chat_join_request: {} } }
]

topLevelUpdates.forEach(update => {
  test('should route ' + update.type, async t => {
    await t.notThrowsAsync(
      new Promise(resolve => {
        const bot = createBot()
        bot.on(update.type, () => resolve())
        bot.handleUpdate(update.update)
      })
    )
  })
})

test('should route many types', async t =>
  await t.notThrowsAsync(
    new Promise(resolve => {
      const bot = createBot()
      bot.on(['chosen_inline_result', 'message'], () => resolve())
      bot.handleUpdate({ inline_query: baseMessage })
      bot.handleUpdate({ message: baseMessage })
    })
  )
)

test('should route sub types', async t =>
  await t.notThrowsAsync(
    new Promise(resolve => {
      const bot = createBot()
      bot.on('text', () => resolve())
      bot.handleUpdate({ message: { voice: {}, ...baseMessage } })
      bot.handleUpdate({ message: { text: 'hello', ...baseMessage } })
    })
  )
)

const updateTypes = [
  'voice',
  'video_note',
  'video',
  'animation',
  'venue',
  'text',
  'supergroup_chat_created',
  'successful_payment',
  'sticker',
  'pinned_message',
  'photo',
  'new_chat_title',
  'new_chat_photo',
  'new_chat_members',
  'migrate_to_chat_id',
  'migrate_from_chat_id',
  'location',
  'left_chat_member',
  'invoice',
  'group_chat_created',
  'game',
  'dice',
  'document',
  'delete_chat_photo',
  'contact',
  'channel_chat_created',
  'audio',
  'poll',
  'message_auto_delete_timer_changed',
  'voice_chat_started',
  'voice_chat_ended',
  'voice_chat_participants_invited',
  'voice_chat_scheduled'
]

const MessageSubTypesMapping = {
  voice_chat_scheduled: 'video_chat_scheduled',
  voice_chat_started: 'video_chat_started',
  voice_chat_ended: 'video_chat_ended',
  voice_chat_participants_invited: 'video_chat_participants_invited'
}

updateTypes.forEach(update =>
  test('should route update type: ' + update, async t =>
    await t.notThrowsAsync(
      new Promise(resolve => {
        const bot = createBot()
        bot.on(update, resolve)
        const message = { ...baseMessage }
        message[update] = {}
        bot.handleUpdate({ message })
      })
    )
  )
)

Object.entries(MessageSubTypesMapping).forEach(([remappedUpdate, update]) =>
  test(`should route remapped update type: ${update} to ${remappedUpdate}`, async t =>
    await t.notThrowsAsync(
      new Promise(resolve => {
        const bot = createBot()
        bot.on(update, resolve)
        const message = { ...baseMessage }
        message[remappedUpdate] = {}
        bot.handleUpdate({ message })
      })
    )
  )
)

test('should route venue', async t =>
  await t.notThrowsAsync(
    new Promise(resolve => {
      const bot = createBot()
      bot.on('venue', resolve)
      const message = {
        location: {},
        venue: { title: 'location', address: 'n/a' },
        ...baseMessage
      }
      bot.handleUpdate({ message })
    })
  )
)

test('should route location', async t =>
  await t.notThrowsAsync(
    new Promise(resolve => {
      const bot = createBot()
      bot.on('venue', ctx => {
        t.true(ctx.updateSubTypes.includes('venue'))
        t.true(ctx.updateSubTypes.includes('location'))
        resolve()
      })
      const message = { location: {}, venue: { title: 'location', address: 'n/a' }, ...baseMessage }
      bot.handleUpdate({ message })
    })
  )
)

test('should route forward', async t =>
  await t.notThrowsAsync(
    new Promise(resolve => {
      const bot = createBot()
      bot.on('forward', ctx => {
        t.true(ctx.updateSubTypes.includes('forward'))
        resolve()
      })
      const message = { forward_date: 1460829948, ...baseMessage }
      bot.handleUpdate({ message })
    })
  )
)

test('should throw error then called with undefined middleware', async t =>
  await t.throwsAsync(
    new Promise(() => {
      const composer = new Composer()
      composer.compose(() => undefined)
    })
  )
)

test('should throw error then called with invalid middleware', async t =>
  await t.notThrowsAsync(
    new Promise((resolve) => {
      const bot = createBot()
      bot.catch(resolve)
      bot.on('text', 'foo')
      bot.handleUpdate({ message: { text: 'hello', ...baseMessage } })
    })
  )
)

test('should throw error then "next()" called twice', async t => {
  await t.notThrowsAsync(
    new Promise(resolve => {
      const bot = createBot()
      bot.catch(resolve)
      bot.use((ctx, next) => {
        next()
        return next()
      })
      bot.handleUpdate({ message: { text: 'hello', ...baseMessage } })
    })
  )
})

test('should throw error then "next()" called with wrong context', async t =>
  await t.notThrowsAsync(
    new Promise((resolve, reject) => {
      const bot = createBot()
      bot.catch(resolve)
      bot.use((ctx, next) => next('bad context'))
      // eslint-disable-next-line prefer-promise-reject-errors
      bot.hears('hello', reject)
      bot.handleUpdate({ message: { text: 'hello', ...baseMessage } })
    })
  )
)

test('should throw error then called with undefined trigger', async t =>
  await t.throwsAsync(
    new Promise(() => {
      const bot = createBot()
      bot.hears(['foo', null])
    })
  )
)

test('should support Composer instance as middleware', async t =>
  await t.notThrowsAsync(
    new Promise((resolve) => {
      const bot = createBot()
      const composer = new Composer()
      composer.on('text', (ctx) => {
        t.is('bar', ctx.state.foo)
        resolve()
      })
      bot.use(({ state }, next) => {
        state.foo = 'bar'
        return next()
      }, composer)
      bot.handleUpdate({ message: { text: 'hello', ...baseMessage } })
    })
  )
)

test('should support Composer instance as handler', async t =>
  await t.notThrowsAsync(
    new Promise(resolve => {
      const bot = createBot()
      const composer = new Composer()
      composer.on('text', resolve)
      bot.on('text', composer)
      bot.handleUpdate({ message: { text: 'hello', ...baseMessage } })
    })
  )
)

test('should handle text triggers', async t =>
  await t.notThrowsAsync(
    new Promise(resolve => {
      const bot = createBot()
      bot.hears('hello world', resolve)
      bot.handleUpdate({ message: { text: 'hello world', ...baseMessage } })
    })
  )
)

test('should handle fork', async t =>
  await t.notThrowsAsync(
    new Promise(resolve => {
      const bot = createBot()
      bot.use(Opengram.fork(resolve))
      bot.handleUpdate({ message: { voice: {}, ...baseMessage } })
    })
  )
)

test('Composer.branch should work with value', async t =>
  await t.notThrowsAsync(
    new Promise(resolve => {
      const bot = createBot()
      bot.use(Composer.branch(true, resolve))
      bot.handleUpdate({ message: { text: 'hello world', ...baseMessage } })
    })
  )
)

test('Composer.branch should work with fn', async t =>
  await t.notThrowsAsync(
    new Promise(resolve => {
      const bot = createBot()
      bot.use(
        Composer.branch(
          () => false,
          null,
          resolve
        )
      )
      bot.handleUpdate({ message: { text: 'hello world', ...baseMessage } })
    })
  )
)

test('Composer.branch should work with async fn', async t =>
  await t.notThrowsAsync(
    new Promise((resolve, reject) => {
      const bot = createBot()
      bot.use(
        Composer.branch(
          () => {
            return new Promise((resolve) => setTimeout(resolve, 100, false))
          },
          () => {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject()
            resolve()
          },
          () => resolve()
        )
      )
      bot.handleUpdate({ message: { text: 'hello world', ...baseMessage } })
    })
  )
)

test('Composer.acl should work with user id', async t =>
  await t.notThrowsAsync(
    new Promise(resolve => {
      const bot = createBot()
      bot.use(Composer.acl(42, resolve))
      bot.handleUpdate({ message: { text: 'hello world', ...baseMessage } })
    })
  )
)

test('Composer.acl should passthru', async t =>
  await t.notThrowsAsync(
    new Promise(resolve => {
      const bot = createBot()
      bot.use(Composer.acl(42, Composer.passThru()))
      bot.use(resolve)
      bot.handleUpdate({ message: { text: 'hello world', ...baseMessage } })
    })
  )
)

test('Composer.acl should not be false positive', async t =>
  await t.notThrowsAsync(
    new Promise((resolve, reject) => {
      const bot = createBot()
      // eslint-disable-next-line prefer-promise-reject-errors
      bot.use(Composer.acl(999, reject))
      bot.use(resolve)
      bot.handleUpdate({ message: { text: 'hello world', ...baseMessage } })
    })
  )
)

test('Composer.acl should work with user ids', async t =>
  await t.notThrowsAsync(
    new Promise(resolve => {
      const bot = createBot()
      bot.use(Composer.acl([42, 43], resolve))
      bot.handleUpdate({ message: { text: 'hello world', ...baseMessage } })
    })
  )
)

test('Composer.acl should work with fn', async t =>
  await t.notThrowsAsync(
    new Promise(resolve => {
      const bot = createBot()
      bot.use(
        Composer.acl(
          (ctx) => ctx.from.username === 'opengram',
          resolve
        )
      )
      bot.handleUpdate({ message: { text: 'hello world', ...baseMessage } })
    })
  )
)

test('Composer.acl should work with async fn', async t =>
  await t.notThrowsAsync(
    new Promise(resolve => {
      const bot = createBot()
      bot.use(
        Composer.acl(
          (ctx) => new Promise(resolve => setTimeout(resolve, 100, true)),
          resolve
        )
      )
      bot.handleUpdate({ message: { text: 'hello world', ...baseMessage } })
    })
  )
)

test('Composer.optional should work with truthy value', async t =>
  await t.notThrowsAsync(
    new Promise(resolve => {
      const bot = createBot()
      bot.use(Composer.optional(true, resolve))
      bot.handleUpdate({ message: { text: 'hello world', ...baseMessage } })
    })
  )
)

test('Composer.optional should work with false value', async t =>
  await t.notThrowsAsync(
    new Promise((resolve, reject) => {
      const bot = createBot()
      bot.use(
        Composer.optional(false, reject)
      )
      bot.use(resolve)
      bot.handleUpdate({ message: { text: 'hello world', ...baseMessage } })
    })
  )
)

test('Composer.optional should work with fn', async t =>
  await t.notThrowsAsync(
    new Promise((resolve, reject) => {
      const bot = createBot()
      bot.use(
        Composer.optional(
          () => true,
          resolve
        )
      )
      bot.use(reject)
      bot.handleUpdate({ message: { text: 'hello world', ...baseMessage } })
    })
  )
)

test('Composer.optional should work with async fn', async t =>
  await t.notThrowsAsync(
    new Promise((resolve, reject) => {
      const bot = createBot()
      bot.use(
        Composer.optional(
          () => {
            return new Promise(resolve => {
              setTimeout(() => {
                resolve(false)
              }, 100)
            })
          },
          reject
        )
      )
      bot.use(resolve)
      bot.handleUpdate({ message: { text: 'hello world', ...baseMessage } })
    })
  )
)

test('Composer.filter should work with fn', async t =>
  await t.notThrowsAsync(
    new Promise(resolve => {
      const bot = createBot()
      bot.filter(({ message }) => message.text.length < 2)
      bot.use(resolve)
      bot.handleUpdate({ message: { text: '-', ...baseMessage } })
      bot.handleUpdate({ message: { text: 'hello', ...baseMessage } })
      bot.handleUpdate({ message: { text: 'hello world ', ...baseMessage } })
    })
  )
)

test('Composer.filter should work with async fn', async t =>
  await t.notThrowsAsync(
    new Promise(resolve => {
      const bot = createBot()
      bot.filter(({ message }) => {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve(message.text.length < 2)
          }, 100)
        })
      })
      bot.use(resolve)
      bot.handleUpdate({ message: { text: '-', ...baseMessage } })
      bot.handleUpdate({ message: { text: 'hello world', ...baseMessage } })
    })
  )
)

test('Composer.drop should work with fn', async t =>
  await t.notThrowsAsync(
    new Promise(resolve => {
      const bot = createBot()
      bot.drop(({ message }) => message.text.length > 2)
      bot.use(resolve)
      bot.handleUpdate({ message: { text: '-', ...baseMessage } })
      bot.handleUpdate({ message: { text: 'hello', ...baseMessage } })
      bot.handleUpdate({ message: { text: 'hello world ', ...baseMessage } })
    })
  )
)

test('Composer.drop should work with async fn', async t =>
  await t.notThrowsAsync(
    new Promise(resolve => {
      const bot = createBot()
      bot.drop(({ message }) => {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve(message.text.length > 2)
          }, 100)
        })
      })
      bot.use(resolve)
      bot.handleUpdate({ message: { text: '-', ...baseMessage } })
      bot.handleUpdate({ message: { text: 'hello world', ...baseMessage } })
    })
  )
)

test('Composer.lazy should work with fn', async t =>
  await t.notThrowsAsync(
    new Promise(resolve => {
      const bot = createBot()
      bot.use(Composer.lazy(() => () => resolve()))
      bot.handleUpdate({ message: { text: 'hello world', ...baseMessage } })
    })
  )
)

test('Composer.lazy should support middlewares', async t =>
  await t.notThrowsAsync(
    new Promise(resolve => {
      const bot = createBot()
      bot.use(Composer.lazy(() => (_, next) => next()))
      bot.use(resolve)
      bot.handleUpdate({ message: { text: 'hello world', ...baseMessage } })
    })
  )
)

test('Composer.dispatch should work with handlers array', async t =>
  await t.notThrowsAsync(
    new Promise((resolve, reject) => {
      const bot = createBot()
      bot.use(
        Composer.dispatch(() => 1, [
          reject,
          resolve
        ])
      )
      bot.handleUpdate({ message: { text: 'hello world', ...baseMessage } })
    })
  )
)

test('Composer.dispatch should work', async t =>
  await t.notThrowsAsync(
    new Promise(resolve => {
      const bot = createBot()
      bot.use(
        Composer.dispatch(() => 'b', {
          b: resolve
        })
      )
      bot.handleUpdate({ message: { text: 'hello world', ...baseMessage } })
    })
  )
)

test('Composer.dispatch should work with async fn', async t =>
  await t.notThrowsAsync(
    new Promise((resolve, reject) => {
      const bot = createBot()
      bot.use(
        Composer.dispatch(
          () => {
            return new Promise(resolve => {
              setTimeout(() => {
                resolve(1)
              }, 300)
            })
          },
          [
            reject,
            resolve
          ]
        )
      )
      bot.handleUpdate({ message: { text: 'hello world', ...baseMessage } })
    })
  )
)

test('Composer.log should just work', async t =>
  await t.notThrowsAsync(
    new Promise(resolve => {
      const bot = createBot()
      bot.use(Composer.log(resolve))
      bot.handleUpdate({ message: { text: 'hello world', ...baseMessage } })
    })
  )
)

test('Composer.entity should work', async t =>
  await t.notThrowsAsync(
    new Promise(resolve => {
      const bot = createBot()
      bot.use(Composer.entity('hashtag', resolve))
      bot.handleUpdate({
        message: {
          text: '#foo',
          entities: [{ type: 'hashtag', offset: 0, length: 4 }]
        }
      })
    })
  )
)

test('Composer.entity should not infer', async t =>
  await t.notThrowsAsync(
    new Promise(resolve => {
      const bot = createBot()
      bot.use(Composer.entity('command', resolve))
      bot.use(resolve)
      bot.handleUpdate({
        message: {
          text: '#foo',
          entities: [{ type: 'hashtag', offset: 0, length: 4 }]
        }
      })
    })
  )
)

test('Composer.entity should work with arrays', async t =>
  await t.notThrowsAsync(
    new Promise(resolve => {
      const bot = createBot()
      bot.use(Composer.entity(['command', 'hashtag'], resolve))
      bot.handleUpdate({
        message: {
          text: '#foo',
          entities: [{ type: 'hashtag', offset: 0, length: 4 }]
        }
      })
    })
  )
)

test('Composer.entity should work with predicate', async t =>
  await t.notThrowsAsync(
    new Promise(resolve => {
      const bot = createBot()
      bot.use(
        Composer.entity(
          (entity, value) => entity.type === 'hashtag' && value === '#foo',
          resolve
        )
      )
      bot.handleUpdate({
        message: {
          text: '#foo',
          entities: [{ type: 'hashtag', offset: 0, length: 4 }]
        }
      })
    })
  )
)

test('Composer.mention should work', async t =>
  await t.notThrowsAsync(
    new Promise(resolve => {
      const bot = createBot()
      bot.use(Composer.mention(resolve))
      bot.handleUpdate({
        message: {
          text: 'bar @foo',
          entities: [{ type: 'mention', offset: 4, length: 4 }]
        }
      })
    })
  )
)

test('Composer.mention should work with pattern', async t =>
  await t.notThrowsAsync(
    new Promise(resolve => {
      const bot = createBot()
      bot.use(Composer.mention('foo', resolve))
      bot.handleUpdate({
        message: {
          text: 'bar @foo',
          entities: [{ type: 'mention', offset: 4, length: 4 }]
        }
      })
    })
  )
)

test('Composer.hashtag should work', async t =>
  await t.notThrowsAsync(
    new Promise(resolve => {
      const bot = createBot()
      bot.use(Composer.hashtag(resolve))
      bot.handleUpdate({
        message: {
          text: '#foo',
          entities: [{ type: 'hashtag', offset: 0, length: 4 }]
        }
      })
    })
  )
)

test('Composer.hashtag should work with pattern', async t =>
  await t.notThrowsAsync(
    new Promise(resolve => {
      const bot = createBot()
      bot.use(Composer.hashtag('foo', resolve))
      bot.handleUpdate({
        message: {
          text: 'bar #foo',
          entities: [{ type: 'hashtag', offset: 4, length: 4 }]
        }
      })
    })
  )
)

test('Composer.hashtag should work with hash pattern', async t =>
  await t.notThrowsAsync(
    new Promise(resolve => {
      const bot = createBot()
      bot.use(Composer.hashtag('#foo', resolve))
      bot.handleUpdate({
        message: {
          text: 'bar #foo',
          entities: [{ type: 'hashtag', offset: 4, length: 4 }]
        }
      })
    })
  )
)

test('Composer.hashtag should work with patterns array', async t =>
  await t.notThrowsAsync(
    new Promise(resolve => {
      const bot = createBot()
      bot.use(Composer.hashtag(['news', 'foo'], resolve))
      bot.handleUpdate({
        message: {
          text: 'bar #foo',
          entities: [{ type: 'hashtag', offset: 4, length: 4 }]
        }
      })
    })
  )
)

test('should handle text triggers via functions', async t =>
  await t.notThrowsAsync(
    new Promise(resolve => {
      const bot = createBot()
      bot.hears(
        (text) => text.startsWith('Hi'),
        resolve
      )
      bot.handleUpdate({ message: { text: 'Hi there!', ...baseMessage } })
    })
  )
)

test('should handle regex triggers', async t =>
  await t.notThrowsAsync(
    new Promise(resolve => {
      const bot = createBot()
      bot.hears(/hello (.+)/, ctx => {
        t.is('world', ctx.match[1])
        resolve()
      })
      bot.handleUpdate({ message: { text: 'Ola!', ...baseMessage } })
      bot.handleUpdate({ message: { text: 'hello world', ...baseMessage } })
    })
  )
)

test('should handle command', async t =>
  await t.notThrowsAsync(
    new Promise(resolve => {
      const bot = createBot()
      bot.command('foo', resolve)
      bot.handleUpdate({
        message: {
          text: '/foo',
          entities: [{ type: 'bot_command', offset: 0, length: 4 }],
          ...baseMessage
        }
      })
    })
  )
)

test('should handle start command', async t =>
  await t.notThrowsAsync(
    new Promise(resolve => {
      const bot = createBot()
      bot.start(resolve)
      bot.handleUpdate({
        message: {
          text: '/start',
          entities: [{ type: 'bot_command', offset: 0, length: 6 }],
          ...baseMessage
        }
      })
    })
  )
)

test('should handle command with payload', async t =>
  await t.notThrowsAsync(
    new Promise(resolve => {
      const bot = createBot()
      bot.start(ctx => {
        t.true('startPayload' in ctx)
        t.is('payload', ctx.startPayload)
        resolve()
      })
      bot.handleUpdate({
        message: {
          text: '/start payload',
          entities: [{ type: 'bot_command', offset: 0, length: 6 }],
          ...baseMessage
        }
      })
    })
  )
)

test('should handle help command', async t =>
  await t.notThrowsAsync(
    new Promise(resolve => {
      const bot = createBot()
      bot.help(resolve)
      bot.handleUpdate({
        message: {
          text: '/help',
          entities: [{ type: 'bot_command', offset: 0, length: 5 }],
          ...baseMessage
        }
      })
    })
  )
)

test('should handle settings command', async t =>
  await t.notThrowsAsync(
    new Promise(resolve => {
      const bot = createBot()
      bot.settings(resolve)
      bot.handleUpdate({
        message: {
          text: '/settings',
          entities: [{ type: 'bot_command', offset: 0, length: 9 }],
          ...baseMessage
        }
      })
    })
  )
)

test('should handle group command', async t =>
  await t.notThrowsAsync(
    new Promise(resolve => {
      const bot = createBot(null)
      bot.start(resolve)
      bot.handleUpdate({
        message: {
          text: '/start@bot',
          entities: [{ type: 'bot_command', offset: 0, length: 10 }],
          ...baseGroupMessage
        }
      })
    })
  )
)

test('should handle game query', async t =>
  await t.notThrowsAsync(
    new Promise(resolve => {
      const bot = createBot()
      bot.gameQuery(resolve)
      bot.handleUpdate({ callback_query: { game_short_name: 'foo' } })
    })
  )
)

test('should handle action', async t =>
  await t.notThrowsAsync(
    new Promise(resolve => {
      const bot = createBot()
      bot.action('foo', resolve)
      bot.handleUpdate({ callback_query: { data: 'foo' } })
    })
  )
)

test('should handle regex action', async t =>
  await t.notThrowsAsync(
    new Promise((resolve) => {
      const bot = createBot()
      bot.action(/foo (\d+)/, (ctx) => {
        t.true('match' in ctx)
        t.is('42', ctx.match[1])
        resolve()
      })
      bot.handleUpdate({ callback_query: { data: 'foo 42' } })
    })
  )
)

test('should handle inline query', async t =>
  await t.notThrowsAsync(
    new Promise(resolve => {
      const bot = createBot()
      bot.inlineQuery('foo', resolve)
      bot.handleUpdate({ inline_query: { query: 'foo' } })
    })
  )
)

test('should handle regex inline query', async t =>
  await t.notThrowsAsync(
    new Promise(resolve => {
      const bot = createBot()
      bot.inlineQuery(/foo (\d+)/, (ctx) => {
        t.true('match' in ctx)
        t.is('42', ctx.match[1])
        resolve()
      })
      bot.handleUpdate({ inline_query: { query: 'foo 42' } })
    })
  )
)

test('should support middlewares', async t =>
  await t.notThrowsAsync(
    new Promise((resolve, reject) => {
      const bot = createBot()
      bot.action('bar', () => {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject()
      })
      bot.use(resolve)
      bot.handleUpdate({ callback_query: { data: 'foo' } })
    })
  )
)

test('should handle short command', async t => {
  await t.notThrowsAsync(
    new Promise(resolve => {
      const bot = createBot()
      bot.start(() => resolve())
      bot.handleUpdate({
        message: { text: '/start', entities: [{ type: 'bot_command', offset: 0, length: 6 }], ...baseMessage }
      })
    })
  )
})

test('should handle command in group', async t =>
  await t.notThrowsAsync(
    new Promise(resolve => {
      const bot = createBot(null)
      bot.start(resolve)
      bot.handleUpdate({
        message: {
          text: '/start@bot',
          entities: [{ type: 'bot_command', offset: 0, length: 10 }],
          chat: { id: 2, type: 'group' }
        }
      })
    })
  )
)

test('should handle command with payload in group', async t =>
  await t.notThrowsAsync(
    new Promise(resolve => {
      const bot = createBot(null)
      bot.start(ctx => {
        t.true('startPayload' in ctx)
        t.is('payload', ctx.startPayload)
        resolve()
      })
      bot.handleUpdate({
        message: {
          text: '/start@bot payload',
          entities: [{ type: 'bot_command', offset: 0, length: 10 }],
          chat: { id: 2, type: 'group' }
        }
      })
    })
  )
)

test('should handle command in supergroup', async t =>
  await t.notThrowsAsync(
    new Promise(resolve => {
      const bot = createBot(null)
      bot.start(resolve)
      bot.handleUpdate({
        message: {
          text: '/start@bot',
          entities: [{ type: 'bot_command', offset: 0, length: 10 }],
          chat: { id: 2, type: 'supergroup' }
        }
      })
    })
  )
)

test('should handle command with payload in supergroup', async t =>
  await t.notThrowsAsync(
    new Promise(resolve => {
      const bot = createBot(null)
      bot.start(ctx => {
        t.true('startPayload' in ctx)
        t.is('payload', ctx.startPayload)
        resolve()
      })
      bot.handleUpdate({
        message: {
          text: '/start@bot payload',
          entities: [{ type: 'bot_command', offset: 0, length: 10 }],
          chat: { id: 2, type: 'supergroup' }
        }
      })
    })
  )
)

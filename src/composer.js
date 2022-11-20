const { OpengramContext: Context, MessageSubTypesMapping } = require('./context')
const { getEntities, getText } = require('./core/helpers/utils')

/**
 * The composer is the heart of the middleware system in Opengram. It is also the
 * super class of `Opengram`.
 *
 * Whenever you call `use` or `on` or some of the other
 * methods on your bot, you are in fact using the underlying composer instance
 * to register your middleware.
 */
class Composer {
  /**
   * Constructs a new composer based on the provided middleware. If no
   * middleware is given, the composer instance will simply make all context
   * objects pass through without touching them.
   *
   * @param {MiddlewareFn} fns The middlewares to compose as arguments
   */
  constructor (...fns) {
    this.handler = Composer.compose(fns)
  }

  /**
   * Registers some middleware(s) that receives all updates. It is installed by
   * concatenating it to the end of all previously installed middleware.
   *
   * Often, this method is used to install middleware(s) that behaves like a
   * plugin, for example session middleware.
   * ```js
   * bot.use(session())
   * ```
   *
   * You can pass middleware separated by commas as arguments or as a chain of calls:
   * ```js
   * const { Opengram, Stage, session } = require('opengram')
   * const bot = require('opengram')
   * const stage = new Stage([...])
   * bot.use(session(), stage) // As arguments
   * ```
   * or
   * ```js
   * const { Opengram, Stage, session } = require('opengram')
   * const bot = require('opengram')
   * const stage = new Stage([...])
   * bot // As chain of calls
   *   .use(session())
   *   .use(stage)
   * ```
   *
   * This method returns a new instance of {@link Composer}.
   *
   * @param {MiddlewareFn} fns The middleware(s) to register as arguments
   * @return {Composer}
   */
  use (...fns) {
    this.handler = Composer.compose([this.handler, ...fns])
    return this
  }

  /**
   * Registers some middleware(s) that will only be executed for some specific
   * updates, namely those matching the provided filter query. Filter queries
   * are a concise way to specify which updates you are interested in.
   *
   * Here are some examples of valid filter queries:
   * ```js
   * // All kinds of message updates
   * bot.on('message', ctx => { ... })
   *
   * // Text messages
   * bot.on('text', ctx => { ... })
   *
   * // Messages with document
   * bot.on('document', ctx => { ... })
   * ```
   *
   * It is possible to pass multiple filter queries in an array, i.e.
   * ```js
   * // Matches all messages that contain a video or audio
   * bot.on(['audio', 'video'], ctx => { ... })
   * ```
   *
   * Your middleware will be executed if _any of the provided filter queries_
   * matches (logical OR).
   *
   * This method returns same as {@link Composer#use}.
   *
   * @param {updateType|updateType[]} updateTypes The update type or array of update types to use,
   *    may also be an array or string
   * @param {MiddlewareFn} fns The middleware(s) to register with the given types as argument(s)
   * @return {Composer}
   */
  on (updateTypes, ...fns) {
    return this.use(Composer.mount(updateTypes, ...fns))
  }

  /**
   * Registers some middleware(s) that will only be executed when the message / channel post
   * contains some text (in media caption too). Is it possible to pass a regular expression to match:
   * ```js
   * // Match some text (exact match)
   * bot.hears('I love anime', ctx => ctx.reply('I love too'))
   *
   * // Match a regular expression
   * bot.hears(/\/echo (.+)/, ctx => ctx.reply(ctx.match[1]))
   * ```
   * > Note how `ctx.match` will contain the result of the regular expression.
   * > So `ctx.match[1]` refers to the part of the regex that was matched by `(.+)`,
   * > i.e. the text that comes after "/echo".
   *
   * You can pass an array of triggers. Your middleware will be executed if at
   * least one of them matches.
   *
   * Both text and captions of the received messages will be scanned. For
   * example, when a photo is sent to the chat and its caption matches the
   * trigger, your middleware will be executed.
   *
   * If you only want to match text messages and not captions, you can do
   * this:
   * ```js
   * const { Composer: { hears } } = require('opengram')
   * // Only matches text messages for the regex
   * bot.on('text', hears(/\/echo (.+)/, ctx => { ... }))
   * ```
   *
   * > _**Be careful, the example above may not work as expected if `channelMode` is enabled.**_
   * >
   * > By default `text` type not match channel posts, but `channel_post` matched as `text` type and
   * > `ctx.message` potentially `undefined`
   * > when `channelMode` enabled. You can add additional chat type check for this case
   *
   * @param {string|RegExp|array<RegExp|string>} triggers The text / array of texts or regex to look for
   * @param {MiddlewareFn} fns The middleware(s) to register as argument(s)
   */
  hears (triggers, ...fns) {
    return this.use(Composer.hears(triggers, ...fns))
  }

  /**
   * Registers some middleware(s) that will only be executed when a certain
   * command is found.
   * ```js
   * // Reacts to /start commands
   * bot.command('start', ctx => { ... })
   * // Reacts to /help commands
   * bot.command('help', ctx => { ... })
   * ```
   *
   * > **Note:** Commands are not matched in the middle of the text.
   *
   * ```js
   * bot.command('start', ctx => { ... })
   * // ... does not match:
   * // A message saying: “some text /start some more text”
   * // A photo message with the caption “some text /start some more text”
   * ```
   *
   * By default, commands are detected in channel posts and media captions, too. This means that
   * `ctx.message` for channel post or `ctx.message.text` for media is potentially `undefined`,
   * so you should use `ctx.channelPost` and `ctx.message.caption` accordingly
   * for channel posts. Alternatively, if you
   * want to limit your bot to finding commands only in private and group
   * chats, you can use
   *
   * ```js
   * const { Opengram, Composer: { command } } = require('opengram')
   * // ...
   * bot.on('message', command('start', ctx => ctx.reply('Only private / group messages or media with caption')))`
   * ```
   *
   * or using {@link Composer.chatType}:
   *
   * ```js
   * const { Opengram, Composer, Composer: { command } } = require('opengram')
   * // ...
   * bot.use(
   *   Composer.chatType(
   *     ["private", "group", "supergroup"],
   *     command('start', ctx => ctx.reply('Only private / group messages or media with caption'))
   *   )
   * )
   * ```
   *
   * for match all message exclude channel posts, or
   *
   * ```js
   * const { Opengram, Composer: { command } } = require('opengram')
   * // ...
   * bot.on('text', command('start', ctx => ctx => ctx.reply('Math commands only text, not media captions')))))
   * ```
   *
   * for match only text message, not media caption
   * or even store a message-only version of your bot in a variable like so:
   *
   * > _**Be careful, the example above may not work as expected if `channelMode` is enabled.**_
   * >
   * > By default `text` type not match channel posts, but `channel_post` matched as `text` type and
   * > `ctx.message` potentially `undefined`
   * > when `channelMode` enabled. You can add additional chat type check for this case
   *
   * @param {string|string[]|'start'|'settings'|'help'} commands The command or array of commands to look for
   * @param {MiddlewareFn} fns The middleware(s) to register as arguments
   */
  command (commands, ...fns) {
    return this.use(Composer.command(commands, ...fns))
  }

  /**
   * Registers some middleware(s) for callback queries, i.e. the updates that
   * Telegram delivers to your bot when a user clicks an inline button (that
   * is a button under a message).
   *
   * This method is essentially the same as calling
   * ```js
   * bot.on('callback_query', ctx => { ... })
   * ```
   * but it also allows you to match the query data against a given text or
   * regular expression.
   *
   * ```js
   * // Create an inline keyboard
   * const keyboard = Markup.inlineKeyboard([
   *   Markup.callbackButton('Go!', 'button-payload')
   * ])
   * // Send a message with the keyboard
   * await bot.telegram.sendMessage(chat_id, 'Press a button!', keyboard.extra())
   * // Listen to users pressing buttons with that specific payload
   * bot.action('button-payload', ctx => { ... })
   *
   * // Listen to users pressing any button your bot ever sent
   * bot.on('callback_query', ctx => { ... })
   * ```
   *
   * Always remember to call
   * {@link Telegram#answerCbQuery} or {@link OpengramContext#answerCbQuery}
   * — even if you don't perform any action: {@linkplain https://core.telegram.org/bots/api#answercallbackquery}
   * ```js
   * bot.on('callback_query', async ctx => {
   *   await ctx.answerCbQuery()
   * })
   * ```
   *
   * You can pass one or an array of triggers (Regexp / strings). Your middleware(s) will be executed if at
   * least one of them matches.
   *
   * > Note how `ctx.match` will contain the result of the regular expression.
   * > So `ctx.match[1]` refers to the part of the regexp that was matched by `([0-9]+)`,
   * > i.e. the text that comes after "button:".
   * > ```
   * > bot.action(/button:([0-9]+)/, ctx => ctx.reply(`You choose button with number ${ctx.match[1]} in payload`))
   * > const keyboard = Markup.inlineKeyboard([
   * >  Markup.callbackButton('Button 1', 'button:1'),
   * >  Markup.callbackButton('Button 2', 'button:2')
   * >  Markup.callbackButton('Button 3', 'button:3')
   * > ])
   * > await bot.telegram.sendMessage(chat_id, 'Press a button!', keyboard.extra())
   * > ```
   *
   * @param {string|RegExp|array<RegExp|string>} triggers One or an array of regular expressions / strings
   *   to search in the payload
   * @param {MiddlewareFn} fns The middleware(s) to register as arguments
   * @return {Composer}
   */
  action (triggers, ...fns) {
    return this.use(Composer.action(triggers, ...fns))
  }

  /**
   * Registers middleware for inline queries. Telegram sends an inline query
   * to your bot whenever a user types `@your_bot_name ...` into a text field
   * in Telegram.
   *
   *
   * [![Inline query](https://raw.githubusercontent.com/OpengramJS/opengram/master/docs/media/interactive-examples/inlineQuery.png)](https://raw.githubusercontent.com/OpengramJS/opengram/master/docs/media/interactive-examples/inlineQuery.png)
   *
   *
   * Your bot will then receive the entered search query and can
   * respond with a number of results (text, images, etc.) that the user can
   * pick from to send a message _via_ your bot to the respective chat.
   * Check [here](https://core.telegram.org/bots/inline) to read more about inline bots.
   *
   * > Note that you have to enable inline mode for you bot by contacting
   * > [@BotFather](https://t.me/BotFather) first.
   *
   * ```js
   * // Listen for users typing `@your_bot_name query`
   * bot.inlineQuery('query', async ctx => {
   *   // Answer the inline query, confer https://core.telegram.org/bots/api#answerinlinequery
   *   await ctx.answerInlineQuery( ... )
   * })
   * ```
   *
   * You can pass one or an array of triggers (Regexp / strings). Your middleware(s) will be executed if at
   * least one of them matches.
   *
   * > Note how `ctx.match` will contain the result of the regular expression.
   * > So `ctx.match[1]` refers to the part of the regexp that was matched by `([0-9]+)`,
   * > i.e. the text that comes after "query:".
   * ```js
   * // Listen for users typing `@your_bot_name query`
   * bot.inlineQuery(/query:([0-9]+)/, async ctx => {
   *   // Answer the inline query, confer https://core.telegram.org/bots/api#answerinlinequery
   *   await ctx.answerInlineQuery([{
   *     type: 'article',
   *     id: Math.random(),
   *     title: 'Regex test',
   *     cache_time: 1,
   *     description: `Query Regex result: ${ctx.match[1]}`,
   *     input_message_content: {
   *       message_text: `Query Regex result: ${ctx.match[1]}`,
   *     }
   *   }])
   * })
   * ```
   *
   * @param {string|RegExp|array<RegExp|string>} triggers The inline query text or array of text to match
   * @param {MiddlewareFn} fns The middleware(s) to register
   * @return {Composer}
   */
  inlineQuery (triggers, ...fns) {
    return this.use(Composer.inlineQuery(triggers, ...fns))
  }

  /**
   * Registers some middleware(s) for game queries, i.e. the updates that
   * Telegram delivers to your bot when a user clicks an inline button for the
   * HTML5 games platform on Telegram.
   *
   * This method is essentially the same as calling
   * ```js
   * bot.on('callback_query', ctx => {
   *  if (ctx.callbackQuery.game_short_name) {
   *    ...
   *  }
   * })
   * ```
   *
   * @param {MiddlewareFn} fns The middleware to register as arguments
   * @return {Composer}
   */
  gameQuery (...fns) {
    return this.use(Composer.gameQuery(...fns))
  }

  /**
   * > ❗️ **This is an advanced method of Opengram.**
   *
   * Registers middleware behind a custom filter function that operates on the
   * context object and decides whether to execute the middleware.
   *
   * In other words, the middleware(s) after that middleware will only be executed if the given predicate
   * returns `false` for the given context object. Note that the predicate
   * may be asynchronous, i.e. it can return a Promise of a boolean.
   *
   * This method is the same using `filter` (normal usage) with a negated
   * predicate.
   *
   * ```js
   * // Drop all message updates sent more than 6 hr in all middlewares / handlers registered after bot.drop(...)
   * bot.drop(ctx => {
   *   if(!ctx.message) return false // Drop only messages
   *   return (Date.now() / 1000) - ctx.message.date < 60 * 60 * 6
   * })
   * // Called only for messages with date < 6 hr after send
   * bot.on('message', () => ctx.reply('Good, update date less then 6 hours!'))
   * ```
   * @param {PredicateFn} predicate The predicate to check. Can be async, returns boolean or Promise with boolean
   * @return {Composer}
   */
  drop (predicate) {
    return this.use(Composer.drop(predicate))
  }

  /**
   * > ❗️ **This is an advanced method of Opengram.**
   *
   * Registers middleware(s) behind a custom filter function that operates on the
   * context object and decides whether to execute the middleware. In
   * other words, the middleware will only be executed if the given predicate
   * returns `true` for the given context object. Otherwise, it will be
   * skipped and the next middleware will be executed.
   *
   * In other words, the middleware after that middleware will only be executed if the given predicate
   * returns `true` for the given context object. Note that the predicate
   * may be asynchronous, i.e. it can return a Promise of a boolean.
   * ```js
   * // Only process every second update
   * bot.filter(ctx => ctx.update.update_id % 2 === 0)
   * bot.on('message', ctx => ctx.reply('Update id of this message is divided by two without a remainder'))
   * ```
   * @param {PredicateFn} predicate The predicate to check. Can be async, returns boolean or Promise with boolean
   * @return {Composer}
   */
  filter (predicate) {
    return this.use(Composer.filter(predicate))
  }

  /**
   * Registers some middleware(s) that will only be executed if a certain entity is present in the update
   *
   * This method matches entity in channel post, message and media caption
   *
   * @param {MiddlewareFn} args The middleware(s) to register
   * @return {Composer}
   */
  entity (...args) {
    return this.use(Composer.entity(...args))
  }

  /**
   * Registers some middleware(s) that will only be executed if `custom_emoji` entity is present in the update
   *
   * Shortcut to `Composer.entity('custom_emoji', ...)`
   *
   * This method matches entity in channel post, message and media caption
   *
   * @param {MiddlewareFn} args The middleware(s) to register
   * @return {Composer}
   */
  customEmoji (...args) {
    return this.use(Composer.customEmoji(...args))
  }

  /**
   * Registers some middleware(s) that will only be executed if `email` entity is present in the update
   *
   * Shortcut to `Composer.entity('email', ...)`
   *
   * This method matches entity in channel post, message and media caption
   *
   * @param {MiddlewareFn} args The middleware(s) to register
   * @return {Composer}
   */
  email (...args) {
    return this.use(Composer.email(...args))
  }

  /**
   * Registers some middleware(s) that will only be executed if `phone` entity is present in the update
   *
   * Shortcut to `Composer.entity('phone', ...)`
   *
   * This method matches entity in channel post, message and media caption
   *
   * @param {MiddlewareFn} args The middleware(s) to register
   * @return {Composer}
   */
  phone (...args) {
    return this.use(Composer.phone(...args))
  }

  /**
   * Registers some middleware(s) that will only be executed if `url` entity is present in the update
   *
   * Shortcut to `Composer.entity('url', ...)`
   *
   * This method matches entity in channel post, message and media caption
   *
   * @param {MiddlewareFn} args The middleware(s) to register
   * @return {Composer}
   */
  url (...args) {
    return this.use(Composer.url(...args))
  }

  /**
   * Registers some middleware(s) that will only be executed if `text_link` entity is present in the update
   *
   * Shortcut to `Composer.entity('text_link', ...)`
   *
   * This method matches entity in channel post, message and media caption
   *
   * @param {MiddlewareFn} args The middleware(s) to register
   * @return {Composer}
   */
  textLink (...args) {
    return this.use(Composer.textLink(...args))
  }

  /**
   * Registers some middleware(s) that will only be executed if `text_mention` entity is present in the update
   *
   * Shortcut to `Composer.entity('text_mention', ...)`
   *
   * This method matches entity in channel post, message and media caption
   *
   * @param {MiddlewareFn} args The middleware(s) to register
   * @return {Composer}
   */
  textMention (...args) {
    return this.use(Composer.textMention(...args))
  }

  /**
   * Registers some middleware(s) that will only be executed if `mention` entity is present in the update
   *
   * Shortcut to `Composer.entity('mention', ...)`
   *
   * This method matches entity in channel post, message and media caption
   *
   * @param {MiddlewareFn} args The middleware(s) to register
   * @return {Composer}
   */
  mention (...args) {
    return this.use(Composer.mention(...args))
  }

  /**
   * Registers some middleware(s) that will only be executed if `hashtag` entity is present in the update
   *
   * Shortcut to `Composer.entity('hashtag', ...)`
   *
   * This method matches entity in channel post, message and media caption
   *
   * @param {MiddlewareFn} args The middleware(s) to register
   * @return {Composer}
   */
  hashtag (...args) {
    return this.use(Composer.hashtag(...args))
  }

  /**
   * Registers some middleware(s) that will only be executed if `hashtag` entity is present in the update
   *
   * Shortcut to `Composer.entity('cashtag', ...)`
   *
   * This method matches entity in channel post, message and media caption
   *
   * @param {MiddlewareFn} args The middleware(s) to register
   * @return {Composer}
   */
  cashtag (...args) {
    return this.use(Composer.cashtag(...args))
  }

  /**
   * Registers some middleware(s) that will only be executed if `spoiler` entity is present in the update
   *
   * Shortcut to `Composer.entity('spoiler', ...)`
   *
   * This method matches entity in channel post, message and media caption
   *
   * @param {MiddlewareFn} args The middleware(s) to register
   * @return {Composer}
   */
  spoiler (...args) {
    return this.use(Composer.spoiler(...args))
  }

  /**
   * Registers some middleware that will only be executed when `/start` command is found.
   *
   * Shortcut to `Composer.command('start', ...)`, but with additional functionally, when you use this and
   * deep linking, you can get start payload from `ctx.startPayload`
   *
   * For example if user start the bot from link like this: `http://t.me/examplebot?start=1234`
   *
   * With this code, bot reply user with text of start payload:
   *
   * ```js
   * bot.start(ctx => ctx.reply(`Start payload: ${ctx.startPayload}`)) // Reply with "Start payload: 1234"
   * ```
   *
   * @param {MiddlewareFn} fns The middleware(s) to register
   * @return {MiddlewareFn}
   */
  start (...fns) {
    return this.command('start', Composer.tap((ctx) => {
      const entity = ctx.message.entities[0]
      ctx.startPayload = ctx.message.text.slice(entity.length + 1)
    }), ...fns)
  }

  /**
   * Registers some middleware that will only be executed when `/help` command is found.
   *
   * Shortcut to `Composer.command('help', ...)`
   *
   * @param {MiddlewareFn} fns The middleware(s) to register
   * @return {MiddlewareFn}
   */
  help (...fns) {
    return this.command('help', ...fns)
  }

  /**
   * Registers some middleware that will only be executed when `/settings` command is found.
   *
   * Shortcut to `Composer.command('settings', ...)`
   *
   * @param {MiddlewareFn} fns The middleware(s) to register
   * @return {MiddlewareFn}
   */
  settings (...fns) {
    return this.command('settings', ...fns)
  }

  middleware () {
    return this.handler
  }

  /**
   * Generates and return middleware for reply with given arguments, has same arguments like in Opengram,
   * context method `reply`
   *
   * Usage example:
   * ```js
   * // Send message with text "I'm not support group chats" when receive update from group chat
   * bot.use(
   *   Composer.groupChat(Composer.reply('I not support group chats'))
   * )
   * ```
   * @param args
   * @return {MiddlewareFn}
   */
  static reply (...args) {
    return (ctx) => ctx.reply(...args)
  }

  static catchAll (...fns) {
    return Composer.catch((err) => {
      console.error()
      console.error((err.stack || err.toString()).replace(/^/gm, '  '))
      console.error()
    }, ...fns)
  }

  static catch (errorHandler, ...fns) {
    const handler = Composer.compose(fns)
    return (ctx, next) => Promise.resolve(handler(ctx, next))
      .catch((err) => errorHandler(err, ctx))
  }

  /**
   * > ❗️ **This is an advanced method of Opengram.**
   *
   * Registers some middleware that runs concurrently to the executing middleware stack.
   * Runs the middleware at the next event loop using
   * [setImmediate](https://nodejs.dev/en/learn/understanding-setimmediate) and force call `next()`
   *
   * For example, you can use that method for saving metrics and other non-priority or optional features in background
   *
   * > ❗️ If you call next in this middleware, then nothing will happen, it will be ignored
   *
   * @param {MiddlewareFn} middleware The middleware to run concurrently
   * @return {MiddlewareFn}
   */
  static fork (middleware) {
    const handler = Composer.unwrap(middleware)
    return (ctx, next) => {
      setImmediate(handler, ctx, Composer.safePassThru())
      return next(ctx)
    }
  }

  /**
   * > ❗️ **This is an advanced method of Opengram.**
   * Middleware that calls a middleware or chain of middleware and calls the `next`, whether it called `next` or not.
   * Allows you to execute some code and continue execution regardless of its result.
   *
   * @param {MiddlewareFn} middleware The middleware to run without access to next
   * @return {MiddlewareFn}
   */
  static tap (middleware) {
    const handler = Composer.unwrap(middleware)
    return (ctx, next) => {
      return Promise.resolve(
        handler(ctx, Composer.safePassThru())
      ).then(() => next(ctx))
    }
  }

  /**
   * > ❗️ **This is an advanced method of Opengram.**
   *
   * Generates middleware which call next middleware
   *
   * For example, you can use it with {@link Composer.branch} or other to skip middleware (make middleware optional)
   *
   * @return {MiddlewareFn}
   */
  static passThru () {
    return (ctx, next) => next(ctx)
  }

  /**
   * > ❗️ **This is an advanced method of Opengram.**
   *
   * Generates middleware which call next middleware if `next` function exists or returns empty resolved promise
   *
   * This method is similar to `Composer.passThru()`, but calls `next` if exists, otherwise returns resolved promise
   *
   * @return {MiddlewareFn}
   */
  static safePassThru () {
    return (ctx, next) => typeof next === 'function' ? next(ctx) : Promise.resolve()
  }

  /**
   * > ❗️ **This is an advanced method of Opengram.**
   * Lazily asynchronously returns some middleware that can be generated on the fly for each context.
   * Pass a factory function that creates some middleware
   *
   * The factory function will be called once per context, and its result will be executed with the context object.
   * ```js
   * // The middleware returned by `createMyMiddleware` will be used only once
   * bot.use(
   *   Composer.lazy(ctx => createMyMiddleware(ctx))
   * )
   * ```
   *
   * You may generate this middleware in an `async` fashion.
   *
   * @param {function} factoryFn The factory function creating the middleware
   * @throws {TypeError}
   * @return {MiddlewareFn<Promise>}
   */
  static lazy (factoryFn) {
    if (typeof factoryFn !== 'function') {
      throw new TypeError('Argument must be a function')
    }
    return (ctx, next) => Promise.resolve(factoryFn(ctx))
      .then((middleware) => Composer.unwrap(middleware)(ctx, next))
  }

  /**
   * Method that generates a middleware to output the content of the context with indented beautiful in
   * console using serialization
   *
   * The default for logs is `console.log`, you can pass your own log function in argument:
   *
   * ```js
   * const myOwnLogFn = (data) => console.log('[Logs]', data)
   * bot.use(Composer.log(myOwnLogFn))
   * ```
   *
   * @param {function} logFn Custom log function
   * @return {MiddlewareFn}
   */
  static log (logFn = console.log) {
    return Composer.fork((ctx) => logFn(JSON.stringify(ctx.update, null, 2)))
  }

  /**
   * > ❗️ **This is an advanced method of Opengram.**
   *
   * Allows you to branch between two cases for a given context object.
   *
   * This method takes a predicate function that is tested once per context
   * object. If it returns `true`, the first supplied middleware is executed.
   * If it returns `false`, the second supplied middleware is executed. Note
   * that the predicate may be asynchronous, i.e. it can return a Promise of a boolean.
   *
   * ```js
   * bot.use(
   *   Composer.branch(
   *     (ctx) => ctx.from.is_premium,
   *     (ctx) => ctx.reply('This mw executed only for premium users')
   *     (ctx) => ctx.reply('Buy premium :(')
   *   )
   * )
   * ```
   * @param {PredicateFn} predicate The predicate to check. Can be async, returns boolean or Promise with boolean
   * @param {MiddlewareFn} trueMiddleware The middleware for the `true` case
   * @param {MiddlewareFn} falseMiddleware The middleware for the `false` case
   * @return {MiddlewareFn}
   */
  static branch (predicate, trueMiddleware, falseMiddleware) {
    if (typeof predicate !== 'function') {
      return predicate ? trueMiddleware : falseMiddleware
    }
    return Composer.lazy((ctx) => Promise.resolve(predicate(ctx))
      .then((value) => value ? trueMiddleware : falseMiddleware))
  }

  static optional (predicate, ...fns) {
    return Composer.branch(predicate, Composer.compose(fns), Composer.safePassThru())
  }

  static filter (predicate) {
    return Composer.branch(predicate, Composer.safePassThru(), () => { })
  }

  static drop (predicate) {
    return Composer.branch(predicate, () => { }, Composer.safePassThru())
  }

  static dispatch (routeFn, handlers) {
    return typeof routeFn === 'function'
      ? Composer.lazy((ctx) => Promise.resolve(routeFn(ctx)).then((value) => handlers[value]))
      : handlers[routeFn]
  }

  static mount (updateType, ...fns) {
    const updateTypes = remapMessageSubtypes(normalizeTextArguments(updateType))
    const predicate = (ctx) => updateTypes.includes(ctx.updateType) || updateTypes.some((type) => ctx.updateSubTypes.includes(type))
    return Composer.optional(predicate, ...fns)
  }

  static entity (predicate, ...fns) {
    if (typeof predicate !== 'function') {
      const entityTypes = normalizeTextArguments(predicate)
      return Composer.entity(({ type }) => entityTypes.includes(type), ...fns)
    }
    return Composer.optional((ctx) => {
      const message = ctx.message || ctx.channelPost
      const entities = getEntities(message)
      const text = getText(message)
      return entities && entities.some((entity) =>
        predicate(entity, text.substring(entity.offset, entity.offset + entity.length), ctx)
      )
    }, ...fns)
  }

  static entityText (entityType, predicate, ...fns) {
    if (fns.length === 0) {
      return Array.isArray(predicate)
        ? Composer.entity(entityType, ...predicate)
        : Composer.entity(entityType, predicate)
    }
    const triggers = normalizeTriggers(predicate)
    return Composer.entity(({ type }, value, ctx) => {
      if (type !== entityType) {
        return false
      }
      for (const trigger of triggers) {
        ctx.match = trigger(value, ctx)
        if (ctx.match) {
          return true
        }
      }
    }, ...fns)
  }

  static customEmoji (customEmoji, ...fns) {
    return Composer.entityText('custom_emoji', customEmoji, ...fns)
  }

  static email (email, ...fns) {
    return Composer.entityText('email', email, ...fns)
  }

  static phone (number, ...fns) {
    return Composer.entityText('phone_number', number, ...fns)
  }

  static url (url, ...fns) {
    return Composer.entityText('url', url, ...fns)
  }

  static textLink (link, ...fns) {
    return Composer.entityText('text_link', link, ...fns)
  }

  static textMention (mention, ...fns) {
    return Composer.entityText('text_mention', mention, ...fns)
  }

  static mention (mention, ...fns) {
    return Composer.entityText('mention', normalizeTextArguments(mention, '@'), ...fns)
  }

  static hashtag (hashtag, ...fns) {
    return Composer.entityText('hashtag', normalizeTextArguments(hashtag, '#'), ...fns)
  }

  static cashtag (cashtag, ...fns) {
    return Composer.entityText('cashtag', normalizeTextArguments(cashtag, '$'), ...fns)
  }

  static spoiler (text, ...fns) {
    return Composer.entityText('spoiler', text, ...fns)
  }

  static match (triggers, ...fns) {
    return Composer.optional((ctx) => {
      const text = getText(ctx.message) ||
        getText(ctx.channelPost) ||
        getText(ctx.callbackQuery) ||
        (ctx.inlineQuery && ctx.inlineQuery.query)
      for (const trigger of triggers) {
        ctx.match = trigger(text, ctx)
        if (ctx.match) {
          return true
        }
      }
    }, ...fns)
  }

  static hears (triggers, ...fns) {
    return Composer.mount('text', Composer.match(normalizeTriggers(triggers), ...fns))
  }

  static command (command, ...fns) {
    if (fns.length === 0) {
      return Composer.entity('bot_command', command)
    }
    const commands = normalizeTextArguments(command, '/')
    return Composer.mount(['message', 'channel_post'], Composer.lazy((ctx) => {
      const groupCommands = ctx.me && (ctx.chat.type === 'group' || ctx.chat.type === 'supergroup')
        ? commands.map((command) => `${command}@${ctx.me}`)
        : []
      return Composer.entity(({ offset, type }, value) =>
        offset === 0 &&
        type === 'bot_command' &&
        (commands.includes(value) || groupCommands.includes(value))
      , ...fns)
    }))
  }

  static action (triggers, ...fns) {
    return Composer.mount('callback_query', Composer.match(normalizeTriggers(triggers), ...fns))
  }

  static inlineQuery (triggers, ...fns) {
    return Composer.mount('inline_query', Composer.match(normalizeTriggers(triggers), ...fns))
  }

  static acl (userId, ...fns) {
    if (typeof userId === 'function') {
      return Composer.optional(userId, ...fns)
    }
    const allowed = Array.isArray(userId) ? userId : [userId]
    return Composer.optional((ctx) => !ctx.from || allowed.includes(ctx.from.id), ...fns)
  }

  static memberStatus (status, ...fns) {
    const statuses = Array.isArray(status) ? status : [status]
    return Composer.optional((ctx) => ctx.message && ctx.getChatMember(ctx.message.from.id)
      .then(member => member && statuses.includes(member.status))
    , ...fns)
  }

  static admin (...fns) {
    return Composer.memberStatus(['administrator', 'creator'], ...fns)
  }

  static creator (...fns) {
    return Composer.memberStatus('creator', ...fns)
  }

  static chatType (type, ...fns) {
    const types = Array.isArray(type) ? type : [type]
    return Composer.optional((ctx) => {
      const chat = ctx.chat
      return chat !== undefined && types.includes(chat.type)
    }, ...fns)
  }

  static privateChat (...fns) {
    return Composer.chatType('private', ...fns)
  }

  static groupChat (...fns) {
    return Composer.chatType(['group', 'supergroup'], ...fns)
  }

  static gameQuery (...fns) {
    return Composer.mount('callback_query', Composer.optional((ctx) => ctx.callbackQuery.game_short_name, ...fns))
  }

  /**
   * > ❗️ **This is an advanced method of Opengram.**
   *
   * Method used for unwrapping middleware, when middleware has method with name `middleware` (middleware factory)
   * {@link Composer.unwrap} calls him and return result
   *
   * This method used in some other {@link Composer} methods, like {@link Composer.compose}, {@link Composer.lazy} and other
   *
   * @param handler
   *
   * @throws {Error}
   * @return {MiddlewareFn}
   */
  static unwrap (handler) {
    if (!handler) {
      throw new Error('Handler is undefined')
    }
    return typeof handler.middleware === 'function'
      ? handler.middleware()
      : handler
  }

  static compose (middlewares) {
    if (!Array.isArray(middlewares)) {
      throw new Error('Middlewares must be an array')
    }
    if (middlewares.length === 0) {
      return Composer.safePassThru()
    }
    if (middlewares.length === 1) {
      return Composer.unwrap(middlewares[0])
    }
    return (ctx, next) => {
      let index = -1
      return execute(0, ctx)
      async function execute (i, context) {
        if (!(context instanceof Context)) {
          throw new Error('next(ctx) called with invalid context')
        }
        if (i <= index) {
          throw new Error('next() called multiple times')
        }
        index = i
        const handler = middlewares[i] ? Composer.unwrap(middlewares[i]) : next
        if (!handler) {
          return
        }

        await handler(context, async (ctx = context) => {
          await execute(i + 1, ctx)
        })
      }
    }
  }
}

function normalizeTriggers (triggers) {
  if (!Array.isArray(triggers)) {
    triggers = [triggers]
  }
  return triggers.map((trigger) => {
    if (!trigger) {
      throw new Error('Invalid trigger')
    }
    if (typeof trigger === 'function') {
      return trigger
    }
    if (trigger instanceof RegExp) {
      return (value) => {
        trigger.lastIndex = 0
        return trigger.exec(value || '')
      }
    }
    return (value) => trigger === value ? value : null
  })
}

function normalizeTextArguments (argument, prefix) {
  const args = Array.isArray(argument) ? argument : [argument]
  return args
    .filter(Boolean)
    .map((arg) => prefix && typeof arg === 'string' && !arg.startsWith(prefix) ? `${prefix}${arg}` : arg)
}

function remapMessageSubtypes (subTypes) {
  return subTypes
    .map((type) => MessageSubTypesMapping[type] || type)
}

module.exports = Composer

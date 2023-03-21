const Composer = require('../composer')
const { compose } = Composer

/**
 * BaseScene class
 *
 * **Basic example:**
 *
 * ```js
 * const { Scenes: { BaseScene }, Stage, session, Opengram } = require('opengram')
 *
 * // Scene
 * const firstScene = new BaseScene('FIRST_SCENE')
 *
 * // Enter handler called when user enters to scene
 * firstScene.enter(async ctx => {
 *   await ctx.reply('Hi')
 * })
 *
 * // Enter handler called when user leave scene or TTL expired
 * firstScene.leave(async ctx => {
 *   await ctx.reply('Bye')
 * })
 *
 * // You can use all Composer methods like action, hears, on, filter, etc.
 * // Scenes handlers just middlewares and can use next function
 * firstScene.hears('hi', async ctx => {
 *   await ctx.reply('Hello')
 * })
 *
 * firstScene.hears('/cancel', async ctx => {
 *   await ctx.scene.leave()
 * })
 *
 * // if message not contains "hi" and "/cancel"
 * firstScene.on('message', async ctx => {
 *   await ctx.replyWithMarkdown('Send `hi` or /cancel')
 * })
 *
 * const bot = new Opengram(process.env.BOT_TOKEN)
 *
 * // Create Stage instance, register scenes (scenes MUST be registered before bot starts)
 * const stage = new Stage([firstScene], {
 *   // Defines scenes TTL, after expires leave handler called & user removed from scene
 *   ttl: 10
 * })
 *
 * // Register session middleware (Stage uses session for saving state, sessions MUST be registered before Stage)
 * bot.use(session())
 * bot.use(stage) // Register stage middleware
 * bot.command('myscene', ctx => ctx.scene.enter('FIRST_SCENE'))
 * bot.on('message', ctx => ctx.reply('Try /myscene'))
 *
 * bot.launch()
 * ```
 *
 * @class
 * @memberof Scenes
 * @extends Composer
 */

class BaseScene extends Composer {
  constructor (id, options) {
    const opts = {
      handlers: [],
      enterHandlers: [],
      leaveHandlers: [],
      ...options
    }
    super(...opts.handlers)
    /** @type {string} **/
    this.id = id
    this.options = opts
    this.enterHandler = compose(opts.enterHandlers)
    this.leaveHandler = compose(opts.leaveHandlers)
  }

  set ttl (value) {
    this.options.ttl = value
  }

  get ttl () {
    return this.options.ttl
  }

  /**
   * Registers enter handler(s) for scene
   *
   * @param {Middleware} fns Middleware(s) to register
   * @return {BaseScene}
   */
  enter (...fns) {
    this.enterHandler = compose([this.enterHandler, ...fns])
    return this
  }

  /**
   * Registers leave handler(s) for scene
   *
   * @param {Middleware} fns Middleware(s) to register
   * @return {BaseScene}
   */
  leave (...fns) {
    this.leaveHandler = compose([this.leaveHandler, ...fns])
    return this
  }

  /**
   * Returns enter handler composed with `enter` middlewares
   *
   * @private
   * @return {Middleware}
   */
  enterMiddleware () {
    return this.enterHandler
  }

  /**
   * Returns enter handler composed with `leave` middlewares
   *
   * @private
   * @return {Middleware}
   */
  leaveMiddleware () {
    return this.leaveHandler
  }
}

module.exports = BaseScene

const SceneContext = require('./scenes/context')
const Composer = require('./composer')
const { compose, optional, lazy, safePassThru } = Composer

/**
 * The Stage class extends Composer, so you can use all of its methods such as `hears`, `use`, `command` Catch and more.
 *
 * These handlers have a higher priority than scene handlers, but they are always executed,
 * not only then the user is in the scene.
 *
 * <b style="color: #139d9d" >Be attentive, scenes are only available in handlers and middleware registered after Stage</b>
 *
 * For example:
 *
 * ```js
 * const { Stage, Opengram } = require('opengram')
 * const bot = new Opengram(process.env.BOT_TOKEN)
 * const stage = new Stage([...]) // Create Stage instance and register scenes
 *
 * bot.use(stage.middleware())
 * bot.start(async(ctx) => {
 *   await ctx.reply('Hello!')
 *   await ctx.scene.enter('name')
 * })
 *
 * // This handler has more priority than scenes handlers and `bot.start` (because Stage registered before bot.start)
 * stage.on('message', async(ctx, next) => {
 *   console.log(ctx.message.text)
 *   await next()
 * })
 *
 * bot.launch()
 * ```
 *
 * @extends Composer
 */
class Stage extends Composer {
  /**
   * @constructor
   * @param {Array<BaseScene|WizardScene>} [scenes] Array of scenes objects
   * @param {StageOptions} [options] Options
   * @throws {TypeError}
   */
  constructor (scenes = [], options) {
    super()
    this.options = {
      sessionName: 'session',
      ...options
    }
    this.scenes = new Map()
    scenes.forEach((scene) => this.register(scene))
  }

  /**
   * Register new scene object in scenes repository
   *
   * @param {BaseScene|WizardScene} [scenes] Scenes objects
   * @throws {TypeError}
   * @return {Stage}
   */
  register (...scenes) {
    scenes.forEach((scene) => {
      if (!scene || !scene.id || typeof scene.middleware !== 'function') {
        throw new TypeError('opengram: Unsupported scene')
      }
      this.scenes.set(scene.id, scene)
    })
    return this
  }

  /**
   * Generates and returns stage middleware  for embedding
   *
   * @return {MiddlewareFn}
   */
  middleware () {
    const handler = compose([
      (ctx, next) => {
        ctx.scene = new SceneContext(ctx, this.scenes, this.options)
        return next()
      },
      super.middleware(),
      lazy((ctx) => ctx.scene.current || safePassThru())
    ])
    return optional((ctx) => ctx[this.options.sessionName], handler)
  }

  /**
   * Generates middleware which call `ctx.scene.enter` with given arguments
   *
   * @param args Arguments for `ctx.scene.enter`
   * @return {Function}
  */
  static enter (...args) {
    return (ctx) => ctx.scene.enter(...args)
  }

  /**
   * Generates middleware which call `ctx.scene.reenter` with given arguments
   *
   * @param args Arguments for `ctx.scene.reenter`
   * @return {Function}
   */
  static reenter (...args) {
    return (ctx) => ctx.scene.reenter(...args)
  }

  /**
   * Generates middleware which call `ctx.scene.leave` with given arguments
   *
   * @param args Arguments for `ctx.scene.leave`
   * @return {Function}
   */
  static leave (...args) {
    return (ctx) => ctx.scene.leave(...args)
  }
}

module.exports = Stage

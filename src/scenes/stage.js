const SceneContext = require('../scenes/context')
const Composer = require('../composer')
const { compose, optional, lazy, safePassThru } = Composer

/**
 * The default scene is the scene that is entered when the user is not in another scene.
 *
 * When you use custom name of session property or multiple sessions, you should configure `sessionName`
 *
 * After TTL expired, all scene data stored in local session of scene be permanently removed
 *
 * @typedef {object} StageOptions
 * @property {string} [sessionName='session'] Name of session property used for scenes, by default - `session`
 * @property {string} [default] Name of scene by default
 * @property {number} [ttl] Time of life for scenes in seconds
 * @memberOf Scenes
 */

/**
 * The Stage class extends Composer, so you can use all of its methods such as `hears`, `use`, `command` Catch and
 * more.
 *
 * These handlers have a higher priority than scene handlers, but they are always executed,
 * not only then the user is in the scene.
 *
 * <b style="color: #139d9d" >Be attentive, scenes are only available in handlers and middleware registered after
 * Stage</b>
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
 * @memberof Scenes
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
   * @param {string} sceneId Scene name
   * @param {object} [initialState] Scene initial state
   * @param {boolean} [silent] ???
   * @throws {Error}
   * @return {Promise}
   * @return {MiddlewareFn}
  */
  static enter (sceneId, initialState, silent) {
    return (ctx) => ctx.scene.enter(sceneId, initialState, silent)
  }

  /**
   * Generates middleware which call `ctx.scene.reenter` with given arguments
   *
   * @return {MiddlewareFn}
   */
  static reenter () {
    return (ctx) => ctx.scene.reenter()
  }

  /**
   * Generates middleware which call `ctx.scene.leave` with given arguments
   *
   * @return {MiddlewareFn}
   */
  static leave () {
    return (ctx) => ctx.scene.leave()
  }
}

module.exports = Stage

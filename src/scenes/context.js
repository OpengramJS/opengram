const debug = require('debug')('opengram:scenes:context')
const Composer = require('../composer')

const noop = () => Promise.resolve()
const now = () => Math.floor(Date.now() / 1000)

/**
 * @class
 * @memberof Scenes
 */
class SceneContext {
  constructor (ctx, scenes, options) {
    /** @type {OpengramContext} */
    this.ctx = ctx
    /** @type {Map<string, Scenes.WizardScene|Scenes.BaseScene>} */
    this.scenes = scenes
    /** @type {boolean} */
    this.leaving = false
    /** @type {StageOptions} */
    this.options = options
  }

  /**
   * Getter returns current scene session object
   *
   * @return {object}
  */
  get session () {
    const sessionName = this.options.sessionName
    let session = this.ctx[sessionName].__scenes || {}
    if (session.expires < now()) {
      session = {}
    }
    this.ctx[sessionName].__scenes = session
    return session
  }

  /**
   * Getter returns state of current scene
   *
   * @return {object}
   */
  get state () {
    this.session.state = this.session.state || {}
    return this.session.state
  }

  /**
   * Setter sets state of current scene
   *
   * @param {object} value New state value
   */
  set state (value) {
    this.session.state = { ...value }
  }

  /**
   * @return {undefined|Scenes.WizardScene|Scenes.BaseScene}
   */
  get current () {
    const sceneId = this.session.current || this.options.default
    return sceneId === undefined || !this.scenes.has(sceneId)
      ? undefined
      : this.scenes.get(sceneId)
  }

  /**
   * Resets scenes data
   *
   * @return {void}
   */
  reset () {
    const sessionName = this.options.sessionName
    delete this.ctx[sessionName].__scenes
  }

  /**
   * Enter to scene by name
   *
   * Use `initialState` to pass some initial data of `ctx.scene.state`
   *
   * @param {string} sceneId Scene name
   * @param {object} [initialState] Scene initial state
   * @param {boolean} [silent] If true, enters to given scene without calling `enter`handler, and without calling `leave` handler for current scene (if user currently in scene)
   * @throws {Error}
   * @return {Promise}
   */
  async enter (sceneId, initialState, silent) {
    if (!sceneId || !this.scenes.has(sceneId)) {
      throw new Error(`Can't find scene: ${sceneId}`)
    }

    if (!silent) {
      await this.leave()
    }

    debug('Entering scene', sceneId, initialState, silent)
    this.session.current = sceneId
    this.state = initialState
    const ttl = this.current.ttl || this.options.ttl

    if (ttl) {
      this.session.expires = now() + ttl
    }

    if (!this.current || silent) {
      return
    }

    const handler =
      'enterMiddleware' in this.current &&
      typeof this.current.enterMiddleware === 'function'
        ? this.current.enterMiddleware()
        : this.current.middleware()
    return await handler(this.ctx, noop)
  }

  /**
   * Used for re-entering to current scene without destroying `ctx.scene.state`
   *
   * @throws {Error}
   * @return {Promise}
   */
  reenter () {
    return this.enter(this.session.current, this.state)
  }

  /**
   * Used to exit the current scene
   *
   * @return {Promise<void>}
   */
  async leave () {
    if (this.leaving) return
    debug('Leaving scene')
    try {
      this.leaving = true

      if (this.current === undefined) {
        return
      }

      const handler =
        'leaveMiddleware' in this.current &&
        typeof this.current.leaveMiddleware === 'function'
          ? this.current.leaveMiddleware()
          : Composer.passThru()

      await handler(this.ctx, noop)

      return this.reset()
    } finally {
      this.leaving = false
    }
  }
}

module.exports = SceneContext

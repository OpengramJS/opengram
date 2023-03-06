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
    /** @type {Map<string, WizardScene|BaseScene>} */
    this.scenes = scenes
    /** @type {boolean} */
    this.leaving = false
    this.options = options
  }

  get session () {
    const sessionName = this.options.sessionName
    let session = this.ctx[sessionName].__scenes || {}
    if (session.expires < now()) {
      session = {}
    }
    this.ctx[sessionName].__scenes = session
    return session
  }

  get state () {
    this.session.state = this.session.state || {}
    return this.session.state
  }

  set state (value) {
    this.session.state = { ...value }
  }

  /**
   * @return {undefined|WizardScene|BaseScene}
   */
  get current () {
    const sceneId = this.session.current || this.options.default
    return sceneId === undefined || !this.scenes.has(sceneId)
      ? undefined
      : this.scenes.get(sceneId)
  }

  /**
   * @return {void}
   */
  reset () {
    const sessionName = this.options.sessionName
    delete this.ctx[sessionName].__scenes
  }

  /**
   * Enter to scene
   *
   * @param {string} sceneId Scene name
   * @param {object} [initialState] Scene initial state
   * @param {boolean} [silent] ???
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

  reenter () {
    return this.enter(this.session.current, this.state)
  }

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

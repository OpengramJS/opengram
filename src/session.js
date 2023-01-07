const debug = require('debug')('opengram:session')

const storeSym = Symbol('store')
const ttlSym = Symbol('ttl')
const propSym = Symbol('property')
const keyGeneratorFnSym = Symbol('keyGeneratorFn')
const storeSetMethodSym = Symbol('storeSetMethod')

function getSessionKey (ctx) {
  return ctx.from && ctx.chat && `${ctx.from.id}:${ctx.chat.id}`
}

/**
 * @typedef {object} SessionOptions
 * @property {Function} [getSessionKey] Function for generating session key.
 * @property {string} [property] Sets session property name in context
 * @property {number} [ttl] Time to live
 * @property {object} [store] Store
 */

class Session {
  /**
   * Constructor of session class
   *
   * @param {SessionOptions} [options] Options
   */
  constructor (options = {}) {
    this[storeSym] = options.store ?? new Map()
    this[propSym] = options.property ?? 'session'
    this[keyGeneratorFnSym] = options.getSessionKey ?? getSessionKey
    this[ttlSym] = options.ttl && options.ttl * 1000
    this[storeSetMethodSym] = typeof this[storeSym].put === 'function' ? 'put' : 'set'
  }

  /**
   * Store getter
   *
   * Return store object given in constructor
   *
   * @return {object}
   */
  get store () {
    return this[storeSym]
  }

  /**
   * TTL getter
   *
   * Returns current ttl in **seconds** or `undefined` value
   *
   * @return {number|undefined}
   */
  get ttl () {
    return this[ttlSym]
  }

  /**
   * TTL setter
   *
   * Sets new ttl for session
   *
   * @return {void}
   */
  set ttl (seconds) {
    this[ttlSym] = seconds
  }

  /**
   * Returns session middleware
   *
   * @return {MiddlewareFn}
   */
  middleware () {
    const method = this[storeSetMethodSym]
    const prop = this[propSym]
    const getSessionKey = this[keyGeneratorFnSym]

    return async (ctx, next) => {
      const key = getSessionKey(ctx)

      const wrapSession = (targetSessionObject) => (
        new Proxy({ ...targetSessionObject }, {
          set: (target, prop, value) => {
            target[prop] = value

            return true
          },

          deleteProperty: (target, prop) => {
            delete target[prop]
            return true
          }
        })
      )

      if (!key) {
        return next(ctx)
      }

      const now = Date.now()

      const state = await Promise.resolve(
        this.store.get(key)
      ) || { session: {} }

      let { session, expires } = state

      // Wrap session to Proxy
      session = wrapSession(session)

      debug('session snapshot', key, session)

      if (expires && expires < now) {
        debug('session expired', key)
        session = {}
      }

      Object.defineProperty(ctx, prop, {
        get: () => session,
        set: (newSession) => {
          // Wrap session to Proxy
          session = wrapSession(newSession)
        }
      })

      const result = await next(ctx)

      debug('save session', key, session)
      await Promise.resolve(
        this.store[method](key, {
          session,
          expires: this.ttl ? now + this.ttl : null
        })
      )
      debug('session saved', key, session)

      return result
    }
  }
}

/**
 * Creates session middleware with given store and options
 *
 * ### Custom session property
 * You can set custom session property using `property` option
 *
 * ```js
 * bot.use(
 *   session({
 *     property: 'propName'
 *   })
 * )
 * ```
 * For this example, session available in `ctx.propName`
 *
 * ### Custom session key
 * By default, session key in storage generated with this function:
 * ```js
 * (ctx) => {
 *  return ctx.from && ctx.chat && `${ctx.from.id}:${ctx.chat.id}`
 * }
 * ```
 *
 * For example, you can redefine this function for storing session with chat key, like this:
 * ```js
 * (ctx) => {
 *  return ctx.chat && `${ctx.chat.id}`
 * }
 * ```
 *
 * If you don't want to add session object, you can return `null` or `undefined` from this function.
 *
 * For example, session working only in chat updates:
 * ```js
 * (ctx) => {
 *  if (ctx.chat.type === 'private') return null // When chat type is private `ctx.session` not available
 *  return ctx.chat && `${ctx.chat.id}`
 * }
 * ```
 *
 * ### TTL ( Time to live)
 * This parameter can set in `ttl` option in **seconds**, expire time of session,
 * by default session time not limited, but if you use in memory store like
 * [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) or other,
 * session be destroyed after bot restart
 *
 * @param {SessionOptions} [options] Session options
 * @return {Session}
 */
function sessionFactory (options) {
  return new Session(options)
}

module.exports = sessionFactory

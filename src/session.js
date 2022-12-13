const debug = require('debug')('opengram:session')

const store = Symbol('store')
const ttl = Symbol('ttl')

function getSessionKey (ctx) {
  return ctx.from && ctx.chat && `${ctx.from.id}:${ctx.chat.id}`
}

/**
 * @typedef {object} SessionOptions
 * @property {object} [options] Options object
 * @property {Function} [options.getSessionKey] Function for generating session key.
 * @property {string} [options.property] Sets session property name in context
 * @property {number} [options.ttl] Time to live
 */

class Session {
  /**
   * Constructor of session class
   *
   * @param {SessionOptions} [options] Options
   */
  constructor (options = {}) {
    this[store] = options.store ?? new Map()
    this._property = options.property ?? 'session'
    this._getSessionKey = options.getSessionKey ?? getSessionKey
    this[ttl] = options.ttl && options.ttl * 1000
    this.setMethodName = typeof this[store].put === 'function' ? 'put' : 'set'
  }

  /**
   * Store getter
   *
   * Return store object given in constructor
   *
   * @return {object}
   */
  get store () {
    return this[store]
  }

  /**
   * TTL getter
   *
   * Returns current ttl in **seconds** or [Nullish](https://developer.mozilla.org/en-US/docs/Glossary/Nullish) value
   *
   * @return {number|null|undefined}
   */
  get ttl () {
    return this[ttl]
  }

  /**
   * TTL setter
   *
   * Sets new ttl for session
   *
   * @return {void}
   */
  set ttl (seconds) {
    this[ttl] = seconds
  }

  /**
   * Returns session middleware
   *
   * @return {MiddlewareFn}
   */
  middleware () {
    return async (ctx, next) => {
      const key = this._getSessionKey(ctx)

      let sessionChanged = false

      const wrapSession = (targetSessionObject) => (
        new Proxy({ ...targetSessionObject }, {
          set: (target, prop, value) => {
            sessionChanged = true
            target[prop] = value

            return true
          },

          deleteProperty: (target, prop) => {
            sessionChanged = true
            delete target[prop]
            return true
          }
        })
      )

      if (!key) {
        return next(ctx)
      }

      const now = Date.now()

      const state = await Promise.resolve(this.store.get(key)) || { session: {} }
      let { session, expires } = state

      // Wrap session to Proxy
      session = wrapSession(session)

      debug('session snapshot', key, session)

      if (expires && expires < now) {
        debug('session expired', key)
        session = {}
      }

      Object.defineProperty(ctx, this._property, {
        get: () => session,
        set: (newSession) => {
          // Wrap session to Proxy
          session = wrapSession(newSession)
          sessionChanged = true
        }
      })

      const result = await next(ctx)

      debug('save session', key, session)
      if (sessionChanged) {
        await Promise.resolve(
          this[store][this.setMethodName](key, {
            session,
            expires: this.ttl ? now + this.ttl : null
          })
        )
      }

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
 *     property: 'myprop'
 *   })
 * )
 * ```
 * For this example, session available in `ctx.myprop`
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

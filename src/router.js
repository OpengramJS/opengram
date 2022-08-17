const { compose, lazy, passThru } = require('./composer')

/**
 * {@link Router} is used to direct the flow of update. It accepts as arguments a routing function and, optionally,
 * a [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
 * with predefined routes and handlers. Routing function accepts {@link OpengramContext context}
 * and return object with route property set to String value. Handler for a specific route is just another middleware.
 *
 * As `Router` object is itself a middleware, routers can be nested, e.g., `router1.on('yo', router2)`.
 * Thus, they allow for very deep, well-structured and flexible logic of updates processing.
 * Possible use-cases include multilevel menus, setting different levels of access for bot users and much, much more
 *
 * ```js
 * const { Router } = require('opengram')
 *
 * // Can be any function that returns { route: String }
 * function routeFn(ctx) {
 *   return { route: ctx.updateType }
 * }
 *
 * const router = new Router(routeFn)
 *
 * // Registering 'callback_query' route
 * const middlewareCb = function (ctx, next) { ... }
 * router.on('callback_query', middlewareCb)
 *
 * // Registering 'message' route
 * const middlewareMessage = new Composer(...)
 * router.on('message', middlewareMessage)
 *
 * // Setting handler for routes that are not registered
 * const middlewareDefault = someOtherRouter
 * router.otherwise(middlewareDefault).
 * ```
 */
class Router {
  /**
   * Constructs a router with a routing function and optionally some
   * preinstalled middlewares.
   *
   * Note that you can always install more middlewares on the router by calling {@link Router#on}.
   *
   * @param {function} routeFn A routing function that decides which middleware to run
   * @param {Map<MiddlewareFn>} [routeHandlers] A number of middlewares
   */
  constructor (routeFn, routeHandlers = new Map()) {
    if (typeof routeFn !== 'function') {
      throw new Error('Missing routing function')
    }
    this.routeFn = routeFn
    this.handlers = routeHandlers
    this.otherwiseHandler = passThru()
  }

  /**
   * Registers new middleware for a given route. The initially supplied routing
   * function may return this route as a string to select the respective
   * middleware for execution for an incoming update.
   *
   * @param {string} route The route for which to register the middleware
   * @param {MiddlewareFn} fns Middleware(s) to register
   * @return {Router}
   */
  on (route, ...fns) {
    if (fns.length === 0) {
      throw new TypeError('At least one handler must be provided')
    }
    this.handlers.set(route, compose(fns))
    return this
  }

  otherwise (...fns) {
    if (fns.length === 0) {
      throw new TypeError('At least one otherwise handler must be provided')
    }
    this.otherwiseHandler = compose(fns)
    return this
  }

  middleware () {
    return lazy((ctx) => {
      const result = this.routeFn(ctx)
      if (result == null) {
        return this.otherwiseHandler
      }
      Object.assign(ctx, result.context)
      Object.assign(ctx.state, result.state)
      return this.handlers.get(result.route) || this.otherwiseHandler
    })
  }
}

module.exports = Router

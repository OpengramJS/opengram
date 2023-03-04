/**
 * Middleware factory function
 *
 * @param {object} i18next I18next instance
 * @return {MiddlewareFn}
 */
function i18n (i18next) {
  async function i18nextMiddleware (ctx, next) {
    // Getting the locale from the session or from the user object (client locale)
    const userLocale = ctx.session?.locale ?? ctx.from.language_code

    // Clone i18next instance
    const i18n = i18next.cloneInstance({ initImmediate: false, lng: userLocale })

    // Registering event for support i18next.changeLanguage()
    i18n.on('languageChanged', lng => {
      ctx.session.locale = lng
    })

    // Adds i18next to context
    ctx.i18n = i18n
    await next()
  }

  return i18nextMiddleware
}

/**
 * Trigger function factory for match strings in current user locale dynamically
 *
 * @param {string} resourceKey I18next key
 * @param {object} [templateData] Data for I18next template interpolation
 * @return {Trigger}
 */
function match (resourceKey, templateData) {
  /**
   * @param {string} text Text of message
   * @param {OpengramContext} ctx Update context
   * @return {Array<string>|null}
   */
  function trigger (text, ctx) {
    // Create trigger function
    return (text && ctx?.i18n && text === ctx.i18n.t(resourceKey, templateData)) ? [text] : null
  }

  return trigger
}

/**
 * Create middleware which replies with i18next string by key
 *
 * @param {string} resourceKey I18next key
 * @param {object} [extra] Other params for `ctx.reply`
 * @return {Function<Promise>}
 */
function reply (resourceKey, extra) {
  return async function (ctx) {
    return ctx.reply(ctx.i18n.t(resourceKey), extra)
  }
}

module.exports = { i18n, match, reply }

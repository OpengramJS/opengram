const debug = require('debug')('opengram:webhook')
const { timingSafeEqual } = require('../helpers/utils')

module.exports = function (config, updateHandler, errorHandler) {
  return async (req, res, next) => {
    debug('Incoming request', req.method, req.url)
    const secretHeader = req.headers['x-telegram-bot-api-secret-token']

    if (
      req.method !== 'POST' || (
        (config.secret !== undefined && config.path === req.url && !timingSafeEqual(config.secret, secretHeader)) ||
        !timingSafeEqual(config.path, req.url)
      )
    ) {
      if (typeof next === 'function') {
        return next()
      }
      res.statusCode = 403
      return res.end()
    }

    let update

    if (req.body != null) {
      update = req.body
      await updateHandler(update, res)
      return
    }

    let body = ''
    for await (const chunk of req) {
      body += String(chunk)
    }

    try {
      update = JSON.parse(body)
    } catch (error) {
      res.writeHead(415)
      res.end()
      return errorHandler(error)
    }

    await updateHandler(update, res)
  }
}

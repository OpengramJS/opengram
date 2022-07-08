const debug = require('debug')('opengram:webhook')
const crypto = require('crypto')

/**
 * Call native "crypto.timingSafeEqual" methods.
 * All passed values will be converted into strings first.
 *
 * Runtime is always corresponding to the length of the first parameter (string
 * a).
 * @author Michael Raith
 * @param {string} a
 * @param {string} b
 *
 * @return {boolean}
 */
function timingSafeEqual (a, b) {
  const strA = String(a)
  const strB = String(b)
  const aLen = Buffer.byteLength(strA)
  const bLen = Buffer.byteLength(strB)

  // Always use length of a to avoid leaking the length. Even if this is a
  // false positive because one is a prefix of the other, the explicit length
  // check at the end will catch that.
  const bufA = Buffer.allocUnsafe(aLen)
  bufA.write(strA)
  const bufB = Buffer.allocUnsafe(aLen)
  bufB.write(strB)

  return crypto.timingSafeEqual(bufA, bufB) && aLen === bLen
}

module.exports = function (hookPath, updateHandler, errorHandler) {
  return async (req, res, next) => {
    debug('Incoming request', req.method, req.url)
    if (req.method !== 'POST' || !timingSafeEqual(hookPath, req.url)) {
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

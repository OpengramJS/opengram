const debug = require('debug')('opengram:core')
const Telegram = require('./telegram')
const Extra = require('./extra')
const Composer = require('./composer')
const Markup = require('./markup')
const session = require('./session')
const Router = require('./router')
const Stage = require('./stage')
const BaseScene = require('./scenes/base')
const Context = require('./context')
const generateCallback = require('./core/network/webhook')
const crypto = require('crypto')
const { URL } = require('url')
const { TelegramError } = require('./core/network/error')
const pTimeout = require('p-timeout')
const { compactOptions } = require('./core/helpers/compact')

const DEFAULT_OPTIONS = {
  retryAfter: 1,
  handlerTimeout: Infinity,
  contextType: Context
}

const noop = () => { }

class Opengram extends Composer {
  constructor (token, options) {
    super()
    this.options = {
      ...DEFAULT_OPTIONS,
      ...compactOptions(options)
    }
    this.token = token
    this.handleError = async err => {
      console.error()
      console.error((err.stack || err.toString()).replace(/^/gm, '  '))
      console.error()
      throw err
    }
    this.context = {}
    this.polling = {
      offset: 0,
      started: false
    }
  }

  set token (token) {
    this.telegram = new Telegram(token, this.telegram
      ? this.telegram.options
      : this.options.telegram
    )
  }

  get token () {
    return this.telegram.token
  }

  set webhookReply (webhookReply) {
    this.telegram.webhookReply = webhookReply
  }

  get webhookReply () {
    return this.telegram.webhookReply
  }/* eslint brace-style: 0 */

  catch (handler) {
    this.handleError = handler
    return this
  }

  webhookCallback (path = '/') {
    return generateCallback(path, (update, res) => this.handleUpdate(update, res), debug)
  }

  startPolling (timeout = 30, limit = 100, allowedUpdates, stopCallback = noop) {
    this.polling.timeout = timeout
    this.polling.limit = limit
    this.polling.allowedUpdates = allowedUpdates
      ? Array.isArray(allowedUpdates) ? allowedUpdates : [`${allowedUpdates}`]
      : null
    this.polling.stopCallback = stopCallback
    if (!this.polling.started) {
      this.polling.started = true
      this.fetchUpdates()
    }
    return this
  }

  startWebhook (hookPath, tlsOptions, port, host, cb) {
    const webhookCb = this.webhookCallback(hookPath)
    const callback = cb && typeof cb === 'function'
      ? (req, res) => webhookCb(req, res, () => cb(req, res))
      : webhookCb
    this.webhookServer = tlsOptions != null
      ? require('https').createServer(tlsOptions, callback)
      : require('http').createServer(callback)
    this.webhookServer.listen(port, host, () => {
      debug('Webhook listening on port: %s', port)
    })
    return this
  }

  secretPathComponent () {
    return crypto
      .createHash('sha3-256')
      .update(this.token)
      .update(process.version) // salt
      .digest('hex')
  }

  async launch (config = {}) {
    debug('Connecting to Telegram')

    const botInfo = await this.telegram.getMe()

    debug(`Launching @${botInfo.username}`)
    this.options.username = botInfo.username
    this.context.botInfo = botInfo
    if (!config.webhook) {
      const { timeout, limit, allowedUpdates, stopCallback } = config.polling || {}
      await this.telegram.deleteWebhook({ drop_pending_updates: config.dropPendingUpdates })
      await this.startPolling(timeout, limit, allowedUpdates, stopCallback)
      debug('Bot started with long-polling')
      return this
    }

    if (
      typeof config.webhook.domain !== 'string' &&
      typeof config.webhook.hookPath !== 'string'
    ) {
      throw new Error('Webhook domain or webhook path is required')
    }

    let domain = config.webhook.domain || ''

    if (domain.startsWith('https://') || domain.startsWith('http://')) {
      domain = new URL(domain).host
    }

    const hookPath = config.webhook.hookPath || `/telegraf/${this.secretPathComponent()}`
    const { port, host, tlsOptions, cb } = config.webhook
    this.startWebhook(hookPath, tlsOptions, port, host, cb)

    if (!domain) {
      debug('Bot started with webhook')
      return this
    }

    const webHookExtra = {
      drop_pending_updates: config.dropPendingUpdates,
      allowed_updates: config.allowedUpdates,
      ip_address: config.webhook.ipAddress,
      max_connections: config.webhook.maxConnections
    }

    await this.telegram.setWebhook(`https://${domain}${hookPath}`, webHookExtra)
    debug(`Bot started with webhook @ https://${domain}`)

    return this
  }

  async stop (cb = noop) {
    debug('Stopping bot...')
    await new Promise((resolve, reject) => {
      const done = () => resolve() & cb()
      if (this.webhookServer) {
        this.webhookServer.close((err) => {
          if (err) reject(err)
          else done()
        })
      } else if (!this.polling.started) {
        done()
      } else {
        this.polling.stopCallback = done
        this.polling.started = false
      }
    })
  }

  handleUpdates (updates) {
    if (!Array.isArray(updates)) {
      throw new Error('Updates must be an array')
    }
    return Promise.all(updates.map((update) => this.handleUpdate(update)))
  }

  async handleUpdate (update, webhookResponse) {
    debug('Processing update', update.update_id)
    const tg = new Telegram(this.token, this.telegram.options, webhookResponse)
    const OpengramContext = this.options.contextType
    const ctx = new OpengramContext(update, tg, this.options)
    Object.assign(ctx, this.context)

    try {
      await pTimeout(
        this.middleware()(ctx),
        this.options.handlerTimeout
      )
    } catch (err) {
      return await this.handleError(err, ctx)
    } finally {
      if (webhookResponse && webhookResponse.writableEnded === false) {
        webhookResponse.end()
      }
    }
  }

  async fetchUpdates () {
    if (!this.polling.started) {
      this.polling.stopCallback && this.polling.stopCallback()
      return
    }

    const { timeout, limit, offset, allowedUpdates } = this.polling

    let updates = []

    try {
      updates = await this.telegram.getUpdates(timeout, limit, offset, allowedUpdates)
    } catch (err) {
      if (err.code === 401 || err.code === 409) {
        throw err
      }

      const wait = (err.parameters && err.parameters.retry_after) || this.options.retryAfter
      console.error(`Failed to fetch updates. Waiting: ${wait}s`, err.message)

      updates = await new Promise(resolve => setTimeout(resolve, wait * 1000, []))
    }

    try {
      if (this.polling.started && updates.length) {
        await this.handleUpdates(updates)
        this.polling.offset = updates[updates.length - 1].update_id + 1
      }
    } catch (err) {
      console.error('Failed to process updates.', err)
      this.polling.started = false
      this.polling.offset = 0
    }

    this.fetchUpdates()
  }
}

module.exports = Object.assign(Opengram, {
  Context,
  TelegramError,
  Composer,
  default: Opengram,
  Extra,
  Markup,
  Router,
  Opengram,
  Telegram,
  Stage,
  BaseScene,
  session
})

const debug = require('debug')('opengram:client')
const crypto = require('crypto')
const fetch = require('node-fetch').default
const fs = require('fs')
const https = require('https')
const path = require('path')
const util = require('util')
const { TelegramError } = require('../error')
const MultipartStream = require('./multipart-stream')
const { compactOptions } = require('../helpers/compact')
const { isStream } = MultipartStream

const WEBHOOK_REPLY_METHOD_ALLOWLIST = new Set([
  'answerCallbackQuery',
  'answerInlineQuery',
  'deleteMessage',
  'leaveChat',
  'sendChatAction'
])

const DEFAULT_EXTENSIONS = {
  audio: 'mp3',
  photo: 'jpg',
  sticker: 'webp',
  video: 'mp4',
  animation: 'mp4',
  video_note: 'mp4',
  voice: 'ogg'
}

const DEFAULT_OPTIONS = {
  apiRoot: 'https://api.telegram.org',
  apiPrefix: 'bot',
  webhookReply: true,
  agent: new https.Agent({
    keepAlive: true,
    keepAliveMsecs: 10000
  }),
  attachmentAgent: undefined,
  testEnv: false
}

const WEBHOOK_REPLY_STUB = {
  webhook: true,
  details: 'https://core.telegram.org/bots/api#making-requests-when-getting-updates'
}

function redactToken (error) {
  error.message = error.message.replace(
    /(\d+):[^/]+\//,
    '/$1:[REDACTED]/'
  )
  throw error
}

function safeJSONParse (text) {
  try {
    return JSON.parse(text)
  } catch (err) {
    debug('JSON parse failed', err)
  }
}

function includesMedia (payload) {
  return Object.keys(payload).some(
    (key) => {
      const value = payload[key]
      if (Array.isArray(value)) {
        return value.some(({ media }) => media && typeof media === 'object' && (media.source || media.url))
      }
      return (typeof value === 'object') && (
        value.source ||
        value.url ||
        (typeof value.media === 'object' && (value.media.source || value.media.url))
      )
    }
  )
}

function buildJSONConfig (payload) {
  return Promise.resolve({
    method: 'POST',
    compress: true,
    headers: { 'content-type': 'application/json', connection: 'keep-alive' },
    body: JSON.stringify(payload)
  })
}

const FORM_DATA_JSON_FIELDS = [
  'results',
  'reply_markup',
  'mask_position',
  'shipping_options',
  'errors'
]

async function buildFormDataConfig (payload, agent) {
  for (const field of FORM_DATA_JSON_FIELDS) {
    if (field in payload && typeof payload[field] !== 'string') {
      payload[field] = JSON.stringify(payload[field])
    }
  }
  const boundary = crypto.randomBytes(32).toString('hex')
  const formData = new MultipartStream(boundary)
  const tasks = Object.keys(payload).map((key) => attachFormValue(formData, key, payload[key], agent))
  await Promise.all(tasks)

  return {
    method: 'POST',
    compress: true,
    headers: { 'content-type': `multipart/form-data; boundary=${boundary}`, connection: 'keep-alive' },
    body: formData
  }
}

async function attachFormValue (form, id, value, agent) {
  if (!value) {
    return
  }
  const valueType = typeof value
  if (valueType === 'string' || valueType === 'boolean' || valueType === 'number') {
    form.addPart({
      headers: { 'content-disposition': `form-data; name="${id}"` },
      body: `${value}`
    })
    return
  }
  if (id === 'thumb') {
    const attachmentId = crypto.randomBytes(16).toString('hex')
    await attachFormMedia(form, value, attachmentId, agent)
    form.addPart({
      headers: { 'content-disposition': `form-data; name="${id}"` },
      body: `attach://${attachmentId}`
    })
    return
  }
  if (Array.isArray(value)) {
    const items = await Promise.all(
      value.map(async item => {
        if (typeof item.media !== 'object') {
          return item
        }
        const attachmentId = crypto.randomBytes(16).toString('hex')
        await attachFormMedia(form, item.media, attachmentId, agent)
        return { ...item, media: `attach://${attachmentId}` }
      })
    )

    form.addPart({
      headers: { 'content-disposition': `form-data; name="${id}"` },
      body: JSON.stringify(items)
    })

    return
  }
  if (typeof value.media !== 'undefined' && typeof value.type !== 'undefined') {
    const attachmentId = crypto.randomBytes(16).toString('hex')
    await attachFormMedia(form, value.media, attachmentId, agent)
    form.addPart({
      headers: { 'content-disposition': `form-data; name="${id}"` },
      body: JSON.stringify({
        ...value,
        media: `attach://${attachmentId}`
      })
    })
    return
  }
  return attachFormMedia(form, value, id, agent)
}

async function attachFormMedia (form, media, id, agent) {
  let fileName = media.filename || `${id}.${DEFAULT_EXTENSIONS[id] || 'dat'}`
  if (media.url !== undefined) {
    const res = await fetch(media.url, { agent })
    form.addPart({
      headers: { 'content-disposition': `form-data; name="${id}"; filename="${fileName}"` },
      body: res.body
    })
    return
  }
  if (media.source) {
    if (fs.existsSync(media.source)) {
      fileName = media.filename || path.basename(media.source)
      media.source = fs.createReadStream(media.source)
    }
    if (isStream(media.source) || Buffer.isBuffer(media.source)) {
      form.addPart({
        headers: { 'content-disposition': `form-data; name="${id}"; filename="${fileName}"` },
        body: media.source
      })
    }
  }
}

function isKoaResponse (response) {
  return typeof response.set === 'function' && typeof response.header === 'object'
}

async function answerToWebhook (response, payload = {}, options) {
  if (!includesMedia(payload)) {
    if (isKoaResponse(response)) {
      response.body = payload
      return WEBHOOK_REPLY_STUB
    }

    if (!response.headersSent) {
      response.setHeader('content-type', 'application/json')
    }

    const responseEnd = util.promisify(response.end)

    // Function.length returns count of arguments
    // If arguments count equals 2, callback not available, return immediately
    if (response.end.length === 2) {
      response.end(JSON.stringify(payload), 'utf-8')
      return WEBHOOK_REPLY_STUB
    }

    // If callback available, wait
    await responseEnd.call(response, JSON.stringify(payload), 'utf-8')
    return WEBHOOK_REPLY_STUB
  }

  const { headers, body } = await buildFormDataConfig(payload, options.attachmentAgent)

  if (isKoaResponse(response)) {
    Object.keys(headers).forEach(key => response.set(key, headers[key]))
    response.body = body
    return WEBHOOK_REPLY_STUB
  }

  if (!response.headersSent) {
    Object.keys(headers).forEach(key => response.setHeader(key, headers[key]))
  }

  await new Promise(resolve => {
    response.on('finish', resolve)
    body.pipe(response)
  })

  return WEBHOOK_REPLY_STUB
}

class ApiClient {
  constructor (token, options, webhookResponse) {
    this.token = token
    this.options = {
      ...DEFAULT_OPTIONS,
      ...compactOptions(options)
    }
    if (this.options.apiRoot.startsWith('http://')) {
      this.options.agent = null
    }
    this.response = webhookResponse
  }

  set webhookReply (enable) {
    this.options.webhookReply = enable
  }

  get webhookReply () {
    return this.options.webhookReply
  }

  async callApi (method, data = {}, { signal } = {}) {
    const { token, options, response, responseEnd } = this

    const payload = Object.keys(data)
      .filter((key) => typeof data[key] !== 'undefined' && data[key] !== null)
      .reduce((acc, key) => ({ ...acc, [key]: data[key] }), {})

    if (options.webhookReply && response && !responseEnd && WEBHOOK_REPLY_METHOD_ALLOWLIST.has(method)) {
      debug('Call via webhook', method, payload)
      this.responseEnd = true
      return await answerToWebhook(response, { method, ...payload }, options)
    }

    if (!token) {
      throw new TelegramError({ error_code: 401, description: 'Bot Token is required' })
    }

    debug('HTTP call', method, payload)
    const config = includesMedia(payload)
      ? await buildFormDataConfig({ method, ...payload }, options.attachmentAgent)
      : await buildJSONConfig(payload)

    const apiUrl = new URL(
      `./${this.options.apiPrefix}${token}${options.testEnv ? '/test' : ''}/${method}`,
      options.apiRoot
    )
    config.agent = options.agent
    config.signal = signal
    const res = await fetch(apiUrl, config).catch(redactToken)

    if (res.status >= 500) {
      const errorPayload = {
        error_code: res.status,
        description: res.statusText
      }
      throw new TelegramError(errorPayload, { method, payload })
    }

    const text = await res.text()
    const responseData = safeJSONParse(text) || {
      error_code: 500,
      description: 'Unsupported http response from Telegram',
      response: text
    }

    if (!responseData.ok) {
      debug('API call failed', responseData)
      throw new TelegramError(responseData, { method, payload })
    }
    return responseData.result
  }
}

module.exports = ApiClient

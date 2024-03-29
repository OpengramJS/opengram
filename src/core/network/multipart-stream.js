const stream = require('stream')
const { SandwichStream } = require('sandwich-stream')
const CRNL = '\r\n'

class MultipartStream extends SandwichStream {
  constructor (boundary) {
    super({
      head: `--${boundary}${CRNL}`,
      tail: `${CRNL}--${boundary}--`,
      separator: `${CRNL}--${boundary}${CRNL}`
    })
  }

  addPart (part) {
    part = part ?? {}
    const partStream = new stream.PassThrough()
    if (part.headers) {
      for (const [key, header] of Object.entries(part.headers)) {
        partStream.write(`${key}:${header}${CRNL}`)
      }
    }
    partStream.write(CRNL)
    if (MultipartStream.isStream(part.body)) {
      part.body.pipe(partStream)
    } else {
      partStream.end(part.body)
    }
    this.add(partStream)
  }

  /**
   * Checks is given object stream
   *
   * @param {Stream} stream Stream object
   * @return {boolean}
   */
  static isStream (stream) {
    return stream !== null &&
      typeof stream === 'object' &&
      typeof stream.pipe === 'function'
  }
}

module.exports = MultipartStream

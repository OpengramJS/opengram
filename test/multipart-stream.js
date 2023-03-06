const test = require('ava')
const MultipartStream = require('../src/core/network/multipart-stream')

const Readable = require('stream').Readable
const s = new Readable()

test('should return true for stream', t => {
  t.is(MultipartStream.isStream(s), true)
})

test('should return false for other', t => {
  t.is(MultipartStream.isStream([]), false)
  t.is(MultipartStream.isStream(''), false)
  t.is(MultipartStream.isStream({}), false)
  t.is(MultipartStream.isStream(1), false)
})

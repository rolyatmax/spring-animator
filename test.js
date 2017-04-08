const { createSpring } = require('./')
const test = require('tape')

test('createSpring should be a function', function (t) {
  t.equal(typeof createSpring, 'function')
  t.end()
})

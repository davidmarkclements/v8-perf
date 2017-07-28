'use strict'

var benchmark = require('benchmark')
var suite = new benchmark.Suite()

function sum (base, max) {
  var total = base
  for (var i = base + 1; i < max; i++) {
    total += i
  }
  return total
}


suite.add('sum small', function smallSum () {
  var base = 0
  var max = 65535
  // 0 + 1 + ... + 65535 = 2147450880 < 2147483647

  sum(base, max)
})

suite.add('from small to big', function bigSum () {
  var base = 32768
  var max = 98303
  // 32768 + 32769 + ... + 98303 = 4294934528 > 2147483647

  sum(base, max)
})

suite.add('all big', function bigSum () {
  var base = 2147483648
  var max = 2147549183
  // 2147483648 > 2147483647

  sum(base, max)
})

suite.on('complete', require('./print'))

suite.run()



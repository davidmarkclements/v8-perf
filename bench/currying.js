'use strict'

var benchmark = require('benchmark')
var suite = new benchmark.Suite()

function sum (base, max) {
  var total = 0

  for (var i = base; i < max; i++) {
    total += i
  }
}

var bind = sum.bind(null, 0)
var curry = function (max) {
  return sum(0, max)
}
var fatCurry = (max) => sum(0, max)

suite.add('curry', function smallSum () {
  var max = 65535

  curry(max)
})

suite.add('fat arrow curry', function bigSum () {
  var max = 65535

  fatCurry(max)
})

suite.add('bind', function smallSum () {
  var max = 65535

  bind(max)
})

suite.add('direct call', function bigSum () {
  var base = 0
  var max = 65535
  sum(base, max)
})


suite.on('complete', require('./print'))

suite.run()

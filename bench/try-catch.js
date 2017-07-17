'use strict'

var benchmark = require('benchmark')
var suite = new benchmark.Suite()

function sum (base, max) {
  var total = 0

  for (var i = base; i < max; i++) {
    total += i
  }
}

suite.add('sum with try catch', function sumTryCatch () {
  try {
    var base = 0
    var max = 65535

    var total = 0

    for (var i = base; i < max; i++) {
      total += i
    }
  } catch (err) {
    console.log(err.message)
  }
})

suite.add('sum without try catch', function noTryCatch () {
  var base = 0
  var max = 65535

  var total = 0

  for (var i = base; i < max; i++) {
    total += i
  }
})

suite.add('sum wrapped', function wrapped () {
  var base = 0
  var max = 65535

  try {
    sum(base, max)
  } catch (err) {
    console.log(err.message)
  }
})

suite.add('sum function', function func () {
  var base = 0
  var max = 65535

  sum(base, max)
})

suite.on('complete', require('./print'))

suite.run()

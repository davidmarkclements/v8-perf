'use strict'

var benchmark = require('benchmark')
var suite = new benchmark.Suite()
var runs = 0

function plus1 (obj) {
  return obj + 1
}

suite.add('all strings', function allStrings () {
  var ret
  runs = (runs + 1) % 2147483647
  if (runs % 2 === 0) {
    ret = plus1('a')
  } else {
    ret = plus1('a')
  }
  ret + 1
})

suite.add('all nums', function allNums () {
  var ret
  runs = (runs + 1) % 2147483647
  if (runs % 2 === 0) {
    ret = plus1(1)
  } else {
    ret = plus1(1)
  }
  ret + 1
})

suite.add('both', function both () {
  var ret
  runs = (runs + 1) % 2147483647
  if (runs % 2 === 0) {
    ret = plus1(1)
  } else {
    ret = plus1('a')
  }
  ret + 1
})

suite.on('complete', require('./print'))

suite.run()

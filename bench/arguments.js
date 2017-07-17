'use strict'

var benchmark = require('benchmark')
var suite = new benchmark.Suite()

function leakyArguments () {
  return other(arguments)
}

function copyArgs () {
  var array = new Array(arguments.length)

  for (var i = 0; i < array.length; i++) {
    array[i] = arguments[i]
  }

  return other(array)
}

function sliceArguments () {
  var array = Array.prototype.slice.apply(arguments)
  return other(array)
}

function spreadOp(...args) {
  return other(args)
}

function other (toSum) {
  var total = 0
  for (var i = 0; i < toSum.length; i++) {
    total += toSum[i]
  }
  return total
}

suite.add('leaky arguments', () => {
  leakyArguments(1, 2, 3)
})

suite.add('Array.prototype.slice arguments', () => {
  sliceArguments(1, 2, 3)
})

suite.add('for loop copy arguments', () => {
  copyArgs(1, 2, 3)
})

suite.add('spread operator', () => {
  spreadOp(1, 2, 3)
})

suite.on('complete', require('./print'))

suite.run()

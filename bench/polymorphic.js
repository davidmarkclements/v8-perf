'use strict'

var benchmark = require('benchmark')
var suite = new benchmark.Suite()
var runs = 0

;(function () {
  var runs = 0

  suite.add('polymorphic with literal', function polymorphicLiteral () {
    var arg
    runs = (runs + 1) % 2147483647
    if (runs % 2 === 0) {
      arg = { length: 2 }
    } else {
      arg = "42"
    }
    multiply(arg)
  })

  function multiply (obj) {
    var max = obj.length * 10
    for (var i = 0; i < max; i++) {}
    return i
  }
})()

;(function () {
  var runs = 0

  function A (length) {
    this.length = length
  }

  suite.add('polymorphic with constructor', function polymorphicConstructor () {
    var arg
    runs = (runs + 1) % 2147483647
    if (runs % 2 === 0) {
      arg = new A(2)
    } else {
      arg = "42"
    }
    multiply(arg)
  })

  function multiply (obj) {
    var max = obj.length * 10
    for (var i = 0; i < max; i++) {}
    return i
  }
})()

;(function () {
  var runs = 0

  suite.add('monomorphic string', function monomorphicString () {
    var arg
    runs = (runs + 1) % 2147483647
    if (runs % 2 === 0) {
      arg = "42"
    } else {
      arg = "42"
    }
    multiply(arg)
  })

  function multiply (obj) {
    var max = obj.length * 10
    for (var i = 0; i < max; i++) {}
    return i
  }
})()

;(function () {
  var runs = 0

  suite.add('monomorphic obj literal', function monomorphicLiteral () {
    var arg
    runs = (runs + 1) % 2147483647
    if (runs % 2 === 0) {
      arg = { length: 2 }
    } else {
      arg = { length: 2 }
    }
    multiply(arg)
  })

  function multiply (obj) {
    var max = obj.length * 10
    for (var i = 0; i < max; i++) {}
    return i
  }
})()

;(function () {
  var runs = 0

  function A (length) {
    this.length = length
  }

  suite.add('monomorphic obj with constructor', () => {
    var arg
    runs = (runs + 1) % 2147483647
    if (runs % 2 === 0) {
      arg = new A(2)
    } else {
      arg = new A(2)
    }
    multiply(arg)
  })

  function multiply (obj) {
    var max = obj.length * 10
    for (var i = 0; i < max; i++) {}
    return i
  }
})()

suite.on('complete', require('./print'))

suite.run()

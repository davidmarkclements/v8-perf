'use strict'

var benchmark = require('benchmark')
var suite = new benchmark.Suite()
var runs = 0

// the for loop is needed otherwise V8
// can optimize the allocation of the object
// away
var max = 10000

class MyClass {
  constructor (x) {
    this.x = x
  }
}

function MyCtor (x) {
  this.x = x
}

suite.add('noop', function noop () {})

suite.add('literal', function literalObj () {
  var obj = null

  for (var i = 0; i < max; i++) {
    obj = { x: 1 }
  }

  return obj
})

suite.add('class', function classObj () {
  var obj = null
  for (var i = 0; i < max; i++) {
    obj = new MyClass(1)
  }
  return obj
})

suite.add('constructor', function constructorObj () {
  var obj = null
  for (var i = 0; i < max; i++) {
    obj = new MyCtor(1)
  }
  return obj
})

suite.on('cycle', () => runs = 0)

suite.on('complete', require('./print'))

suite.run()

'use strict'

var benchmark = require('benchmark')
var suite = new benchmark.Suite()
var runs = 0

class MyClass {
  constructor (x) {
    this.x = x
  }
}

function MyCtor (x) {
  this.x = x
}

var obj

suite.add('literal', function base () {
  obj = { x: 1 }
})

suite.add('class', function allNums () {
  obj = new MyClass(1)
})

suite.add('constructor', function allNums () {
  obj = new MyCtor(1)
})

var literal = { x: 1 }
suite.add('create', function allNums () {
  obj = Object.create(literal)
})

suite.on('cycle', () => runs = 0)

suite.on('complete', require('./print'))

suite.run()

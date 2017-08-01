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

var res = 0

function doSomething (obj) {
  res = obj.x
}

suite.add('literal', function base () {
  var obj = { x: 1 }
  doSomething(obj)
})

suite.add('class', function allNums () {
  var obj = new MyClass(1)
  doSomething(obj)
})

suite.add('constructor', function allNums () {
  var obj = new MyCtor(1)
  doSomething(obj)
})

suite.add('create', function allNums () {
  var obj = Object.create(Object.prototype)
  obj.x = 1
  doSomething(obj)
})

suite.on('cycle', () => runs = 0)

suite.on('complete', require('./print'))

suite.run()

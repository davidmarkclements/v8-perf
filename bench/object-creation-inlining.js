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

suite.add('literal', function literalObj () {
  var obj = { x: 1 }
})

suite.add('class', function classObj () {
  var obj = new MyClass(1)
})

suite.add('constructor', function constructorObj () {
  var obj = new MyCtor(1)
})

var propertiesObject = { x: { value: 1, enumerable: true, writable: true, configurable: true} }
suite.add('create (propertiesObject)', function createObjWithPropertiesObject () {
  var obj = Object.create(Object.prototype, propertiesObject)
})


suite.add('create (prop assign)', function createObjAndAssignProp () {
  var obj = Object.create(Object.prototype)
  obj.x = 1
})


suite.on('cycle', () => runs = 0)

suite.on('complete', require('./print'))

suite.run()

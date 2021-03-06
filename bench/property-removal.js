'use strict'

var benchmark = require('benchmark')
var suite = new benchmark.Suite()

function MyClass (x, y) {
  this.x = x
  this.y = y
}

function MyClassLast (x, y) {
  this.y = y
  this.x = x
}

// You can tell if an object is in hash table mode by calling console.log(%HasFastProperties(obj)) when the flag --allow-natives-syntax is enabled in Node.JS.
// you can convert back to fast properties using
// https://www.npmjs.com/package/to-fast-properties

suite.add('setting to undefined', function undefProp () {
  var obj = new MyClass(2, 3)
  obj.x = undefined

  JSON.stringify(obj)
})

suite.add('delete', function deleteProp () {
  var obj = new MyClass(2, 3)
  delete obj.x

  JSON.stringify(obj)
})

suite.add('delete last property', function deleteProp () {
  var obj = new MyClassLast(2, 3)
  delete obj.x

  JSON.stringify(obj)
})

suite.add('setting to undefined literal', function undefPropLit () {
  var obj = { x: 2, y: 3 }
  obj.x = undefined

  JSON.stringify(obj)
})

suite.add('delete property literal', function deletePropLit () {
  var obj = { x: 2, y: 3 }
  delete obj.x

  JSON.stringify(obj)
})

suite.add('delete last property literal', function deletePropLit () {
  var obj = { y: 3, x: 2 }
  delete obj.x

  JSON.stringify(obj)
})

suite.on('complete', require('./print'))

suite.run()

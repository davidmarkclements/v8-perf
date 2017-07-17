'use strict'

var benchmark = require('benchmark')
var suite = new benchmark.Suite()

function MyClass (x) {
  this.x = x
}

// You can tell if an object is in hash table mode by calling console.log(%HasFastProperties(obj)) when the flag --allow-natives-syntax is enabled in Node.JS.
// you can convert back to fast properties using
// https://www.npmjs.com/package/to-fast-properties

suite.add('setting to undefined', function undefProp () {
  var obj = new MyClass(2)
  this.x = undefined

  JSON.stringify(obj)
})

suite.add('delete', function deleteProp () {
  var obj = new MyClass(2)
  delete obj.x

  JSON.stringify(obj)
})

suite.on('complete', require('./print'))

suite.run()

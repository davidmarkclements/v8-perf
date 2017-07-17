'use strict'

// doesn't feature in spreadsheet or write up because 
// object "shape" makes no difference in any v8 version

var benchmark = require('benchmark')
var suite = new benchmark.Suite()
var runs = 0
var create = createCreate()


function createCreate () {
  return function create (type) {
    if (type === 'abc') return {a : 1, b: 's'}
    if (type === 'def') return {a: 1, b: 2}
    if (type === 'ghi') return {x: 1, b: 2}
    if (type === 'jkl') return {x: 1, b: 2, a: 4}
  }
}

suite.on('cycle', () => { 
  create = createCreate()
})


suite.add('same shape', function base () {
  var ret
  runs = (runs + 1) % 2147483647
  switch (runs % 2) {
    case 0: ret = create('def'); break
    case 1: ret = create('def'); break
  }
})

suite.add('prop type differ', function allNums () {
  var ret
  runs = (runs + 1) % 2147483647
  switch (runs % 2) {
    case 0: ret = create('abc'); break
    case 1: ret = create('def'); break
  }
})

suite.add('key differ', function allNums () {
  var ret
  runs = (runs + 1) % 2147483647
  switch (runs % 2) {
    case 0: ret = create('def'); break
    case 1: ret = create('ghi'); break
  }
})


suite.add('key count differ', function both () {
  var ret
  runs = (runs + 1) % 2147483647
  switch (runs % 2) {
    case 0: ret = create('ghi'); break
    case 1: ret = create('jkl'); break
  }
})



suite.on('complete', require('./print'))

suite.run()

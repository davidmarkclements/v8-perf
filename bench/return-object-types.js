'use strict'

var benchmark = require('benchmark')
var suite = new benchmark.Suite()
var runs = 0
var create = createCreate()

class MyClass {
  constructor (x) {
    this.x = x
  }
}

function MyCtor (x) {
  this.x = x
}

function createCreate () {
  return function create (type) {
    if (type === 'obj') return {x : 1}
    if (type === 'ctr') return new MyCtor(1)
    if (type === 'cls') return new MyClass(1)
  }
}

suite.on('cycle', () => { 
  create = createCreate()
})


suite.add('literal', function base () {
  var ret
  runs = (runs + 1) % 2147483647
  switch (runs % 3) {
    case 0: ret = create('obj'); break
    case 1: ret = create('obj'); break
    case 2: ret = create('obj'); break
  }
})

suite.add('constructor', function allNums () {
  var ret
  runs = (runs + 1) % 2147483647
  switch (runs % 3) {
    case 0: ret = create('ctr'); break
    case 1: ret = create('ctr'); break
    case 2: ret = create('ctr'); break
  }
})

suite.add('class', function allNums () {
  var ret
  runs = (runs + 1) % 2147483647
  switch (runs % 3) {
    case 0: ret = create('cls'); break
    case 1: ret = create('cls'); break
    case 2: ret = create('cls'); break
  }
})


suite.add('all', function both () {
  var ret
  runs = (runs + 1) % 2147483647
  switch (runs % 3) {
    case 0: ret = create('cls'); break
    case 1: ret = create('ctr'); break
    case 2: ret = create('obj'); break
  }
})



suite.on('complete', require('./print'))

suite.run()

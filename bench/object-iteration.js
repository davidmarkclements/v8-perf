'use strict'

var benchmark = require('benchmark')
var suite = new benchmark.Suite()

suite.add('for-in', function forIn () {
  var obj = {
    x: 1,
    y: 1,
    z: 1
  }
  var total = 0
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      total += obj[prop]
    }
  }
})

suite.add('functional', function forIn () {
  var obj = {
    x: 1,
    y: 1,
    z: 1
  }
  var total = Object.keys(obj).reduce(function (acc, key) {
    return acc + obj[key]
  }, 0)
})

suite.add('functional with arrow', function forIn () {
  var obj = {
    x: 1,
    y: 1,
    z: 1
  }
  var total = Object.keys(obj).reduce((acc, key) => {
    return acc + obj[key]
  }, 0)
})

suite.add('functional with state', function forIn () {
  var obj = {
    x: 1,
    y: 1,
    z: 1
  }
  var keys = Object.keys(obj)
  var total = keys.map(toValue, obj).reduce(sum, 0)
})

function toValue (key) {
  return this[key]
}

function sum (acc, value) {
  return acc + value
}

suite.add('Object.keys with for loop', function forIn () {
  var obj = {
    x: 1,
    y: 1,
    z: 1
  }
  var keys = Object.keys(obj)
  var total = 0
  for (var i = 0; i < keys.length; i++) {
    total += obj[keys[i]]
  }
})

suite.on('complete', require('./print'))

suite.run()

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

suite.add('Object.keys functional', function forIn () {
  var obj = {
    x: 1,
    y: 1,
    z: 1
  }
  var total = Object.keys(obj).reduce(function (acc, key) {
    return acc + obj[key]
  }, 0)
})

suite.add('Object.keys functional with arrow', function forIn () {
  var obj = {
    x: 1,
    y: 1,
    z: 1
  }
  var total = Object.keys(obj).reduce((acc, key) => {
    return acc + obj[key]
  }, 0)
})


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

if (process.versions.node[0] >= 8) {

  suite.add('Object.values functional', function forIn () {
    var obj = {
      x: 1,
      y: 1,
      z: 1
    }
    var total = Object.values(obj).reduce(function (acc, val) {
      return acc + val
    }, 0)
  })

  suite.add('Object.values functional with arrow', function forIn () {
    var obj = {
      x: 1,
      y: 1,
      z: 1
    }
    var total = Object.values(obj).reduce((acc, val) => {
      return acc + val
    }, 0)
  })

  suite.add('Object.values with for loop', function forIn () {
    var obj = {
      x: 1,
      y: 1,
      z: 1
    }
    var vals = Object.values(obj)
    var total = 0
    for (var i = 0; i < vals.length; i++) {
      total += vals[i]
    }
  })

}

suite.on('complete', require('./print'))

suite.run()

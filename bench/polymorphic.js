'use strict'

var benchmark = require('benchmark')
var suite = new benchmark.Suite()
var runs = 0

suite.add('polymorphic', function polymorphic() {
  var objects = [{a:1}, {b:1, a:2}, {c:1, b:2, a:3}, {d:1, c:2, b:3, a:4}];
  var sum = 0;
  for (var i = 0; i < 10000; i++) {
    var o = objects[i & 3];
    sum += o.a;
  }
  return sum;
})

suite.add('monomorphic', function monomorphic() {
  var objects = [{a:1}, {a:2}, {a:3}, {a:4}];
  var sum = 0;
  for (var i = 0; i < 10000; i++) {
    var o = objects[i & 3];
    sum += o.a;
  }
  return sum;
})

suite.on('complete', require('./print'))

suite.run()

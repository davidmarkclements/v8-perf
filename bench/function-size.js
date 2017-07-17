'use strict'

// inlining example, v8 inlines sum() but cannot inline longSum because it is too long
// Use --trace_inlining to show this
// Output: "Did not inline longSum called from long (target text too big)."
var benchmark = require('benchmark')
var suite = new benchmark.Suite()

function sum (base, max) {
  var total = 0

  for (var i = base; i < max; i++) {
    total += i
  }
}

function longSum (base, max) {
  // Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  // Vestibulum vel interdum odio. Curabitur euismod lacinia ipsum non congue.
  // Suspendisse vitae rutrum massa. Class aptent taciti sociosqu ad litora torquent
  // per conubia nostra, per inceptos himenaeos. Morbi mattis quam ut erat vestibulum,
  // at laoreet magna pharetra. Cras quis augue suscipit, pulvinar dolor a, mollis est.
  // Suspendisse potenti. Pellentesque egestas finibus pulvinar.
  // Vestibulum eu rhoncus ante, id viverra eros. Nunc eget tempus augue.

  var total = 0

  for (var i = base; i < max; i++) {
    total += i
  }
}

suite.add('sum small function', function short () {
  var base = 0
  var max = 65535

  sum(base, max)
})

suite.add('long all together', function long () {
  var base = 0
  var max = 65535

  // Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  // Vestibulum vel interdum odio. Curabitur euismod lacinia ipsum non congue.
  // Suspendisse vitae rutrum massa. Class aptent taciti sociosqu ad litora torquent
  // per conubia nostra, per inceptos himenaeos. Morbi mattis quam ut erat vestibulum,
  // at laoreet magna pharetra. Cras quis augue suscipit, pulvinar dolor a, mollis est.
  // Suspendisse potenti. Pellentesque egestas finibus pulvinar.
  // Vestibulum eu rhoncus ante, id viverra eros. Nunc eget tempus augue.

  var total = 0

  for (var i = base; i < max; i++) {
    total += i
  }
})

suite.add('sum long function', function long () {
  var base = 0
  var max = 65535

  longSum(base, max)
})

suite.on('complete', require('./print'))

suite.run()

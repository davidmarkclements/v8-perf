'use strict'

var benchmark = require('benchmark')
var suite = new benchmark.Suite()

// node --trace_opt --trace_deopt --trace_inlining --code-comments --trace_opt_verbose debugger.js > out
// look for [disabled optimization for 0x34e65f73db01 <SharedFunctionInfo withDebugger>, reason: DebuggerStatement]

suite.add('with debugger', function withDebugger () {
  var base = 0
  var max = 65535

  var total = 0

  for (var i = base; i < max; i++) {
    debugger
    total += i
  }
})

suite.add('without debugger', function withoutDebugger () {
  var base = 0
  var max = 65535

  var total = 0

  for (var i = base; i < max; i++) {
    total += i
  }
})

suite.on('complete', require('./print'))

suite.run()

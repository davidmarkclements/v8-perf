# Node Performance is Changing 
## How the performance characteristics of v8's Turbofan will affect the way we optimize

Since it's inception Node.js has depended on the V8 JavaScript engine to provide 
code execution in the language we all know and love. The V8 JavaScript engine is 
a JavaScript VM written by Google for the Chrome browser. From the beginning, 
a primary goal of V8 was to make JavaScript fast, or at least - faster than the competition.
For a highly dynamic, loosely typed language this is no easy feat. 

A central piece of the V8 engine that allows it to execute JavaScript at high speed is
the JIT (Just In Time) Compiler. This is a dynamic compiler that can optimize code during
runtime. When V8 was first built the JIT Compiler was dubbed: Crankshaft. 

As an outside observer, and user of JavaScript since the 90's it has seemed that 
fast and slow paths in JavaScript (whatever the engine may be) were often counter-intuitive, the
reasons for apparently slow JavaScript code were often difficult to fathom.

In recent years Matteo Collina and I have focused on finding out how to write
performant Node.js code, and of course this means knowing which approaches are fast
or slow with regards to V8. 

Now it's time for us to challenge all our assumptions about performance, because V8 
have written a new JIT Compiler: Turbofan.

Starting with the more commonly known "V8 Killers" (a term that no longer makes sense in a Turbofan context)
and moving towards the more obscure discoveries Matteo and I have made around Crankshaft performance,
we're going to walk through a series of microbenchmark results and observations. 

We'll be looking at the performance of these microbenchmarks on V8 versions 5.1, 5.8, 5.9 and 6.1.
To put each of these versions into context: V8 5.1 is the engine used by Node 6 and uses the Crankshaft
JIT Compiler, V8 5.8 is used in Node 8.1 and uses a mixture of Crankshaft *and* Turbofan. 

The V8 5.9 engine is currently in used on Node's master branch, and has similar
enough characteristics to V8 6.0 (which isn't measured here). V8 version 6.1 is the latest version of
V8 (at the time of writing) which is integrated with Node on the node-v8 repo at https://github.com/nodejs/node-v8.  

We're hoping that Node 8.2 will be integrated with V8 6.1.

On the other side we'll talk about what this means for the future. 

# Try/Catch




# Leaky Arguments

arguments

# delete

# currying

# function size 

object creation

object iteration

numbers 

primitive return types - anomaly?

polymorphic inputs




Reference: https://docs.google.com/spreadsheets/d/1mDt4jDpN_Am7uckBbnxltjROI9hSu6crf9tOa2YnSog/edit?usp=sharing


 





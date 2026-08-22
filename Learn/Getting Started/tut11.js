//Profiling Node.js Applications

//Profiling a Node.js application involves measuring its performance by analyzing the CPU, memory, and other runtime metrics while the application is running.

//There are many third party tools available for profiling Node.js applications but, in many cases, the easiest option is to use the Node.js built-in profiler. 
// The built-in profiler uses the profiler inside V8 which samples the stack at regular intervals during program execution. 
// It records the results of these samples, along with important optimization events such as jit compiles, as a series of ticks:

/**
code-creation,LazyCompile,0,0x2d5000a337a0,396,"bp native array.js:1153:16",0x289f644df68,~
code-creation,LazyCompile,0,0x2d5000a33940,716,"hasOwnProperty native v8natives.js:198:30",0x289f64438d0,~
code-creation,LazyCompile,0,0x2d5000a33c20,284,"ToName native runtime.js:549:16",0x289f643bb28,~
code-creation,Stub,2,0x2d5000a33d40,182,"DoubleToIStub"
code-creation,Stub,2,0x2d5000a33e00,507,"NumberToStringStub"
 */

//

//This lesson is demonstrating just one golden rule of Node.js:
// Never run heavy, slow tasks synchronously because it blocks the entire server.

//They showed us an example in which they are meassuring performance of a user auth system, and how by improving synchronous code to async code improved performance by over 4 times.

//Link: https://nodejs.org/learn/getting-started/profiling

//.........................................

//Summary: Profiling Node.js Applications

// Profiling is the process of measuring CPU, memory, and execution time while an app runs to locate slow functions, bottlenecks, and performance issues.

// 1. The Goal: Finding Bottlenecks

// The built-in Node.js profiler samples the V8 execution stack at regular intervals (called "ticks") to see where the CPU spends its time.
// It logs details about JavaScript execution, C++ system calls, garbage collection, and optimization events.
// 2. The Profiling Workflow

// Record Performance: Start the server with the --prof flag (NODE_ENV=production node --prof app.js). Node creates an isolate-0x...-v8.log file containing raw tick data.
// Simulate Traffic: Send simultaneous traffic using a load-testing tool (like ApacheBench / ab) to reproduce slow response times under load.
// Process the Log: Convert the raw tick log into human-readable text using node --prof-process isolate-*.log > processed.txt.

// 3. Reading the Diagnosis

// Summary Table: Shows the percentage of CPU time spent in JavaScript vs. underlying C++ native code.
// Bottom-Up Call Tree: Traces slow C++ functions back to the exact JavaScript lines that triggered them.
// In the lesson's example, over 50% of CPU time was tied up by a synchronous hashing function (crypto.pbkdf2Sync).

// 4. The Solution: Non-Blocking Asynchronous Code

// The Root Cause: Synchronous functions (*Sync) block the single-threaded Node.js event loop. While one password hash runs, every other incoming user request must wait in line.
// The Fix: Switching from crypto.pbkdf2Sync() to the asynchronous crypto.pbkdf2() with a callback lets Node offload heavy CPU work without freezing the server.
// The Result: Server throughput jumped from ~5 requests/second to ~20 requests/second, and average latency dropped by ~75%.
//Understanding setImmediate()

//Used to execute code asynchronously as soon as possible after the current event loop iteration/phase completes.   
// Any callback passed to setImmediate() runs in the event loop's Check phase (macrotask queue).   

//...............................

//Execution Order Hierarchy

// process.nextTick Queue: Runs on the current loop iteration immediately after the current synchronous operation unwinds. Always takes priority over promises, setTimeout, and setImmediate.   
// Promises Microtask Queue (Promise.then / await): Executes after the process.nextTick queue empties.   
// Macrotask Queue (setTimeout, setImmediate): Runs later in the event loop iterations after all microtasks have completely drained.   

//.......................................

//setImmediate() vs setTimeout(() => {}, 0)

//1) Both schedule callbacks in the macrotask phases for the upcoming iteration
//2) their relative execution order can vary depending on process performance and operating system scheduling

//.........................................

//CommonJS vs. ES Modules (ESM) Difference

//-> In CommonJS (.js):

// Top-level synchronous code executes first, followed by process.nextTick, then resolved Promises, and finally setImmediate

//-> In ES Modules (.mjs):   

// Because ES module loading is fundamentally wrapped as an asynchronous promise-based operation, the top-level execution already resides in the Promise microtask context
//As a result, resolved Promise callbacks may drain before queued process.nextTick calls from that initial evaluation step
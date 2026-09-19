//Understanding process.nextTick()

//When we pass a function to process.nextTick(), we schedule it to run immediately after the current call stack completes, before the event loop continues and before any other queued tasks or phases are processed:

//It's the way we can tell the JS engine to process a function asynchronously (after the current function), but as soon as possible, not queue it.

//Calling setTimeout(() => {}, 0) schedules the callback for a future event loop iteration, much later than when using process.nextTick(), which executes before the event loop continues.

// Use nextTick() when you want to make sure that in the next event loop iteration that code is already executed.
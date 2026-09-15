//Discover Promises in Node.js

//Chaining Promises

const {setTimeout : delay} = require('node:timers/promises');
const { CLIENT_RENEG_LIMIT } = require('node:tls');

let promise = delay(1000).then(()=>{
  return 'First task complete';
});

promise
  .then(value=>{
    console.log(value)
    return delay(1000).then(()=>'Second task complete')
  })
  .then(value=>{
    console.log(value);
    throw new Error('Intentional Error')
    return delay(1000).then(()=>'Third task complete')
  })
  .then(value=>{
    console.log(value)
    // throw new Error('Intentional Error')
  }, err=>{
    console.log(err, 'Some Error occocured here')
  })
  .catch((err)=>{
    console.log(err);
  })
  .finally(()=>{
    delay(1000).then(()=>console.log('All tasks completed'));
  });

//.............................

//Using Async/Await with Promises

let promise1 = delay(500).then(()=>'First task Completed');
let promise2 = delay(800).then(()=>'Second task Completed');
async function performTasks() {
  try {
    const result1 = await promise1;
    console.log(result1); // 'First task completed'
    const result2 = await promise2;
    console.log(result2); // 'Second task completed'
  } catch (error) {
    console.error(error); // Catches any rejection or error
  }
}
performTasks();

console.log('Synchronous');

//...............................

//Top-Level Await

// it mean that whatever we import, we can use await on to it directly without needing async function or Immediately Invoked Function Expression (IIFE). 
//Doesn't work for 'require()'

//ex:
/*
import { setTimeout as delay } from 'node:timers/promises';
await delay(1000);
*/

//..............................

//Promise-based Node.js APIs

const fsp = require('node:fs/promises');

async function readFile(){
  try {
    let fileData = await fsp.readFile('example1.txt', 'utf8');
    console.log(fileData);
  } catch (err) {
    console.log(err)
  }
};
readFile();

//...........................

//Advanced Promise Methods

//
//Promise.all

//Promise.all(): void

// If any Promise is rejected, Promise.all() will immediately reject

const fetchData1 = delay(1000).then(() => 'Data from API 1');
const fetchData2 = delay(2000).then(() => 'Data from API 2');
Promise.all([fetchData1, fetchData2])
  .then(results => {
    console.log(results); // ['Data from API 1', 'Data from API 2']
  })
  .catch(error => {
    console.error('Error:', error);
  });

//
//Promise.allSettled

//Promise.allSettled(): void

//This method waits for all promises to either resolve or reject and returns an array of objects that describe the outcome of each Promise.

const promise11 = Promise.resolve('Success');
const promise22 = Promise.reject('Failed');
Promise.allSettled([promise11, promise22]).then(results => {
  console.log(results);
  // [ { status: 'fulfilled', value: 'Success' }, { status: 'rejected', reason: 'Failed' } ]
});

//
//Promise.race

//Promise.race(): void

//This method resolves or rejects as soon as the first Promise settles, whether it resolves or rejects. Regardless of which promise settles first, all promises are fully executed.

const task1 = delay(2000).then(() => 'Task 1 done');
const task2 = delay(1000).then(() => 'Task 2 done');
Promise.race([task1, task2]).then(result => {
  console.log(result); // 'Task 2 done' (since task2 finishes first)
});

//
//Promise.any

//Promise.any(): void

// This method resolves as soon as one of the Promises resolves. If all promises are rejected, it will reject with an AggregateError

const api1 = delay(2000).then(() => 'API 1 success');
const api2 = delay(1000).then(() => 'API 2 success');
const api3 = delay(1500).then(() => 'API 3 success');
Promise.any([api1, api2, api3])
  .then(result => {
    console.log(result); // 'API 2 success' (since it resolves first)
  })
  .catch(error => {
    console.error('All promises rejected:', error);
  });

//
//Promise.reject() and Promise.resolve()

//
//Promise.try

//Promise.try(): void

//a method that executes a given function, whether it's synchronous or asynchronous, and wraps the result in a promise.

function mightThrow() {
  if (Math.random() > 0.5) {
    throw new Error('Oops, something went wrong!');
  }
  return 'Success!';
}
Promise.try(mightThrow)
  .then(result => {
    console.log('Result:', result);
  })
  .catch(err => {
    console.error('Caught error:', err.message);
  });

//
//Promise.withResolvers

// Promise.withResolvers(): void

//Promise.withResolvers() allows us to set resolve or reject of promise from anywhere we want and also allows us to access it by accessing 'promise' object with await

//Heavily used in event driven programming

const { promise: promiseWR, resolve: resolveWR, reject: rejectWR } = Promise.withResolvers();
setTimeout(() => {
  resolveWR('Resolved successfully!~~~');
}, 1000);
async function abc(){
  let x = await promiseWR;
  console.log(x);
};
abc();

//.............................

//Error Handling with Promises

//Use .catch() or try/catch block for async/await

//.............................

//Scheduling Tasks in the Event Loop

//
//queueMicrotask

//queueMicrotask(): void

queueMicrotask(() => {
  console.log('Microtask is executed');
});
console.log('Synchronous task is executed');

//
//process.nextTick

// process.nextTick(): void

//process.nextTick() executes the callback function it is given immediately after callStack finishes executing

process.nextTick(() => {
  console.log('Next tick callback');
});

//
//setImmediate

// setImmediate(): void

//setImmediate() executes when macrotask queue execution begins but if it will execute immediately depends if there is/are timer expired callbacks or not (set by setTimeout or setInterval). If there is timer callbacks expired they execute first and then callback in setImmediate() executes.

setImmediate(() => {
  console.log('Immediate callback');
});

//When to Use Each

// Use queueMicrotask() for tasks that need to run immediately after the current script and before any I/O or timer callbacks, typically for Promise resolutions.
// Use process.nextTick() for tasks that should execute before any I/O events, often useful for deferring operations or handling errors synchronously.
// Use setImmediate() for tasks that should run after the poll phase, once most I/O callbacks have been processed.

//Because these tasks execute outside of the current synchronous flow, uncaught exceptions inside these callbacks won't be caught by surrounding try/catch blocks and may crash the application if not properly managed (e.g., by attaching .catch() to Promises or using global error handlers like process.on('uncaughtException'))

//ex:
//This error handeling won't work:
/**
try {
  setTimeout(() => {
    throw new Error('Boom!'); // Runs 1 second later
  }, 1000);
} catch (err) {
  console.log('Caught the error:', err.message); // THIS NEVER RUNS
}
 */

//but these will:

//1) Inside Callbacks: Keep the try/catch block inside the callback itself:
setTimeout(() => {
  try {
    throw new Error('Handled inside');
  } catch (err) {
    console.error('Safely caught:', err.message);
  }
}, 1000);

//2) Using Promises: Always chain .catch() or use try/catch across an await expression:

// With .catch()
// doAsyncTask().catch((err) => console.error(err));

// Inside an async function with await
async function run() {
  try {
    await doAsyncTask();
  } catch (err) {
    console.error(err); // Works because `await` pauses execution context
  }
}

//3) Global Safety Nets: Use process-level listeners as a last line of defense to log fatal issues before exiting:

process.on('uncaughtException', (err) => {
  console.error('Fatal unhandled error:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Promise Rejection at:', promise, 'reason:', reason);
});

//Need a seperate lesson to learn process.on.
//The Node.js Event Loop

//What is the Event Loop?

// The event loop is what allows Node.js to perform non-blocking I/O operations — despite the fact that a single JavaScript thread is used by default — by offloading operations to the system kernel whenever possible.

//..............................

//Event Loop Explained

//event loop of vanilla javascript (callstack -> microtask queue -> macrotask queue) and nodejs are not same,
// node.js has divided macrotask queue into 6 further queues (timers callbacks -> I/O callbacks -> idle,prepare ~internal Node.js engine bookkeeping -> poll ~new I/O events like requests, disk reads -> setImmediate callbacks -> close callbacks ~like socket.on('close')) which run in a loop,
//  while microtask queue (divided into .nexttick() and promise methods queue, while .nexttick() queue having higher priority) can cut the line and bulge in immediately even if current queue (some loop queue) is running.

//Note: 

//1) each queue follows FIFO
//2) If the queue has been exhausted or callback limit has been reached then event loop moves on to next queue, 
//3) New macrotask of same type is added at the bottom of the queue and executed in current execution loop, while macrotask of different type is added to its queue at bottom. while new microtask is added to microtask queue and executed before next cyclic queue execution begins. 

// ==========================================
// NODE.JS & LIBUV TIMER ARCHITECTURE
// ==========================================

// 1. DATA STRUCTURE (How timers are stored efficiently):
  // libuv (C layer): Maintains a binary min-heap where the next timer to expire sits at the root (cheap to peek at the earliest deadline).
  // - Node.js (JS layer optimization): To avoid O(log n) tree rebalancing overhead for thousands of timers, Node groups timers with identical/similar durations into bucketed linked lists (conceptually like a Map).
/**
 * Conceptual model of Node's timer list buckets:
 * Map {
 *   1000ms => [ Timer1, Timer2 ], // Share one single underlying libuv timer
 *   2000ms => [ Timer3 ],
 *   5000ms => [ Timer4, Timer5, Timer6 ]
 * }
 */

//2) One more important change: sequence of execution of queues in nodejs event loop has been restructured, now timers are executed after poll phase but expired timers are run once before event loop even starts which is for good.

//Why libuv's min heap and node.js hash map required for timers?

// libuv's min-heap is required to know the sequence of timers and other important stuff while node.js hash map is required for very less time complexity basically when to execute and volume reduction.

//.........................................

//Phases in Detail

//==================================
//pending callbacks
//==================================

//The pending callbacks phase (internally called uv__run_pending) is a cleanup phase for low-level system I/O callbacks that had to be postponed from the previous loop iteration.
//Think of it as libuv's backlog buffer
//You will almost never interact with this phase directly in user code

//==================================
//poll
//==================================

//The poll phase has two main functions:
//1) Calculating how long it should block and poll for I/O, then
//2) Processing events in the poll queue.

//==================================
//check
//==================================

//The check phase exists specifically to run setImmediate() callbacks right after the poll phase finishes, pulling the event loop forward so it doesn't sit idle waiting for I/O.

//==================================
//close callbacks
//==================================

//This phase handles resource cleanup—emitting the 'close' event when a connection is abruptly destroyed (like socket.destroy()), whereas normal closes are dispatched via process.nextTick().

//==================================
//timers
//==================================

//setTimeout(..., ms) defines a minimum delay, not an exact execution time. Because JavaScript is single-threaded, any running callback or I/O operation (The Poll Phase Governs Timing) can push the timer's execution far beyond its target threshold

//Starvation Guardrail: libuv enforces an internal hard maximum limit on how long it can poll or how many I/O events it processes consecutively so that pending timers are not starved indefinitely

//......................................

//setImmediate() vs setTimeout()

//-> setImmediate() is designed to execute a script once the current poll phase completes.
//-> setTimeout() schedules a script to be run after a minimum threshold in ms has elapsed.

//Note: The main advantage to using setImmediate() over setTimeout() is setImmediate() will always be executed before any timers if scheduled within an I/O cycle, independently of how many timers are present.

//......................................

//process.nextTick

async function abc (callback){
  process.nextTick(
    callback
  )
}
abc(()=>console.log(1));
console.log(2);
console.log(3);
console.log(4);

//process.nextTick is like vip microtask so because of it callback becomes a microtask which will execute only after all callstack is empty

//......................................

//process.nextTick() vs setImmediate()

//process.nextTick() fires immediately on the same phase
// setImmediate() fires on the following iteration or 'tick' of the event loop

//......................................

//Why use process.nextTick()?

//2) Allow users to handle errors, cleanup any then unneeded resources, or perhaps try the request again before the event loop continues.

//1) At times it's necessary to allow a callback to run after the call stack has unwound but before the event loop continues.

//ex:
const server = net.createServer();
server.on('connection', conn => {});
server.listen(8080);
server.on('listening', () => {});

//Node's internal implemention puts callback under process.nextTick under the hood so callstack could be cleared before server.listen()'s callback is executed

//ex:

const EventEmitter = require('node:events');
class MyEmitter extends EventEmitter {
  constructor() {
    super();
    // this.emit('event');

    // use nextTick to emit the event once a handler is assigned
    process.nextTick(() => {
      this.emit('event');
    });
  }
}
const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
  console.log('an event occurred!');
});

//You can't emit an event from the constructor immediately

// because the script will not have processed to the point where the user assigns a callback to that event. So, within the constructor itself, you can use process.nextTick() to set a callback to emit the event after the constructor has finished, which provides the expected results:
//Discover JavaScript Timers

//setTimeout

// setTimeout(): void

setTimeout(() => {
  // runs after 2 seconds
}, 2000);
setTimeout(() => {
  // runs after 50 milliseconds
}, 50);

const myFunction = (firstParam, secondParam) => {
  // do something
};
// runs after 2 seconds
setTimeout(myFunction, 2000, 'firstParam', 'secondParam');

//Zero delay

setTimeout(() => {
  console.log('after ');
}, 0);
console.log(' before ');

//setImmediate() method that does this same exact functionality

//setInterval

// setInterval(): void

const timeout1 = setInterval(() => {
  // runs every 0.5 seconds
}, 500);
setTimeout(clearInterval, 2000, timeout1);

//................................

//Recursive setTimeout

//If a function takes long time to execute, then the time difference between it's execution end and beginning of execution of next function overlaps in setInterval, so we use recursive setTimeout.

//it is suggested we use async/await for recursive setTimeout.

/**
const myFunction = () => {
  // do something
  setTimeout(myFunction, 1000);
};
setTimeout(myFunction, 1000);
 */
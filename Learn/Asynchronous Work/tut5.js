//Overview of Blocking vs Non-Blocking

//Blocking

//Node.js documentation restricts the word blocking specifically to waiting on external I/O, rather than spinning your CPU with JavaScript logic.

//................................

//Comparing Code

const fs = require('node:fs');

const data = fs.readFileSync('/file.md'); // blocks here until file is read

fs.readFile('/file.md', (err, data) => { //Async, doesn't block main thread
  if (err) {
    throw err;
  }
});

//..................................

//Concurrency and Throughput

//JavaScript execution in Node.js is single threaded, so concurrency refers to the event loop's capacity to execute JavaScript callback functions after completing other work. Any code that is expected to run in a concurrent manner must allow the event loop to continue running as non-JavaScript operations, like I/O, are occurring.

//..................................

//Dangers of Mixing Blocking and Non-Blocking Code

//Ex:

//Don't do this:
/**
const fs = require('node:fs');
fs.readFile('/file.md', (err, data) => {
  if (err) {
    throw err;
  }
  console.log(data);
});
fs.unlinkSync('/file.md');  //unlinkSync deletes '/file.md' 
 */

//Do this:
/**
const fs = require('node:fs');
fs.readFile('/file.md', (readFileErr, data) => {
  if (readFileErr) {
    throw readFileErr;
  }
  console.log(data);
  fs.unlink('/file.md', unlinkErr => {
    if (unlinkErr) {
      throw unlinkErr;
    }
  });
});
 */
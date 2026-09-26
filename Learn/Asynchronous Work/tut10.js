//Don't Block the Event Loop (or the Worker Pool)

//.................................

//Don't block the Event Loop

//Try to have constant time callback as much as possible over time complexities

//Example:

//good way: O(1)

app.get('/constant-time', (req, res) => {
  res.sendStatus(200);
});

//bad way: O(n)

app.get('/countToN', (req, res) => {
  const n = req.query.n;
  // n iterations before giving someone else a turn
  for (let i = 0; i < n; i++) {
    console.log(`Iter ${i}`);
  }
  res.sendStatus(200);
});

//very bad way: O(n^2)

app.get('/countToN2', (req, res) => {
  const n = req.query.n;
  // n^2 iterations before giving someone else a turn
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      console.log(`Iter ${i}.${j}`);
    }
  }
  res.sendStatus(200);
});

//.................................

//Blocking the Event Loop: REDOS

//a very recursive backtracking which clogs your cpu. O(2^n)

//Bad way:

app.get('/redos-me', (req, res) => {
  const filePath = req.query.filePath;
  // REDOS
  if (filePath.match(/(\/.+)+$/)) {
    console.log('valid path');
  } else {
    console.log('invalid path');
  }
  res.sendStatus(200);
});

// Better way to do it:

// Matches a slash followed by one or more NON-slash characters, repeated safely
filePath.match(/^\/([^\/]+(\/)?)*$/);

filePath.match(/(\/[^\/]+)+$/)

//
//Anti-REDOS Resources:
// There are some tools to check your regexps for safety, like
// safe-regex
// rxxr2.
// Another approach is to use a different regexp engine, 
// If you're trying to match something "obvious", like a URL or a file path, find an example in a regexp library or use an npm module, e.g. ip-regex.

//.....................................

// Blocking the Event Loop: Node.js core modules

//Several Node.js core modules have synchronous expensive APIs, including:

// Encryption
// Compression
// File system
// Child process

//These APIs are expensive, because they involve significant computation (encryption, compression), require I/O (file I/O), or potentially both (child process). 
//These APIs are intended for scripting convenience, but are not intended for use in the server context

//In a server, you should not use the following synchronous APIs from these modules:

//Encryption:
// crypto.randomBytes (synchronous version)
// crypto.randomFillSync
// crypto.pbkdf2Sync
// You should also be careful about providing large input to the encryption and decryption routines.

//Compression:
// zlib.inflateSync
// zlib.deflateSync

//File system:
// Do not use the synchronous file system APIs. For example, if the file you access is in a distributed file system like NFS, access times can vary widely.

//Child process:
// child_process.spawnSync
// child_process.execSync
// child_process.execFileSync

//This list is reasonably complete as of Node.js v9.

//.............................

//Blocking the Event Loop: JSON DOS

//JSON.parse and JSON.stringify time complexity is O(n), for large inputs they could be significant.

//There are npm modules that offer asynchronous JSON APIs. See for example:

//--> JSONStream, which has stream APIs.
//--> Big-Friendly JSON, which has stream APIs as well as asynchronous versions of the standard JSON APIs using the partitioning-on-the-Event-Loop paradigm outlined below.

//...............................

//Example 1: Un-partitioned average, costs O(n)

for (let i = 0; i < n; i++) {
  sum += i;
}
const avg = sum / n;
console.log('avg: ' + avg);

//Example 2: Partitioned average, each of the n asynchronous steps costs O(1).

function avgSum(n, broadcast){
  let sum = 0;
  function help(i){
    sum += i;
    if(i == n){
      broadcast(n, sum);
      return;
    }
    setImmediate(help.bind(null, i+1))
  }
  help(1);
};

avgSum(10, function(n, sum){
  console.log(`Your sum is ${sum} and The average is ${sum/n}`)
});

//Here all this code does is it doesn't block the event loop instead spreads it's computation across the acynchronous work flow.

//.....................................

//Offloading: 

//
//conclusions

// For simple tasks, like iterating over the elements of an arbitrarily long array, partitioning might be a good option. If your computation is more complex, offloading is a better approach: the communication costs, i.e. the overhead of passing serialized objects between the Event Loop and the Worker Pool, are offset by the benefit of using multiple cores.

// However, if your server relies heavily on complex calculations, you should think about whether Node.js is really a good fit. Node.js excels for I/O-bound work, but for expensive computation it might not be the best option.

// If you take the offloading approach, see the section on not blocking the Worker Pool.

//........................

//Don't block the Worker Pool

//...................................................

//Summary:

//don't block the event loop, you can instead use acync methods, avoid sync methods if taking O(n) time to complete instead partition the computation across async workflow, but if the computation is too heavy offload it using node.js workerpool or child Process or cluster or other NPM. Then there there was section on don't block the worker pool, where 2 examples were showcased, one on readFile() and other on crypto where depending on input computation time varies. Then there is a section on Task partitioning, how ReadStream is used with readFile() and helps avoid blocking worker pool for big files. Then there is a sub section on Avoiding Task partitioning, how it is not always a good idea, Worker Pools incurs space and time overheads, there is also competition for cpu time. In the end, the last section is on 'The risks of npm modules' as there are hundreds of thousands of npm modules out there and most of them are from third party, so this section bewares us to be thoughtful while using them.
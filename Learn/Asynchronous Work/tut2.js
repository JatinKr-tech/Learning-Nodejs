//Asynchronous flow control

//.............................

//State Management

//State is any piece of data that your program needs to rememeber for later.

//1) Avoiding global variables is essential hygiene in Node.js to prevent race conditions and cross-user data leaks.
//2) True state management means deciding whether your data should be passed explicitly as an argument (local/stateless) or retrieved from an isolated, external data store like a session, database, or cache when persistence is required.

//...........................

// Control Flow 

//Ex:

//Good execution flow:
function getSong(){
  let _song = '';
  for(i = 100; i>1; i--){
    _song += `${i} bottles of beer on the wall, ${i} bottles of beer. Take one down and pass it around, ${i-1} bottles of beer on the wall.`;
    if(i === 1){
      _song = 'No more bottles of beer on the wall, no more bottles of beer. Go the store and buy some more.'
    }
  }
  return _song;
};

function abcSong(_song){
  if(!_song){
    console.log('No song to sing');
  }
  console.log(_song);
};

abcSong(getSong(getSong()));

//Bad execution flow:

/*
function getSong() {
  let _song = '';
  let i = 100;
  for (i; i > 0; i -= 1) {
    setTimeout(function () {
      _song += `${i} beers on the wall, you take one down and pass it around, ${
        i - 1
      } bottles of beer on the wall\n`;
      if (i === 1) {
        _song += "Hey let's get some more beer";
      }
    }, 0);
  }
  return _song;
}
function singSong(_song) {
  if (!_song) {
    throw new Error("song is '' empty, FEED ME A SONG!");
  }
  console.log(_song);
}
// this will not work
singSong(getSong('beer'));
// Uncaught Error: song is '' empty, FEED ME A SONG!
*/

//SetTimeout queues the callbacks into the macrotask queue to run after the stack clears, causing getSong() to return the unmodified, empty _song before any timer callback has had a chance to execute.

//In series: functions will be executed in a strict sequential order

//Queue Data Structures and Recursion / State Machines -DSA

let operations = [
  {func: function1, args: arg1},
  {func: function2, args: arg2},
  {func: function3, args: arg3}
];

function executeFunctionWithArgs(operation, callback) {
  let { func, args } = operation;
  func(args, callback);
};
function serialProcedure(operation) {
  if(!operation){
    process.exit(0);  //process.exit() is a built-in Node.js method used to force-terminate the current running process
  };
  executeFunctionWithArgs(operation, function(result){
    serialProcedure(operations.shift());
  });
};

serialProcedure(operations.shift());

//This problem is a leetcode medium problem but it's variations could go to leetcode hard problems
//This problem combined Queues, Recursion, and Graph Traversal DSA topics.
//When Async/Await was not introduced, programmers used this method to call another function after previous function execution was completed.

let sentEmailCount = 0;

function final() {
  console.log(`dispatched ${sentEmailCount} emails`);
  console.log('finished');
}

function dispatch(recipient, callback) {
  // `sendMail` is a hypothetical SMTP client
  sendMail(
    {
      subject: 'Dinner tonight',
      message: 'We have lots of cabbage on the plate. You coming?',
      smtp: recipient.email,
    },
    callback
  );
}

function sendOneMillionEmails(biglist) {
  if(!biglist){
    throw new Error('some fatal error')
  }
  function serial(recipient){
    if(sentEmailCount >= 1000000 || !recipient){
      return final()
    }
    dispatch(recipient, function(_err){
      if(!_err){
        sentEmailCount++;
      }
      serial(biglist.pop());
    })
  }
  serial(biglist.pop())
};

// sendOneMillionEmails(biglist);
//Working with file descriptors in Node.js

const fs = require('node:fs');
fs.open('./Users/Jatin.txt', 'r', (err, fd) => {
  // fd is our file descriptor
});

//fs.openSync()

try {
  const fd = fs.openSync('./Users/Jatin.txt', 'r');
  console.log(fd)
} catch (err) {
  console.error(err);
};

//fsPromise.open()

const fsp = require('node:fs/promises')

async function example() {
  let filehandle;
  try {
    filehandle = await fsp.open('./Users/Jatin.txt', 'r');
    console.log(filehandle.fd);
    console.log(await filehandle.readFile({ encoding: 'utf8' }));
  } finally {
    if (filehandle) {
      await filehandle.close();
    }
  }
}
example();

//Why different fd's?

//fd: file discriptor, shortcut to access file path, in some methods you can enter fd instead of url and it would work, but:
//Important: A file descriptor (fd) does not identify a file on disk; it identifies an open session with that file. 
//this answers why we get different fd in fs.open(), fs.openSync(), fsp.open().

//old way, util.promisify(), example:

const util = require('node:util');

async function example3(){
    let open = util.promisify(fs.open)
    let fd2 = await open('./Users/Jatin.txt', 'r');
    console.log(fd2);
};
example3();
//Node.js file stats

const fs = require('node:fs');
fs.stat('./Users/Jatin.txt', (err, stats) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Success')
  }
  // we have access to the file stats in `stats`
});

//Node.js also provides a sync method, which blocks the thread until the file stats are ready:

try {
  const stats = fs.statSync('./Users/Jatin.txt');
  console.log(stats);
} catch (err) {
  console.error(err);
}

//fs.stat() is async task so it is in macrotask queue and since fs.statSync() is synchronous it is in call stack. 
//This explains why we see stats log before 'success' log.

//The file information is included in the stats variable. What kind of information can we extract using the stats?

// A lot, including:

// if the file is a directory or a file, using stats.isFile() and stats.isDirectory()
// if the file is a symbolic link using stats.isSymbolicLink()
// the file size in bytes using stats.size.

try {
  const stats = fs.statSync('./Users/Jatin.txt');
  console.log(stats.isFile());
  console.log(stats.isDirectory());
  console.log(stats.isSymbolicLink());
  console.log(stats.size); //52 = 52bits
} catch (err) {
  console.error(err);
};

//You can also use promise-based fsPromises.stat() method offered by the fs/promises module if you like

const fs2 = require('node:fs/promises');

async function example() {
  try {
    const stats = await fs2.stat('./Users/Jatin.txt');
    console.log(stats.isFile()); // true
    console.log(stats.isDirectory()); // false
    console.log(stats.isSymbolicLink()); // false
    console.log(stats.size); // 52
  } catch (err) {
    console.log(err);
  }
}
example();
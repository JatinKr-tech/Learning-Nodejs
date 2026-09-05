//Writing files with Node.js

const fs = require('node:fs');
const fsp = require('node:fs/promises')

//Writing a file

//easiest way, use the fs.writeFile() API, //it's async

const content = 'Some content! 2x';

fs.writeFile('./Users/content.txt', content, err => {
    if (err) {
        console.error(err);
    } else {
        // file written successfully
        console.log('success1')
    }
});

//.................................

//Writing a file synchronously

// fs.writeFileSync():

try {
    fs.writeFileSync('./Users/contentSync.txt', content);
    // file written successfully
} catch (err) {
    console.error(err);
};

//...........................

//fsPromises.writeFile() //async

async function example1(url) {
    try {
        await fsp.writeFile(url, content)
    } catch (err) {
        console.log(err)
    }
};

example1('./Users/contentFSP.txt');

//Note: By default, these API's will replace the contents of the file if it does already exist.

//flags:

// fs.writeFile('./Users/contentFlag.txt', content, {flag: 'r+'}, err=>console.log(err)); //Error, no such file
fs.writeFile('./Users/contentFlag1.txt', content, {flag: 'w+'}, err=>console.log(err)); //Success
fs.writeFile('./Users/contentFlag2.txt', content, {flag: 'a+'}, err=>console.log(err)); //Success

//1) r+: This flag opens the file for reading and writing, cannot create new file
//2) w+: This flag opens the file for reading and writing and it also positions the stream at the beginning of the file, can create new file
//3) a: This flag opens the file for writing and it also positions the stream at the end of the file, can create new file
//4) a+: This flag opens the file for reading and writing and it also positions the stream at the end of the file, can create new file

//.............................

//Appending content to a file

//Appending to files is handy when you don't want to overwrite a file with new content, but rather add to it.

//
//Examples

//fs.appendFile() (and its fs.appendFileSync() counterpart):

fs.appendFile('./Users/file.log', content, err => {
  if (err) {
    console.error(err);
  } else {
    // done!
  }
});

fs.appendFileSync('./Users/file2.log', content, err => {
  if (err) {
    console.error(err);
  } else {
    // done!
  }
});

//fsPromises.appendFile() example:

async function example2(){
    try {
        fsp.appendFile('./Users/filefsp.txt', content)
    } catch (err) {
        console.log(err)
    }
};
example2();
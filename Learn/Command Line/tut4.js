//Accept input from the command line in Node.js

//How to make a Node.js CLI program interactive?

//Node.js since version 7 provides the readline module to perform exactly this: get input from a readable stream such as the process.stdin stream, which during the execution of a Node.js program is the terminal input, one line at a time.

// const readline = require('node:readline'); //not working because '"type": "module"' in package.json which is forcing .js file to be treated as ECMAScriptModule instead of CommonJS
import readline from 'node:readline';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.question(`What's your name?`, name => {
  console.log(`Hi ${name}!`);
  rl.close();
});

//readline offers several other methods, we can explore

//If you need to require a password, it's best not to echo it back, but instead show a * symbol.
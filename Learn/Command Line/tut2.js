//How to use the Node.js REPL

//What is the Node.js REPL?
//Node.js comes with a built-in REPL (Read-Eval-Print Loop) environment that allows you to execute JavaScript code interactively. The REPL is accessible through the terminal and is a great way to test out small pieces of code.

//..............................

//How to use the Node.js REPL

//Simply open your terminal and type 'node' to start REPL session.

//Using is very simple, i am not gonna explain it here.

//..............................

//The '_' special variable

//If after some code you type _, that is going to print the result of the last operation.

//
//The Up arrow key gives you history

//
//Dot commands

/**
.help: shows the dot commands help.
.editor: enters editor mode, to write multiline JavaScript code.
.break / .clear: exits multi-line code like functions. Same as pressing CTRL-C.
.load: loads a JavaScript file, relative to the current working directory.
.save: saves all commands you entered in the session to a file.
.exit: exits the REPL (same as pressing CTRL-C twice).
 */
//The REPL knows when you are typing a multi-line statement without the need to invoke .editor.

//
//Run REPL from JavaScript file

const repl = require('node:repl');

//You can pass a string which shows when the REPL starts. The default is '> ' (with a trailing space), but we can define custom prompt.
const local = repl.start('& ');

//You can display a message while exiting the REPL
local.on('exit', ()=>{
    console.log('sad exit');
    process.exit();
}); 
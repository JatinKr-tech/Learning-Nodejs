#!/usr/bin/node

//Run Node.js scripts from the command line

//node app.js

//Above, you are explicitly telling the shell to run your script with node. You can also embed this information into your JavaScript file with a "shebang" line. 

// The "shebang" is the first line in the file, and tells the OS which interpreter to use for running the script. Below is the first line of JavaScript:

// '#!/usr/bin/node'

//Above, we are explicitly giving the absolute path of interpreter. Not all operating systems have node in the bin folder, but all should have env. You can tell the OS to run env with node as parameter:

// '#!/usr/bin/env node'

//To use a shebang, your file should have executable permission. You can give app.js the executable permission by running:

// 'chmod u+x app.js'

//Note: While running the command, make sure you are in the same directory which contains the app.js file.

//...............................

//Pass string as argument to node instead of file path

//To execute a string as argument you can use -e, --eval "script"

//On Windows, using cmd.exe a single quote will not work correctly because it only recognizes double " for quoting. In Powershell or Git bash, both ' and " are usable.

// 'node -e "console.log(123)"'

//.......................................

//Restart the application automatically

//'node --watch app.js'

//.......................................

//Run a task with Node.js

//What this topic is about : this topic was all about what are shortcuts in pakage.json, how you can create them and use them to make your life a bit easier so you don't have to type big commands in CLI/terminal.

//
//Using the --run flag

//The --run flag allows you to run a specified command from the scripts section of your package.json file.

//Ex: 
//node --run starttut1

//
//Passing arguments to the command

//Ex:
//node --run start -- tut1.js

//Ex:
//node --run start -- --port 8080 //Just like passing strings as there is no server code in this file.

//Note: Note: Arguments passed after -- are forwarded to the script and are not interpreted as Node.js CLI flags.
//Ex: they are different:
// 'node tut1.js --watch' //doesn't work because of wrong CLI order 
// 'node --watch tut1.js' //works because of correct CLI order
// 'node tut1.js -- --watch' //doesn't work because '--watch' is literally an argument
console.log(process.argv); 
//argv is old term for array, process.argv is an array which stores keywords you enter in terminal by spaces, first two strings in this array are paths, first is path to node, and second path is pointing to adress to the file you are executing. Rest of the strings are keywords you enter.

// Summary of this note: anything (argument) written beyond -- is directly passed to process.argv like a string, node doesn't check if the argument is flag or not.

//.................................

//Environment variables
// The --run flag sets specific environment variables that can be useful for your scripts:

// NODE_RUN_SCRIPT_NAME: The name of the script being run.
// NODE_RUN_PACKAGE_JSON_PATH: The path to the package.json file being processed.

console.log(process.env.NODE_RUN_SCRIPT_NAME); //runtut1
console.log(process.env.NODE_RUN_PACKAGE_JSON_PATH); //C:\Users\jatin kumar\Learning-Nodejs\Learn\Command Line\package.json

//.............................

//Intentional limitations

// The Node.js task runner is intentionally more limited compared to other task runners like npm run or yarn run. It focuses on performance and simplicity, omitting features like running pre or post scripts. This makes it suitable for straightforward tasks but may not cover all use cases.
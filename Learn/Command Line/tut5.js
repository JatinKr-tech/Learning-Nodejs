//How to read environment variables from Node.js

//The process core module of Node.js provides the env property which hosts all the environment variables that were set at the moment the process was started.

console.log(process.env.USER_ID); // "239482"
console.log(process.env.USER_KEY); // "foobar"

//In terminal:
//$env:USER_ID="239482"; $env:USER_KEY="foobar"; node tut5.js

//Note: process does not need to be imported, it is a global object in Node.js.

//
//you can use the --env-file flag to specify an environment file when running your Node.js application.

console.log(process.env.PORT);//3000
//'node --env-file=./config/abc.env tut5.js'

console.log(process.env.SMTH); //9990
//'node --env-file=./config/xyz.env --env-file=abc.env tut5.js'

//Note: if the same variable is defined in the environment and in the file, the value from the environment takes precedence.

//Value from later .env file takes precedence if both .env files contains same variable, for example:
//PORT in xyz.env is 3000 and in abc is 3594
//with command 'node --env-file=./config/xyz.env --env-file=./config/abc.env tut5.js' PORT is 3594
//with command 'node --env-file=./config/abc.env --env-file=./config/xyz.env tut5.js' PORT is 3000

//You can avoid error if .env file is missing from directary like this:

//node --env-file-if-exists=./config/doesnotexist.env tut5.js

//..............................

//Loading '.env' files programmatically with 'process.loadEnvFile(path)'

//Node.js provides a built-in API to load '.env' files directly from your code: 'process.loadEnvFile(path)'.

//This method loads variables from a .env file into process.env, similar to how the --env-file flag works — but can be invoked programmatically.

//Startup variables won't work as they initialize before file runs, so how to make them work:
//How to Make Startup Variables Actually Work
// If you need startup flags like NODE_OPTIONS from a .env file to take effect, pass the .env file from the command line so Node reads it before initializing

import { loadEnvFile } from 'node:process';
loadEnvFile('./config/abc.env');

console.log(process.env.PORT); //3594
console.log(process.env.SMTH); //9990

//if .env file passed in terminal and .env file loaded programmatically have same variable then variable from .env file passed in terminal is considered. 
//Because : By default in Node.js, process.loadEnvFile() (as well as --env-file) follows the rule: existing environment variables are not overwritten.
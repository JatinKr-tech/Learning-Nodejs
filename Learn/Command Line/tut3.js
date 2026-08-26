//Output to the command line using Node.js

//Basic output using the console module
let x = 'x';
let y = 'y';

console.log(x, y);

// %s format a variable as a string
// %d format a variable as a number
// %i format a variable as its integer part only
// %o format a variable as an object

console.log('My %s has %d ears', 'cat', 2);
console.log('%o', Number); //object
console.log('%i', Number); //NaN
console.log('%s am %d years old', 19, 'I'); //19 am NaN years old
console.log('%s am %d years old', 'I', 19); //I am 19 years old

//...........................

//Clear the console

// console.clear() clears the console, behaviour might depend on the console used.

//...........................

//Counting elements

console.count(`this has been printed how many times?`); //... 1
console.count(`this has been printed how many times?`); //... 2
console.count(`this has been printed how many times?`); //... 3
console.count(`this has been printed how many times?`); //... 4

let orange = ["Orange", "Orange", "Orange", "Orange", "Orange"]
let banana = ["Banana"]

orange.forEach(fruit=>console.count(fruit)); //1-5
banana.forEach(fruit=>console.count(fruit));
orange.forEach(fruit=>console.count(fruit)); //6-10

//............................

//Reset counting

console.countReset('Orange'); //0
orange.forEach(fruit=>console.count(fruit)); //1-5

//................................

//Print the stack trace

//There might be cases where it's useful to print the call stack trace of a function, maybe to answer the question how did you reach that part of the code?

const function2 = () => console.trace();
const function1 = () => function2();
function1();

//...............................

//Calculate the time spent

function func3(){
    console.log(2n**65n);
};

function measureTimeTaken(func){
    console.time(`Time taken by function '${func.name}' is`);
    func();
    console.timeEnd(`Time taken by function '${func.name}' is`);
};

measureTimeTaken(func3);

//..............................

//stdout and stderr

//console.log points to stdout stream, console.error points to stderr stream

//..............................

//Color the output

//Note: This part of the resource is designed with version 22.11 which notes styleText as ‘Active development’.

import { styleText } from 'node:util'; //wasn't running so added '"type": "module"' to package.json, now it works
// const { styleText } = require('node:util'); //works

console.log(
  styleText(['red'], 'This is red text ') +
    styleText(['green', 'bold'], 'and this is green bold text ') +
    'this is normal text'
);

//The first argument is an array of styles, and the second argument is the text you want to style.
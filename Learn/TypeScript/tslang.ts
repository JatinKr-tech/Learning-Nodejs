import CLIENT_RENEG_LIMIT = require("node:tls");
import nodeTls = require("node:tls");

interface User {
  name: string;
  id: number;
  // client: boolean;
}

let admin: User = {
  name: 'Jensen',
  id: 1
};
console.log(admin);

// let admin2: User = {
//   name : 'Huang',
//   id: 'abc'     //error underline
// };
// console.log(admin2);

class UserDetailes{
  name: string;
  id: number;
  constructor(name: string, id: number){
    this.name = name;
    this.id = id;
  }
}

let user1: User = new UserDetailes('Jatin', 19);
console.log(user1);
// let user2: User = new UserDetailes('Jatin', '19'); //error underline
// console.log(user2);

function func1(user: User){
  console.log(user);
}

func1(user1);

// function func2(): User {
//   // ...
//   console.log('abc');
// }

//..................................

//Composing Types

//---> Unions

type MyBool = true | false;

let bool1: MyBool =  true;
console.log(bool1);
// let bool2: MyBool =  'string'; //error underline
// console.log(bool2);

//A popular use-case for union types is to describe the set of string or number literals that a value is allowed to be:

type windowState = 'open' | 'closed' | 'minimized';
type evenNumbersOnly = 2|4|6|8|10;

let state1: windowState = 'open';
console.log(state1);
// let state2: windowState = 'nothing'; //error underline
// console.log(state2);

let number1: evenNumbersOnly = 4;
console.log(number1);
// let number2: evenNumbersOnly = 5; //error underline
// console.log(number2);

function func3(something: string | string[]){
  console.log(something);
};
func3('Jatin');
func3(['a','b']);
// func3([1,2]);  //error underline
// func3({name: 'Jatin'});  //error underline
// func3(true); //error underline

function func4(something: string | string[]){
  if(typeof something === "boolean"){
    // throw new Error(`It's a numb`)
    console.log(`It's a numb`);
  }
  console.log(something);
};

func4('Ultron');
// func4(false);  //error underline

//---> Generics

type stringArray = Array<string>;
let arr1: stringArray = ['jatin', 'jeager'];
// let arr2: stringArray = [1,2]; //error underline
type ObjectWithNameArray = Array<{ name: string }>;
let arr3: ObjectWithNameArray = [{name: 'eisenhower'}, {name: 'erwin'}];
// let arr4: ObjectWithNameArray = [{something: 'abc'}]; //error underline

//For illustration: 
/*
interface Backpack<Type> {
  add: (something: Type) => void;
  get: () => Type;
};

declare const backpack: Backpack<string>; 
const object = backpack.get();
backpack.add('string');
*/

//runtime error because but no underline error because 'declare' is removed while compiling, //below one works:
/**
interface Backpack<Type> {
  add: (something: Type) => void;
  get: () => Type;
}

const items: string[] = [];

const backpack: Backpack<string> = {
  add(something) {
    items.push(something);
  },
  get() {
    return items[items.length - 1];
  },
};

backpack.add('string');
const object = backpack.get();
console.log(object); // Output: 'string'
 */

//.............................................

//Structural Type System

interface Point {
  x: number;
  y: number;
}
 
function logPoint(p: Point) {
  console.log(`${p.x}, ${p.y}`);
}
 
// logs "12, 26"
const point = { x: 12, y: 26 };
logPoint(point);

const point3 = { x: 12, y: 26, z: 89 };
logPoint(point3); // logs "12, 26"
 
const rect = { x: 33, y: 3, width: 30, height: 80 };
logPoint(rect); // logs "33, 3"
 
const color = { hex: "#187ABF" };
logPoint(color); //undefined, undefined //error underline
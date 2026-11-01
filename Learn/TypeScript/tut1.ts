type User = {
  name : string,
  age : number
};

function func1 (user : User): boolean {
  return user.age >= 18;
  // return 'abc';
};

let user1 = {
  name : 'Jatin',
  // age : 'abc'
  age : 19
  // age : 17
} satisfies User;

console.log(func1(user1));

//If the code doesn't match the declared types, for example, if age were a string instead of a number, TypeScript reports an error during development, helping you catch mistakes before your code runs.

//Note: When TypeScript code is compiled all the TypeScript-specific components are removed, resulting in a clean JavaScript that can run in any Environment.

//.........................................

//Type definitions 

//Type definitions are usually stored in .d.ts files

//For example, when you use Node.js with TypeScript, you'll need type definitions for Node.js APIs. This is available via @types/node. Install it using:

// "npm add --save-dev @types/node"

//These type definitions allow TypeScript to understand Node.js APIs and provide proper type checking and autocompletion when you use functions like fs.readFile or http.createServer

// const resolve = require('node:');
// resolve(123, 456);

//...............................

//How to check for type errors? 

//---> open your new terminal and type "npx tsc --noEmit --watch"
//---) you can disable it with "node --no-experimental-strip-types example.ts"


//Ways to run ts file: 

//---> "node tut1.ts" or "node --watch tut1.ts"
//---> "npx tsx tut1.js" or "npx tsx --watch tut1.js"

//............................................

//Constraints

//Note: there are some constraints for for TypeScript in Nodejs

//Type stripping
//Type checking
//Configuration (about tsconfig.json)

//.............................................

//If you are using a version less than v22.18.0, you can use the --experimental-strip-types flag to run TypeScript files directly in Node.js.

//.............................................

//Running TypeScript code with ts-node (note: somehow does not work for me)

// To use ts-node, you need to install it first:
// npm i -D ts-node

//Then you can run your TypeScript code like this:
// npx ts-node tut1.ts

//..............................................

//Running TypeScript code with tsx

// To use tsx, you need to install it first:
// npm i -D tsx

//Then you can run your TypeScript code like this:
// npx tsx example.ts

//.............................................

//Registering tsx via node

// If you want to use tsx via node, you can register tsx via --import:
// node --import=tsx example.ts

//...........................................

// Publishing a TypeScript package

//.............................................

//Node runs TypeScript code via a process called "type stripping", wherein node (via Amaro) removes TypeScript-specific syntax

//Node does not strip types in node_modules


//A directory overview of a repository would look something like:
/*
example-ts-pkg/
├ .github/
│ ├ workflows/
│ │ ├ ci.yml
│ │ └ publish.yml
│ └ dependabot.yml
├ src/
│ ├ foo.fixture.js
│ ├ main.ts
│ ├ main.test.ts
│ ├ some-util.ts
│ └ some-util.test.ts
├ LICENSE
├ package.json
├ README.md
└ tsconfig.json
*/

//And a directory overview of its published package would look something like:

/**
example-ts-pkg/
├ dist/
│ ├ main.d.ts
│ ├ main.d.ts.map
│ ├ main.js
│ ├ some-util.d.ts
│ ├ some-util.d.ts.map
│ └ some-util.js
├ LICENSE
├ package.json
└ README.md
 */

//...................................

//What to do with your types

//Treat types like a test

//Generate type declarations

//Breaking it down:
// By default, npm publish grabs (almost) everything
// In order to keep your published package minimal you want to exclude certain files (like tests and test fixtures) from packaging.
// Add these to the opt-out list specified in .npmignore; ensure the !*.d.ts exception is listed, or the generated type declarations will not be published! Alternatively, you can use package.json "files" to create an opt-in (if a mistake is made accidentally omitting a file, your package may be broken for downstream users, so this is a less safe option).
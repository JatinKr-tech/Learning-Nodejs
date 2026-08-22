//Node.js with WebAssembly

//WebAssembly is a low-level, binary code format designed for near-native execution speed. It lets you write performance-critical code in languages like C, C++, Rust, or AssemblyScript and run it directly inside Node.js (or modern web browsers).

//...............................

//Key Concepts

// Module - A compiled WebAssembly binary, i.e. a .wasm file.
// Memory - A resizable ArrayBuffer.
// Table - A resizable typed array of references not stored in Memory.
// Instance - An instantiation of a Module with its Memory, Table, and variables.

//In order to use WebAssembly, you need a .wasm binary file and a set of APIs to communicate with WebAssembly. Node.js provides the necessary APIs via the global WebAssembly object.

console.log(WebAssembly);
/*
Object [WebAssembly] {
  compile: [Function: compile],
  validate: [Function: validate],
  instantiate: [Function: instantiate]
}
*/

//..................................

//Generating WebAssembly Modules

//ways:

// Writing WebAssembly (.wat) by hand and converting to binary format using tools such as wabt
// Using emscripten with a C/C++ application
// Using wasm-pack with a Rust application
// Using AssemblyScript if you prefer a TypeScript-like experience

//Note : Some of these tools generate not only the binary file, but the JavaScript "glue" code and corresponding HTML files to run in the browser.

//..................................

//How to use it

//Once you have a WebAssembly module, you can use the Node.js WebAssembly object to instantiate it.

/*

//just a illustration, assuming add.wasm file exists at certain assumed path (won't run)

// Assume add.wasm file exists that contains a single function adding 2 provided arguments
import fs from 'node:fs/promises';
// Use readFile to read contents of the "add.wasm" file
const wasmBuffer = await fs.readFile('/path/to/add.wasm');
// Use the WebAssembly.instantiate method to instantiate the WebAssembly module
const wasmModule = await WebAssembly.instantiate(wasmBuffer);
// Exported function lives under instance.exports object
const { add } = wasmModule.instance.exports;
const sum = add(5, 6);
console.log(sum); // Outputs: 11

*/

//................................

//Interacting with the OS

// WebAssembly modules cannot directly access OS functionality on its own. A third-party tool Wasmtime can be used to access this functionality. Wasmtime utilizes the WASI API to access the OS functionality.
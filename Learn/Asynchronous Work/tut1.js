//JavaScript Asynchronous Programming and Callbacks

//Asynchronicity in Programming Languages

//Normally, programming languages are synchronous and some provide a way to manage asynchronicity in the language or through libraries. C, Java, C#, PHP, Go, Ruby, Swift, and Python are all synchronous by default. Some of them handle async operations by using threads, spawning a new process.

//............................

//JavaScript

//Synchronous by deffault

//Node made I/O (Input/Output) (like: file access, network calls and so on) Asynchronous by default. Which allowed non-blocking I/O environment. (other languages previously used to block cpu threads and while performing I/O, so there was need to create new OS threads for new users, wasting memory)

//................................

//Callbacks

//A callback is a simple function that's passed as a value to another function, and will only be executed when the event happens. We can do this because JavaScript has first-class functions, which can be assigned to variables and passed around to other functions (called higher-order functions)

//ex: 
//XHR was used before fetch

const xhr = new XMLHttpRequest();
xhr.onreadystatechange = () => {    //<--callback func
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      console.log(xhr.responseText);
    } else {
      console.error('error');
    }
  }
};
xhr.open('GET', 'https://yoursite.com');
xhr.send();

//Node.js adopted: the first parameter in any callback function is the error object: error-first callbacks

//.................................

//The problem with callbacks

//callback nesting
//Pyramid of Doom

//............................

//Alternatives to callbacks

//Promises, '.then' was introduced to solve this very problem!
//Async/Await
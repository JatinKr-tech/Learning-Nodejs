//Using the Fetch API with Undici in Node.js

//Introduction

//Undici is an HTTP client library that powers the fetch API in Node.js
//It was written from scratch and does not rely on the built-in HTTP client in Node.js. It includes a number of features that make it a good choice for high-performance applications.

//for more info about Undici visit, src: https://undici.nodejs.org/#/?id=specification-compliance-1

//....................................

//Basic GET Usage

async function main1() {
  // Like the browser fetch API, the default method is GET
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await response.json();
  console.log(data);
  // returns something like:
  //   {
  //   userId: 1,
  //   id: 1,
  //   title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
  //   body: 'quia et suscipit\n' +
  //     'suscipit recusandae consequuntur expedita et cum\n' +
  //     'reprehenderit molestiae ut ut quas totam\n' +
  //     'nostrum rerum est autem sunt rem eveniet architecto'
  // }
}

main1().catch(console.error);

//....................................

//Basic POST Usage

// Data sent from the client to the server
const body = {
  title: 'foo',
  body: 'bar',
  userId: 1,
};

async function main2() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'User-Agent': 'undici-stream-example',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  console.log(data);
  // returns something like:
  // { title: 'foo', body: 'bar', userId: 1, id: 101 }
}

main2().catch(console.error);

//The 4 Core HTTP Methods
// GET (Default):

// Asks the server to retrieve data (e.g., fetch('[https://api.com/users](https://api.com/users)')).
// Does not have a body.

// POST:

// Sends brand-new data to be created on the server (e.g., submitting a sign-up form).
// Requires a body and a Content-Type header.

// PUT / PATCH:

// Updates existing data on the server (e.g., editing your profile name).
// Also sends a body.

// DELETE:

// Tells the server to remove a specific resource.
// Usually does not need a body.

//..............................

//Customizing the Fetch API with Undici

//Undici allows you to customize the Fetch API by providing options to the fetch function. 
//For example, you can set custom headers, set the request method, and set the request body. 

//In the following example, we are sending a POST request to the Ollama API with a JSON payload. Ollama is a cli tool that allows you to run LLM's (Large Language Models) on your local machine.

import { Pool } from 'undici';
const ollamaPool = new Pool('http://localhost:11434', {
  connections: 10,
});
/**
 * Stream the completion of a prompt using the Ollama API.
 * @param {string} prompt - The prompt to complete.
 * @link https://github.com/ollama/ollama/blob/main/docs/api.md
 **/

async function streamOllamaCompletion(prompt) {
  const { statusCode, body } = await ollamaPool.request({
    path: '/api/generate',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt, model: 'mistral' }),
  });
  // You can read about HTTP status codes here: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
  // 200 means the request was successful.
  if (statusCode !== 200) {
    // consuming the response body is mandatory: https://undici.nodejs.org/#/?id=garbage-collection
    await body.dump();
    throw new Error(`Ollama request failed with status ${statusCode}`);
  }
  let partial = '';
  const decoder = new TextDecoder();
  for await (const chunk of body) {
    partial += decoder.decode(chunk, { stream: true });
    console.log(partial);
  }
  console.log('Streaming complete.');
}
try {
  await streamOllamaCompletion('What is recursion?');
} catch (error) {
  console.error('Error calling Ollama:', error);
} finally {
  console.log('Closing Ollama pool.');
  ollamaPool.close();
}

//....................................

//Streaming Responses with Undici

// Streams is a feature in Node.js that allows you to read and write chunks of data.

import { Writable } from 'node:stream';
import { stream } from 'undici';
async function fetchGitHubRepos() {
  const url = 'https://api.github.com/users/nodejs/repos';
  await stream(
    url,
    {
      method: 'GET',
      headers: {
        'User-Agent': 'undici-stream-example',
        Accept: 'application/json',
      },
    },
    res => {
      let buffer = '';
      return new Writable({
        write(chunk, encoding, callback) {
          buffer += chunk.toString();
          callback();
        },
        final(callback) {
          try {
            const json = JSON.parse(buffer);
            console.log(
              'Repository Names:',
              json.map(repo => repo.name)
            );
          } catch (error) {
            console.error('Error parsing JSON:', error);
          }
          console.log('Stream processing completed.');
          console.log(`Response status: ${res.statusCode}`);
          callback();
        },
      });
    }
  );
}
fetchGitHubRepos().catch(console.error);

//No need to understand these stuff right now, documentation is going to explain it in chapters/lessons like : Asynchronous Iteration / Streams and HTTP Connections / Servers

//The objective of this lesson is to show you 
//1) What Undici is: Undici is just the high-performance HTTP engine that runs under the hood when you call fetch() in Node.js.
//2) The guide is essentially showing off advanced low-level networking features (like reusing TCP connections via a Pool and streaming raw bytes with node:stream).

//Skip for now from 'Customizing the fetch API with unidici' topic.
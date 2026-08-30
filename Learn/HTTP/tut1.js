//Anatomy of an HTTP Transaction

//Prerequisites - 1) How HTTP requestes work, a bit of familiarity with Node.js EventEmitters and Streams.

//.............................

//Create the Server

//done by using 'createServer'

/*
let http = require('node:http');
const { buffer } = require('node:stream/consumers');

let server = http.createServer((request, response)=>{
    //magic happens here
// });

//The function that's passed in to createServer is called once for every HTTP request that's made against that server, so it's called the request handler.

//In fact, the Server object returned by createServer is an EventEmitter

//another way to write above server:

// let server = http.createServer();
// server.on((request, response)=>{
//     //magic happens here
// });

//When an HTTP request hits the server, Node calls the request handler function with a few handy objects for dealing with the transaction, request and response. More details ahead.

//In order to actually serve requests, the listen method needs to be called on the server object. In most cases, all you'll need to pass to listen is the port number you want the server to listen on. There are some other options too, so consult the API reference.

//...................................

//Method, URL and Headers

//When handeling a request you need method and URL. You can access them from 'request'.
//headers are an object inside request too.

console.log(request);

let {method, url, headers} = request;

//The method here will always be a normal HTTP method/
//The url is the full URL without the server, protocol or port.

//Note: all headers are represented in lower-case only, regardless of how the client actually sent them. This simplifies the task of parsing headers for whatever purpose.
//If some headers are repeated, then their values are overwritten or joined together as comma-separated strings, depending on the header. In some cases, this can be problematic, so request.rawHeaders is also available.

//Request Body

//"Unlike request headers (which Node parses right away into an object), the body of a POST or PUT request arrives asynchronously in chunks over time. 
// Because the request object implements Node's ReadableStream interface, you listen for incoming 'data' events—each providing a chunk of raw binary data as a Buffer. 
// You collect these buffers into an array, 
// and when the 'end' event fires (signaling the transfer is complete), you combine the buffers and decode them into a string using Buffer.concat(chunks).toString()."

let bodyarr = [];
request
    .on('data', chunk=>{
        bodyarr.push(chunk);
    })
    //bodyarr before concatenation: ex
    // [
    //   <Buffer 48 65 6c 6c 6f>, 
    //   <Buffer 20 57 6f 72 6c 64>
    // ]
    .on('end', ()=>{
        bodyarr = Buffer.concat(bodyarr).toString(); //Buffer.concat is a method provided by nodejs
    })
    .on('error', (err)=>{
        console.log(err.stack);
    });
    console.log(bodyarr)
    //bodyarr after concatenation: ex
    //[<Buffer 48 65 6c 6c 6f 20 57 6f 72 6c 64>]

    //bodyarr after .toString(): ex
    //"Hello World"


});

server.listen(8080);
*/


//Note: there are modules like 'concat-stream' and 'body on npm' which can help hide away some of this logic.

//..............................

//What We've Got so Far

/*
let http = require('node:http');
http
    .createServer((request, response)=>{
        let {header, method, url} = request;

        console.log(header, method, url)

        let body = [];
        request
            .on('data', (chunk)=>{
            body.push(chunk);
            })
            .on('end', ()=>{
            body = Buffer.concat(body).toString();
            
                // At this point, we have the headers, method, url and body, and can now
                // do whatever we need to in order to respond to this request.
    

//So far we haven't touched on the response object at all, which is an instance of ServerResponse, which is a WritableStream. It contains many useful methods for sending data back to the client. We'll cover that next.

//...........................

// HTTP Status Code

//the HTTP status code on a response will always be 200. Of course, not every HTTP response warrants this, and at some point you'll definitely want to send a different status code. To do that, you can set the statusCode property.

                // response.statusCode = 404; // Tell the client that the resource wasn't found.

//There are other shortcuts to this, we will soon see

//............................

// Setting Response Headers

//'setHeader' method is used
                // response.setHeader('Content-Type', 'application/json');
                // response.setHeader('X-Powered-By', 'bacon');

//............................

//Explicitly Sending Header Data

// The methods of setting the headers and status code that we've already discussed assume that you're using "implicit headers". This means you're counting on node to send the headers for you at the correct time before you start sending body data.

// If you want, you can explicitly write the headers to the response stream. To do this, there's a method called writeHead, which writes the status code and the headers to the stream.

                response.writeHead(200, {
                    'Content-Type': 'application/json',
                    'X-Powered-By': 'bacon',
                });

//Once you've set the headers (either implicitly or explicitly), you're ready to start sending response data.

//.............................

//Sending Response Body

//Since the response object is a WritableStream, writing a response body out to the client is just a matter of using the usual stream methods.
                // response.write('<html>');
                // response.write('<body>');
                // response.write('<h1>Hello, World!</h1>');
                // response.write('</body>');
                // response.write('</html>');
                // response.end();
//The end function on streams can also take in some optional data to send as the last bit of data on the stream, so we can simplify the example above as follows.

                response.end('<html><body><h1>Hello, World!</h1></body></html>');

//Note: It's important to set the status and headers before you start writing chunks of data to the body. This makes sense, since headers come before the body in HTTP responses.

//...............................

//Another Quick Thing About Errors

//The response stream can also emit 'error' events, and at some point you're going to have to deal with that as well. All of the advice for request stream errors still applies here.
                response.on('error', err => {
                    console.error(err);
                });

            })
            .on('error', (err)=>{
                console.log(err.stack);
            });
        })
    .listen(8080);  // Activates this server, listening on port 8080.
*/

//.................................

//Put It All Together

//Building on the earlier example, we're going to make a server that sends back all of the data that was sent to us by the user. We'll format that data as JSON using JSON.stringify.

/*
const http = require('node:http');
http
  .createServer((request, response) => {
    const { headers, method, url } = request;
    let body = [];
    request
      .on('error', err => {
        console.error(err);
      })
      .on('data', chunk => {
        body.push(chunk);
      })
      .on('end', () => {
        body = Buffer.concat(body).toString();
        // BEGINNING OF NEW STUFF
        response.on('error', err => {
          console.error(err);
        });
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        // Note: the 2 lines above could be replaced with this next one:
        // response.writeHead(200, {'Content-Type': 'application/json'})

        //Why 'Content-Type', 'application/json' and not 'abcd'?
        //The client checks Content-Type to know how to interpret and render what you sent:
        //MIME standard is followed:
        // 'application/json': "This text is structured JSON data; parse it with JSON.parse()."
        // 'text/html': "This text is a webpage; render it with HTML tags."
        // 'image/png': "These bytes are a PNG picture; draw it on screen."
        // 'text/plain': "This is just plain text; do not format it."

        const responseBody = { headers, method, url, body }; //we are sending responseBody as a whole object like its the body for response.
        response.write(JSON.stringify(responseBody));
        response.end();
        // Note: the 2 lines above could be replaced with this next one:
        // response.end(JSON.stringify(responseBody))
        // END OF NEW STUFF

        //We are sending back exact same thing what we are revceiving.
      });
  })
  .listen(8080);

*/

//................................

//Echo Server Example

//Simplified:

/*
const http = require('node:http');
http
  .createServer((request, response) => {
    let body = [];
    request
      .on('data', chunk => {
        body.push(chunk);
      })
      .on('end', () => {
        body = Buffer.concat(body).toString();
        response.end(body);
      });
  })
  .listen(8080);
*/

// Here, are we not required to send header, method, url?

//You didn't set custom headers (like Content-Type), but Node automatically creates minimal mandatory HTTP headers (like Connection: keep-alive and Date) behind the scenes when completing response.end().

//method is not required in response, it is required only in request.

//url not required in response

//status code is required in response but by default it is 200.

//
//Ex, we want to send echo only under the following conditions:

//  The request method is POST.
// The URL is /echo.

/*
const http = require('node:http');
http
  .createServer((request, response) => {
    if (request.method === 'POST' && request.url === '/echo') {
      let body = [];
      request
        .on('data', chunk => {
          body.push(chunk);
        })
        .on('end', () => {
          body = Buffer.concat(body).toString();
          response.end(body);
        });
    } else {
      response.statusCode = 404;
      response.end();
    }
  })
  .listen(8080);
*/

//Note: By checking the URL in this way, we're doing a form of "routing". Other forms of routing can be as simple as switch statements or as complex as whole frameworks like express. If you're looking for something that does routing and nothing else, try router.

//the request object is a ReadableStream and the response object is a WritableStream. That means we can use pipe to direct data from one to the other. That's exactly what we want for an echo server!

/*
const http = require('node:http');
http
  .createServer((request, response) => {
    if (request.method === 'POST' && request.url === '/echo') {
      request.pipe(response);
    } else {
      response.statusCode = 404;
      response.end();
    }
  })
  .listen(8080);
*/

//To handle errors on the request stream, we'll log the error to stderr and send a 400 status code to indicate a Bad Request. In a real-world application, though, we'd want to inspect the error to figure out what the correct status code and message would be. As usual with errors, you should consult the Error documentation.

// On the response, we'll just log the error to stderr.

const http = require('node:http');
http
  .createServer((request, response) => {
    request.on('error', err => {
      console.error(err);
      response.statusCode = 400;
      response.end();
    });
    response.on('error', err => {
      console.error(err);
    });
    if (request.method === 'POST' && request.url === '/echo') {
      request.pipe(response);
    } else {
      response.statusCode = 404;
      response.end();
    }
  })
  .listen(8080);

//.............................

//We've now covered most of the basics of handling HTTP requests. At this point, you should be able to:

// Instantiate an HTTP server with a request handler function, and have it listen on a port.
// Get headers, URL, method and body data from request objects.
// Make routing decisions based on URL and/or other data in request objects.
// Send headers, HTTP status codes and body data via response objects.
// Pipe data from request objects and to response objects.
// Handle stream errors in both the request and response streams.
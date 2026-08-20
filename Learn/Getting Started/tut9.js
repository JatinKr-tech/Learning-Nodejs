//Native WebSocket Client in Node.js

//Introduction

//the WebSocket API has been enhanced using the Undici library
//In Node.js v22.4.0 release, the WebSocket API was marked as stable

//.............................

//What is a WebSocket?

//WebSocket is a standardized communication protocol that enables simultaneous two-way communication over a single TCP connection.
//It has full-duplex or bi-directional capabilities that distinguishes it from HTTP
//WebSocket achieves HTTP compatibility by using the HTTP Upgrade header to transition protocols

//It allows servers to push content to clients without initial requests and maintains open connections for continuous message exchange, making it ideal for real-time data transfer with lower overhead than alternatives like HTTP polling

//WebSocket communications typically occur over TCP ports 443 (secured) or 80 (unsecured), helping bypass firewall restrictions on non-web connections. 
//The protocol defines its own URI schemes (ws:// and wss://) for unencrypted and encrypted connections respectively

//supported by all major browsers.

//.....................................

//Native WebSocket Client

//Node.js can now act as a WebSocket client without relying on external libraries like ws or socket.io for client connections.
//Users can now create a websocket client connection with the standard new WebSocket() constructor.
//This offers reduced dependency management and improved compatibility. Less maintaining

//.....................................

/*

// Basic Connection and Message Handling

// Creates a new WebSocket connection to the specified URL.
const socket = new WebSocket('ws://localhost:8080');
// Executes when the connection is successfully established.
socket.addEventListener('open', event => {
    console.log('WebSocket connection established!');
    // Sends a message to the WebSocket server.
    socket.send('Hello Server!');
    socket.send('Greetings Server!');
});
// Listen for messages and executes when a message is received from the server.
socket.addEventListener('message', event => {
    console.log('Message from server: ', event.data);
});
// Executes when the connection is closed, providing the close code and reason.
socket.addEventListener('close', event => {
    console.log('WebSocket connection closed:', event.code, event.reason);
});
// Executes if an error occurs during the WebSocket communication.
socket.addEventListener('error', error => {
    console.error('WebSocket error:', error);
});

*/

//Sending and Receiving JSON data, ex:

const socket = new WebSocket('ws://localhost:8080');
socket.addEventListener('open', () => {
  const data = { type: 'message', content: 'Hello from Node.js!' };
  socket.send(JSON.stringify(data));
});
socket.addEventListener('message', event => {
  try {
    const receivedData = JSON.parse(event.data);
    console.log('Received JSON:', receivedData);
  } catch (error) {
    console.error('Error parsing JSON:', error);
    console.log('Received data was:', event.data);
  }
});

//..................................

//Important to Understand

//Node.js v22 empowers applications to seamlessly interact with WebSocket servers as clients, but the creation of WebSocket servers within Node.js remains dependent on established libraries. This distinction is crucial for developers to understand when implementing real-time communication in their Node.js projects.

//That's why we 'node install ws' and created server1.js
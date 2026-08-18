//Debugging Node.js

//..............................

//Enable Inspector

//When started with the '--inspect' switch, a Node.js process listens for a debugging client. By default, it will listen at host and port 127.0.0.1:9229. Each process is also assigned a unique UUID.

//Inspector clients must know and specify host address, port, and UUID to connect.
//ex: ws://127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e

//Node.js will also start listening for debugging messages if it receives a SIGUSR1 signal. (SIGUSR1 is not available on Windows.). In Node.js 8 and later, it will activate the Inspector API

//................................

//Security Implications

// Since the debugger has full access to the Node.js execution environment, a malicious actor able to connect to this port may be able to execute arbitrary code on behalf of the Node.js process. 
// It is important to understand the security implications of exposing the debugger port on public and private networks.

//................................

//Exposing the debug port publicly is unsafe

//If the debugger is bound to a public IP address, or to 0.0.0.0, any clients that can reach your IP address will be able to connect to the debugger without any restriction and will be able to run arbitrary code.

//By default node --inspect binds to 127.0.0.1. You explicitly need to provide a public IP address or 0.0.0.0, etc.,

//................................

//Local applications have full access to the inspector

//Even if you bind the inspector port to 127.0.0.1 (the default), any applications running locally on your machine will have unrestricted access. This is by design to allow local debuggers to be able to attach conveniently.

//....................................

//Browsers, WebSockets and same-origin policy

// Websites open in a web-browser can make WebSocket and HTTP requests under the browser security model. 
// An initial HTTP connection is necessary to obtain a unique debugger session id. The same-origin-policy prevents websites from being able to make this HTTP connection.

//Point 1 (Same-Origin Policy & HTTP):

// The browser blocks a foreign website (evil.com) from reading responses from http://localhost:9229/json because of the Same-Origin Policy (SOP).
// Because evil.com cannot read that response, it never gets the unique UUID / Session ID necessary to construct the WebSocket debugging URL (ws://localhost:9229/<UUID>).
// Dedicated developer tools (like Chrome DevTools or VS Code) are not constrained by webpage SOP, so they can fetch the UUID and connect normally.

// Point 2 (Host Header Check):

// Attackers try to bypass SOP using DNS rebinding (making evil.com resolve to your local IP 127.0.0.1). In that scenario, the browser thinks the origin is still evil.com and allows the request, sending Host: evil.com in the headers.
// Node.js stops this by verifying the incoming Host header. If the Host header is not explicitly localhost or an exact IP address (like 127.0.0.1), Node.js drops the connection immediately.

//.............................................

//Inspector Clients

//A minimal CLI debugger is available with node inspect myscript.js. Several commercial and open source tools can also connect to the Node.js Inspector.

//.............................................

//Chrome DevTools 55+, Microsoft Edge

//
//Option 1: Use the built-in DevTools UI

// Open chrome://inspect (edge://inspect in Microsoft Edge) in your browser.
// Click the Configure button and ensure your target host and port are listed.
// Your Node.js application should appear in the Remote Target list.

//
//Option 2: Connect manually

// Visit http://localhost:<inspect-port>/json/list. It should return a JSON object containing a devtoolsFrontendUrl.
// Copy the devtoolsFrontendUrl value from the response and paste it into your browser's address bar.

//
//Visual Studio Code 1.10+

// In the Debug panel, click the settings icon to open .vscode/launch.json. Select "Node.js" for initial setup.

//
//JetBrains WebStorm and other JetBrains IDEs

//
//chrome-remote-interface

//
//Eclipse IDE with Eclipse Wild Web Developer extension

//.............................

//Command-line options
//src: https://nodejs.org/learn/getting-started/debugging#command-line-options

//................................

//Enabling remote debugging scenarios

//Never have debuger listen to public IP server, use use ssh tunnels instead!!

//Let's say you are running Node.js on a remote machine, remote.example.com, that you want to be able to debug. On that machine, you should start the node process with the inspector listening only to localhost (the default).

//'node --inspect server.js'

//setup an ssh tunnel:

//'ssh -L 9221:localhost:9229 user@remote.example.com'

// This starts a ssh tunnel session where a connection to port 9221 on your local machine will be forwarded to port 9229 on remote.example.com. 
// You can now attach a debugger such as Chrome DevTools or Visual Studio Code to localhost:9221, which should be able to debug as if the Node.js application was running locally.

//.......................................

//Legacy Debugger

//The legacy debugger has been deprecated as of Node.js 7.7.0. Please use --inspect and Inspector instead.
//used - discontinued V8 Debugging Protocol on a TCP port, by default 5858

//......................................

//Built-in Debugger

//Debug your Node.js app with Chrome DevTools by using an intermediary process which translates the Inspector Protocol used in Chromium to the V8 Debugger protocol used in Node.js. 
// See https://github.com/node-inspector/node-inspector for more information.
//ECMAScript 2015 (ES6) and beyond

// shipping features - on by default on Node.js
// Staged features - require a runtime flag: --harmony
// In progress features - can be activated individually by their respective harmony flag //discouraged unless for testing purposes.

//.................................

//Which features ship with which Node.js version by default?

// Check Node.green for that

//.................................

//Which features are in progress?

// You may list all the in progress features available on each Node.js release by grepping through the --v8-options argument. Please note that these are incomplete and possibly broken features of V8, so use them at your own risk:

//node --v8-options | grep "in progress"

//.................................

//I have my infrastructure set up to leverage the --harmony flag. Should I remove it?

//--harmony | --es_staging, enable staged features only. If you keep this enabled, you should be prepared for further Node.js upgrades to break your code if V8 changes their semantics to more closely follow the standard.

//.................................

//How do I find which version of V8 ships with a particular version of Node.js?

//Node.js provides a simple way to list all dependencies and respective versions that ship with a specific binary through the 'process' global object.
//In case of the V8 engine, type the following in your terminal to retrieve its version:

// node -p process.versions.v8
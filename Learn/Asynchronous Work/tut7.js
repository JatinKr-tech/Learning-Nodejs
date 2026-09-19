//The Node.js Event emitter

const EventEmitter = require('node:events');

const eventEmitter1 = new EventEmitter();

function callback1 (number, string) {
  console.log('started', number, string);
};

eventEmitter1.on('start', () => {
  console.log('started');
});

eventEmitter1.emit('start');

// emit is used to trigger an event
// on is used to add a callback function that's going to be executed when the event is triggered

eventEmitter1.on('start', callback1);

eventEmitter1.emit('start', 19, 'Ramajuna');

//once()

eventEmitter1.once('listenOnce', ()=>{
  console.log('will listen only once')
});

eventEmitter1.emit('listenOnce');
eventEmitter1.emit('listenOnce'); //Ignored: listener already removed itself

// removeListener() / off(): remove an event listener from an event

eventEmitter1.removeListener('start', callback1); //prevents this from printing: 'started 19 Eisenhower'

eventEmitter1.emit('start', 19, 'Eisenhower'); //started
eventEmitter1.emit('start'); //started

// removeAllListeners(): remove all listeners for an event

eventEmitter1.on('click', ()=>{
  console.log('You dumb')
})
eventEmitter1.on('click', ()=>{
  console.log('You dumb x2')
})
eventEmitter1.on('click', ()=>{
  console.log('You dumb x3')
})

eventEmitter1.emit('click')

eventEmitter1.removeAllListeners('click');

eventEmitter1.emit('click'); //ignored
eventEmitter1.emit('start'); //started
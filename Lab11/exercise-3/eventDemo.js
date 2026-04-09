// Import events module
const EventEmitter = require('events');

// Create an event emitter object
const eventEmitter = new EventEmitter();

// 1. Register event listeners using on()

// Listener 1 for 'greet' event
eventEmitter.on('greet', (name) => {
    console.log(`Hello, ${name}! Welcome to Node.js.`);
});

// Listener 2 for 'greet' event (multiple listeners)
eventEmitter.on('greet', (name) => {
    console.log(`How are you today, ${name}?`);
});

// Listener for 'dataReceived' event
eventEmitter.on('dataReceived', (data) => {
    console.log(`Data received: ${data}`);
});

// Listener for 'processComplete' event
eventEmitter.on('processComplete', (status) => {
    console.log(`Process completed with status: ${status}`);
});

// 2. Trigger custom events using emit()

// Emit 'greet' event with argument
eventEmitter.emit('greet', 'Student');

// Demonstrate asynchronous behavior using setTimeout
setTimeout(() => {
    eventEmitter.emit('dataReceived', 'Sample Data from Server');
}, 1000);

setTimeout(() => {
    eventEmitter.emit('processComplete', 'SUCCESS');
}, 2000);
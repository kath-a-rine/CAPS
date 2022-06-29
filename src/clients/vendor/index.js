'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3002/caps');

const Chance = require('chance');
const chance = new Chance();


setInterval(() => {
  let payload = {
    store: chance.company(),
    orderId: chance.integer({ min: 1, max: 300}),
    customer: chance.name(),
    address: chance.address(),
  };
  socket.emit('JOIN', payload.store);

  socket.emit('PICKUP', payload);
}, 3000);

socket.on('DELIVERED', (payload) => {
  console.log('VENDOR: Thank you for delivering order', payload.orderId);
});



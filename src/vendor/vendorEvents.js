'use strict';

const eventPool = require('../eventPool');
// const order = require('../order');

// console.log(order);

const Chance = require('chance');
const chance = new Chance();

let order = {
  store: chance.company(),
  orderId: chance.integer({ min: 1, max: 300}),
  customer: chance.name(),
  address: chance.address(),
};

setInterval(() => {
  eventPool.emit('PICKUP', order);
}, 3000);

eventPool.on('DELIVERED', delivered);

function delivered(payload){
  console.log('VENDOR: Thank you for delivering order', payload.orderId);
}

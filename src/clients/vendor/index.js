'use strict';

const MessageClient = require('../message-clients')

const Chance = require('chance');
const chance = new Chance();

let vendor = new MessageClient();

setInterval(() => {
  let payload = {
    store: 'acme-widgets',
    orderId: chance.integer({ min: 1, max: 300}),
    customer: chance.name(),
    address: chance.address(),
  };

  vendor.publish('PICKUP', payload);
}, 3000);

setInterval(() => {
  let payload = {
    store: '1-800-flowers',
    orderId: chance.integer({ min: 1, max: 300}),
    customer: chance.name(),
    address: chance.address(),
  };

  vendor.publish('PICKUP', payload);
}, 5000);

vendor.subscribe('DELIVERED', (payload) => {
  console.log('VENDOR: Thank you for delivering order', payload.orderId);
});



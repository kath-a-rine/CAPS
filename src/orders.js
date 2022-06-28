'use strict';

const Chance = require('chance');
const chance = new Chance();

let order = {
  store: chance.company(),
  orderId: chance.integer({ min: 1, max: 300}),
  customer: chance.name(),
  address: chance.address(),
};

console.log(order);
module.exports = order;

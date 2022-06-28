'use strict';

const eventPool = require('../eventPool');
const order = require('../orders');

module.exports = (payload) => {
  console.log('Order number', order.orderId, 'is in transit.');
  eventPool.emit('intransit', payload);
};

'use strict';

const eventPool = require('../eventPool');
const order = require('../orders');

module.exports = (payload) => {
  console.log('DRIVER: picked up order number', order.orderId);
  eventPool.emit('pickup', payload);
};

'use strict';

const eventPool = require('../eventPool');
const order = require('../orders');


module.exports = (payload) => {
  console.log('Thank you,', order.customer);
  eventPool.emit('delivered', payload);
};

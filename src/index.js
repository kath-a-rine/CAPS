'use strict';

const eventPool = require('./eventPool');
//const order = require('./order');
require('./vendor/vendorEvents');
require('./driver/driverEvents');

//subscriptions (eventPool.on)
eventPool.on('PICKUP', (payload) => logger('PICKUP', payload));
eventPool.on('TRANSIT', (payload) => logger('TRANSIT', payload));
eventPool.on('DELIVERED', (payload) => logger('DELIVERED', payload) );

function logger(event, payload) {
  let time = new Date();
  console.log('EVENT', {event, time, payload});
}
// // setIntervals
// setInterval(() => {
//   eventPool.emit('PICKUP', order.store);
// }, 3000);

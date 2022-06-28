'use strict';

const eventPool = require('../eventPool');

eventPool.on('PICKUP', driverPickup);

function driverPickup(payload){
  setTimeout(() => {
    console.log(`DRIVER: picked up order ${payload.orderId}`);
    eventPool.emit('TRANSIT', payload);

  }, 1000);

  setTimeout(() => {
    console.log(`DRIVER: delivered order ${payload.orderId}`);
    eventPool.emit('DELIVERED', payload);
  }, 3000);
}

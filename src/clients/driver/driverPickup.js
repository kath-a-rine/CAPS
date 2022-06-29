'use strict';

//eventPool.on('PICKUP', driverPickup);

module.exports = (socket) => (payload) => {
  setTimeout(() => {
    console.log(`DRIVER: picked up order ${payload.orderId}`);
    socket.emit('TRANSIT', payload);

  }, 1000);

  setTimeout(() => {
    console.log(`DRIVER: delivered order ${payload.orderId}`);
    socket.emit('DELIVERED', payload);
  }, 3000);
};

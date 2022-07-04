'use strict';

const MessageClient = require('../message-clients');
const driver = new MessageClient();

driver.subscribe('PICKUP', (payload) => {
  setTimeout(() => {
    console.log(`DRIVER: picked up order ${payload.orderId}`);
    driver.publish('TRANSIT', payload);

  }, 1000);

  setTimeout(() => {
    console.log(`DRIVER: delivered order ${payload.orderId}`);
    driver.publish('DELIVERED', payload);
  }, 3000);
},
);

driver.subscribe('DELIVERED', (payload) => {
  console.log('VENDOR: Thank you for delivering order', payload.orderId);
});

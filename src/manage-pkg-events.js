'use strict';

const eventPool = require('./eventPool');
const deliveredHandlder = require('./handlers/deliveredHandler');
const intransitHandler = require('./handlers/intransitHandler');
const pickupHandler = require('./handlers/pickupHandler');
const order = require('./orders');

//subscriptions (eventPool.on)
eventPool.on('pickup', pickupHandler);
eventPool.on('intransit', intransitHandler);
eventPool.on('delivered', deliveredHandlder );

// setIntervals
setInterval(() => {
  eventPool.emit('pickup', order.store);
}, 3000);

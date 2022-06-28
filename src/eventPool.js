'use strict';

const Event = require('events');
//const EventEmitter = require('node:events');

const eventPool = new Event();

module.exports = eventPool;


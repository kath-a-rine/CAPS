'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3002');

const vendorMessage = require('./vendorMessage');

socket.on('DELIVERED', vendorMessage);

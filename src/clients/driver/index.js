'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3002');

const driverPickup = require('./driverPickup');

socket.on('PICKUP', driverPickup);

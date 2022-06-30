'use strict';

const { Server } = require('socket.io');
const PORT = process.env.PORT || 3002;
const Queue = require('../lib/queue');

const server = new Server(PORT);
const caps = server.of('/caps');

const messageQueue = new Queue();

caps.on('connection', (socket) => {
  console.log('connected to the caps namespace', socket.id);

  socket.onAny((event, payload) => {
    let time = new Date();
    console.log('EVENT:', {event, time, payload});
  });

  socket.on('JOIN', (queueId) => {
    socket.join(queueId);
    socket.emit('JOIN', queueId);
  });

  //events
  socket.on('PICKUP', (payload) => {
    let currentQueue = messageQueue.read(payload.queueId);
    if (!currentQueue){
      let queueKey = messageQueue.store(payload.queueId, new Queue());
      currentQueue = messageQueue.read(queueKey);
    }
    currentQueue.store(payload.messageId, payload);
    caps.emit('PICKUP', payload);
  });

  socket.on('IN-TRANSIT', (payload) => {
    let currentQueue = messageQueue.read(payload.queueId);
    if (!currentQueue){
      let queueKey = messageQueue.store(payload.queueId, new Queue());
      currentQueue = messageQueue.read(queueKey);
    }
    currentQueue.store(payload.messageId, payload);
    caps.to(payload.store).emit('IN-TRANSIT', payload);
  });

  socket.on('DELIVERED', (payload) => {
    let currentQueue = messageQueue.read(payload.queueId);
    if (!currentQueue){
      let queueKey = messageQueue.store(payload.queueId, new Queue());
      currentQueue = messageQueue.read(queueKey);
    }
    currentQueue.store(payload.messageId, payload);
    caps.to(payload.store).emit('DELIVERED', payload);
  });

  socket.on('RECEIVED', (payload) => {
    let currentQueue = messageQueue.read(payload.queueId);
    if(!currentQueue){
      throw new Error('no queue created for this message');
    }
    let message = currentQueue.remove(payload.messageId);
    caps.to(payload.queueId).emit('RECEIVED', message);
  });
});

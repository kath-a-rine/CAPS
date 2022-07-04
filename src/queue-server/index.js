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
    console.log(`joined the ${queueId} room` );
    socket.join(queueId);
    socket.emit('JOIN', queueId);
  });

  //events
  socket.on('PICKUP', (payload) => {
    console.log('SOCKET PICKUP PAYLOAD', payload);
    let currentQueue = messageQueue.read(payload.queueId);
    if (!currentQueue){
      let queueKey = messageQueue.store(payload.queueId, new Queue());
      currentQueue = messageQueue.read(queueKey);
    }
    let message = currentQueue.store(payload);
    caps.emit('PICKUP', message);
  });

  socket.on('IN-TRANSIT', (payload) => {
    let currentQueue = messageQueue.read(payload.queueId);

    let message = currentQueue.store(payload);
    caps.to(payload.store).emit('IN-TRANSIT', message);
  });

  socket.on('DELIVERED', (payload) => {
    let currentQueue = messageQueue.read(payload.queueId);

    let message = currentQueue.store(payload);
    caps.emit('DELIVERED', message);
  });

  socket.on('RECEIVED', (payload) => {
    let currentQueue = messageQueue.read(payload.queueId);
    if(!currentQueue){
      throw new Error('no queue created for this message');
    }
    Object.keys(currentQueue.data).forEach(queueItem => {
      console.log('this happens', queueItem);
      //read all items and delete as sent
      let message = currentQueue.remove(payload.messageId);
      caps.to(payload.queueId).emit('RECEIVED', message);
    });
  });
});

'use strict';

const { Server } = require('socket.io');

const PORT = process.env.PORT || 3002;

const server = new Server(PORT);

const caps = server.of('/caps');

server.on('connection', (socket) => {
  console.log('Socket connected to Event Server', socket.id);

  socket.on('MESSAGE', (payload) => {
    console.log('Server MESSAGE event ', payload);

    socket.broadcast.emit('MESSAGE', payload);
  });

  socket.on('RECEIVED', (payload) => {
    console.log('Server RECEIVED event ', payload);
    socket.broadcast.emit('RECEIVED', payload);
  });
});

caps.on('connection', (socket) => {
  console.log('connected to the caps namespace', socket.id);

  socket.on('JOIN', (room) => {
    console.log(`You have joined ${room} room`);
    socket.join(room);
  });

  socket.on('PICKUP', (payload) => {
    logger('PICKUP', payload);
    caps.emit('PICKUP', payload);
  });

  socket.on('IN-TRANSIT', (payload) => {
    logger('IN-TRANSIT', payload);
    caps.to(payload.store).emit('IN-TRANSIT', payload);
  });

  socket.on('DELIVERED', (payload) => {
    logger('DELIVERED', payload);
    caps.to(payload.store).emit('DELIVERED', payload);
  });
});


function logger(event, payload) {
  let time = new Date();
  console.log('EVENT', { event, time, payload });
}

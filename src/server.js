const path = require('path');
const http = require('http');
const express = require('express');
const socketIo = require('socket.io');
const Filter = require('bad-words');

const { generateMessage, generateLocationMessage } = require('./utils/messages');
const { addUser, getUser, removeUser, getRoomUsers } = require('./utils/users');

require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/', express.static('index.html'));


io.on('connection', (socket) => {
    console.log('new connection from:', socket.id);

    socket.on('join', (options, callback) => {
        const { user, error } = addUser({ id: socket.id, ...options });

        if (error) {
            return callback(error);
        }

        socket.join(user.room);

        socket.emit('message', generateMessage('Welcome!', 'Chat App'));
        socket.broadcast.to(user.room).emit('message', generateMessage(`${user.username} has joined!`, '👋 =>'));
        io.to(user.room).emit('listData', { room: user.room, roomUsers: getRoomUsers(user.room) });
        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        const filter = new Filter;
        if (filter.isProfane(message)) {
            return callback('Profanify is not allowed!'); // Acknowledgment
        }

        io.to(user.room).emit('message', generateMessage(message, user.username));
        callback();
    });

    socket.on('sendLocation', (coords, callback) => {
        const user = getUser(socket.id);

        const url = `https://google.com/maps?q=${coords.latitude},${coords.longitude}`;
        io.to(user.room).emit('locationMessage', generateLocationMessage(url, user.username));
        callback('Location shared!');
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if (user.username) {
            io.to(user.room).emit('message', generateMessage(`${user.username} has left!`, '😢 =>'));
            io.to(user.room).emit('listData', { room: user.room, roomUsers: getRoomUsers(user.room) });
        }
    });
});


const PORT = process.env.PORT || 3000;
server.listen(PORT, console.log(`listetning on port ${PORT}`));
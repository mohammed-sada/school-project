const path = require('path');
const http = require('http');
const express = require('express');
const socketIo = require('socket.io');
const Filter = require('bad-words');

const {
    generateMessage,
    generateLocationMessage } = require('./utils/messages');

require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/', express.static('index.html'));


io.on('connection', (socket) => {
    console.log('new connection from:', socket.id);

    socket.on('join', ({ username, room }) => {
        socket.join(room);

        socket.emit('message', generateMessage('Welcome!'));
        socket.broadcast.to(room).emit('message', generateMessage(`${username} has joined!`));
    });

    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter;
        if (filter.isProfane(message)) {
            return callback('Profanify is not allowed!'); // Acknowledgment
        }
        io.to('rooma').emit('message', generateMessage(message));
        callback();
    });

    socket.on('sendLocation', (coords, callback) => {
        const url = `https://google.com/maps?q=${coords.latitude},${coords.longitude}`;
        io.emit('locationMessage', generateLocationMessage(url));
        callback('Location shared!');
    });

    socket.on('disconnect', () => {
        io.emit('message', generateMessage('A user has left!'));
    });
});


const PORT = process.env.PORT || 3000;
server.listen(PORT, console.log(`listetning on port ${PORT}`));
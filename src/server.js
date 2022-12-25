const path = require('path');
const http = require('http');
const express = require('express');
const socketIo = require('socket.io');
const cors = require('cors');

const Filter = require('bad-words');
const handlers = require("./handlers");

const { generateMessage, generateLocationMessage } = require('./utils/messages');
const { addUser, getUser, removeUser, getRoomUsers } = require('./utils/users');
const _data = require('./utils/data');

require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/', express.static('index.html'));

app.get('/messages', handlers.httpGetMessages);
app.get('/message', handlers.httpGetMessage);

// const messages = [];
// handlers.httpGetMessages(function (message) {
//     messages.push(message);
// });

io.on('connection', (socket) => {
    console.log('new connection from:', socket.id);

    socket.on('join', (options, callback) => {
        const { user, error } = addUser({ id: socket.id, ...options });

        if (error) {
            return callback(error);
        }

        socket.join(user.room);

        // socket is specific for the current user - io is general
        socket.emit('message', generateMessage('Welcome!', 'Chat App')); // only for the current user who has just joined
        socket.broadcast.to(user.room).emit('message', generateMessage(`${user.username} has joined!`, '👋 =>')); // for everyone
        io.to(user.room).emit('listData', { room: user.room, roomUsers: getRoomUsers(user.room) }); // re-list the room's users as there is a new user that we have to notify ohters about
        callback();
    });

    socket.on('sendMessage', ({ message, cipherType }, callback) => {
        const user = getUser(socket.id);
        const filter = new Filter;
        if (filter.isProfane(message)) {
            return callback('Profanify is not allowed!'); // Acknowledgment
        }

        message = typeof (message) == 'string' && message.trim().length > 0 ? message : false;
        if (message) {
            // Create the message object
            const messageObject = generateMessage(message, user.username, cipherType);

            const messageObjectToStore = { ...messageObject };
            delete messageObjectToStore.text;

            // Store the message
            _data.create('messages', messageObject.id, messageObjectToStore, function (err) {
                if (!err) {
                    io.to(user.room).emit('message', messageObject);
                    callback();
                } else callback('Could not store the message');

            });

        } else callback('Missing required fields');
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


const PORT = process.env.PORT || 5000;
server.listen(PORT, console.log(`listetning on port ${PORT}`));
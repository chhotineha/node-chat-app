const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const { generateMessage, generateLocationMessage } = require('./utils/message')
const publicPath = path.join(__dirname, '../public');
const app = express();
var server = http.createServer(app);
var io = socketIO(server);
io.on('connection', (socket) => {
    console.log("new user connected")
    // socket.emit("newEmail", {
    //     from: 'thewayofneha@gmail.com',
    //     text: 'Hey Neha,What going on??',
    //     createAt: 122
    // })
    // socket.emit('newMessage', {
    //     from: 'Neha',
    //     text: "Hey Mukesh",
    //     createAt: 123123
    // })
    // socket.on('createEmail', (newEmail) => {
    //     console.log("create email", newEmail)
    // });
    //socket.emit from admin text welcome to the chat app
    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to the chat app',
        createAt: new Date().getTime()
    })
    //socket broadcast.emit from Admin text New user joined
    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user joined',
        createAt: new Date().getTime()
    })
    socket.on('createMessage', (message, callback) => {
        console.log("create message", message)
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
        // io.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createAt: new Date().getTime()
        // })
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createAt: new Date().getTime()
        // })
    })
    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));

    });
    socket.on('disconnect', () => {
        console.log("User was disconnected")
    });

});
app.use(express.static(publicPath));
const port = process.env.PORT || 3000
server.listen(port, () => {
    console.log("Hello you started new application")
})

require('dotenv').config()
const express = require('express')
const socketio = require('socket.io')
const http = require('http')

const USERS = require('./src/models/User');

const PORT = process.env.NODE_PORT || 5000

const app = express()
const server = http.createServer(app)
const io = socketio(server)

io.on('connection', socket => {
    console.log('We have new connection')

    socket.on('join', ({name, room}, callback) => {
        const { error, user } = USERS.add({ id: socket.id, name, room })

        if( error ) {
            return callback(error)
        }

        socket.emit('message', { user : 'admin', text : `${user.name} welcome to the room ${user.room}`});
        socket.broadcast.to(user.room).emit('message', { user : 'admin', text : `${user.name}, has joined`})
        socket.join(user.room);

        socket.emit('roomData', { room : user.room, users : USERS.getUsersInRoom(user.room)});

        callback();
    })

    socket.on('sendMessage', (message, callback) => {
        const user = USERS.get(socket.id);

        io.to(user.room).emit('message', { user : user.name, text : message});
        socket.emit('roomData', { room : user.room, users : USERS.getUsersInRoom(user.room)});

        callback();
    });

    socket.on('disconnect', () => {
        console.log('User has left')
        const user = USERS.remove(socket.id);
        if(!user){
            return;
        }
        io.to(user.room).emit('message', {user : 'Admin', text : `${user.name} has left.`})
    })
})

app.use('/', require('./src/routes/main.routes'))

async function run() {
    try {
        server.listen(PORT, () => console.log(`App has been started on port ${PORT}...`));
    } catch (e) {
        console.log('Dear Developer catched a SERVER ERROR...', e.message, e);
        process.exit(1);
    }
}
run();















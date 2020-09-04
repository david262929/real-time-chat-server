require('dotenv').config()
const express = require('express')
const socketio = require('socket.io')
const http = require('http')

const PORT = process.env.NODE_PORT || 5000

const app = express()
const server = http.createServer(app)
const io = socketio(server)

io.on('connection', socket => {
    console.log('We have new connection')

    socket.on('disconnect', () => {
        console.log('User had left !!!')
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















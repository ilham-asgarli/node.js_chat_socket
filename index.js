const express = require("express")
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server)

app.get('/', (req, res) => {
    res.send("Server is running.")
})

io.on('connect', (client) => {
    client.on('join_room', (data) => {
        const { userId, roomId } = data
        client.join(roomId)

        io.to(roomId).emit('join', {
            message: `${userId} has joined the chat room`,
            userId: userId,
            created_at: Date.now(),
        })

        client.broadcast.to(roomId).emit('online', {
            isOnline: true,
            userId: userId,
        })

        let typingTimerId
        client.on('typing', (data) => {
            typingTimerId = typing(client, roomId, data, typingTimerId)
        })

        client.on('message', (data) => {
            console.log(data)
            io.to(roomId).emit('message', {
                userId: data.userId,
                message: data.message,
                created_at: Date.now(),
            })
        })

        client.on("disconnect", (reason) => {
            console.log(reason)
            client.broadcast.to(roomId).emit('online', {
                isOnline: false,
                userId: userId,
            })
        })
    })
})

function typing(client, roomId, isTyping, typingTimerId) {
    console.log(isTyping)
    client.broadcast.to(roomId).emit('typing', isTyping)

    if (isTyping) {
        client.broadcast.to(roomId).emit('typing', isTyping)

        if (typingTimerId) {
            clearTimeout(typingTimerId)
            typingTimerId = null
        }

        typingTimerId = setTimeout(() => {
            console.log(false)
            client.broadcast.to(roomId).emit('typing', false)
        }, 2000)

        return typingTimerId
    }

    return null
}

var server_port = process.env.PORT || 3000
server.listen(server_port, (err) => {
    if (err) throw err
    console.log('Listening on port %d', server_port)
})
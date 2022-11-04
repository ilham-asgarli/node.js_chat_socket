const express = require("express")
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server)
const mongo = require("./mongo")
const message = require("./message")

app.get('/', (req, res) => {
    res.send("Server is running.")
})

mongo()

io.on('connect', (client) => {
    client.on('join_room', (data) => {
        const { userId, roomId } = data
        client.join(roomId)

        /*io.to(room).emit('join', {
            message: `${id} has joined the chat room`,
            id: id,
            created_at: Date.now(),
        })*/

        message.find({
            roomId: roomId
        }).then((messages) => {
            client.emit('old_messages', messages)
        }).catch((err) => {
            console.log(err)
        })

        let typingTimerId
        client.on('typing', (data) => {
            typingTimerId = typing(client, roomId, data, typingTimerId)
        })

        client.on('message', (data) => {
            console.log(data)
            io.to(roomId).emit('message', {
                userId: userId,
                message: data.message,
            })

            new message({
                message: data.message,
                roomId: data.roomId,
                userId: data.userId,
            }).save();
        })
    })
})

function typing(client, room, isTyping, typingTimerId) {
    console.log(isTyping)
    client.broadcast.to(room).emit('typing', isTyping)

    if (isTyping) {
        client.broadcast.to(room).emit('typing', isTyping)

        if (typingTimerId) {
            clearTimeout(typingTimerId)
            typingTimerId = null
        }

        typingTimerId = setTimeout(() => {
            console.log(false)
            client.broadcast.to(room).emit('typing', false)
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
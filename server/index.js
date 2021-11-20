const express = require("express")
const socketio = require("socket.io")
const http = require("http")

const router = require("./router.js")

const app = express()
const server = http.createServer(app)
const io = socketio(server)

io.on("connection", (socket) => {
    console.log("A new user just joined")
    socket.on("disconnect", () => {
        console.log("User Left")
    })
})

app.use(router)

const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log(`Server running on ${PORT}`))
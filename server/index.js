const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors")


const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/chat")
  .then(() => console.log("Mongoose running"))
  .catch(() => console.log("Mongoose Errpr"));

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
  console.log("A new user just joined");
  socket.on("disconnect", () => {
    console.log("User Left");
  });
});

app.use(express.json({extended : true}))
app.use(cors())

app.use("/api/users", require("./routes/api/users.js"))
app.use("/api/auth", require("./routes/api/auth.js"))

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on ${PORT}`));

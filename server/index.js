const express = require("express");
const cors = require("cors")


const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/chat")
  .then(() => console.log("Mongoose running"))
  .catch(() => console.log("Mongoose Errpr"));

const app = express();


app.use(express.json({extended : true}))
app.use(cors())

app.use("/api/users", require("./routes/api/users.js"))
app.use("/api/auth", require("./routes/api/auth.js"))
app.use("/api/conversations", require("./routes/api/conversations.js"))
app.use("/api/messages", require("./routes/api/messages.js"))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Runnin on ${PORT}`))

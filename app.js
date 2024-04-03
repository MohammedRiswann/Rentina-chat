require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const { postchat } = require("./controllers/controller");

const port = process.env.PORT || 1000;
const DB_url = process.env.DB_url;

const app = express();
const httpServer = http.createServer(app);
const io = socketIO(httpServer, {
  cors: { origin: "*" },
});

app.use(cors());

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("message", (data) => {
    const { sender, reciever, message } = data;
    console.log(data);
    postchat(sender, reciever, message);
    data.date = new Date();
    io.emit("message", data);
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected!");
  });
});

mongoose
  .connect(DB_url)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

httpServer.listen(port, () => console.log(`listening on port ${port}`));

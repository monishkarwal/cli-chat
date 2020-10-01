// Configure socket server
const express = require("express");
const http = require("http");
const socket = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socket(server);

io.on("connection", (socket) => {
  console.log("User connected!");

  socket.on("msg", (data) => {
    console.log(`[${data.user}]: ${data.msg}`);
    socket.broadcast.emit("msgAll", { user: data.user, msg: data.msg });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected!");
  });
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

server.listen(port, () => {
  console.log("Server initiated: " + port);
});

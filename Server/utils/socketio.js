const express = require('express');
const app = express();
const {Server} = require('socket.io');
const http = require ('http');
const server = http.createServer(app);

const io = new Server(server, {
    cors:{
      origin: [
      "https://happychat-1.onrender.com",
      "https://happy-chat-iota.vercel.app",
      "http://localhost:5000",
      "http://localhost:5173",
    ],
      methods:"GET, POST, DELETE, PATCH, PUT",
      credentials:true,
    }
  });

function getReceiverSocketId(receiverId) {
    return userSocketMap[receiverId];
  }

//used to store online users
const userSocketMap = {};

//socket.io controls
io.on("connection", (socket) =>{
    console.log("user connected", socket.id);

    const userId = socket.handshake.query.userId;
    if(userId !== undefined){
      userSocketMap[userId] = socket.id;
    } 

    // Emit online users list
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () =>{
        console.log("A user disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    })
})

module.exports = {
  io,
  app,
  server,
  getReceiverSocketId
}

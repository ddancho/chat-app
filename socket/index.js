const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost",
  },
  transports: ["websocket"],
});

let users = [];

const addUser = (userId, socketId) => {
  if (!users.find((user) => user.userId === userId)) {
    users.push({ userId, socketId });
  }
};

const removeUser = (userId) => {
  users = users.filter((user) => user.userId !== userId);
};

const disconnectUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  socket.on("addUser", (userId) => {
    if (userId) {
      console.log("user connected...");
      addUser(userId, socket.id);
      io.emit("contactsUpdated", users);
    }
  });

  socket.on("removeUser", (userId) => {
    if (userId) {
      console.log("user logout...");
      removeUser(userId);
      io.emit("contactsUpdated", users);
    }
  });

  socket.on("sendMessage", ({ senderId, receiverId, msg }) => {
    const receiver = getUser(receiverId);
    if (receiver) {
      io.to(receiver.socketId).emit("getMessage", {
        senderId,
        msg,
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected...");
    disconnectUser(socket.id);
    io.emit("contactsUpdated", users);
  });
});

httpServer.listen(7000, () => {
  console.log("Websocket server is up and running on port 7000");
});

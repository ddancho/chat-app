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

const onSocketIo = function () {
  this.io.on("connection", (socket) => {
    socket.on("newConversationCreated", (conversation) => {
      this.io.emit("newConversation", conversation);
    });

    socket.on("newUserRegistered", (user) => {
      this.io.emit("newContact", user);
    });

    socket.on("getContactsOnline", () => {
      this.io.emit("contactsOnline", users);
    });

    socket.on("addUser", (userId) => {
      if (userId) {
        console.log("user connected...");
        addUser(userId, socket.id);
        this.io.emit("contactsUpdated", users);
      }
    });

    socket.on("removeUser", (userId) => {
      if (userId) {
        console.log("user logout...");
        removeUser(userId);
        this.io.emit("contactsUpdated", users);
      }
    });

    socket.on("sendMessage", ({ senderId, receiverId, msg }) => {
      const receiver = getUser(receiverId);
      if (receiver) {
        this.io.to(receiver.socketId).emit("getMessage", {
          senderId,
          msg,
        });
      }
    });

    socket.on("disconnect", () => {
      console.log("user disconnected...");
      disconnectUser(socket.id);
      this.io.emit("contactsUpdated", users);
    });
  });
};

module.exports = {
  onSocketIo,
};

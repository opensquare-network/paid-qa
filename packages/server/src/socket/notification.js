const { eventEmitter } = require("../models/notification");

let globalIO;

eventEmitter.on("save", (data) => {
  if (globalIO) {
    const room = `notification-${data.owner}`;
    globalIO.to(room).emit("notification", data);
  }
});

function handleSubscribeNotification(io, socket, publicKey) {
  globalIO = io;

  const room = `notification-${publicKey}`;
  socket.join(room);
}

function handleUnsubscribeNotification(io, socket, publicKey) {
  const room = `notification-${publicKey}`;
  socket.leave(room);
}

module.exports = {
  handleSubscribeNotification,
  handleUnsubscribeNotification,
};

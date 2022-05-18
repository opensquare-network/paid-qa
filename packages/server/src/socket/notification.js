const { eventEmitter } = require("../models/notification");

let globalIO;

eventEmitter.on("save", (data) => {
  if (globalIO) {
    const room = `notification-${data.owner}`;
    console.log("emit to notification subscriptions", room);
    globalIO.to(room).emit("notification", data);
  }
});

function handleSubscribeNotification(io, socket, publicKey) {
  globalIO = io;

  const room = `notification-${publicKey}`;

  console.log(socket.id, "add to notification subscriptions");
  socket.join(room);
}

function handleUnsubscribeNotification(io, socket, publicKey) {
  const room = `notification-${publicKey}`;
  console.log(socket.id, "remove from notification subscriptions");
  socket.leave(room);
}

module.exports = {
  handleSubscribeNotification,
  handleUnsubscribeNotification,
};

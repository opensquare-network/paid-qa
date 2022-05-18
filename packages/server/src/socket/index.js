const { Server } = require("socket.io");
const routes = require("./routes");

function setup(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(socket.id, "connect");
    socket.on("disconnect", () => {
      console.log(socket.id, "disconnect");
    });

    routes(io, socket);
  });
}

module.exports = setup;

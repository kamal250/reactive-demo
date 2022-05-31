import { Server } from "socket.io";

export default function handler(req, res) {
  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      // TODO :: Define all the trigger logic here
      socket.on("input-change", (msg) => {
        socket.broadcast.emit("list-update", msg);
      });
    });
  }
  res.end();
}

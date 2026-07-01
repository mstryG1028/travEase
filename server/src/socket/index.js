import { Server } from "socket.io";

let io;  

const onlineUsers = new Map();

export function initializeSocket(server) {
  io = new Server(server, {
    cors: {
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Connected:", socket.id);

    socket.on("join", (userId) => {
      onlineUsers.set(userId, socket.id);
    });

    socket.on("join-chat", (chatId) => {
      socket.join(chatId);
    });

    socket.on("disconnect", () => {
      for (const [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }
    });
  });
}

export function getIO() {
  return io;
}

export function getOnlineUsers() {
  return onlineUsers;
}

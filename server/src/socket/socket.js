import { Server } from "socket.io";

let io;

export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CORS_ORIGIN,

      credentials: true,
    },
  });

  return io;
};

export const getIO = () => io;

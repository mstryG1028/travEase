

import http from "http";

import app from "./app.js";

import connectDB from "./db/index.js";

import { initializeSocket } from "./socket/socket.js";

import chatSocket from "./socket/chat.socket.js";

const server = http.createServer(app);

const io = initializeSocket(server);

chatSocket(io);

connectDB().then(() => {
  server.listen(process.env.PORT, () => {
    console.log("Server Running");
  });
});

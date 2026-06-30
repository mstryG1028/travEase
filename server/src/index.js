import dotenv from "dotenv";
dotenv.config({
  path: ".env",
});

import connectDB from "./db/index.js";
import app from "./app.js";

import http from "http";

import { initializeSocket } from "./socket/index.js";

// import chatSocket from "./socket/chat.socket.js";

const server = http.createServer(app);

 initializeSocket(server);

// chatSocket(io);

connectDB().then(() => {
  server.listen(process.env.PORT, () => {
    console.log("Server Running");
  });
});

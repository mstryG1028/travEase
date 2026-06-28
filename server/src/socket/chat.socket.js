import jwt from "jsonwebtoken";

import {
  sendMessage,
  markMessagesRead,
} from "../services/chat/chat.service.js";

const onlineUsers = new Map();

export default function chatSocket(io) {
  io.on("connection", (socket) => {
    socket.on("join", (userId) => {
      onlineUsers.set(userId.toString(), socket.id);

      socket.userId = userId;
    });

    socket.on("send-message", async (data) => {
      const message = await sendMessage(
        data.sender,
        data.receiver,
        data.message,
      );

      const receiverSocket = onlineUsers.get(data.receiver.toString());

      if (receiverSocket) {
        io.to(receiverSocket).emit("receive-message", message);
      }

      socket.emit("message-sent", message);
    });

    socket.on("typing", ({ receiver }) => {
      const receiverSocket = onlineUsers.get(receiver.toString());

      if (receiverSocket) {
        io.to(receiverSocket).emit("typing");
      }
    });

    socket.on("read-messages", async ({ conversationId, userId }) => {
      await markMessagesRead(conversationId, userId);
    });

    socket.on("disconnect", () => {
      if (socket.userId) {
        onlineUsers.delete(socket.userId.toString());
      }
    });
  });
}

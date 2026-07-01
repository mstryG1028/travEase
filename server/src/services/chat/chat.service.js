import chatRepository from "../../repositories/chat.repository.js";
import messageRepository from "../../repositories/message.repository.js";
import { getIO } from "../../socket/socket.js";

import ApiError from "../../utils/ApiError.js";

// =====================================
// Get My Chats
// =====================================

export async function myConversations(userId) {
  return await chatRepository.find({
    $or: [{ guest: userId }, { owner: userId }],
  });
}

// =====================================
// Get Messages
// =====================================

export async function getMessages(chatId) {
  return await messageRepository.find({
    chat: chatId,
  });
}

// =====================================
// Send Message
// =====================================

export async function sendMessage(chatId, senderId, text) {
  const chat = await chatRepository.findById(chatId);

  if (!chat) {
    throw new ApiError(404, "Chat not found");
  }

  const receiver =
    chat.guest.toString() === senderId.toString() ? chat.owner : chat.guest;

  const message = await messageRepository.create({
    chat: chatId,

    sender: senderId,

    receiver,

    text,
  });

  getIO().to(chatId.toString()).emit("new-message", message);
  chat.lastMessage = text;

  chat.lastMessageAt = new Date();

  if (receiver.toString() === chat.owner.toString()) {
    chat.unreadByOwner++;
  } else {
    chat.unreadByGuest++;
  }

  await chatRepository.save(chat);

  return await message.populate("sender receiver", "fullName avatar");
}

// =====================================
// Read Messages
// =====================================

export async function markMessagesRead(chatId, userId) {
  await messageRepository.updateMany(
    {
      chat: chatId,

      receiver: userId,

      isRead: false,
    },
    {
      isRead: true,
    },
  );

  const chat = await chatRepository.findById(chatId);

  if (!chat) return;

  if (chat.guest.toString() === userId.toString()) {
    chat.unreadByGuest = 0;
  } else {
    chat.unreadByOwner = 0;
  }

  await chatRepository.save(chat);

  return true;
}

// =====================================
// Delete Message
// =====================================

export async function deleteMessage(messageId, userId) {
  const message = await messageRepository.findById(messageId);

  if (!message) {
    throw new ApiError(404, "Message not found");
  }

  if (message.sender.toString() !== userId.toString()) {
    throw new ApiError(403, "Unauthorized");
  }

  await messageRepository.delete(message);

  return true;
}

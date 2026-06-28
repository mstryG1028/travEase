import conversationRepository from "../../repositories/conversation.repository.js";
import chatRepository from "../../repositories/chat.repository.js";

import ApiError from "../../utils/ApiError.js";

// ===========================================
// Get/Create Conversation
// ===========================================

export async function getConversation(user1, user2) {
  let conversation = await conversationRepository.findOne({
    participants: {
      $all: [user1, user2],
    },
  });

  if (!conversation) {
    conversation = await conversationRepository.create({
      participants: [user1, user2],
      lastMessage: "",
    });
  }

  return conversation;
}

// ===========================================
// Send Message
// ===========================================

export async function sendMessage(sender, receiver, message) {
  const conversation = await getConversation(sender, receiver);

  const chat = await chatRepository.create({
    conversation: conversation._id,

    sender,

    receiver,

    message,

    isRead: false,
  });

  conversation.lastMessage = message;
  conversation.lastMessageAt = new Date();

  await conversation.save();
  await chat.populate("sender", "fullName avatar");
  
  return chat;
}

// ===========================================
// Conversation List
// ===========================================

export async function myConversations(userId) {
  return await Conversation.find({
    participants: userId,
  })
    .populate("participants", "fullName avatar")
    .sort({
      updatedAt: -1,
    });
}

// ===========================================
// Chat History
// ===========================================

export async function getMessages(conversationId) {
  return await chatRepository.find({
    conversation: conversationId,
  });
}

// ===========================================
// Read Messages
// ===========================================

export async function markMessagesRead(conversationId, userId) {
  await chatRepository.updateMany(
    {
      conversation: conversationId,

      receiver: userId,

      isRead: false,
    },
    {
      isRead: true,
    },
  );

  return true;
}

// ===========================================
// Delete Message
// ===========================================

export async function deleteMessage(messageId, userId) {
  const message = await chatRepository.findById(messageId);

  if (!message) {
    throw new ApiError(404, "Message not found");
  }

  if (message.sender.toString() !== userId.toString()) {
    throw new ApiError(403, "Unauthorized");
  }

  await message.deleteOne();

  return true;
}

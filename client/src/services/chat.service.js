import api from "../api/axios";

// =====================================
// Get All Chats
// =====================================

export const getConversations = () => {
  return api.get("/chat/conversations");
};

// =====================================
// Get Messages of One Chat
// =====================================

export const getMessages = (chatId) => {
  return api.get(`/chat/messages/${chatId}`);
};

// =====================================
// Send Message
// =====================================

export const sendMessage = (data) => {
  return api.post("/chat/message", data);
};

// =====================================
// Mark Messages as Read
// =====================================

export const markMessagesRead = (chatId) => {
  return api.patch(`/chat/conversation/${chatId}/read`);
};

// =====================================
// Delete Message
// =====================================

export const deleteMessage = (messageId) => {
  return api.delete(`/chat/message/${messageId}`);
};
import { useEffect, useState } from "react";

import {
  getConversations,
  getMessages,
  sendMessage,
  markMessagesRead,
} from "../services/chat.service";

function useChat() {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadChats();
  }, []);

  // ===========================
  // Load Conversations
  // ===========================

  async function loadChats() {
    try {
      const res = await getConversations();

      setChats(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  // ===========================
  // Load Messages
  // ===========================

  async function loadMessages(chatId) {
    try {
      const res = await getMessages(chatId);

      setMessages(res.data.data);

      await markMessagesRead(chatId);
    } catch (error) {
      console.error(error);
    }
  }

  // ===========================
  // Select Chat
  // ===========================

  async function selectChat(chat) {
    setSelectedChat(chat);

    await loadMessages(chat._id);
  }

  // ===========================
  // Send Message
  // ===========================

  async function send(text) {
    if (!selectedChat || !text.trim()) return;

    try {
      const res = await sendMessage({
        chat: selectedChat._id,
        text,
      });

      setMessages((prev) => [
        ...prev,
        res.data.data,
      ]);
    } catch (error) {
      console.error(error);
    }
  }

  return {
    chats,
    loading,

    selectedChat,
    setSelectedChat: selectChat,

    messages,

    send,

    setMessages,

    loadChats,

    loadMessages,
  };
}

export default useChat;
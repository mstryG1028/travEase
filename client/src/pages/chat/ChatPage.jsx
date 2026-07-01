import { useEffect, useState } from "react";

import socket from "../../socket/socket";

import useChat from "../../hooks/useChat";

import ChatSidebar from "../../components/chat/ChatSidebar";
import ChatWindow from "../../components/chat/ChatWindow";
import ChatInput from "../../components/chat/ChatInput";

function ChatPage() {
  const { chats, selectedChat, setSelectedChat, messages, setMessages, send } =
    useChat();

  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);

  const [onlineUsers, setOnlineUsers] = useState([]);
  useEffect(() => {
    if (!selectedChat) return;

    socket.emit("join-chat", selectedChat._id);

    socket.on("new-message", (message) => {
      setMessages((prev) => [...prev, message]);
    });
    socket.on("typing", () => {
      setTyping(true);

      setTimeout(() => {
        setTyping(false);
      }, 1000);
    });

    socket.on("online-users", (users) => {
      setOnlineUsers(users);
    });
    socket.on("messages-read", () => {
      console.log("Messages Read");
    });

    return () => {
      socket.off("new-message");
      socket.off("typing");
      socket.off("online-users");
      socket.off("messages-read");
    };
  }, [selectedChat]);

  async function handleSend() {
    if (!text.trim()) return;

    await send(text);
   // socket.emit("read", selectedChat._id);

    setText("");
  }

  return (
    <div className="grid grid-cols-4 h-[85vh] bg-white rounded-3xl shadow">
      <ChatSidebar
        chats={chats}
        selected={selectedChat}
        setSelected={setSelectedChat}
        onlineUsers={onlineUsers}
      />

      <div className="col-span-3 flex flex-col">
        <ChatWindow messages={messages} typing={typing} />
        <ChatInput
          value={text}
          setValue={setText}
          selectedChat={selectedChat}
          onSend={handleSend}
        />{" "}
      </div>
    </div>
  );
}

export default ChatPage;

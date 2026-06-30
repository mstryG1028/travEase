
import { useState } from "react";

function ChatSidebar({ chats, selected, setSelected, onlineUsers }) {
  return (
    <div className="border-r overflow-y-auto">
      {chats.map((chat) => {
        const person = chat.owner?.fullName || chat.guest?.fullName;

        const otherUser = chat.owner?._id || chat.guest?._id;

        const online = onlineUsers.includes(otherUser);

        return (
          <div
            key={chat._id}
            onClick={() => setSelected(chat)}
            className={`p-4 cursor-pointer border-b hover:bg-gray-100 ${
              selected?._id === chat._id ? "bg-gray-100" : ""
            }`}
          >
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  online ? "bg-green-500" : "bg-gray-400"
                }`}
              />

              <h2 className="font-semibold">{person}</h2>
            </div>

            <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
          </div>
        );
      })}
    </div>
  );
}

export default ChatSidebar;

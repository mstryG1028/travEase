import { useEffect, useRef } from "react";

import MessageBubble from "./MessageBubble";

function ChatWindow({ messages, typing }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-5 space-y-4">
      {messages.map((message) => (
        <MessageBubble key={message._id} message={message} />
      ))}

      {typing && <div className="text-sm text-gray-400 italic">Typing...</div>}

      <div ref={bottomRef} />
    </div>
  );
}

export default ChatWindow;

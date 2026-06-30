import { Send } from "lucide-react";
import socket from "../../socket/socket";
function ChatInput({ value, setValue, onSend, selectedChat }) {
  return (
    <div className="border-t p-4 flex gap-3">
      <input
        value={value}
        onChange={(e) => {
          setValue(e.target.value);

          if (selectedChat) {
            socket.emit("typing", selectedChat._id);
          }
        }}
        placeholder="Type a message..."
        className="flex-1 input"
      />

      <button onClick={onSend} className="btn-primary">
        <Send size={18} />
      </button>
    </div>
  );
}

export default ChatInput;

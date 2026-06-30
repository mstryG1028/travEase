import useAuth from "../../hooks/useAuth";

function MessageBubble({ message }) {
  const { user } = useAuth();

  const mine = message.sender?._id === user?._id;

  return (
    <div className={`flex ${mine ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-sm rounded-2xl px-4 py-2 ${
          mine ? "bg-primary text-white" : "bg-gray-100 text-gray-800"
        }`}
      >
        <p>{message.text}</p>

        <p className="text-xs mt-1 opacity-70">
          {new Date(message.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
}

export default MessageBubble;

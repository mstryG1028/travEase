import { Bot, User } from "lucide-react";
import RecommendationCards from "./RecommendationCards";

function AIMessage({ role, text, type = "text", recommendations = [] }) {
  const isUser = role === "user";

  return (
    <div className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-white">
          <Bot size={18} />
        </div>
      )}

      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isUser ? "bg-emerald-500 text-white" : "bg-slate-800 text-slate-100"
        }`}
      >
        {type === "recommendation" ? (
          <RecommendationCards recommendations={recommendations} />
        ) : (
          <div className="text-sm leading-7 whitespace-pre-line">{text}</div>
        )}
      </div>

      {isUser && (
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-700 text-white">
          <User size={18} />
        </div>
      )}
    </div>
  );
}

export default AIMessage;

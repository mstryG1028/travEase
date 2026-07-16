import { useEffect, useRef, useState } from "react";

import Modal from "../ui/Modal";

import AIHeader from "./AIHeader";
import AIMessage from "./AIMessage";
import AIInput from "./AIInput";
import TypingLoader from "./TypingLoader";
import SuggestedQuestions from "./SuggestedQuestions";

import { askAI } from "../../services/ai.service";

function AIChatModal({ open, onClose, listingId }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      type: "text",
      text: "👋 Hi! I'm TravEase AI.\n\nI can help you with:\n\n• Weather\n• Pricing\n• Reviews\n• Amenities\n• Availability\n• Find similar stays\n• Recommend hotels & villas",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function send(question) {
    if (!question.trim()) return;

    const userMessage = {
      role: "user",
      text: question,
    };

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        type: response.type || "text",
        text: response.answer || "",
        recommendations: response.recommendations || [],
      },
    ]);

    setLoading(true);

    try {
      const response = await askAI(listingId, question);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          type: "text",
          text: response.answer,
        },
      ]);
    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Sorry, I couldn't answer your question right now.",
        },
      ]);
    }

    setLoading(false);
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div
        className="
        w-[450px]
        max-w-[95vw]
        h-[650px]
        rounded-3xl
        bg-slate-900
        shadow-2xl
        border
        border-slate-700
        flex
        flex-col
        overflow-hidden
        "
      >
        <AIHeader onClose={onClose} />

        <div
          className="
          flex-1
          overflow-y-auto
          px-5
          py-5
          space-y-5
          "
        >
          {messages.map((msg, index) => (
            <AIMessage
              key={index}
              role={msg.role}
              text={msg.text}
              type={msg.type}
              recommendations={msg.recommendations}
            />
          ))}

          {loading && <TypingLoader />}

          <div ref={bottomRef} />
        </div>

        <div className="border-t border-slate-700 px-4 py-3">
          <SuggestedQuestions onSelect={send} />
        </div>

        <AIInput onSend={send} loading={loading} />
      </div>
    </Modal>
  );
}

export default AIChatModal;

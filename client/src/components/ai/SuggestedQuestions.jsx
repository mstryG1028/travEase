const suggestions = [
  "How is the weather?",
  "What amenities are available?",
  "Can I book next weekend?",
  "Show available dates for next 15 days.",
  "What do guests say about this place?",
  "Is this property worth the price?",
];

function SuggestedQuestions({ onSelect }) {
  return (
    <div className="flex flex-wrap gap-2">
      {suggestions.map((item) => (
        <button
          key={item}
          onClick={() => onSelect(item)}
          className="rounded-full border border-slate-700 px-3 py-2 text-sm text-slate-300 transition hover:border-emerald-500 hover:text-white"
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export default SuggestedQuestions;

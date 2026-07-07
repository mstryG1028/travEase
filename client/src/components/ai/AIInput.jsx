import { useState } from "react";
import { SendHorizontal } from "lucide-react";

function AIInput({ onSend, loading }) {
  const [value, setValue] = useState("");

  function submit() {
    if (!value.trim() || loading) return;

    onSend(value);

    setValue("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      submit();
    }
  }

  return (
    <div className="flex items-center gap-3 border-t border-slate-700 p-4">
      <textarea
        rows={1}
        value={value}
        disabled={loading}
        placeholder="Ask about this property..."
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 resize-none rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-emerald-500"
      />

      <button
        onClick={submit}
        disabled={loading}
        className="rounded-xl bg-emerald-500 p-3 text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <SendHorizontal size={20} />
      </button>
    </div>
  );
}

export default AIInput;

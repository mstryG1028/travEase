import { Bot, X } from "lucide-react";

function AIHeader({ onClose }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-700 px-5 py-4">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500 text-white">
          <Bot size={22} />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white">TravEase AI</h2>

          <p className="text-sm text-slate-400">
            Ask anything about this property
          </p>
        </div>
      </div>

      <button
        onClick={onClose}
        className="rounded-full p-2 transition hover:bg-slate-800"
      >
        <X className="text-slate-300" size={20} />
      </button>
    </div>
  );
}

export default AIHeader;

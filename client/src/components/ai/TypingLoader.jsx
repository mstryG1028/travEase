function TypingLoader() {
  return (
    <div className="flex items-end gap-2">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 font-semibold text-white">
        AI
      </div>

      <div className="rounded-2xl bg-slate-800 px-4 py-3">
        <div className="flex gap-1">
          <span className="h-2 w-2 animate-bounce rounded-full bg-slate-300"></span>
          <span
            className="h-2 w-2 animate-bounce rounded-full bg-slate-300"
            style={{ animationDelay: "0.15s" }}
          ></span>
          <span
            className="h-2 w-2 animate-bounce rounded-full bg-slate-300"
            style={{ animationDelay: "0.3s" }}
          ></span>
        </div>
      </div>
    </div>
  );
}

export default TypingLoader;

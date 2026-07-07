import { Sparkles } from "lucide-react";

function AIButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="
      fixed
      bottom-6
      right-6
      z-50

      flex
      items-center
      gap-3

      rounded-full

      bg-gradient-to-r
      from-emerald-500
      to-emerald-600

      px-5
      py-3

      font-semibold
      text-white

      shadow-2xl

      transition-all
      duration-300

      hover:scale-105
      hover:shadow-emerald-500/40

      active:scale-95
      "
    >
      <div
        className="
        flex
        h-10
        w-10
        items-center
        justify-center

        rounded-full

        bg-white/20
      "
      >
        <Sparkles size={20} />
      </div>

      <div className="flex flex-col items-start leading-none">
        <span className="text-xs opacity-80">TravEase</span>

        <span>Ask AI</span>
      </div>
    </button>
  );
}

export default AIButton;

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

        border
        px-5
        py-3

        font-semibold

        transition-all
        duration-300

        hover:-translate-y-1
        hover:scale-105

        active:scale-95
      "
      style={{
        backgroundColor: "var(--surface)",
        color: "var(--text-primary)",
        borderColor: "var(--border)",
        boxShadow: "var(--shadow-lg)",
      }}
    >
      <div
        className="
          flex
          h-10
          w-10
          items-center
          justify-center

          rounded-full

          text-white
        "
        style={{
          backgroundColor: "var(--primary)",
        }}
      >
        <Sparkles size={20} />
      </div>

      <div className="flex flex-col items-start leading-none">
        <span
          className="text-xs"
          style={{
            color: "var(--text-secondary)",
          }}
        >
          TravEase
        </span>

        <span>Ask AI</span>
      </div>
    </button>
  );
}

export default AIButton;

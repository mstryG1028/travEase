import { Sparkles } from "lucide-react";

function AIFloatingButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="
      fixed
      bottom-8
      right-8
      z-50
      h-16
      w-16
      rounded-full
      bg-emerald-600
      text-white
      shadow-xl
      hover:scale-110
      transition
      flex
      items-center
      justify-center
      "
    >
      <Sparkles size={28} />
    </button>
  );
}

export default AIFloatingButton;

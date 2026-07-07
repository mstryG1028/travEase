import { useEffect } from "react";
import { X } from "lucide-react";

function Modal({ open, onClose, children, showCloseButton = false }) {
  useEffect(() => {
    function handleEscape(e) {
      if (e.key === "Escape") {
        onClose?.();
      }
    }

    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="
      fixed
      inset-0
      z-[999]
      flex
      items-center
      justify-center
      bg-black/50
      backdrop-blur-sm
      animate-fadeIn
      "
      onClick={onClose}
    >
      <div
        className="
        relative
        animate-scaleIn
        "
        onClick={(e) => e.stopPropagation()}
      >
        {showCloseButton && (
          <button
            onClick={onClose}
            className="
            absolute
            right-4
            top-4
            z-10
            rounded-full
            bg-slate-800
            p-2
            text-white
            transition
            hover:bg-slate-700
            "
          >
            <X size={18} />
          </button>
        )}

        {children}
      </div>
    </div>
  );
}

export default Modal;

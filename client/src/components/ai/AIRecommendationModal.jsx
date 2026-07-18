import { Sparkles, X } from "lucide-react";
import Modal from "../ui/Modal";
import AIRecommendation from "./AIRecommendation";

function AIRecommendationModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose}>
      <div
        className="
        w-[900px]
        max-w-[95vw]
        h-[85vh]
        rounded-3xl
        bg-surface
        overflow-hidden
        flex
        flex-col
        shadow-theme-lg
        border
        border-theme
        "
      >
        {/* Header */}
        <div
          className="
          flex
          items-center
          justify-between
          px-6
          py-4
          border-b
          border-theme
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
              rounded-full
              bg-primary
              p-2
              text-white
              "
            >
              <Sparkles size={20} />
            </div>

            <div>
              <h2
                className="
                text-lg
                font-semibold
                text-theme
                "
              >
                TravEase AI
              </h2>

              <p
                className="
                text-sm
                text-muted
                "
              >
                Find the perfect stay in seconds
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="
            icon-btn
            "
          >
            <X size={22} />
          </button>
        </div>

        {/* Content */}

        <div
          className="
          flex-1
          overflow-y-auto
          p-6
          "
        >
          <AIRecommendation />
        </div>
      </div>
    </Modal>
  );
}

export default AIRecommendationModal;

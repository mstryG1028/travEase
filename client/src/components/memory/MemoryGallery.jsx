import { X, ChevronLeft, ChevronRight, Camera, Video } from "lucide-react";
import { useEffect, useState } from "react";

function MemoryGallery({ open, onClose, media = [], initialIndex = 0 }) {
  const [index, setIndex] = useState(initialIndex);

  useEffect(() => {
    setIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    if (!open) return;

    function handleKey(e) {
      if (e.key === "Escape") onClose();

      if (e.key === "ArrowLeft") {
        setIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1));
      }

      if (e.key === "ArrowRight") {
        setIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1));
      }
    }

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, [open, media]);

  if (!open || !media.length) return null;

  const current = media[index];

  return (
    <div className="fixed inset-0 z-[999] bg-black/95">
      {/* Close */}

      <button
        onClick={onClose}
        className="absolute right-6 top-6 z-50 rounded-full bg-white p-3"
      >
        <X size={22} />
      </button>

      {/* Left */}

      <button
        onClick={() => setIndex(index === 0 ? media.length - 1 : index - 1)}
        className="absolute left-5 top-1/2 z-50 -translate-y-1/2 rounded-full bg-white p-3"
      >
        <ChevronLeft size={25} />
      </button>

      {/* Right */}

      <button
        onClick={() => setIndex(index === media.length - 1 ? 0 : index + 1)}
        className="absolute right-5 top-1/2 z-50 -translate-y-1/2 rounded-full bg-white p-3"
      >
        <ChevronRight size={25} />
      </button>

      {/* Image */}

      <div className="flex h-full items-center justify-center p-12">
        {current.type === "image" ? (
          <img
            src={current.url}
            className="max-h-full max-w-full rounded-xl object-contain"
          />
        ) : (
          <video
            src={current.url}
            controls
            autoPlay
            className="max-h-full max-w-full rounded-xl"
          />
        )}
      </div>

      {/* Bottom */}

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-black/70 px-6 py-3 text-white">
        <div className="flex items-center gap-3">
          {current.type === "image" ? (
            <Camera size={18} />
          ) : (
            <Video size={18} />
          )}

          <span>
            {index + 1} / {media.length}
          </span>
        </div>
      </div>
    </div>
  );
}

export default MemoryGallery;

import {
  Calendar,
  Camera,
  Eye,
  MapPin,
  Pencil,
  Play,
  Trash2,
  Video,
} from "lucide-react";

function formatDate(date) {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function MemoryCard({ memory, onView, onEdit, onDelete, showActions = true }) {
  const cover =
    memory.media.find(
      (item) => item._id?.toString() === memory.coverMedia?.toString(),
    ) || memory.media[0];

  const imageCount = memory.media.filter(
    (item) => item.type === "image",
  ).length;

  const videoCount = memory.media.filter(
    (item) => item.type === "video",
  ).length;

  return (
    <div
      className="
        group
        overflow-hidden
        rounded-3xl
        border
        border-theme
        bg-surface
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-2
        hover:shadow-2xl
      "
    >
      {/* Cover */}

      <div className="relative aspect-[16/10] overflow-hidden">
        {cover?.type === "image" ? (
          <img
            src={cover.url}
            alt={memory.title}
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-500
              group-hover:scale-105
            "
          />
        ) : (
          <>
            <video
              src={cover?.url}
              muted
              className="
                h-full
                w-full
                object-cover
              "
            />

            <div
              className="
                absolute
                inset-0
                flex
                items-center
                justify-center
                bg-black/40
              "
            >
              <Play size={55} className="text-white" fill="white" />
            </div>
          </>
        )}

        {/* Overlay */}
        <div
          className="
    absolute
    inset-0
    flex
    items-center
    justify-center
    gap-3
    bg-black/55
    opacity-0
    transition
    group-hover:opacity-100
  "
        >
          {onView && (
            <button
              onClick={() => onView(memory)}
              className="
    rounded-lg
    bg-primary
    px-4
    py-2
    text-sm
    font-medium
    text-white
    transition
    hover:opacity-90
  "
            >
              <Eye size={20} />
            </button>
          )}

          {showActions && onEdit && (
            <button
              onClick={() => onEdit(memory)}
              className="rounded-full bg-white p-3 transition hover:scale-110"
            >
              <Pencil size={20} />
            </button>
          )}

          {showActions && onDelete && (
            <button
              onClick={() => onDelete(memory)}
              className="rounded-full bg-red-500 p-3 text-white transition hover:scale-110"
            >
              <Trash2 size={20} />
            </button>
          )}
        </div>

        {/* Media Count */}

        <div className="absolute bottom-3 left-3 flex gap-2">
          {imageCount > 0 && (
            <div
              className="
                flex
                items-center
                gap-1
                rounded-full
                bg-black/70
                px-3
                py-1
                text-xs
                text-white
              "
            >
              <Camera size={14} />
              {imageCount}
            </div>
          )}

          {videoCount > 0 && (
            <div
              className="
                flex
                items-center
                gap-1
                rounded-full
                bg-black/70
                px-3
                py-1
                text-xs
                text-white
              "
            >
              <Video size={14} />
              {videoCount}
            </div>
          )}
        </div>
      </div>

      {/* Content */}

      <div className="space-y-4 p-6">
        <div>
          <h3 className="text-xl font-bold text-theme">
            {memory.title || "Untitled Memory"}
          </h3>

          <p className="mt-2 line-clamp-2 text-sm text-muted">
            {memory.caption || "No description added."}
          </p>
        </div>

        {/* Trip Dates */}

        {/* <div className="flex items-center gap-2 text-sm text-muted">
          <Calendar size={16} />

          <span>
            {memory.booking
              ? `${formatDate(memory.booking.checkIn)} - ${formatDate(
                  memory.booking.checkOut,
                )}`
              : "Trip dates unavailable"}
          </span>
        </div> */}

        {/* Footer */}

        <div
          className="
            flex
            items-center
            justify-between
            border-t
            border-theme
            pt-4
          "
        >
          <span className="text-xs text-muted">
            Created {formatDate(memory.createdAt)}
          </span>

          <button
            onClick={() => onView?.(memory)}
            className="
    rounded-lg
    bg-primary
    px-4
    py-2
    text-sm
    font-medium
    text-white
    transition
    hover:opacity-90
  "
          >
            View Memory
          </button>
        </div>
      </div>
    </div>
  );
}

export default MemoryCard;

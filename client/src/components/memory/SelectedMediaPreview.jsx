import { useEffect, useMemo } from "react";
import { Image as ImageIcon, Play, Trash2, Video } from "lucide-react";

function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;

  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function SelectedMediaPreview({ files, setFiles }) {
  const previews = useMemo(() => {
    return files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      isVideo: file.type.startsWith("video/"),
    }));
  }, [files]);

  useEffect(() => {
    return () => {
      previews.forEach((preview) => {
        URL.revokeObjectURL(preview.url);
      });
    };
  }, [previews]);

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  if (files.length === 0) return null;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-theme">
            Selected Memories
          </h3>

          <p className="text-sm text-muted">
            Review your photos and videos before uploading.
          </p>
        </div>

        <div
          className="
            rounded-full
            bg-primary/10
            px-4
            py-2
            text-sm
            font-medium
            text-primary
          "
        >
          {files.length} File{files.length > 1 ? "s" : ""}
        </div>
      </div>

      <div
        className="
          grid
          grid-cols-2
          gap-4

          md:grid-cols-3

          lg:grid-cols-4
        "
      >
        {previews.map((item, index) => (
          <div
            key={index}
            className="
              group
              overflow-hidden
              rounded-2xl
              border
              border-theme
              bg-surface
              shadow-sm
              transition-all
              duration-300

              hover:shadow-xl
              hover:-translate-y-1
            "
          >
            <div className="relative aspect-square">
              {item.isVideo ? (
                <>
                  <video
                    src={item.url}
                    className="h-full w-full object-cover"
                    muted
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
                    <Play size={40} className="text-white" fill="white" />
                  </div>
                </>
              ) : (
                <img
                  src={item.url}
                  alt="preview"
                  className="h-full w-full object-cover"
                />
              )}

              <button
                type="button"
                onClick={() => removeFile(index)}
                className="
                  absolute
                  right-2
                  top-2

                  flex
                  h-9
                  w-9
                  items-center
                  justify-center

                  rounded-full

                  bg-red-500

                  text-white

                  opacity-0

                  transition

                  group-hover:opacity-100
                "
              >
                <Trash2 size={18} />
              </button>

              <div
                className="
                  absolute
                  left-2
                  top-2
                "
              >
                {item.isVideo ? (
                  <div
                    className="
                      flex
                      items-center
                      gap-1

                      rounded-full

                      bg-black/70

                      px-2

                      py-1

                      text-xs

                      text-white
                    "
                  >
                    <Video size={14} />
                    Video
                  </div>
                ) : (
                  <div
                    className="
                      flex
                      items-center
                      gap-1

                      rounded-full

                      bg-black/70

                      px-2

                      py-1

                      text-xs

                      text-white
                    "
                  >
                    <ImageIcon size={14} />
                    Photo
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-1 p-3">
              <p
                className="
                  truncate
                  text-sm
                  font-medium
                  text-theme
                "
              >
                {item.file.name}
              </p>

              <p className="text-xs text-muted">
                {formatFileSize(item.file.size)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectedMediaPreview;

import { useRef, useState } from "react";
import { ImagePlus, UploadCloud, Video } from "lucide-react";

function FileDropzone({ files = [], setFiles }) {
  const inputRef = useRef(null);

  const [dragging, setDragging] = useState(false);

  const handleFiles = (selectedFiles) => {
    if (!selectedFiles || selectedFiles.length === 0) return;

    const validFiles = [];
    const maxSize = 50 * 1024 * 1024; // 50 MB

    selectedFiles.forEach((file) => {
      const isImage = file.type.startsWith("image/");
      const isVideo = file.type.startsWith("video/");

      if (!isImage && !isVideo) return;

      if (file.size > maxSize) return;

      validFiles.push(file);
    });

    setFiles((prev) => [...prev, ...validFiles]);
  };

  const handleInput = (e) => {
    handleFiles(Array.from(e.target.files));

    e.target.value = "";
  };

  const handleDrop = (e) => {
    e.preventDefault();

    setDragging(false);

    handleFiles(Array.from(e.dataTransfer.files));
  };

  const imageCount = files.filter((file) =>
    file.type.startsWith("image/"),
  ).length;

  const videoCount = files.filter((file) =>
    file.type.startsWith("video/"),
  ).length;

  return (
    <div className="space-y-4">
      <div
        onClick={() => inputRef.current.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`
          cursor-pointer
          rounded-2xl
          border-2
          border-dashed
          p-10
          text-center
          transition-all
          duration-300

          ${
            dragging
              ? "border-primary bg-primary/10 scale-[1.01]"
              : "border-theme bg-surface hover:border-primary"
          }
        `}
      >
        <div className="flex justify-center">
          <UploadCloud size={52} className="text-primary" />
        </div>

        <h3 className="mt-5 text-xl font-semibold text-theme">
          Drag & Drop your memories
        </h3>

        <p className="mt-2 text-sm text-muted">
          Upload photos and videos from your trip.
        </p>

        <div className="mt-4 flex justify-center gap-3 text-sm text-theme">
          <span className="rounded-full bg-primary/10 px-3 py-1">JPG</span>

          <span className="rounded-full bg-primary/10 px-3 py-1">PNG</span>

          <span className="rounded-full bg-primary/10 px-3 py-1">WEBP</span>

          <span className="rounded-full bg-primary/10 px-3 py-1">MP4</span>

          <span className="rounded-full bg-primary/10 px-3 py-1">MOV</span>
        </div>

        <button
          type="button"
          className="
            mt-6
            rounded-xl
            bg-primary
            px-5
            py-3
            font-medium
            text-white
            transition
            hover:opacity-90
          "
        >
          Browse Files
        </button>

        <input
          ref={inputRef}
          hidden
          multiple
          accept="image/*,video/*"
          type="file"
          onChange={handleInput}
        />
      </div>

      {files.length > 0 && (
        <div
          className="
            flex
            items-center
            justify-center
            gap-6
            rounded-xl
            bg-surface
            p-4
          "
        >
          <div className="flex items-center gap-2">
            <ImagePlus size={20} className="text-primary" />

            <span className="font-medium text-theme">{imageCount} Photos</span>
          </div>

          <div className="flex items-center gap-2">
            <Video size={20} className="text-primary" />

            <span className="font-medium text-theme">{videoCount} Videos</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default FileDropzone;

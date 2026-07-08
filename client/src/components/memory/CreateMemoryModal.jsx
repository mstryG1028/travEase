import { useState } from "react";

import Modal from "../ui/Modal";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Textarea from "../ui/Textarea";

import FileDropzone from "./FileDropzone";
import SelectedMediaPreview from "./SelectedMediaPreview";

import { errorToast } from "../../utils/toast";

function CreateMemoryModal({ open, onClose, onCreate }) {
  const [title, setTitle] = useState("");

  const [caption, setCaption] = useState("");

  const [files, setFiles] = useState([]);

  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setTitle("");
    setCaption("");
    setFiles([]);
  };

  const handleClose = () => {
    if (loading) return;

    resetForm();

    onClose();
  };

  const handleSubmit = async () => {
    if (files.length === 0) {
      errorToast("Please upload at least one photo or video.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", title.trim());

      formData.append("caption", caption.trim());

      files.forEach((file) => {
        formData.append("media", file);
      });

      await onCreate(formData);

      resetForm();

      onClose();
    } catch (error) {
      errorToast(error?.response?.data?.message || "Failed to create memory.");
    } finally {
      setLoading(false);
    }
  };

  const imageCount = files.filter((file) =>
    file.type.startsWith("image/"),
  ).length;

  const videoCount = files.filter((file) =>
    file.type.startsWith("video/"),
  ).length;

  return (
    <Modal open={open} onClose={handleClose} showCloseButton>
      <div
        className="
        w-[95vw]
        max-w-4xl
        max-h-[90vh]
        overflow-y-auto

        rounded-3xl

        bg-surface

        border
        border-theme

        shadow-2xl
      "
      >
        {/* Header */}

        <div
          className="
          border-b
          border-theme

          px-8
          py-6
        "
        >
          <h2
            className="
            text-3xl
            font-bold
            text-theme
          "
          >
            📸 Save This Memory
          </h2>

          <p
            className="
            mt-2
            text-muted
          "
          >
            Upload your favourite moments from this trip. These memories are
            completely private and visible only to you.
          </p>
        </div>

        {/* Body */}

        <div className="space-y-8 p-8">
          <FileDropzone files={files} setFiles={setFiles} />

          <SelectedMediaPreview files={files} setFiles={setFiles} />

          {files.length > 0 && (
            <div
              className="
              flex
              flex-wrap
              gap-4
            "
            >
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
                📷 {imageCount} Photos
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
                🎥 {videoCount} Videos
              </div>
            </div>
          )}

          <Input
            label="Memory Title (Optional)"
            placeholder="Sunset at Baga Beach..."
            value={title}
            maxLength={80}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Textarea
            label="Caption (Optional)"
            placeholder="Write something memorable about this trip..."
            rows={5}
            maxLength={500}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />

          <div
            className="
            flex
            items-center
            justify-between

            rounded-2xl

            bg-primary/5

            p-5
          "
          >
            <div>
              <h4
                className="
                font-semibold
                text-theme
              "
              >
                Future AI Features
              </h4>

              <p
                className="
                mt-1
                text-sm
                text-muted
              "
              >
                These memories can later be transformed into AI-generated travel
                recaps and beautiful collages.
              </p>
            </div>

            <span
              className="
              rounded-full
              bg-primary
              px-4
              py-2
              text-xs
              font-semibold
              text-white
            "
            >
              Coming Soon
            </span>
          </div>
        </div>

        {/* Footer */}

        <div
          className="
          flex
          justify-end
          gap-4

          border-t
          border-theme

          px-8
          py-6
        "
        >
          <Button variant="outline" onClick={handleClose} disabled={loading}>
            Cancel
          </Button>

          <Button onClick={handleSubmit} loading={loading}>
            Save Memory
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default CreateMemoryModal;

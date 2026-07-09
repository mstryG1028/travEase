import { useState, useEffect } from "react";

import Modal from "../ui/Modal";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Textarea from "../ui/Textarea";

import FileDropzone from "./FileDropzone";
import SelectedMediaPreview from "./SelectedMediaPreview";

import { updateMemory, addMedia } from "../../services/memory.service";

import { errorToast } from "../../utils/toast";

function CreateMemoryModal({
  open,
  onClose,
  onCreate,
  editMode = false,
  memory = null,
  onSuccess,
}) {
  const [title, setTitle] = useState("");

  const [caption, setCaption] = useState("");

  const [files, setFiles] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;

    if (editMode && memory) {
      setTitle(memory.title || "");
      setCaption(memory.caption || "");
      setFiles([]);
    } else {
      resetForm();
    }
  }, [open, editMode, memory]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (editMode) {
        await updateMemory(memory._id, {
          title,
          caption,
        });

        if (files.length) {
          const formData = new FormData();

          files.forEach((file) => {
            formData.append("media", file);
          });

          await addMedia(memory._id, formData);
        }

        resetForm();

        onSuccess?.();

        onClose();

        return;
      }

      if (!files.length) {
        errorToast("Please upload at least one photo or video.");
        return;
      }

      const formData = new FormData();

      formData.append("title", title);

      formData.append("caption", caption);

      files.forEach((file) => {
        formData.append("media", file);
      });

      await onCreate(formData);

      resetForm();

      onClose();
    } catch (err) {
      console.log(err);
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
      <div className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-theme bg-surface shadow-2xl">
        {/* Header */}

        <div className="border-b border-theme px-8 py-6">
          <h2 className="text-3xl font-bold text-theme">
            {editMode ? "✏️ Edit Memory" : "📸 Save This Memory"}
          </h2>

          <p className="mt-2 text-muted">
            {editMode
              ? "Update your memory details or upload more photos and videos."
              : "Upload your favourite moments from this trip. These memories are private and visible only to you."}
          </p>
        </div>

        {/* Body */}

        <div className="space-y-8 p-8">
          <Input
            label="Memory Title"
            placeholder="Sunset at Baga Beach..."
            value={title}
            maxLength={80}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Textarea
            label="Caption"
            placeholder="Write something memorable..."
            rows={5}
            maxLength={500}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />

          {/* CREATE */}

          {!editMode && (
            <>
              <FileDropzone files={files} setFiles={setFiles} />

              <SelectedMediaPreview files={files} setFiles={setFiles} />
            </>
          )}

          {/* EDIT */}

          {editMode && (
            <>
              <div className="border-t border-theme pt-6">
                <h3 className="mb-4 text-xl font-semibold text-theme">
                  Add More Photos / Videos
                </h3>

                <FileDropzone files={files} setFiles={setFiles} />

                <SelectedMediaPreview files={files} setFiles={setFiles} />
              </div>
            </>
          )}

          {files.length > 0 && (
            <div className="flex flex-wrap gap-4">
              <div className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                📷 {imageCount} Photos
              </div>

              <div className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                🎥 {videoCount} Videos
              </div>
            </div>
          )}

          <div className="rounded-2xl bg-primary/5 p-5">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-theme">Future AI Features</h4>

                <p className="mt-1 text-sm text-muted">
                  AI recap, travel story and smart collage generation.
                </p>
              </div>

              <span className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white">
                Coming Soon
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}

        <div className="flex justify-end gap-4 border-t border-theme px-8 py-6">
          <Button variant="outline" onClick={handleClose} disabled={loading}>
            Cancel
          </Button>

          <Button onClick={handleSubmit} loading={loading}>
            {loading ? "Saving..." : editMode ? "Update Memory" : "Save Memory"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default CreateMemoryModal;

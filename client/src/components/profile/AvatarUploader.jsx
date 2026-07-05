import { useRef, useState } from "react";
import toast from "react-hot-toast";

import { successToast, errorToast } from "../../utils/toast";
import { updateAvatar, deleteAvatar } from "../../services/profile.service";

function AvatarUploader({ profile, reloadProfile }) {
  const inputRef = useRef();

  const [loading, setLoading] = useState(false);

  async function handleUpload(e) {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();

    formData.append("avatar", file);

    try {
      setLoading(true);

      await updateAvatar(formData);

      successToast("Avatar updated successfully.");

      reloadProfile();
    } catch (err) {
      errorToast(err.response?.data?.message || "Upload Failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!window.confirm("Delete avatar?")) return;

    try {
      setLoading(true);

      await deleteAvatar();

      successToast("Avatar deleted successfully.");

      reloadProfile();
    } catch (err) {
      errorToast(err.response?.data?.message || "Delete Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="text-center">
      <img
        src={profile.avatar?.url}
        alt="Avatar"
        className="
          w-36
          h-36
          mx-auto
          rounded-full
          object-cover
          border-4
          border-theme
          shadow-theme
          bg-surface-2
        "
      />

      <input
        ref={inputRef}
        type="file"
        hidden
        accept="image/*"
        onChange={handleUpload}
      />

      <div className="flex justify-center gap-3 mt-5">
        <button
          onClick={() => inputRef.current.click()}
          disabled={loading}
          className="btn-primary"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>

        <button
          onClick={handleDelete}
          disabled={loading}
          className="btn-danger"
        >
          {loading ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}

export default AvatarUploader;

import { useRef, useState } from "react";
import toast from "react-hot-toast";

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

      toast.success("Avatar Updated");

      reloadProfile();
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload Failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!window.confirm("Delete avatar?")) {
      return;
    }

    try {
      setLoading(true);

      await deleteAvatar();

      toast.success("Avatar Deleted");

      reloadProfile();
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="text-center">
      <img
        src={profile.avatar?.url}
        alt=""
        className="
          w-36
          h-36
          rounded-full
          object-cover
          mx-auto
          border-4
          border-white
          shadow-lg
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
          Upload
        </button>

        <button
          onClick={handleDelete}
          disabled={loading}
          className="
            bg-red-500
            text-white
            px-5
            rounded-xl
          "
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default AvatarUploader;

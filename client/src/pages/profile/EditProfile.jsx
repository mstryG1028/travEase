import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Loader from "../../components/ui/Loader";
import { successToast, errorToast } from "../../utils/toast";
import useProfile from "../../hooks/useProfile";
import { updateProfile } from "../../services/profile.service";

function EditProfile() {
  const navigate = useNavigate();

  const { profile, loading } = useProfile();

  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (profile) {
      setForm({
        fullName: profile.fullName || "",
        username: profile.username || "",
        email: profile.email || "",
        phone: profile.phone || "",
      });
    }
  }, [profile]);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.fullName || !form.username || !form.email) {
      return errorToast("Please fill all required fields");
    }

    try {
      setSaving(true);

      await updateProfile(form);

      successToast("Profile updated successfully.");

      navigate("/profile");
    } catch (err) {
      errorToast(err.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="max-w-2xl mx-auto py-10 px-5 bg-[var(--background)] text-[var(--text-primary)]">
      <h1 className="text-3xl font-bold mb-8">Edit Profile</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow p-8"
      >
        <div>
          <label className="block mb-2 font-medium">Full Name</label>

          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 outline-none focus:border-[var(--primary)]"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Username</label>

          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 outline-none focus:border-[var(--primary)]"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Email</label>

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 outline-none focus:border-[var(--primary)]"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Phone</label>

          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 outline-none focus:border-[var(--primary)]"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-[var(--primary)] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </section>
  );
}

export default EditProfile;

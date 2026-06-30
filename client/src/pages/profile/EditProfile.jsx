import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Loader from "../../components/ui/Loader";

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

    if (
      !form.fullName ||
      !form.username ||
      !form.email
    ) {
      return toast.error("Please fill all required fields");
    }

    try {
      setSaving(true);

      await updateProfile(form);

      toast.success("Profile Updated Successfully");

      navigate("/profile");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to update profile",
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="max-w-2xl mx-auto py-10 px-5">

      <h1 className="text-3xl font-bold mb-8">
        Edit Profile
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 bg-white shadow rounded-2xl p-8"
      >

        <div>
          <label className="block mb-2 font-medium">
            Full Name
          </label>

          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            className="input w-full"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Username
          </label>

          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            className="input w-full"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="input w-full"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Phone
          </label>

          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="input w-full"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="
            w-full
            bg-[var(--primary)]
            text-white
            py-3
            rounded-xl
            font-semibold
            hover:opacity-90
            disabled:opacity-50
          "
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>

      </form>

    </section>
  );
}

export default EditProfile;
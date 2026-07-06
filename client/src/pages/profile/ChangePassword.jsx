import { useState } from "react";
import { successToast, errorToast } from "../../utils/toast";
import { changePassword } from "../../services/profile.service";

function ChangePassword() {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      await changePassword(form);

      successToast("Password changed successfully.");

      setForm({
        oldPassword: "",
        newPassword: "",
      });
    } catch (err) {
      errorToast(err.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="max-w-lg mx-auto py-10 px-6 bg-[var(--background)] text-[var(--text-primary)]">
      <h1 className="text-3xl font-bold mb-8">Change Password</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow p-6 space-y-5"
      >
        <input
          type="password"
          name="oldPassword"
          placeholder="Current Password"
          value={form.oldPassword}
          onChange={handleChange}
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 outline-none focus:border-[var(--primary)]"
          required
        />

        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={form.newPassword}
          onChange={handleChange}
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 outline-none focus:border-[var(--primary)]"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-[var(--primary)] py-3 font-semibold text-white hover:opacity-90 transition disabled:opacity-60"
        >
          {loading ? "Updating..." : "Change Password"}
        </button>
      </form>
    </section>
  );
}

export default ChangePassword;

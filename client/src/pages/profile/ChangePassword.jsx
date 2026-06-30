import { useState } from "react";
import toast from "react-hot-toast";

import { changePassword } from "../../services/profile.service";

function ChangePassword() {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await changePassword(form);

      toast.success("Password Changed");

      setForm({
        oldPassword: "",
        newPassword: "",
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed");
    }
  }

  return (
    <section className="max-w-lg mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Change Password</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="password"
          name="oldPassword"
          placeholder="Current Password"
          value={form.oldPassword}
          onChange={handleChange}
          className="input"
        />

        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={form.newPassword}
          onChange={handleChange}
          className="input"
        />

        <button className="btn-primary w-full">Change Password</button>
      </form>
    </section>
  );
}

export default ChangePassword;

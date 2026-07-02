import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { useState } from "react";
import toast from "react-hot-toast";

import AuthLayout from "../../layouts/AuthLayout";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import useAuth from "../../hooks/useAuth";

function Register() {
  const navigate = useNavigate();

  const { register: registerUser } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      role: "owner",
    },
  });

  async function onSubmit(values) {
    try {
      const formData = new FormData();

      formData.append("fullName", values.fullName);
      formData.append("username", values.username);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("password", values.password);
      formData.append("role", values.role);

      if (values.avatar && values.avatar.length > 0) {
        formData.append("avatar", values.avatar[0]);
      }

      await registerUser(formData);

      toast.success("Welcome to TravEase 🎉");

      navigate("/");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Registration Failed",
      );
    }
  }

  return (
    <AuthLayout>
      {/* Tabs */}
      <div className="flex justify-center gap-12 border-b mb-8">
        <Link
          to="/login"
          className="pb-3 text-gray-400 hover:text-black font-medium"
        >
          Login
        </Link>

        <button
          type="button"
          className="pb-3 border-b-2 border-[var(--primary)] text-[var(--primary)] font-semibold"
        >
          Sign Up
        </button>
      </div>

      <h1 className="text-3xl font-bold text-gray-800 mb-6">Create Account</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Full Name */}
        <div>
          <Input
            placeholder="Full Name"
            {...register("fullName", {
              required: "Full Name is required",
            })}
          />

          {errors.fullName && (
            <p className="text-red-500 text-xs mt-1">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Username */}
        <div>
          <Input
            placeholder="Username"
            {...register("username", {
              required: "Username is required",
            })}
          />

          {errors.username && (
            <p className="text-red-500 text-xs mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <Input
            type="email"
            placeholder="Email Address"
            {...register("email", {
              required: "Email is required",
            })}
          />

          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <Input
            placeholder="Phone Number"
            {...register("phone", {
              required: "Phone Number is required",
            })}
          />

          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* Avatar */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Profile Photo
          </label>

          <input
            type="file"
            accept="image/*"
            {...register("avatar", {
              required: "Profile Photo is required",
            })}
            className="w-full border rounded-xl px-4 py-3
            file:mr-4
            file:px-4
            file:py-2
            file:border-0
            file:bg-[var(--primary)]
            file:text-white
            file:rounded-lg
            file:cursor-pointer"
          />

          {errors.avatar && (
            <p className="text-red-500 text-xs mt-1">{errors.avatar.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>

          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Role */}
        <select
          {...register("role")}
          className="w-full border rounded-xl px-4 py-3"
        >
          <option value="owner">Owner</option>
          <option value="manager">Manager</option>
          <option value="staff">Staff</option>
        </select>

        {/* Button */}
        <Button
          type="submit"
          loading={isSubmitting}
          className="w-full py-3 rounded-xl"
        >
          Create Account
        </Button>
      </form>

      {/* Divider */}
      <div className="flex items-center my-6">
        <div className="flex-1 border-t"></div>
        <span className="mx-3 text-gray-400 text-sm">or</span>
        <div className="flex-1 border-t"></div>
      </div>

      {/* Google */}
      <button className="w-full border rounded-xl py-3 flex items-center justify-center gap-3 hover:bg-gray-50">
        <FaGoogle className="text-red-500" />
        Continue with Google
      </button>

      <p className="text-center mt-8 text-sm text-gray-500">
        Already have an account?
        <Link to="/login" className="ml-1 text-[var(--primary)] font-semibold">
          Login
        </Link>
      </p>
    </AuthLayout>
  );
}

export default Register;

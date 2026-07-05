import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";

import { successToast, errorToast } from "../../utils/toast";
import useAuth from "../../hooks/useAuth";
import AuthLayout from "../../layouts/AuthLayout";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(values) {
    try {
      const loggedInUser = await login(values);

      successToast("Welcome Back !!");

      if (loggedInUser?.role === "owner") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      errorToast(error?.response?.data?.message || "Login Failed");
    }
  }

  return (
    <AuthLayout>
      {/* Tabs */}
      <div className="flex justify-center gap-12 border-b mb-8">
        <button className="pb-3 text-[var(--primary)] border-b-2 border-[var(--primary)] font-semibold">
          Login
        </button>

        <Link
          to="/register"
          className="pb-3 text-gray-400 hover:text-black font-medium"
        >
          Sign Up
        </Link>
      </div>

      {/* Heading */}
      <h1 className="text-3xl font-bold text-gray-800">Welcome back!</h1>

      <p className="text-gray-400 text-sm mt-1 mb-8">
        Please login to your account
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Username */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Email or Username
          </label>

          <Input
            placeholder="Enter email or username"
            {...register("email", {
              required: "Email or Username is required",
            })}
          />

          {errors.email && (
            <p className="text-red-500 text-xs mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="text-sm font-medium text-gray-700">Password</label>

          <div className="relative mt-2">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
              })}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Forgot */}
        <div className="text-right">
          <Link
            to="/forgot-password"
            className="text-sm text-[var(--primary)] hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {/* Login */}
        <Button
          type="submit"
          loading={isSubmitting}
          className="w-full py-3 rounded-xl bg-[var(--primary)]"
        >
          Login
        </Button>
      </form>

      {/* Divider */}
      <div className="flex items-center my-6">
        <div className="flex-1 border-t"></div>

        <span className="mx-3 text-gray-400 text-sm">or</span>

        <div className="flex-1 border-t"></div>
      </div>

      {/* Google */}
      <button
        className="
            w-full
            border
            rounded-xl
            py-3
            flex
            items-center
            justify-center
            gap-3
            hover:bg-gray-50
            transition
          "
      >
        <FaGoogle className="text-red-500" />
        Continue with Google
      </button>

      {/* Footer */}
      <p className="text-center text-sm text-gray-500 mt-8">
        Don't have an account?
        <Link
          to="/register"
          className="text-[var(--primary)] font-semibold ml-1"
        >
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );
}

export default Login;

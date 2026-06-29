import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

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

    formState: {
      errors,

      isSubmitting,
    },
  } = useForm();

  async function onSubmit(values) {
    try {
      await login(values);

      toast.success("Login Successful");

      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login Failed");
    }
  }

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Login to your account"
      footerText="Don't have an account?"
      footerLink="/register"
      footerLinkText="Register"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          label="Email"
          type="email"
          placeholder="Enter Email"
          error={errors.email?.message}
          {...register("email", {
            required: "Email is required",
          })}
        />

        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            error={errors.password?.message}
            {...register("password", {
              required: "Password is required",
            })}
          />

          <button
            type="button"
            className="absolute right-4 top-12"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <Button type="submit" loading={isSubmitting} fullWidth>
          Login
        </Button>
      </form>
    </AuthLayout>
  );
}

export default Login;

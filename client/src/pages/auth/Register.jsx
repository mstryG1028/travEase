import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

import useAuth from "../../hooks/useAuth";

import AuthLayout from "../../layouts/AuthLayout";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

function Register() {
  const { register: registerUser } = useAuth();

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
      await registerUser(values);

      toast.success("Registration Successful");

      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Registration Failed");
    }
  }

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join TravEase"
      footerText="Already have an account?"
      footerLink="/login"
      footerLinkText="Login"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          label="Full Name"
          placeholder="John Doe"
          error={errors.fullName?.message}
          {...register("fullName", {
            required: "Full Name is required",
          })}
        />

        <Input
          label="Email"
          type="email"
          placeholder="john@gmail.com"
          error={errors.email?.message}
          {...register("email", {
            required: "Email is required",
          })}
        />

        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            error={errors.password?.message}
            {...register("password", {
              required: "Password is required",

              minLength: {
                value: 6,

                message: "Minimum 6 characters",
              },
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

        <Button loading={isSubmitting} fullWidth type="submit">
          Register
        </Button>
      </form>
    </AuthLayout>
  );
}

export default Register;

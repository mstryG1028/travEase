import toast from "react-hot-toast";

export const successToast = (message) => {
  toast.success(message, {
    duration: 3000,
  });
};

export const errorToast = (error) => {
  toast.error(
    error?.response?.data?.message ||
      error?.message ||
      "Something went wrong",
    {
      duration: 3000,
    }
  );
};
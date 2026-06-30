import api from "../api/axios";

export const getProfile = () => {
  return api.get("/auth/me");
};

export const updateProfile = (data) => {
  return api.patch("/auth/update-profile", data);
};

export const changePassword = (data) => {
  return api.patch("/auth/change-password", data);
};

export const updateAvatar = (formData) => {
  return api.patch("/auth/update-avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteAvatar = () => {
  return api.delete("/auth/delete-avatar");
};

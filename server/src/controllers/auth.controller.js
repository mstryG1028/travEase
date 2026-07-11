
import authService from "../services/auth/auth.service.js";

import AsyncHandler from "../utils/AsyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import cookieOptions from "../utils/cookieOptions.js";

// ==========================================
// Register
// ==========================================

export const registerUser = AsyncHandler(async (req, res) => {
  const result = await authService.register(req.body, req.file);

  return res
    .status(201)
    .cookie("accessToken", result.accessToken, cookieOptions)
    .cookie("refreshToken", result.refreshToken, cookieOptions)
    .json(new ApiResponse(201, result.user, "Registration Successful"));
});

// ==========================================
// Login
// ==========================================

export const loginUser = AsyncHandler(async (req, res) => {
  const result = await authService.login(req.body);

  return res
    .status(200)
    .cookie("accessToken", result.accessToken, cookieOptions)
    .cookie("refreshToken", result.refreshToken, cookieOptions)
    .json(new ApiResponse(200, result.user, "Login Successful"));
});

// ==========================================
// Logout
// ==========================================

export const logoutUser = AsyncHandler(async (req, res) => {
  await authService.logout(req.user._id);

  return res
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(new ApiResponse(200, {}, "Logged out successfully"));
});

// ==========================================
// Refresh Token
// ==========================================

export const refreshAccessToken = AsyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken || req.body.refreshToken;

  const tokens = await authService.refreshToken(refreshToken);

  return res
    .cookie("accessToken", tokens.accessToken, cookieOptions)
    .cookie("refreshToken", tokens.refreshToken, cookieOptions)
    .json(new ApiResponse(200, tokens, "Token refreshed"));
});

// ==========================================
// Current User
// ==========================================

export const getCurrentUser = AsyncHandler(async (req, res) => {
  const user = await authService.getCurrentUser(req.user._id);

  return res.json(
    new ApiResponse(200, user, "Current user fetched successfully"),
  );
});

// ==========================================
// Update Profile
// ==========================================

export const updateProfile = AsyncHandler(async (req, res) => {
  const user = await authService.updateProfile(req.user._id, req.body);

  return res.json(new ApiResponse(200, user, "Profile Updated"));
});

// ==========================================
// Change Password
// ==========================================

export const changePassword = AsyncHandler(async (req, res) => {
  await authService.changePassword(req.user._id, req.body);

  return res.json(new ApiResponse(200, {}, "Password Changed"));
});

// ==========================================
// Update Avatar
// ==========================================

export const updateAvatar = AsyncHandler(async (req, res) => {
  const user = await authService.updateAvatar(req.user._id, req.file);

  return res.json(new ApiResponse(200, user, "Avatar Updated"));
});

// ==========================================
// Delete Avatar
// ==========================================

export const deleteAvatar = AsyncHandler(async (req, res) => {
  await authService.deleteAvatar(req.user._id);

  return res.json(new ApiResponse(200, {}, "Avatar Deleted"));
});

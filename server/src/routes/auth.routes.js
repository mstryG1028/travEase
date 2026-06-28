import { Router } from "express";

import {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    getCurrentUser,
    updateProfile,
    changePassword,
    updateAvatar,
    deleteAvatar
} from "../controllers/auth.controller.js";

import {
    verifyJWT,
    validateRequiredFields,
    upload
} from "../middlewares/index.js";

const router = Router();

// Public Routes
router.post(
    "/register",
    upload.single("avatar"),
    validateRequiredFields([
        "fullName",
        "username",
        "email",
        "password"
    ]),
    registerUser
);

router.post(
    "/login",
    validateRequiredFields([
        "email",
        "password"
    ]),
    loginUser
);

router.post(
    "/refresh-token",
    refreshAccessToken
);

// Protected Routes
router.post(
    "/logout",
    verifyJWT,
    logoutUser
);

router.get(
    "/me",
    verifyJWT,
    getCurrentUser
);

router.patch(
    "/update-profile",
    verifyJWT,
    updateProfile
);

router.patch(
    "/change-password",
    verifyJWT,
    changePassword
);

router.patch(
    "/update-avatar",
    verifyJWT,
    upload.single("avatar"),
    updateAvatar
);

router.delete(
    "/delete-avatar",
    verifyJWT,
    deleteAvatar
);

export default router;
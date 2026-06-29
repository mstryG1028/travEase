import jwt from "jsonwebtoken";
import { User } from "../models/index.js";
import {
  AsyncHandler,
  ApiError,
  sendResponse,
  generateAccessAndRefreshToken,
} from "../utils/index.js";

import cookieOptions from "../utils/cookieOptions.js";

import {
  uploadOnCloudinary,
  
} from "../utils/cloudinary.js";
const options = {
  httpOnly: true,
  secure: false, // true in production (HTTPS)
  sameSite: "lax",
};

// ==========================
// Register User
// ==========================
export const registerUser = AsyncHandler(async (req, res, next) => {
  const {
    fullName,

    username,

    email,

    phone,

    password,

    role,
  } = req.body;

  const existedUser = await User.findOne({
    $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }],
  });

  if (existedUser) {
    throw new ApiError(
      409,

      "User already exists",
    );
  }

  let avatar = {
    url: "",

    public_id: "",
  };

 
console.log(req.file);
  if (req.file) {
    console.log(req.file);
    let uploaded = await uploadOnCloudinary(req.file.path);

    if (uploaded) {
      avatar = {
        url: uploaded.secure_url,

        public_id: uploaded.public_id,
      };
    }
  }

  const user = await User.create({
    fullName,

    username: username.toLowerCase(),

    email: email.toLowerCase(),

    phone,

    password,

    role,

    avatar,
  });

  const createdUser = await User.findById(user._id)

    .select("-password -refreshToken");

  return sendResponse(
    res,

    201,

    createdUser,

    "Registration Successful",
  );
});

// ==========================
// Login
// ==========================
export const loginUser = AsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    $or: [
      {
        email: email.toLowerCase(),
      },

      {
        username: email.toLowerCase(),
      },
    ],
  }).select("+password +refreshToken");

  if (!user) {
    throw new ApiError(
      404,

      "User not found",
    );
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new ApiError(
      401,

      "Invalid Credentials",
    );
  }

  user.lastLogin = new Date();

  await user.save({
    validateBeforeSave: false,
  });

  const {
    accessToken,

    refreshToken,
  } = await generateAccessAndRefreshToken(user);

  const loggedUser = await User.findById(user._id)

    .select("-password -refreshToken");

  return res

    .status(200)

    .cookie(
      "accessToken",

      accessToken,

      cookieOptions,
    )

    .cookie(
      "refreshToken",

      refreshToken,

      cookieOptions,
    )

    .json({
      success: true,

      user: loggedUser,

      accessToken,

      refreshToken,
    });
});

// ==========================
// Logout
// ==========================
export const logoutUser = AsyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,

    {
      $unset: {
        refreshToken: 1,
      },
    },
  );

  return res

    .clearCookie("accessToken", cookieOptions)

    .clearCookie("refreshToken", cookieOptions)

    .json({
      success: true,

      message: "Logged out successfully",
    });
});
// ==========================
// Refresh Token
// ==========================
export const refreshAccessToken = AsyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(
      401,

      "Refresh Token Missing",
    );
  }

  const decoded = jwt.verify(
    incomingRefreshToken,

    process.env.REFRESH_TOKEN_SECRET,
  );

  const user = await User.findById(decoded._id).select("+refreshToken");

  if (!user) {
    throw new ApiError(
      401,

      "Invalid Refresh Token",
    );
  }

  if (incomingRefreshToken !== user.refreshToken) {
    throw new ApiError(
      401,

      "Expired Refresh Token",
    );
  }

  const {
    accessToken,

    refreshToken,
  } = await generateAccessAndRefreshToken(user);

  return res

    .cookie(
      "accessToken",

      accessToken,

      cookieOptions,
    )

    .cookie(
      "refreshToken",

      refreshToken,

      cookieOptions,
    )

    .json({
      success: true,

      accessToken,

      refreshToken,
    });
});

// ==========================
// Current User
// ==========================
export const getCurrentUser = AsyncHandler(async (req, res) => {
  return sendResponse(res, 200, req.user, "Current user fetched successfully");
});

export const updateProfile = AsyncHandler(async (req, res) => {
  const {
    fullName,

    phone,
  } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user._id,

    {
      $set: {
        fullName,

        phone,
      },
    },

    {
      new: true,
    },
  ).select("-password -refreshToken");

  return sendResponse(
    res,

    200,

    user,

    "Profile Updated",
  );
});

export const changePassword = AsyncHandler(async (req, res) => {
  const {
    oldPassword,

    newPassword,
  } = req.body;

  const user = await User.findById(req.user._id).select("+password");

  const correct = await user.comparePassword(oldPassword);

  if (!correct) {
    throw new ApiError(
      400,

      "Old Password Incorrect",
    );
  }

  user.password = newPassword;

  await user.save();

  return sendResponse(
    res,

    200,

    null,

    "Password Changed",
  );
});

export const updateAvatar = AsyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(
      400,

      "Avatar Required",
    );
  }

  const user = await User.findById(req.user._id);

  if (user.avatar.public_id) {
    await deleteFromCloudinary(user.avatar.public_id);
  }

  const uploaded = await uploadOnCloudinary(req.file.path);

  user.avatar = {
    url: uploaded.secure_url,

    public_id: uploaded.public_id,
  };

  await user.save({
    validateBeforeSave: false,
  });

  return sendResponse(
    res,

    200,

    user,

    "Avatar Updated",
  );
});

export const deleteAvatar = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user.avatar.public_id) {
    await deleteFromCloudinary(user.avatar.public_id);
  }

  user.avatar = {
    url: "",

    public_id: "",
  };

  await user.save({
    validateBeforeSave: false,
  });

  return sendResponse(
    res,

    200,

    null,

    "Avatar Deleted",
  );
});

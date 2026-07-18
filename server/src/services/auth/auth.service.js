import jwt from "jsonwebtoken";

import userRepository from "../../repositories/user.repository.js";

import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../../utils/cloudinary.js";

import ApiError from "../../utils/ApiError.js";
import {generateAccessAndRefreshToken} from "../../utils/generateTokens.js";

class AuthService {
  // ==========================================
  // Register
  // ==========================================

  async register(data, file) {
    const { fullName, username, email, phone, password, role } = data;

    const existedUser = await userRepository.findOne({
      $or: [
        { email: email.toLowerCase() },
        { username: username.toLowerCase() },
      ],
    });

    if (existedUser) {
      throw new ApiError(409, "User already exists");
    }

    let avatar = {
      url: "",
      public_id: "",
    };

    if (file) {
      const uploaded = await uploadOnCloudinary(file.path);

      if (uploaded) {
        avatar = {
          url: uploaded.secure_url,
          public_id: uploaded.public_id,
        };
      }
    }

    const user = await userRepository.create({
      fullName,
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      phone,
      password,
      role:"user",
      avatar,
    });

    const tokens = await generateAccessAndRefreshToken(user);

    const createdUser = await userRepository.findById(user._id);

    createdUser.password = undefined;
    createdUser.refreshToken = undefined;

    return {
      user: createdUser,
      ...tokens,
    };
  }

  // ==========================================
  // Login
  // ==========================================

  async login(data) {
    const { email, password } = data;

    const user = await userRepository
      .findOne({
        $or: [
          { email: email.toLowerCase() },
          { username: email.toLowerCase() },
        ],
      })
      .select("+password +refreshToken");

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const valid = await user.comparePassword(password);

    if (!valid) {
      throw new ApiError(401, "Invalid credentials");
    }

    user.lastLogin = new Date();

    await user.save({
      validateBeforeSave: false,
    });

    const tokens = await generateAccessAndRefreshToken(user);

    const loggedUser = await userRepository.findById(user._id);

    loggedUser.password = undefined;
    loggedUser.refreshToken = undefined;

    return {
      user: loggedUser,
      ...tokens,
    };
  }
  // ==========================================
  // Logout
  // ==========================================

  async logout(userId) {
    await userRepository.update(userId, {
      $unset: {
        refreshToken: 1,
      },
    });

    return true;
  }
  // ==========================================
  // Current User
  // ==========================================

  async getCurrentUser(userId) {
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    return user;
  }
  // ==========================================
  // Update Profile
  // ==========================================

  async updateProfile(userId, body) {
    const { fullName, phone } = body;

    const user = await userRepository.update(
      userId,
      {
        $set: {
          fullName,
          phone,
        },
      },
      {
        new: true,
      },
    );

    return user;
  }
  // ==========================================
  // Change Password
  // ==========================================

  async changePassword(userId, body) {
    const { oldPassword, newPassword } = body;

    const user = await userRepository.findById(userId).select("+password");

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const isCorrect = await user.comparePassword(oldPassword);

    if (!isCorrect) {
      throw new ApiError(400, "Old password is incorrect");
    }

    user.password = newPassword;

    await user.save();

    return true;
  }
  // ==========================================
  // Update Avatar
  // ==========================================

  async updateAvatar(userId, file) {
    if (!file) {
      throw new ApiError(400, "Avatar is required");
    }

    const user = await userRepository.findById(userId);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    if (user.avatar?.public_id) {
      await deleteFromCloudinary(user.avatar.public_id);
    }

    const uploaded = await uploadOnCloudinary(file.path);

    if (!uploaded) {
      throw new ApiError(500, "Avatar upload failed");
    }

    user.avatar = {
      url: uploaded.secure_url,
      public_id: uploaded.public_id,
    };

    await user.save({
      validateBeforeSave: false,
    });

    user.password = undefined;
    user.refreshToken = undefined;

    return user;
  }

  // ==========================================
  // Delete Avatar
  // ==========================================

  async deleteAvatar(userId) {
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    if (user.avatar?.public_id) {
      await deleteFromCloudinary(user.avatar.public_id);
    }

    user.avatar = {
      url: "",
      public_id: "",
    };

    await user.save({
      validateBeforeSave: false,
    });

    return true;
  }
}

export default new AuthService();

import notificationRepository from "../../repositories/notification.repository.js";
import { Notification } from "../../models/index.js";
import ApiError from "../../utils/ApiError.js";

// ========================================
// Create Notification
// ========================================

export async function createNotification(data) {
  return await notificationRepository.create({
    user: data.user,
    title: data.title,
    message: data.message,
    type: data.type || "GENERAL",
    referenceId: data.referenceId || null,
    isRead: false,
  });
}

// ========================================
// My Notifications
// ========================================

export async function myNotifications(userId) {
  return await notificationRepository.find({
    user: userId,
  });
}

// ========================================
// Mark Single Notification Read
// ========================================

export async function markAsRead(id, userId) {
  const notification = await notificationRepository.findById(id);

  if (!notification) {
    throw new ApiError(404, "Notification not found");
  }

  if (notification.user.toString() !== userId.toString()) {
    throw new ApiError(403, "Unauthorized");
  }

  notification.isRead = true;

  await notificationRepository.save(notification);

  return notification;
}

// ========================================
// Mark All Notifications Read
// ========================================

export async function markAllAsRead(userId) {
  await Notification.updateMany(
    {
      user: userId,
      isRead: false,
    },
    {
      $set: {
        isRead: true,
      },
    },
  );

  return true;
}

// ========================================
// Delete Notification
// ========================================

export async function deleteNotification(id, userId) {
  const notification = await notificationRepository.findById(id);

  if (!notification) {
    throw new ApiError(404, "Notification not found");
  }

  if (notification.user.toString() !== userId.toString()) {
    throw new ApiError(403, "Unauthorized");
  }

  await notification.deleteOne();

  return true;
}

// ========================================
// Delete All Notifications
// ========================================

export async function clearNotifications(userId) {
  await Notification.deleteMany({
    user: userId,
  });

  return true;
}

// ========================================
// Unread Count
// ========================================

export async function unreadCount(userId) {
  return await Notification.countDocuments({
    user: userId,
    isRead: false,
  });
}

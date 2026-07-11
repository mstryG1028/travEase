import notificationRepository from "../../repositories/notification.repository.js";
import { Notification } from "../../models/index.js";
import ApiError from "../../utils/ApiError.js";

class NotificationService {
  // ========================================
  // Create Notification
  // ========================================
  async createNotification(data) {
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
  async myNotifications(userId) {
    return await notificationRepository.find({
      user: userId,
    });
  }

  // ========================================
  // Mark Single Notification Read
  // ========================================
  async markAsRead(id, userId) {
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
  async markAllAsRead(userId) {
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
  async deleteNotification(id, userId) {
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
  async clearNotifications(userId) {
    await Notification.deleteMany({
      user: userId,
    });

    return true;
  }

  // ========================================
  // Unread Count
  // ========================================
  async unreadCount(userId) {
    return await Notification.countDocuments({
      user: userId,
      isRead: false,
    });
  }
}

export default new NotificationService();

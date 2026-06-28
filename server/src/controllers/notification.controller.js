import * as notificationService from "../services/notification/notification.service.js";

import AsyncHandler from "../utils/AsyncHandler.js";
import sendResponse from "../utils/sendResponse.js";

export const myNotifications = AsyncHandler(async (req, res) => {
  const notifications = await notificationService.myNotifications(req.user._id);

  return sendResponse(res, 200, notifications);
});

export const markAsRead = AsyncHandler(async (req, res) => {
  const notification = await notificationService.markAsRead(
    req.params.id,
    req.user._id,
  );

  return sendResponse(res, 200, notification, "Notification marked as read");
});

export const markAllAsRead = AsyncHandler(async (req, res) => {
  await notificationService.markAllAsRead(req.user._id);

  return sendResponse(res, 200, null, "All notifications marked as read");
});

export const deleteNotification = AsyncHandler(async (req, res) => {
  await notificationService.deleteNotification(req.params.id, req.user._id);

  return sendResponse(res, 200, null, "Notification deleted");
});

export const clearNotifications = AsyncHandler(async (req, res) => {
  await notificationService.clearNotifications(req.user._id);

  return sendResponse(res, 200, null, "All notifications cleared");
});

export const unreadCount = AsyncHandler(async (req, res) => {
  const count = await notificationService.unreadCount(req.user._id);

  return sendResponse(res, 200, {
    unread: count,
  });
});

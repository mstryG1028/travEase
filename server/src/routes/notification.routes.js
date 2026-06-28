import { Router } from "express";

import {
  myNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  clearNotifications,
  unreadCount,
} from "../controllers/notification.controller.js";

import { verifyJWT } from "../middlewares/index.js";

const router = Router();

router.use(verifyJWT);

router.get("/", myNotifications);

router.get("/unread-count", unreadCount);

router.patch("/read-all", markAllAsRead);

router.patch("/:id/read", markAsRead);

router.delete("/:id", deleteNotification);

router.delete("/", clearNotifications);

export default router;

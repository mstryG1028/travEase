import { Router } from "express";

import {
  myConversations,
  getMessages,
  deleteMessage,
  sendMessage,
  markMessagesRead,
} from "../controllers/chat.controller.js";

import { verifyJWT } from "../middlewares/index.js";

const router = Router();

router.use(verifyJWT);

router.get("/conversations", myConversations);

router.get("/messages/:id", getMessages);

router.post("/message", sendMessage);

router.patch("/conversation/:id/read", markMessagesRead);

router.delete("/message/:id", deleteMessage);

export default router;

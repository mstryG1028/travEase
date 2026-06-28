import { Router } from "express";

import {
  myConversations,
  getMessages,
  deleteMessage,
} from "../controllers/chat.controller.js";

import { verifyJWT } from "../middlewares/index.js";

const router = Router();

router.use(verifyJWT);

router.get("/conversations", myConversations);

router.get("/messages/:id", getMessages);

router.delete("/message/:id", deleteMessage);

export default router;

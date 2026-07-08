import { Router } from "express";

import {
  createMemory,
  getBookingMemories,
  getMemoryById,
  updateMemory,
  addMedia,
  deleteMedia,
  updateCover,
  deleteMemory,
} from "../controllers/memory.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";

const router = Router();

router.use(verifyJWT);

router.post(":bookingId", upload.array("media", 50), createMemory);

router.get("/booking/:bookingId", getBookingMemories);

router.get("/:memoryId", getMemoryById);

router.patch("/:memoryId", updateMemory);

router.post("/:memoryId/media", upload.array("media", 50), addMedia);

router.delete("/:memoryId/media/:mediaId", deleteMedia);

router.patch("/:memoryId/cover", updateCover);

router.delete("/:memoryId", deleteMemory);

export default router;

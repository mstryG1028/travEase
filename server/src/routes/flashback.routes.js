import { Router } from "express";

import {
  createFlashback,
  getFlashbacks,
  updateFlashback,
  deleteFlashback,
} from "../controllers/flashback.controller.js";

import { verifyJWT, validate } from "../middlewares/index.js";
import { upload } from "../middlewares/upload.middleware.js";

import {
  createFlashbackValidator,
  updateFlashbackValidator,
} from "../validators/flashback.validator.js";

const router = Router();

router.use(verifyJWT);

router.post(
  "/:bookingId",
  upload.array("media", 10),
  createFlashbackValidator,
  validate,
  createFlashback,
);

router.get("/:bookingId", getFlashbacks);

router.patch(
  "/:flashbackId",
  updateFlashbackValidator,
  validate,
  updateFlashback,
);

router.delete("/:flashbackId", deleteFlashback);

export default router;

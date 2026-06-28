import { Router } from "express";

import {
  createFlashback,
  listingFlashbacks,
  myFlashbacks,
  likeFlashback,
  deleteFlashback,
} from "../controllers/flashback.controller.js";

import { verifyJWT, validateRequiredFields, upload } from "../middlewares/index.js";

import { flashbackValidator } from "../validators/index.js";

const router = Router();

// =========================
// Create Flashback
// =========================

router.post(
  "/",

  verifyJWT,

  upload.array(
    "images",

    10,
  ),

  validateRequiredFields(flashbackValidator),

  createFlashback,
);

// =========================
// My Flashbacks
// =========================

router.get(
  "/my",

  verifyJWT,

  myFlashbacks,
);

// =========================
// Listing Gallery
// =========================

router.get(
  "/listing/:listingId",

  listingFlashbacks,
);

// =========================
// Like
// =========================

router.patch(
  "/like/:id",

  verifyJWT,

  likeFlashback,
);

// =========================
// Delete
// =========================

router.delete(
  "/:id",

  verifyJWT,

  deleteFlashback,
);

export default router;

import { Router } from "express";

import {
  createReview,
  getReviews,
  deleteReview,
} from "../controllers/review.controller.js";

import { verifyJWT, authorizeRoles } from "../middlewares/index.js";

const router = Router();

router.post(
  "/",

  verifyJWT,

  createReview,
);

router.get(
  "/listing/:id",

  getReviews,
);

router.delete(
  "/:id",

  verifyJWT,

  deleteReview,
);

export default router;

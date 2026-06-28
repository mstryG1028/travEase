import { Router } from "express";

import {
  generateSummary,
  generateReview,
  ownerSuggestions,
  generateTags,
} from "../controllers/ai.controller.js";

import { verifyJWT, authorizeRoles } from "../middlewares/index.js";

const router = Router();

router.post(
  "/summary/:id",
  verifyJWT,
  authorizeRoles("owner"),
  generateSummary,
);

router.post("/review", verifyJWT, generateReview);

router.get(
  "/suggestions/:id",
  verifyJWT,
  authorizeRoles("owner"),
  ownerSuggestions,
);

router.post("/tags/:id", verifyJWT, authorizeRoles("owner"), generateTags);

export default router;

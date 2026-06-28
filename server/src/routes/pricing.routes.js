import { Router } from "express";

import {
  calculatePrice,
  updatePricing,
} from "../controllers/pricing.controller.js";

import { verifyJWT, authorizeRoles } from "../middlewares/index.js";

const router = Router();

router.get(
  "/:id",

  calculatePrice,
);

router.patch(
  "/:id",

  verifyJWT,

  authorizeRoles("owner"),

  updatePricing,
);

export default router;

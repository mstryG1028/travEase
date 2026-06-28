import { Router } from "express";

import { ownerDashboard } from "../controllers/dashboard.controller.js";

import { verifyJWT, authorizeRoles } from "../middlewares/index.js";

const router = Router();

router.get(
  "/owner",

  verifyJWT,

  authorizeRoles("owner"),

  ownerDashboard,
);

export default router;

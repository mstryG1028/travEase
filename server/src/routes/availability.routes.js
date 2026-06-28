import { Router } from "express";

import {
  calendar,
  ownerBlock,
  ownerUnblock,
} from "../controllers/availability.controller.js";

import { verifyJWT, authorizeRoles } from "../middlewares/index.js";

const router = Router();

router.get(
  "/:id",

  calendar,
);

router.patch(
  "/block/:id",

  verifyJWT,

  authorizeRoles("owner"),

  ownerBlock,
);

router.patch(
  "/unblock/:id",

  verifyJWT,

  authorizeRoles("owner"),

  ownerUnblock,
);

export default router;

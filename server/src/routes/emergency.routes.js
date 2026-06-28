import { Router } from "express";

import { nearbyEmergency } from "../controllers/emergency.controller.js";

const router = Router();

router.get(
  "/",

  nearbyEmergency,
);

export default router;

import { Router } from "express";

import { myAchievements } from "../controllers/achievement.controller.js";

import { verifyJWT } from "../middlewares/index.js";

const router = Router();

router.get(
  "/my",

  verifyJWT,

  myAchievements,
);

export default router;

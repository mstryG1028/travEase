import { Router } from "express";

import { getWeather } from "../controllers/weather.controller.js";

const router = Router();

router.get(
  "/:id",

  getWeather,
);

export default router;

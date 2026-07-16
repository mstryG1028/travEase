import { Router } from "express";
import recommendationController from "../controllers/recommendation.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", verifyJWT, recommendationController.getRecommendations);

export default router;

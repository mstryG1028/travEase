import { Router } from "express";

import {verifyJWT} from "../middlewares/auth.middleware.js";

import {
  addFavorite,
  getWishlist,
  removeFavorite,
} from "../controllers/favorite.controller.js";

const router = Router();

router.use(verifyJWT);

router.route("/").post(addFavorite).get(getWishlist);

router.route("/:listingId").delete(removeFavorite);

export default router;

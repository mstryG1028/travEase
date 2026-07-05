import { Router } from "express";

import {
  createListing,
  createFirstListing,
  getAllListings,
  getSingleListing,
  updateListing,
  deleteListing,
  nearbyListings,
  incrementViews,
  updateFavorites,
} from "../controllers/listing.controller.js";
import { verifyJWT, authorizeRoles, upload } from "../middlewares/index.js";

const router = Router();

router
  .route("/")

  .get(getAllListings);

router.post(
  "/create",
  verifyJWT,
  authorizeRoles("owner"),
  upload.single("image"),
  createListing,
);

router.post(
  "/become-host",
  verifyJWT,
  upload.single("image"),
  createFirstListing,
);
router.get(
  "/nearby",

  nearbyListings,
);

router
  .route("/:id")

  .get(getSingleListing)

  .patch(
    verifyJWT,

    authorizeRoles("owner"),

    updateListing,
  )

  .delete(
    verifyJWT,

    authorizeRoles("owner"),

    deleteListing,
  );

router.patch(
  "/view/:id",

  incrementViews,
);
router.patch(
  "/favorite/:id",

  updateFavorites,
);

export default router;

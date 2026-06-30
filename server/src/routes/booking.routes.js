import { Router } from "express";

import {
  createBooking,
  myBookings,
  ownerBookings,
  cancelBooking,
  completeBooking,
  availability,
  ownerDashboard,
} from "../controllers/booking.controller.js";

import {
  verifyJWT,
  authorizeRoles,
  validate,
} from "../middlewares/index.js";

import { bookingValidator } from "../validators/index.js";

const router = Router();

router.post(
  "/",

  verifyJWT,

  authorizeRoles("user"),

  validate(bookingValidator),

  createBooking,
);

router.get(
  "/my-bookings",

  verifyJWT,

  myBookings,
);

router.get(
  "/owner-bookings",

  verifyJWT,

  authorizeRoles("owner"),

  ownerBookings,
);

router.get(
  "/dashboard",

  verifyJWT,

  authorizeRoles("owner"),

  ownerDashboard,
);

router.patch(
  "/cancel/:id",

  verifyJWT,

  cancelBooking,
);

router.patch(
  "/complete/:id",

  verifyJWT,

  authorizeRoles("owner"),

  completeBooking,
);

router.get(
  "/availability",

  availability,
);

export default router;

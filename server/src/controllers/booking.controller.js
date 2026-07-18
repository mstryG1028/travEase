import * as bookingService from "../services/booking/booking.service.js";

import AsyncHandler from "../utils/AsyncHandler.js";

import sendResponse from "../utils/sendResponse.js";

export const createBooking = AsyncHandler(async (req, res) => {
  const booking = await bookingService.createBooking(
    req.body,

    req.user,
  );

  return sendResponse(
    res,

    201,

    booking,

    "Booking Created Successfully",
  );
});

export const myBookings = AsyncHandler(async (req, res) => {
  const bookings = await bookingService.myBookings(req.user._id);

  return sendResponse(
    res,

    200,

    bookings,
  );
});

export const bookingDetails = AsyncHandler(async (req, res) => {
 
  const booking = await bookingService.bookingDetails(req.params.id);
  return sendResponse(res, 200, booking, "Booking Details");
});

export const ownerBookings = AsyncHandler(async (req, res) => {
  const bookings = await bookingService.ownerBookings(req.user._id);

  return sendResponse(
    res,

    200,

    bookings,
  );
});

export const cancelBooking = AsyncHandler(async (req, res) => {
  const booking = await bookingService.cancelBooking(
    req.params.id,

    req.user._id,
  );

  return sendResponse(
    res,

    200,

    booking,

    "Booking Cancelled",
  );
});

export const completeBooking = AsyncHandler(async (req, res) => {
  const booking = await bookingService.completeBooking(req.params.id);

  return sendResponse(
    res,

    200,

    booking,

    "Booking Completed",
  );
});

export const availability = AsyncHandler(async (req, res) => {
  const data = await bookingService.availability(
    req.query.listingId,

    req.query.month,

    req.query.year,
  );

  return sendResponse(
    res,

    200,

    data,
  );
});

export const ownerDashboard = AsyncHandler(async (req, res) => {
  const stats = await bookingService.ownerDashboard(req.user._id);

  return sendResponse(
    res,

    200,

    stats,
  );
});

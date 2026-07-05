import reviewRepository from "../../repositories/review.repository.js";

import { Booking, ListingAnalytics } from "../../models/index.js";

import ApiError from "../../utils/ApiError.js";
import {
  BOOKING_STATUS,
  PAYMENT_STATUS,
} from "../../constants/booking.constants.js";
export async function createReview(data, user) {
  console.log("Request Body:", data);
  console.log("Booking ID:", data.booking);
  console.log("Logged User:", user._id);
  console.log("Incoming Data:", data);

  const booking = await Booking.findById(data.booking);

  console.log("Booking Found:", booking);
  if (!booking) {
    throw new ApiError(
      404,

      "Booking not found",
    );
  }

  if (booking.guest.toString() !== user._id.toString()) {
    throw new ApiError(
      403,

      "Unauthorized",
    );
  }

  if (booking.bookingStatus !== BOOKING_STATUS.COMPLETED) {
    throw new ApiError(
      400,

      "Review allowed only after completed booking",
    );
  }

  const exists = await reviewRepository.findOne({
    booking: data.booking,
  });

  if (exists) {
    throw new ApiError(
      400,

      "Review already exists",
    );
  }

  const review = await reviewRepository.create({
    booking: data.booking,

    listing: booking.listing,

    user: user._id,

    rating: data.rating,

    comment: data.comment,
  });

  // ======================
  // Update Analytics
  // ======================

  const analytics = await ListingAnalytics.findOne({
    listing: booking.listing,
  });

  const reviews = await reviewRepository.find({
    listing: booking.listing,
  });

  analytics.reviewCount = reviews.length;

  analytics.averageRating =
    reviews.reduce(
      (sum, r) => sum + r.rating,

      0,
    ) / reviews.length;

  await analytics.save();

  return review;
}

// ====================

export async function getListingReviews(listingId) {
  return await reviewRepository.find({
    listing: listingId,
  });
}

export async function deleteReview(
  reviewId,

  userId,
) {
  const review = await reviewRepository.findOne({
    _id: reviewId,
  });

  if (!review) {
    throw new ApiError(
      404,

      "Review not found",
    );
  }

  if (review.user.toString() !== userId.toString()) {
    throw new ApiError(
      403,

      "Unauthorized",
    );
  }

  await reviewRepository.delete(reviewId);

  return true;
}
